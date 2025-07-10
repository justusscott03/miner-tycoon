import { fill } from "../PJS/colors.js";
import { lerp } from "../PJS/math.js";
import { rect } from "../PJS/shapes.js";
import { popMatrix, pushMatrix, scale, translate } from "../PJS/transformation.js";

const canvas = document.getElementById("canvas");

const upgradePages = [];

class UpgradePage {

    constructor (subject) {
        this.subject = subject;

        this.x = 100;
        this.y = 100;
        this.w = canvas.width - 200;
        this.h = canvas.height - 200;

        this.s = 0;
    }
    
    update () {
        if (this.subject.pageOut) {
            this.s = lerp(this.s, 1, 0.2);
        }
        else {
            this.s = lerp(this.s, 0, 0.2);
        }
    }

    draw () {
        pushMatrix();
            translate(this.x + this.w / 2, this.y + this.h / 2);
            scale(this.s * (this.w / (canvas.width - 200)), this.s * (this.h / (canvas.height - 200)));

            fill(255);
            rect(-this.w / 2, -this.h / 2, canvas.width - 200, canvas.height - 200);

        popMatrix();
    }

    display () {
        this.update();
        this.draw();
    }

}

export { upgradePages, UpgradePage };