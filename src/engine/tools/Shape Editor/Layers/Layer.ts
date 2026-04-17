import { ShapeUIBindings } from "../../../ui/UIBindings/ShapeUIBindings";
import { BaseLayer, Bounds } from "./BaseLayer";

export class Layer extends BaseLayer {
    constructor(name: string, public shape: ShapeUIBindings<any>) {
        super(name);
    }

    isGroup() { return false; }

    getBounds(): Bounds {
        return this.shape.getBounds();
    }

    freezeLocalGeometry() {
        return this.shape.freezeLocalGeometry();
    }

    scaleFromBounds(oldB: Bounds, newB: Bounds, frozenLocal: any) {
        this.shape.scaleFromBounds(oldB, newB, frozenLocal);
    }
}
