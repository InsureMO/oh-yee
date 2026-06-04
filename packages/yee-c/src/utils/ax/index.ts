import Ax from './core';
import { rebind } from './utils';

function createInstance() {
    const context = new Ax();
    const instance = Ax.prototype.request.bind(context);

    // Bind prototype methods to the instance and rebind this to Ax
    rebind(instance, Ax.prototype, context);

    return instance;
}

const ax = createInstance();

export default ax;
