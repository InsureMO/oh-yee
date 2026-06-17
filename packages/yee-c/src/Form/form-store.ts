import {
  getNamePath,
  parsePath,
  setValueByPath,
  stringifyPath,
} from './utils/path';
import validate from './utils/validate';

import type {
  Callbacks,
  FieldEntity,
  FormInstance,
  FormListField,
  FormListOperation,
  GroupEntity,
  InternalNamePath,
  Name,
  NamePath,
  Store,
  TRIGGER,
  ValidateMessage,
} from './interface';

// Helper function: move array element
function move<T>(array: T[], from: number, to: number): T[] {
  if (from === to) return array;
  const result = [...array];
  const [item] = result.splice(from, 1);
  result.splice(to, 0, item);
  return result;
}

const GLOBAL_WATCH_KEY = '__ALL__';

export class FormStore {
  private store: Store = {};
  private callbacks: Callbacks = {};
  private fieldEntities: FieldEntity[] = [];
  private fieldMap: Map<Name, FieldEntity> = new Map();
  private validateMessages: Map<Name, ValidateMessage[]> = new Map();
  private initialized = false;
  private initialValues: Store = {};
  // List key manager
  private listKeyManagers: Map<string, { keys: number[]; id: number }> =
    new Map();
  // Default validation message
  private defaultValidateMessage = 'This is required field.';
  // useWatch subscription management
  private watchers: Map<string, Set<() => void>> = new Map();
  // Field.Group group validators
  private groupEntities: Map<string, GroupEntity> = new Map();
  private groupId = 0;
  // Set default validation message
  setDefaultValidateMessage(message: string) {
    this.defaultValidateMessage = message;
  }

  // Initialize form instance
  initialize = ({
    initialValues,
    callbacks,
  }: {
    initialValues?: Store;
    callbacks?: Callbacks;
  }) => {
    if (!this.initialized) {
      this.initialized = true;

      if (initialValues) {
        this.store = { ...this.store, ...initialValues };
        this.initialValues = JSON.parse(JSON.stringify(initialValues));
      }

      if (callbacks) {
        this.setCallbacks(callbacks);
      }
      // Only refresh field entities, do not notify watchers (no value changes to watch during initialization)
      this.fieldEntities.forEach((entity) => {
        entity?.onStoreChange();
      });
    }
  };

  getFieldsValue = () => {
    return { ...this.store };
  };

  // Get nested value from store
  private getValueByPath = (path: InternalNamePath): any => {
    let current = this.store;
    for (const key of path) {
      if (current == null) return undefined; // eslint-disable-line eqeqeq
      current = current[key];
    }
    return current;
  };

  getFieldValue = (name: Name) => {
    const namePath = parsePath(name);
    return this.getValueByPath(namePath);
  };

  getFieldValidate = (name: Name) => {
    const normalizedName = stringifyPath(getNamePath(name));
    const messages = this.validateMessages.get(normalizedName);
    if (messages) {
      return messages[0];
    }
    return null;
  };

  setFieldsValue = (newStore: Store, trigger: TRIGGER = 'onChange') => {
    if (trigger === 'reset' || trigger === 'clear') {
      this.store = newStore;
      if (trigger === 'reset') {
        this.callbacks?.onReset?.();
      } else {
        this.callbacks?.onClear?.();
      }
    } else if (
      trigger === 'update' ||
      trigger === 'onChange' ||
      trigger === 'onBlur' ||
      trigger === 'onSubmit' ||
      trigger === 'fill'
    ) {
      // Support nested path setting
      Object.entries(newStore).forEach(([key, value]) => {
        if (key.includes('.')) {
          // Nested path, use setValueByPath
          this.store = setValueByPath(this.store, parsePath(key), value);
        } else {
          // Top-level path, set directly
          this.store = {
            ...this.store,
            [key]: value,
          };
        }
        if (trigger !== 'fill') {
          this.callbacks?.onValuesChange?.(
            { [key]: value },
            this.getFieldsValue(),
          );
        }
      });
    }

    // Validate on onChange and onBlur
    if (
      trigger === 'onChange' ||
      trigger === 'onBlur' ||
      trigger === 'onSubmit'
    ) {
      this.validateFields(Object.keys(newStore), trigger);
    }

    this.refreshField(newStore);
  };

  resetFields = (name?: Name[]) => {
    if (!name) {
      // Reset all fields
      this.store = Object.keys(this.store).reduce((acc, key) => {
        acc[key] = this.initialValues[key];
        return acc;
      }, {} as Store);
    } else {
      // Reset specified fields, supports nested paths
      name.forEach((n) => {
        const parsedPath = parsePath(n);
        let initialVal: any;
        if (parsedPath.length > 1) {
          let current: any = this.initialValues;
          for (const key of parsedPath) {
            if (current == null) break; // eslint-disable-line eqeqeq
            current = current[key];
          }
          initialVal = current;
        } else {
          initialVal = this.initialValues[n];
        }
        if (parsedPath.length > 1) {
          this.store = setValueByPath(this.store, parsedPath, initialVal);
        } else {
          this.store = { ...this.store, [n]: initialVal };
        }
      });
    }
    this.callbacks?.onReset?.();
    this.validateMessages.clear();
    this.groupEntities.forEach((entity) => entity.reset());
    this.refreshField();
  };

