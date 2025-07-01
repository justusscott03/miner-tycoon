import { noStroke, fill } from "../PJS/colors.js";
import { rect } from "../PJS/shapes.js";
import { textAlign, textSize, text } from "../PJS/text.js";
import { abbreviateNum } from "../helpers/moneyManagment.js";

export class Crate {

    /**
     * Creates a new Crate object.
     * @param { number } x - The x-position of the crate.
     * @param { number } y - The y-position of the crate.
     * @param { number } w - The width of the crate.
     * @param { number } h - The height of the crate.
     */
    constructor (x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        this.lvl = 1;
        this.money = 100;

        this.hasUnloaded = false;
    }

    draw () {
        noStroke();
        fill(255, 0, 0);
        rect(this.x, this.y, this.w, this.h);

        fill(0);
        textAlign("CENTER", "CENTER");
        textSize(30);
        text(abbreviateNum(this.money), this.x + this.w / 2, this.y - this.h / 2);
    }

    /**
     * Adds money to the crate.
     * @param { number } amount - The amount of money being added.
     */
    add (amount) {
        if (amount > 0) {
            this.money += amount;
        }
    }

    toJSON () {
        return {
            x : this.x,
            y : this.y,
            w : this.w,
            h : this.h,
            lvl : this.lvl,
            money : this.money,
            hasUnloaded : this.hasUnloaded
        };
    }

    static fromJSON (data) {
        const crate = new Crate(data.x, data.y, data.w, data.h);
        crate.lvl = data.lvl;
        crate.money = data.money;
        crate.hasUnloaded = data.hasUnloaded;

        return crate;
    }

}