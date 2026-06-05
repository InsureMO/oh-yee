import type { InternalNamePath, NamePath, Store } from '../interface';

/**
 * 将数组路径转换为标准化字符串路径
 * @example ['users', 0, 'name'] => 'users.0.name'
 */
export function getNamePath(path: NamePath): InternalNamePath {
  if (path === undefined || path === null) return [];
  if (Array.isArray(path)) return path.map(String);
  return [String(path)];
}

/**
 * 将路径数组转换为字符串
 * @example ['users', 0, 'name'] => 'users.0.name'
 */
export function stringifyPath(path: (string | number)[]): string {
  return path.map(String).join('.');
}

/**
 * 将字符串路径解析为数组
 * @example 'users.0.name' => ['users', 0, 'name']
 */
export function parsePath(pathStr: string): (string | number)[] {
  return pathStr.split('.').map((part) => {
    const num = Number(part);
    return isNaN(num) ? part : num;
  });
}

/**
 * 从 store 中获取嵌套值
 * @param store 表单数据存储
 * @param path 路径数组
 * @returns 对应的值，不存在返回 undefined
 */
export function getValueByPath(store: Store, path: (string | number)[]): any {
  let current = store;
  for (const key of path) {
    // eslint-disable-next-line eqeqeq
    if (current == null) return undefined;
    current = current[String(key)];
  }
  return current;
}

/**
 * 在 store 中设置嵌套值
 * @param store 表单数据存储
 * @param path 路径数组
 * @param value 要设置的值
 * @returns 新的 store 对象
 */
export function setValueByPath(
  store: Store,
  path: (string | number)[],
  value: any,
): Store {
  const newStore = { ...store };
  let current = newStore;

  for (let i = 0; i < path.length - 1; i++) {
    const key = String(path[i]);
    if (!(key in current)) {
      // 根据下一个键的类型创建容器
      current[key] = typeof path[i + 1] === 'number' ? [] : {};
    }
    current = current[key];
  }

  current[String(path[path.length - 1])] = value;
  return newStore;
}

/**
 * 删除指定路径的值
 * @param store 表单数据存储
 * @param path 路径数组
 * @returns 新的 store 对象
 */
export function deletePath(store: Store, path: (string | number)[]): Store {
  const newStore = { ...store };
  let current = newStore;

  for (let i = 0; i < path.length - 1; i++) {
    const key = String(path[i]);
    if (current[key] == null) return newStore; // eslint-disable-line eqeqeq
    current = current[key];
  }

  delete current[String(path[path.length - 1])];
  return newStore;
}
