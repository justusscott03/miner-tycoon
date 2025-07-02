import { carrierStates } from "../config/entityStates.js";
import { pushMatrix, translate, scale, popMatrix } from "../PJS/transformation.js";
import { fill } from "../PJS/colors.js";
import { rect } from "../PJS/shapes.js";
import { textAlign, textSize, text } from "../PJS/text.js";
import { round, map } from "../PJS/math.js";
import { frameTime } from "../helpers/timeManager.js";

export class Carrier {

    /**
     * Creates a new Carrier object.
     * @param { number } x - The x-coordinate of the carrier.
     * @param { number } y - The y-coordinate of the carrier.
     * @param { number } w - The width of the carrier.
     * @param { number } h - The height of the carrier.
     * @param { Storehouse} storehouse - The storehouse from which the carrier will get its load.
     * @param { Warehouse } warehouse - The warehouse at which the carrier will drop of its load.
     */
    constructor (x, y, w, h, storehouse, warehouse) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.storehouse = storehouse;
        this.warehouse = warehouse;

        this.s = -1;

        this.action = carrierStates.toStorehouse;

        this.money = 0;

        this.moveSpeed = 60;
        this.loadSpeed = 2;
        this.maxLoad = 100;
        this.loadTimer = 0;
        this.unloadTimer = 0;

        this.loadBarMax = 0;
    }

    update () {

        switch (this.action) {

            case carrierStates.toStorehouse :

                this.s = -1;    
            
                this.x -= this.moveSpeed * frameTime.delta;

                if (this.x < 300) {
                    this.action = carrierStates.loading;
                }

            break;

            case carrierStates.loading :

                let moneyToLoad = this.storehouse.money;
                if (this.storehouse.money > this.maxLoad) {
                    moneyToLoad = this.maxLoad;
                }

                const loadTime = moneyToLoad / this.loadSpeed;
                this.loadBarMax = loadTime;

                this.loadTimer++;
                if (this.loadTimer > loadTime) {
                    this.loadTimer = 0;
                    this.money += moneyToLoad;
                    this.storehouse.money -= moneyToLoad;
                    this.action = carrierStates.toWarehouse;
                }

            break;

            case carrierStates.toWarehouse :

                this.s = 1;

                this.x += this.moveSpeed * frameTime.delta;

                if (this.x > 370) {
                    this.action = carrierStates.unloading;
                }

            break;

            case carrierStates.unloading :

                let moneyToUnload = this.money;

                const unloadTime = moneyToUnload / this.loadSpeed;
                this.loadBarMax = unloadTime;

                this.unloadTimer++;
                if (this.unloadTimer > unloadTime) {
                    this.unloadTimer = 0;
                    totalMoney += this.money;
                    this.money = 0;
                    this.action = carrierStates.toStorehouse;
                }

            break;

        }

    }

    draw () {
        pushMatrix();
            translate(this.x + this.w / 2, this.y);
            scale(this.s, 1);
            translate(-this.x - this.w / 2, -this.y);

            fill(255);
            rect(this.x + this.w / 2, this.y, this.w / 2, this.h);
            fill(0);
            rect(this.x, this.y, this.w / 2, this.h);

            fill(0);
            rect(this.x + this.w + 5, this.y + this.h / 3, this.w * 1.5, this.h * 2 / 3);
        popMatrix();

        fill(round(255 / 2));
        textAlign("CENTER", "CENTER");
        textSize(40);
        text(this.money, this.x + this.w / 2, this.y + this.h / 2);


        if (this.action === carrierStates.loading || this.action === carrierStates.unloading) {
            fill(255);
            rect(this.x - this.w / 6, this.y - this.h / 6, this.w * 4 / 3, this.h / 10);

            fill(255, 214, 89);
            rect(this.x - this.w / 6, this.y - this.h / 6, map(this.action === carrierStates.loading ? this.loadTimer : this.unloadTimer, 0, this.loadBarMax, 0, this.w * 4 / 3), this.h / 10);
        }
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
            storehouse : this.storehouse.toJSON(),
            warehouse : this.warehouse.toJSON(),
            s : this.s,
            action : this.action,
            money : this.money,
            moveSpeed : this.moveSpeed,
            loadSpeed : this.loadSpeed,
            maxLoad : this.maxLoad,
            loadTimer : this.loadTimer,
            unloadTimer : this.unloadTimer,
            loadBarMax : this.loadBarMax
        };
    }

    static fromJSON (data, storehouse, warehouse) {
        const carrier = new Carrier(data.x, data.y, data.w, data.h, storehouse, warehouse);
        carrier.s = data.s;
        carrier.action = data.action;
        carrier.money = data.money;
        carrier.moveSpeed = data.moveSpeed;
        carrier.loadSpeed = data.loadSpeed;
        carrier.maxLoad = data.maxLoad;
        carrier.loadTimer = data.loadTimer;
        carrier.unloadTimer = data.unloadTimer;
        carrier.loadBarMax = data.loadBarMax;

        return carrier;
    }

}