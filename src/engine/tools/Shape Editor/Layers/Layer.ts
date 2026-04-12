import { ShapeUIBindings } from "../../../ui/UIBindings/ShapeUIBindings.js";
import { BaseLayer } from "./BaseLayer.js";

export class Layer extends BaseLayer {
    constructor(name: string, public shape: ShapeUIBindings<any>) {
        super(name);
    }

    isGroup() { return false; }

    getBounds() {
        return this.shape.getBounds();
    }
}
