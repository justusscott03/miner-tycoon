// src/rendering/CarrierRenderer.js

import { pushMatrix, translate, scale, popMatrix } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.2/transformation.js";
import { fill } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.2/colors.js";
import { rect } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.2/shapes.js";
import { textAlign, textSize, text } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.2/text.js";
import { round, map } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.2/math.js";
import { CarrierStates } from "../config/CarrierStates.js";

export class CarrierRenderer {
    constructor(state) {
        this.state = state;
    }

    draw() {
        const c = this.state;

        pushMatrix();
        translate(c.x + c.w / 2, c.y);
        scale(c.s, 1);
        translate(-c.x - c.w / 2, -c.y);

        fill(255);
        rect(c.x + c.w / 2, c.y, c.w / 2, c.h);
        fill(0);
        rect(c.x, c.y, c.w / 2, c.h);

        fill(0);
        rect(c.x + c.w + 5, c.y + c.h / 3, c.w * 1.5, c.h * 2 / 3);

        popMatrix();

        fill(round(255 / 2));
        textAlign("CENTER", "CENTER");
        textSize(40);
        text(c.money, c.x + c.w / 2, c.y + c.h / 2);

        if (c.action === CarrierStates.Loading || c.action === CarrierStates.Unloading) {
            fill(255);
            rect(c.x - c.w / 6, c.y - c.h / 6, c.w * 4 / 3, c.h / 10);

            fill(255, 214, 89);
            const timer = c.action === CarrierStates.Loading ? c.loadTimer : c.unloadTimer;
            rect(c.x - c.w / 6, c.y - c.h / 6, map(timer, 0, c.loadBarMax, 0, c.w * 4 / 3), c.h / 10);
        }
    }

    display(delta) {
        this.state.update(delta);
        this.draw();
    }
}
