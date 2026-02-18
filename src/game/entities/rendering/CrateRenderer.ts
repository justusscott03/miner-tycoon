// src/rendering/CrateRenderer.js

import { noStroke, fill } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.2/colors.js";
import { rect } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.2/shapes.js";
import { textAlign, textSize, text } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.2/text.js";

import { MoneyFormatter } from "../../helpers/MoneyFormatter.js";

import { CrateState } from "../state/CrateState.js";

export class CrateRenderer {
    state: CrateState;

    constructor(state: CrateState) {
        this.state = state;
    }

    draw() {
        const c = this.state;

        noStroke();
        fill(255, 0, 0);
        rect(c.x, c.y, c.w, c.h);

        fill(0);
        textAlign("CENTER", "CENTER");
        textSize(30);
        text(MoneyFormatter.abbreviate(c.money), c.x + c.w / 2, c.y - c.h / 2);
    }

    display() {
        this.draw();
    }
}
