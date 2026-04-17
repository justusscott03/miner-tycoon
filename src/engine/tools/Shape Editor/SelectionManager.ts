import { BaseLayer } from "./Layers/BaseLayer.js";
import { Layer } from "./Layers/Layer.js";
import { GroupLayer } from "./Layers/GroupLayer.js";
import { SelectionLayer } from "./Layers/SelectionLayer.js";

export class SelectionManager {
    selectedLayers: BaseLayer[] = [];
    selected: BaseLayer | null = null; // single layer OR SelectionLayer

    // Select exactly one layer (normal click)
    selectOne(layer: BaseLayer) {
        this.selectedLayers = [layer];
        this.rebuildSelectionLayer();
    }

    // Select many layers at once (marquee, ctrl+A, etc.)
    selectMany(layers: BaseLayer[]) {
        this.selectedLayers = [...layers];
        this.rebuildSelectionLayer();
    }

    // Toggle selection (shift-click)
    toggle(layer: BaseLayer) {
        const i = this.selectedLayers.indexOf(layer);
        if (i === -1) {
            this.selectedLayers.push(layer);
        } else {
            this.selectedLayers.splice(i, 1);
        }
        this.rebuildSelectionLayer();
    }

    // Remove a single layer from selection
    remove(layer: BaseLayer) {
        const i = this.selectedLayers.indexOf(layer);
        if (i !== -1) {
            this.selectedLayers.splice(i, 1);
            this.rebuildSelectionLayer();
        }
    }

    // Clear selection (click empty space)
    clear() {
        this.selectedLayers = [];
        this.selected = null;
    }

    // Build the "selected" object used by the gizmo
    private rebuildSelectionLayer() {
        if (this.selectedLayers.length === 0) {
            this.selected = null;
        } else if (this.selectedLayers.length === 1) {
            this.selected = this.selectedLayers[0];
        } else {
            this.selected = new SelectionLayer([...this.selectedLayers]);
        }
    }

    // Convenience helper: returns the shape if a leaf layer is selected
    get selectedShape() {
        return this.selected instanceof Layer ? this.selected.shape : null;
    }

    // Optional helper: is the selected item a group?
    get isGroupSelected() {
        return this.selected instanceof GroupLayer;
    }

    // ⭐ NEW: is multi-select active?
    get hasMultiple() {
        return this.selectedLayers.length > 1;
    }

    // ⭐ NEW: exactly one selected AND it's a group
    get isSingleGroupSelected() {
        return (
            this.selectedLayers.length === 1 &&
            this.selectedLayers[0] instanceof GroupLayer
        );
    }
}
