import { minerStates } from "../config/entityStates.js";
import { pushMatrix, translate, scale, popMatrix } from "../PJS/transformation.js";
import { noStroke, fill } from "../PJS/colors.js";
import { image, rect } from "../PJS/shapes.js";
import { map } from "../PJS/math.js";
import { frameTime } from "../helpers/timeManager.js";
import { images } from "../lib/imageLibrary.js";

export class Miner {

    /**
     * Creates a new Miner object.
     * @param { number } x - The x-position of the miner.
     * @param { number } y - The y-position of the miner.
     * @param { number } w - The width of the miner.
     * @param { number } h - The height of the miner.
     * @param { Crate } crate - The crate that the miner will offload into.
     */
    constructor (x, y, w, h, crate) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.crate = crate;

        this.s = 1;

        this.action = minerStates.toDigging;

        this.maxLoad = 10;
        this.has = 0;
        this.loadSpeed = 5;
        this.moveSpeed = 60;
    }

    update () {

        switch (this.action) {

            case minerStates.toDigging :

                this.s = 1;

                if (this.x < 500) {
                    this.x += this.moveSpeed * frameTime.delta;
                }
                else {
                    this.action = minerStates.digging;
                }

            break;

            case minerStates.digging : 

                this.s = 1;

                this.has += this.loadSpeed * frameTime.delta;
                if (this.has >= this.maxLoad) {
                    this.has = this.maxLoad;
                    this.action = minerStates.toCrate;
                }

            break;

            case minerStates.toCrate :

                this.s = -1;

                if (this.x > 300) {
                    this.x -= this.moveSpeed * frameTime.delta;
                }
                else {
                    this.crate.add(this.has);
                    this.has = 0;
                    this.action = minerStates.toDigging;
                }

            break;

        }

    }

    draw () {
        pushMatrix();

            translate(this.x + this.w / 2, this.y);
            scale(this.w / 50 * this.s, this.h / 75);

            image(images.miner, -25, 0, 50, 75);

            if (this.action === minerStates.digging) {
                noStroke();
                fill(255);
                rect(-100 / 3, -25 / 2, 200 / 3, 15 / 2);

                fill(255, 214, 89);
                rect(-100 / 3, -25 / 2, map(this.has, 0, this.maxLoad, 0, 200 / 3), 15 / 2);
            }

        popMatrix();
    }

    display () {
        this.update();
        this.draw();
    }

    toJSON () {
        return {
            x : this.x,
            y : this.y,
            w : this.w,
            h : this.h,
            crate : this.crate.toJSON(),
            s : this.s,
            action : this.action,
            maxLoad : this.maxLoad,
            has : this.has,
            loadSpeed : this.loadSpeed,
            moveSpeed : this.moveSpeed
        };
    }

    static fromJSON (data, crate) {
        const miner = new Miner(data.x, data.y, data.w, data.h, crate);
        miner.x = data.x;
        miner.y = data.y;
        miner.w = data.w;
        miner.h = data.h;
        miner.s = data.s;
        miner.action = data.action;
        miner.maxLoad = data.maxLoad;
        miner.has = data.has;
        miner.loadSpeed = data.loadSpeed;
        miner.moveSpeed = data.moveSpeed;

        return miner;
    }

}