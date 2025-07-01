import { fill } from "../PJS/colors.js";
import { rect } from "../PJS/shapes.js";

export class Warehouse {

    /**
     * Creates a new Warehouse object.
     * @param { number } x - The x-position of the warehouse.
     * @param { number } y - The y-position of the warehouse.
     * @param { number } w - The width of the warehouse.
     * @param { number } h - The height of the warehouse.
     */
    constructor (x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    display () {
        fill(0);
        rect(this.x, this.y, this.w, this.h);
    }

    toJSON () {
        return {
            x : this.x,
            y : this.y,
            w : this.w,
            h : this.h
        };
    }
    
    static fromJSON (data) {
        return new Warehouse(data.x, data.y, data.w, data.h);
    }

}