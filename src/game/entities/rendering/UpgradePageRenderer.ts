// src/ui/UpgradePageRenderer

import { fill } from "../../../engine/lib/colors";
import { rect } from "../../../engine/lib/shapes";
import { pushMatrix, popMatrix, translate, scale } from "../../../engine/lib/transformation";

import { UpgradePageState } from "../state/UpgradePageState";

export class UpgradePageRenderer {
    state: UpgradePageState;

    x: number;
    y: number;
    w: number;
    h: number;

    constructor(state: UpgradePageState, canvas: HTMLCanvasElement) {
        this.state = state;

        this.x = 100;
        this.y = 100;
        this.w = canvas.width - 200;
        this.h = canvas.height - 200;
    }

    draw() {
        const s = this.state.s;

        pushMatrix();
        translate(this.x + this.w / 2, this.y + this.h / 2);
        scale(s, s);

        fill(255);
        rect(-this.w / 2, -this.h / 2, this.w, this.h);

        popMatrix();
    }
}
