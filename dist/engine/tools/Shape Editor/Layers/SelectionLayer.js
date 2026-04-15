import { GroupLayer } from "./GroupLayer.js";
export class SelectionLayer extends GroupLayer {
    constructor(layers) {
        super("Selection");
        // Mark as temporary so exporter / hierarchy ignore it
        this.isTemporarySelection = true;
        // DO NOT change parent of real layers.
        // DO NOT move layers into this group.
        // This is a TEMPORARY virtual group.
        this.children = layers; // safe because GroupLayer never mutates children transforms
    }
}
