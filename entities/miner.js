import { minerStates } from "../config/entityStates.js";
import { pushMatrix, translate, scale, popMatrix } from "../PJS/transformation.js";
import { noStroke, fill } from "../PJS/colors.js";
import { rect } from "../PJS/shapes.js";
import { map } from "../PJS/math.js";

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

    update (deltaTime) {

        switch (this.action) {

            case minerStates.toDigging :

                this.s = 1;

                if (this.x < 500) {
                    this.x += this.moveSpeed * deltaTime;
                }
                else {
                    this.action = minerStates.digging;
                }

            break;

            case minerStates.digging : 

                this.s = 1;

                this.has += this.loadSpeed * deltaTime;
                if (this.has >= this.maxLoad) {
                    this.has = this.maxLoad;
                    this.action = minerStates.toCrate;
                }

            break;

            case minerStates.toCrate :

                this.s = -1;

                if (this.x > 300) {
                    this.x -= this.moveSpeed * deltaTime;
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
            scale(this.s, 1);
            translate(-this.x - this.w / 2, -this.y);

            noStroke();
            fill(0);
            rect(this.x, this.y, this.w / 2, this.h);
            fill(255);
            rect(this.x + this.w / 2, this.y, this.w / 2, this.h);

            if (this.action === minerStates.digging) {
                fill(255);
                rect(this.x - this.w / 6, this.y - this.h / 6, this.w * 4 / 3, this.h / 10);

                fill(255, 214, 89);
                rect(this.x - this.w / 6, this.y - this.h / 6, map(this.has, 0, this.maxLoad, 0, this.w * 4 / 3), this.h / 10);
            }

        popMatrix();
    }

    display (deltaTime) {
        this.update(deltaTime);
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