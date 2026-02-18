// src/ui/UpgradePageRenderer.js
import { fill } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.2/colors.js";
import { rect } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.2/shapes.js";
import { pushMatrix, popMatrix, translate, scale } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.2/transformation.js";
export class UpgradePageRenderer {
    constructor(state, canvas) {
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
