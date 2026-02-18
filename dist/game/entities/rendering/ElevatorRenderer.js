// src/rendering/ElevatorRenderer.js
import { pushMatrix, translate, scale, popMatrix } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.2/transformation.js";
import { noStroke, fill } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.2/colors.js";
import { rect, image } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.2/shapes.js";
import { textAlign, text } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.2/text.js";
import { map } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.2/math.js";
import { ImageManager } from "../../helpers/ImageManager.js";
import { ElevatorStates } from "../../config/ElevatorStates.js";
export class ElevatorRenderer {
    constructor(state) {
        this.state = state;
    }
    draw() {
        const e = this.state;
        pushMatrix();
        translate(e.x, e.y);
        scale(e.w / 110, e.h / 170);
        image(ImageManager.Instance.get("elevator"), 0, 0, 110, 170);
        fill(255);
        textAlign("CENTER", "CENTER");
        text(e.money.toString(), e.w / 2, e.h / 2);
        if (e.action === ElevatorStates.Loading || e.action === ElevatorStates.Unloading) {
            noStroke();
            fill(255);
            rect(35, 8.5, 40, 5, 1);
            fill(255, 214, 89);
            const timer = e.action === ElevatorStates.Loading ? e.loadTimer : e.unloadTimer;
            rect(35, 8.5, map(timer, 0, e.loadBarMax, 0, 40), 5, 1);
        }
        popMatrix();
    }
    display(delta) {
        this.state.update(delta);
        this.draw();
    }
}