  clearFields = (name?: Name[]) => {
    const names = name || Object.keys(this.store);

    const clearStore = names.reduce((acc, name) => {
      acc[name] = undefined;
      return acc;
    }, {} as Store);
    this.setFieldsValue(clearStore, 'clear');
  };

  validateField = (name: Name, trigger?: TRIGGER) => {
    const entity = this.fieldMap.get(name);
    if (!entity) {
      return [];
    }
    const err: ValidateMessage[] = [];
    const { rules, required } = entity.props;
    let mergedRules = rules || [];

    if (required) {
      mergedRules.push({
        required: true,
        message: this.defaultValidateMessage,
        validateTrigger: ['onChange', 'onSubmit'],
      });
    }
    if (trigger) {
      mergedRules = mergedRules.filter((rule) => {
        const t = rule.validateTrigger;
        if (!t) {
          return true;
        }
        if (t === trigger || t.includes(trigger as any)) {
          return true;
        }
        return false;
      });
    }
    const value = this.getFieldValue(name);
    mergedRules.forEach((rule) => {
      const mark = validate(rule, value);
      if (name && !mark) {
        err.push({
          name: name,
          status: 'error',
          value,
          ...rule,
        } as ValidateMessage);
      }
    });
    if (err.length > 0) {
      this.validateMessages.set(name, err);
    } else if (this.validateMessages.has(name)) {
      this.validateMessages.delete(name);
    }
    return err;
  };

  validateFields = (
    names = Array.from(this.fieldMap.keys()),
    trigger?: TRIGGER,
  ) => {
    let err: ValidateMessage[] = [];
    names.forEach((name) => {
      const messages = this.validateField(name, trigger);
      err = err.concat(messages);
      if (messages.length > 0) {
        this.validateMessages.set(name, messages);
      } else {
        this.validateMessages.delete(name);
      }
    });
    return err;
  };

  refreshField = (newStore?: Store) => {
    if (newStore) {
      const keys = Object.keys(newStore);
      keys.forEach((key) => {
        const entity = this.fieldMap.get(key);
        if (entity) {
          entity?.onStoreChange();
        }
        this.notifyWatchers(key);
      });
    } else {
      this.fieldEntities.forEach((entity) => {
        entity?.onStoreChange();
      });
      this.notifyWatchers();
    }
  };

  subscribe = (namePath?: NamePath, callback?: () => void): (() => void) => {
    if (!callback) return () => {};
    const key =
      namePath !== undefined
        ? stringifyPath(getNamePath(namePath))
        : GLOBAL_WATCH_KEY;
    if (!this.watchers.has(key)) {
      this.watchers.set(key, new Set());
    }
    this.watchers.get(key)!.add(callback);
    return () => {
      this.watchers.get(key)?.delete(callback);
    };
  };

  private notifyWatchers = (changedKey?: string) => {
    if (changedKey) {
      this.watchers.get(changedKey)?.forEach((cb) => cb());
      this.watchers.get(GLOBAL_WATCH_KEY)?.forEach((cb) => cb());
    } else {
      this.watchers.forEach((set) => set.forEach((cb) => cb()));
    }
  };

  registerGroupEntity = (id: string, entity: GroupEntity): (() => void) => {
    this.groupEntities.set(id, entity);
    return () => {
      this.groupEntities.delete(id);
    };
  };

  validateGroups = (force = false): ValidateMessage[] => {
    let err: ValidateMessage[] = [];
    this.groupEntities.forEach((entity) => {
      err = err.concat(entity.validate(force));
    });
    return err;
  };

  setCallbacks = (callbacks: Callbacks) => {
    this.callbacks = { ...this.callbacks, ...callbacks };
  };

  getCallbacks = () => {
    return this.callbacks;
  };

  // === List management methods (reference: rc-field-form) ===

  /**
   * Get or create list key manager
   * Key manager is used to maintain stable keys for list items
   */
  private getListKeyManager(namePath: InternalNamePath) {
    const key = stringifyPath(namePath);
    if (!this.listKeyManagers.has(key)) {
      this.listKeyManagers.set(key, { keys: [], id: 0 });
    }
    return this.listKeyManagers.get(key)!;
  }

  /**
   * Get list fields
   */
  getListFields = (name: NamePath): FormListField[] => {
    const namePath = getNamePath(name);
    const keyManager = this.getListKeyManager(namePath);
    const listValue = this.getValueByPath(namePath);

    if (!Array.isArray(listValue)) return [];

    // Ensure enough keys
    while (keyManager.keys.length < listValue.length) {
      keyManager.keys.push(keyManager.id++);
    }

    return listValue.map((_, index) => {
      const key = keyManager.keys[index] ?? index;
      return {
        key,
        name: index,
        isListField: true,
        value: _,
      };
    });
  };

