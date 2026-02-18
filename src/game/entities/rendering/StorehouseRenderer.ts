// src/rendering/StorehouseRenderer.js

import { fill } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.2/colors.js";
import { rect } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.2/shapes.js";
import { textAlign, textSize, text } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.2/text.js";

import { StorehouseState } from "../state/StorehouseState";

export class StorehouseRenderer {
    state: StorehouseState;

    constructor(state: StorehouseState) {
        this.state = state;
    }

    draw() {
        const s = this.state;

        fill(0);
        rect(s.x, s.y, s.w, s.h);

        fill(255);
        textSize(50);
        textAlign("CENTER", "CENTER");
        text(s.money.toString(), s.x + s.w / 2, s.y + s.h / 2);
    }

    display() {
        this.draw();
    }
}
