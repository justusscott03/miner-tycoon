// src/rendering/WarehouseRenderer.js

import { fill } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.2/colors.js";
import { rect } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.2/shapes.js";

import { WarehouseState } from "../state/WarehouseState.js";

export class WarehouseRenderer {
    state: WarehouseState;

    constructor(state: WarehouseState) {
        this.state = state;
    }

    draw() {
        const w = this.state;

        fill(0);
        rect(w.x, w.y, w.w, w.h);
    }

    display() {
        this.draw();
    }
}
