import { GroupLayer } from "./GroupLayer";
import { BaseLayer } from "./BaseLayer";

export class SelectionLayer extends GroupLayer {
    constructor(layers: BaseLayer[]) {
        super("Selection");

        // DO NOT change parent of real layers.
        // DO NOT move layers into this group.
        // This is a TEMPORARY virtual group.

        this.children = layers; // safe because GroupLayer never mutates children transforms
    }

    // Mark as temporary so exporter / hierarchy ignore it
    isTemporarySelection = true;
}
