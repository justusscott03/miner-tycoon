// src/rendering/CarrierRenderer.js

import { pushMatrix, translate, scale, popMatrix } from "../../../engine/lib/transformation";
import { fill } from "../../../engine/lib/colors";
import { rect } from "../../../engine/lib/shapes";
import { textAlign, textSize, text } from "../../../engine/lib/text";
import { round, map } from "../../../engine/lib/math";

import { CarrierStates } from "../../config/CarrierStates.js";
import { CarrierState } from "../state/CarrierState.js";

export class CarrierRenderer {
    state: CarrierState;

    constructor(state: CarrierState) {
        this.state = state;
    }

    render(): void {
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
        text(c.money.toString(), c.x + c.w / 2, c.y + c.h / 2);

        if (c.action === CarrierStates.Loading || c.action === CarrierStates.Unloading) {
            fill(255);
            rect(c.x - c.w / 6, c.y - c.h / 6, c.w * 4 / 3, c.h / 10);

            fill(255, 214, 89);
            const timer = c.action === CarrierStates.Loading ? c.loadTimer : c.unloadTimer;
            rect(c.x - c.w / 6, c.y - c.h / 6, map(timer, 0, c.loadBarMax, 0, c.w * 4 / 3), c.h / 10);
        }
    }
}
