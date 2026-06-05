import deepClone from '../../utils/deepClone';
import { hasChild } from './index';
type FieldsType = {
  idField: string;
  textField: string;
  childrenField: string;
};

type ConfigsType = {
  fields: FieldsType;
  optionLabelProp?: string | (() => React.ReactNode);
};

type WrapperDataType = {
  uid: string; // pid-id
  id: string;
  text: string;
  pid: string | number | null; // ID of the direct parent element,
  pids: Array<string | number> | null; // ID of the previous parent element
  level: number;
  disabled?: boolean;
  isLeaf: boolean;
  children: Array<WrapperDataType> | undefined;
  source: Record<string, any>;
};

function loopData(
  data: Array<Record<string, any>>,
  pid: string | number | null,
  pids: Array<string | number>,
  configs: ConfigsType,
) {
  const { idField, textField, childrenField } = configs.fields;

  let res = [] as Array<WrapperDataType>;

  data.forEach((item) => {
    const id = item[idField];
    const text = item[textField];
    const children = hasChild(item)
      ? loopData(item[childrenField], id, [...pids, id], configs)
      : undefined;
    const source = deepClone(item);

    res.push({
      uid: [...pids, id].join('-'),
      id,
      text,
      pid,
      pids,
      level: pids.length + 1,
      children,
      isLeaf: item.isLeaf ?? !children,
      disabled: item.disabled ?? false,
      source,
    });

    if (hasChild(item)) {
      res = res.concat(children as Array<WrapperDataType>);
    }
  });

  return res;
}

export function getWrapperArrayData(
  dataSource: Array<Record<string, any>>,
  configs: ConfigsType,
) {
  const result = loopData(dataSource, null, [], configs);
  return result;
}

export function getWrapperMapData(arrayData: Array<WrapperDataType>) {
  const map = {} as Record<string, WrapperDataType>;
  arrayData.forEach((data) => {
    const key = data.uid;
    map[key] = data;
  });
  return map;
}