  /**
   * Get list operation methods
   */
  getListOperations = (name: NamePath): FormListOperation => {
    const namePath = getNamePath(name);
    const keyManager = this.getListKeyManager(namePath);

    return {
      add: (defaultValue?: any, insertIndex?: number) => {
        const currentList = (this.getValueByPath(namePath) as any[]) || [];

        if (
          insertIndex !== undefined &&
          insertIndex >= 0 &&
          insertIndex <= currentList.length
        ) {
          // Insert at specified position
          keyManager.keys = [
            ...keyManager.keys.slice(0, insertIndex),
            keyManager.id,
            ...keyManager.keys.slice(insertIndex),
          ];
          const newList = [
            ...currentList.slice(0, insertIndex),
            defaultValue !== undefined ? defaultValue : {},
            ...currentList.slice(insertIndex),
          ];
          this.setListValue(namePath, newList);
        } else {
          // Append to end
          keyManager.keys.push(keyManager.id);
          const newList = [
            ...currentList,
            defaultValue !== undefined ? defaultValue : {},
          ];
          this.setListValue(namePath, newList);
        }
        keyManager.id += 1;
      },
      remove: (index: number | number[]) => {
        const indices = Array.isArray(index) ? index : [index];
        const indexSet = new Set(indices);
        const currentList = (this.getValueByPath(namePath) as any[]) || [];

        // Update keys
        keyManager.keys = keyManager.keys.filter((_, i) => !indexSet.has(i));

        // Update list values
        const newList = currentList.filter((_, i) => !indexSet.has(i));
        this.setListValue(namePath, newList);
      },
      move: (from: number, to: number) => {
        if (from === to) return;
        const currentList = (this.getValueByPath(namePath) as any[]) || [];

        if (
          from < 0 ||
          from >= currentList.length ||
          to < 0 ||
          to >= currentList.length
        ) {
          return;
        }

        // Move keys
        keyManager.keys = move(keyManager.keys, from, to);

        // Move list values
        const newList = move(currentList, from, to);
        this.setListValue(namePath, newList);
      },
    };
  };

  /**
   * Set list value (supports nested paths)
   */
  private setListValue(namePath: InternalNamePath, value: any[]): void {
    const updatedStore = setValueByPath(this.store, namePath, value);
    this.store = updatedStore;
    this.refreshField();
  }

  // Subscribe and unsubscribe
  registerFieldEntities = (entity: FieldEntity) => {
    const namePath = getNamePath(entity.props.name);
    const normalizedName = stringifyPath(namePath);

    this.fieldEntities.push(entity);
    this.fieldMap.set(normalizedName, entity);

    // Initialize field value
    if (normalizedName) {
      const parsedPath = parsePath(normalizedName);
      const isNested = parsedPath.length > 1;

      // Check if value already exists (supports nested paths)
      const hasValue = isNested
        ? this.getValueByPath(parsedPath as InternalNamePath) !== undefined
        : normalizedName in this.store;

      if (!hasValue) {
        const { initialValue } = entity.props;
        // Read from initialValues (supports nested paths)
        let initialFromForm: any;
        if (isNested) {
          let current: any = this.initialValues;
          for (const key of parsedPath) {
            if (current == null) break; // eslint-disable-line eqeqeq
            current = current[key];
          }
          initialFromForm = current;
        } else {
          initialFromForm = this.initialValues[normalizedName];
        }
        const value = initialValue ?? initialFromForm ?? undefined;

        if (isNested) {
          this.store = setValueByPath(this.store, parsedPath, value);
        } else {
          this.store = { ...this.store, [normalizedName]: value };
        }
      }
    }
    entity.onStoreChange?.();

    return () => {
      this.fieldEntities = this.fieldEntities.filter((item) => item !== entity);
      this.fieldMap.delete(normalizedName);
      // In strict mode, fields are deleted. So field management is delegated to the consumer
      // const parsedPath = parsePath(normalizedName);
      // if (parsedPath.length > 1) {
      //   this.store = deletePath(this.store, parsedPath);
      // } else {
      //   delete this.store[normalizedName];
      // }
    };
  };

  submit = () => {
    const { onFinish, onFinishFailed } = this.callbacks;
    const fieldErrors = this.validateFields();
    const groupErrors = this.validateGroups(true);
    const allErrors = [...fieldErrors, ...groupErrors];
    if (allErrors.length === 0) {
      onFinish?.(this.getFieldsValue());
    } else {
      onFinishFailed?.(allErrors);
    }
    this.refreshField();
    return allErrors;
  };

  getForm(): FormInstance {
    return {
      getFieldValidate: this.getFieldValidate,
      getFieldsValue: this.getFieldsValue,
      getFieldValue: this.getFieldValue,
      setFieldsValue: this.setFieldsValue,
      resetFields: this.resetFields,
      clearFields: this.clearFields,
      validateField: this.validateField,
      submit: this.submit,
      setCallbacks: this.setCallbacks,
      getCallbacks: this.getCallbacks,
      registerFieldEntities: this.registerFieldEntities,
      validateFields: this.validateFields,
      initialize: this.initialize,
      getListFields: this.getListFields,
      getListOperations: this.getListOperations,
      subscribe: this.subscribe,
      registerGroupEntity: this.registerGroupEntity,
    };
  }
}
