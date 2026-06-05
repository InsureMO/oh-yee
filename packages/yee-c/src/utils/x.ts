class Constanter {
  private constants = {} as Record<string, any>;

  init(constants: Record<string, any>) {
    this.constants = constants;
  }

  set(key: string, value: any) {
    this.constants[key] = value;
  }

  get(key: string) {
    return this.constants[key];
  }

  getAll() {
    return this.constants;
  }

  remove(key: string) {
    const del = this.constants[key];
    delete this.constants[key];
    return del;
  }

  removeAll() {
    this.constants = {};
  }
}

const constanter = new Constanter();

export default constanter;
