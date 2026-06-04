function swap(array: Array<any>, i: number, j: number) {
  const temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}

function divide(
  array: Array<any>,
  start: number,
  end: number,
  key: string,
  flag?: boolean,
) {
  const base = key ? array[end - 1][key] : array[end - 1];
  let i = start - 1;
  for (let j = start; j < end - 1; j++) {
    const value = key ? array[j][key] : array[j];
    if (
      (flag && (value < base || value === undefined)) ||
      (!flag && (value > base || base === undefined))
    ) {
      i++;
      swap(array, i, j);
    }
  }
  swap(array, i + 1, end - 1);
  return i + 1;
}
/*
    array: Source array
    key: When array items are objects, the corresponding key
    flag: true for ascending, false for descending
*/
function qsort(
  array: Array<any>,
  start: number,
  end: number,
  key: string,
  flag?: boolean,
) {
  end = typeof end !== 'undefined' ? end : array.length;
  if (start < end - 1) {
    const center = divide(array, start, end, key, flag);
    qsort(array, start, center, key, flag);
    qsort(array, center + 1, end, key, flag);
  }
  return [...array];
}

// Entry function
function quickSort(array: Array<any>, key = '', flag?: boolean) {
  return qsort(array, 0, array.length, key, flag);
}

export default quickSort;
