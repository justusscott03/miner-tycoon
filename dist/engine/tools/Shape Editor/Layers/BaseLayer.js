export class BaseLayer {
    constructor(name) {
        this.visible = true;
        this.locked = false;
        this.parent = null;
        this.id = crypto.randomUUID();
        this.name = name;
    }
}
