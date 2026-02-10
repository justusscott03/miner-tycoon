// src/rendering/MinerRenderer.js

import { pushMatrix, translate, scale, popMatrix } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.2/transformation.js";
import { noStroke, fill } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.2/colors.js";
import { image, rect } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.2/shapes.js";
import { map } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.2/math.js";
import { ImageManager } from "../helpers/ImageManager.js";
import { MinerStates } from "../config/MinerStates.js";

export class MinerRenderer {
    constructor(state) {
        this.state = state;
    }

    draw() {
        const m = this.state;

        pushMatrix();

        translate(m.x + m.w / 2, m.y);
        scale((m.w / 50) * m.s, m.h / 75);

        image(ImageManager.Instance.get("miner"), -25, 0, 50, 75);

        if (m.action === MinerStates.Digging) {
            noStroke();
            fill(255);
            rect(-100 / 3, -25 / 2, 200 / 3, 15 / 2);

            fill(255, 214, 89);
            rect(
                -100 / 3,
                -25 / 2,
                map(m.has, 0, m.maxLoad, 0, 200 / 3),
                15 / 2
            );
        }

        popMatrix();
    }

    display(delta) {
        this.state.update(delta);
        this.draw();
    }
}
