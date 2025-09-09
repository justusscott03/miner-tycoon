import { fill } from "../PJS/colors.js";
import { rect } from "../PJS/shapes.js";
import { textAlign, textSize, text } from "../PJS/text.js";

export class Storehouse {

    /**
     * Creates a new Storehouse object.
     * @param { number } x - The x-position of the storehouse.
     * @param { number } y - The y-position of the storehouse.
     * @param { number } w - The width of the storehouse.
     * @param { number } h - The height of the storehouse.
     * @param { Elevator } elevator - The elevator associated with the storehouse.
     */
    constructor (x, y, w, h, elevator) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.money = 0;
        this.elevator = elevator;
    }

    display () {
        fill(0);
        rect(this.x, this.y, this.w, this.h);
        fill(255);
        textSize(50);
        textAlign("CENTER", "CENTER");
        text(this.money, this.x + this.w / 2, this.y + this.h / 2);
    }

    toJSON () {
        return {
            x : this.x,
            y : this.y,
            w : this.w,
            h : this.h,
            money : this.money
        };
    }

    static fromJSON (data) {
        const storehouse = new Storehouse(data.x, data.y, data.w, data.h);
        storehouse.money = data.money;

        return storehouse;
    }

}