import { Layer } from "./Layers/Layer.js";
import { GroupLayer } from "./Layers/GroupLayer.js";
export class SelectionManager {
    constructor() {
        this.selected = null;
    }
    select(layer) {
        this.selected = layer;
    }
    clear() {
        this.selected = null;
    }
    // Convenience helper: returns the shape if a leaf layer is selected
    get selectedShape() {
        return this.selected instanceof Layer ? this.selected.shape : null;
    }
    // Optional helper: is the selected item a group?
    get isGroupSelected() {
        return this.selected instanceof GroupLayer;
    }
}
