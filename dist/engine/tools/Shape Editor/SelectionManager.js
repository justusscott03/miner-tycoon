export class SelectionManager {
    constructor() {
        this.selected = null;
    }
    select(shape) {
        this.selected = shape;
    }
    clear() {
        this.selected = null;
    }
}
