export class ShapeUIBindings {
    clone() {
        const cloned = Object.create(this.constructor.prototype);
        const newParams = {};
        for (const key in this.params) {
            newParams[key] = this.params[key].clone();
        }
        cloned.params = newParams;
        return cloned;
    }
}
