function getType(param: unknown) {
  return Object.prototype.toString.call(param).slice(8, -1);
}

export default getType;
