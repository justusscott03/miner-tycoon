import { ShapeUIBindings } from "../../ui/UIBindings/ShapeUIBindings.js";

export class SelectionManager {
    selected: ShapeUIBindings<any> | null = null;

    select(shape: ShapeUIBindings<any>) {
        this.selected = shape;
    }

    clear() {
        this.selected = null;
    }
}
