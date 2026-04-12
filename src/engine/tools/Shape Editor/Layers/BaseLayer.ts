export abstract class BaseLayer {
    id: string;
    name: string;
    visible = true;
    locked = false;
    parent: BaseLayer | null = null;   // ✔ references base class only

    constructor(name: string) {
        this.id = crypto.randomUUID();
        this.name = name;
    }

    abstract isGroup(): boolean;
    abstract getBounds(): { left: number; top: number; right: number; bottom: number };

}
