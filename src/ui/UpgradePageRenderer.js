// src/ui/UpgradePageRenderer.js

import { fill } from "../PJS/colors.js";
import { rect } from "../PJS/shapes.js";
import { pushMatrix, popMatrix, translate, scale } from "../PJS/transformation.js";

const canvas = document.getElementById("canvas");

export class UpgradePageRenderer {
    constructor(state) {
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

    display(delta) {
        this.state.update(delta);
        this.draw();
    }
}
