import { noStroke, fill, strokeWeight, stroke, color } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.2/colors.js";
import { pushMatrix, translate, scale, popMatrix } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.2/transformation.js";
import { image } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.2/shapes.js";
import { textSize, textAlign, outlinedText, textFont } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.2/text.js";
import { lerp } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.2/math.js";

import { ImageManager } from "../../engine/helpers/ImageManager.js";

import { UserInput } from "../../engine/ui/UserInput.js";

export class Button {
    x: number;
    y: number;
    w: number;
    h: number;

    txt: string;
    txtSize: number;
    func: CallableFunction;
    input: UserInput;

    s: number;
    mouseOver: boolean;

    constructor(x: number, y: number, w: number, h: number, txt: string, txtSize: number, func: CallableFunction, input: UserInput) {
        // WORLD-SPACE POSITION (centered)
        this.x = x;
        this.y = y;

        // SIZE IN WORLD SPACE
        this.w = w;
        this.h = h;

        this.txt = txt;
        this.txtSize = txtSize;
        this.func = func;
        this.input = input;

        this.s = 1;          // scale
        this.mouseOver = false;
    }

    update() {
        let mx = this.input.mouseX;
        let my = this.input.mouseY;

        this.mouseOver =
            mx > this.x && mx < this.x + this.w &&
            my > this.y && my < this.y + this.h;

        if (this.mouseOver) {
            this.s = lerp(this.s, 1.1, 0.1);
            if (this.input.mouseClicked) this.func();
        } else {
            this.s = lerp(this.s, 1, 0.1);
        }
    }

    draw() {
        pushMatrix();

        translate(this.x + this.w / 2, this.y + this.h / 2);
        scale(this.s);
        translate(-(this.x + this.w / 2), -(this.y + this.h / 2));

        // Draw button centered
        image(ImageManager.Instance.get("button"), this.x, this.y,  this.w, this.h);

        // Draw text centered
        strokeWeight(0.5);
        stroke(0);
        fill(255);
        textSize(this.txtSize);
        textAlign("CENTER", "CENTER");
        textFont("fredoka");

        const lines = this.txt.split("\n");
        const lineHeight = this.txtSize * 1.1;
        const totalHeight = lines.length * lineHeight;

        const startY = this.y + this.h / 2 - totalHeight / 2 + lineHeight / 2;

        lines.forEach((line, i) => {
            outlinedText(line,
                this.x + this.w / 2,
                startY + i * lineHeight,
                1,
                color(255),
                color(0)
            );
        });

        popMatrix();
    }

    display() {
        this.update();
        this.draw();
    }
}
