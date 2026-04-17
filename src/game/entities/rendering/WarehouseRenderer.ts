// src/rendering/WarehouseRenderer

import { fill } from "../../../engine/lib/colors";
import { rect } from "../../../engine/lib/shapes";

import { WarehouseState } from "../state/WarehouseState";

export class WarehouseRenderer {
    private state: WarehouseState;

    constructor(state: WarehouseState) {
        this.state = state;
    }

    render() {
        const w = this.state;

        fill(0);
        rect(w.x, w.y, w.w, w.h);
    }
}
