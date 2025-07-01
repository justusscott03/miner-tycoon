import { lerp } from "../PJS/math.js";
import { user } from "../helpers/ui.js";
import { noStroke, fill, strokeWeight, stroke, color } from "../PJS/colors.js";
import { pushMatrix, translate, scale, popMatrix } from "../PJS/transformation.js";
import { rect } from "../PJS/shapes.js";
import { textSize, textAlign, outlinedText } from "../PJS/text.js";

export class Button {

    /**
     * Creates a new Button object.
     * @param { number } x - The x-position.
     * @param { number } y - The y-position.
     * @param { number } w - The width of the button.
     * @param { number } h - The height of the button.
     * @param { string } txt - The text on the button.
     * @param { Function } func - The function to call on click.
     */
    constructor (x, y, w, h, txt, func) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.txt = txt;
        this.func = func;
        this.s = 3;
        this.mouseOver = false;
    }

    draw () {
        this.mouseOver = user.mouseX > this.x && user.mouseX < this.x + this.w &&
                         user.mouseY > this.y && user.mouseY < this.y + this.h;

        if (this.mouseOver) {
            this.s = lerp(this.s, 1.1, 0.1);
            if (user.mouseClicked) {
                this.func();
            }
        }
        else {
            this.s = lerp(this.s, 1, 0.1);
        }

        noStroke();
        pushMatrix();
            translate(this.x + this.w / 2, this.y + this.h / 2);
            scale(this.s);
            translate(-(this.x + this.w / 2), -(this.y + this.h / 2));
            fill(255);
            rect(this.x, this.y, this.w, this.h);
            
            pushMatrix();
                translate(this.x + this.w / 2, this.y + this.h / 2);
                scale(this.w / 40, this.h / 40);
                translate(-(this.x + this.w / 2), -(this.y + this.h / 2));

                strokeWeight(0.5);
                stroke(0);
                fill(255);
                textSize(20);
                textAlign("CENTER", "CENTER");
                outlinedText(this.txt, this.x + this.w / 2, this.y + this.h / 2, 1, color(255), color(0));
            popMatrix();
            
        popMatrix();
    }

}