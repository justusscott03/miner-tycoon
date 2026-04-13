import { BaseLayer } from "./BaseLayer.js";
export class Layer extends BaseLayer {
    constructor(name, shape) {
        super(name);
        this.shape = shape;
    }
    isGroup() { return false; }
    getBounds() {
        return this.shape.getBounds();
    }
    freezeLocalGeometry() {
        return this.shape.freezeLocalGeometry();
    }
    scaleFromBounds(oldB, newB, frozenLocal) {
        this.shape.scaleFromBounds(oldB, newB, frozenLocal);
    }
}
