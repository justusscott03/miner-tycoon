export type Bounds = { left: number; top: number; right: number; bottom: number };

export abstract class BaseLayer {
    id: string;
    name: string;
    visible = true;
    locked = false;
    parent: BaseLayer | null = null;

    constructor(name: string) {
        this.id = crypto.randomUUID();
        this.name = name;
    }

    abstract isGroup(): boolean;
    abstract getBounds(): Bounds;

    // both are part of the scaling contract
    abstract freezeLocalGeometry(): any;
    abstract scaleFromBounds(oldB: Bounds, newB: Bounds, frozenLocal: any): void;
}
