export class BaseLayer {
    constructor(name) {
        this.visible = true;
        this.locked = false;
        this.parent = null; // ✔ references base class only
        this.id = crypto.randomUUID();
        this.name = name;
    }
}
