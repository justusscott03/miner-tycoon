// src/rendering/StorehouseRenderer

import { fill } from "../../../engine/lib/colors";
import { rect } from "../../../engine/lib/shapes";
import { textAlign, textSize, text } from "../../../engine/lib/text";

import { StorehouseState } from "../state/StorehouseState";

export class StorehouseRenderer {
    state: StorehouseState;

    constructor(state: StorehouseState) {
        this.state = state;
    }

    render() {
        const s = this.state;

        fill(0);
        rect(s.x, s.y, s.w, s.h);

        fill(255);
        textSize(50);
        textAlign("CENTER", "CENTER");
        text(s.money.toString(), s.x + s.w / 2, s.y + s.h / 2);
    }
}
