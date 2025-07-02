import { elevatorStates } from "../config/entityStates.js";
import { pushMatrix, translate, scale, popMatrix } from "../PJS/transformation.js";
import { noStroke, fill } from "../PJS/colors.js";
import { rect, image } from "../PJS/shapes.js";
import { textAlign, text } from "../PJS/text.js";
import { map } from "../PJS/math.js";
import { frameTime } from "../helpers/timeManager.js";
import { images } from "../lib/imageLibrary.js";

export class Elevator {

    /**
     * Creates a new Elevator object.
     * @param { number } x - The x-position of the elevator.
     * @param { number } y - The y-position of the elevator.
     * @param { number } w - The width of the elevator.
     * @param { number } h - The height of the elevator.
     * @param { Shaft[] } shafts - The shafts that the elevator will visit.
     * @param { Storehouse } storehouse - The storehouse that the elevator will drop its load in.
     */
    constructor (x, y, w, h, shafts, storehouse) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.storehouse = storehouse;

        this.action = elevatorStates.movingDown;

        this.money = 0;

        this.moveSpeed = 120;
        this.loadSpeed = 2;
        this.maxLoad = 100;
        this.loadTimer = 0;
        this.unloadTimer = 0;

        this.loadBarMax = 0;

        this.crates = shafts.map(shaft => shaft.crate);
        this.curCrate = null;
        this.curCrateIndex = null;

        this.pageOut = false;
    }

    update () {

        switch (this.action) {

            case elevatorStates.movingDown :

                this.y += this.moveSpeed * frameTime.delta;

                for (let i = 0; i < this.crates.length; i++) {
                    const crate = this.crates[i];
                    
                    if (!crate.hasUnloaded && this.y + this.h * 14 / 17 > crate.y + crate.h) {
                        this.y = crate.y + crate.h - this.h * 14 / 17;
                        this.curCrate = crate;
                        this.curCrateIndex = i;
                        this.action = elevatorStates.loading;
                    }
                }

            break;

            case elevatorStates.loading : 
                
                let moneyToLoad = this.curCrate.money;
                if (this.money + moneyToLoad > this.maxLoad) {
                    moneyToLoad = this.maxLoad - this.money;
                }
                
                const loadTime = moneyToLoad / this.loadSpeed;
                this.loadBarMax = loadTime;

                this.loadTimer++;
                if (this.loadTimer > loadTime) {
                    this.loadTimer = 0;
                    this.money += moneyToLoad;
                    this.curCrate.money -= moneyToLoad;
                    this.curCrate.hasUnloaded = true;
                    this.curCrate = null;
                    if (this.curCrateIndex !== this.crates.length - 1 && this.money < this.maxLoad) {
                        this.action = elevatorStates.movingDown;
                    }
                    else {
                        this.action = elevatorStates.movingUp;
                    }
                }
                
            break;

            case elevatorStates.movingUp :

                this.y -= this.moveSpeed * frameTime.delta;

                if (this.y < 525) {
                    this.action = elevatorStates.unloading;
                }

            break;

            case elevatorStates.unloading :

                const moneyToUnload = this.money;

                const unloadTime = moneyToUnload / this.loadSpeed;
                this.loadBarMax = unloadTime;

                this.unloadTimer++;
                if (this.unloadTimer > unloadTime) {
                    this.unloadTimer = 0;
                    this.storehouse.money += this.money;
                    this.money = 0;
                    this.action = elevatorStates.movingDown;
                    this.crates.forEach(crate => crate.hasUnloaded = false);
                }

            break;

        }
        
    }

    draw () {

        pushMatrix();

            translate(this.x, this.y);
            scale(this.w / 110, this.h / 170);

            image(images.elevator, 0, 0, 110, 170);

            fill(255);
            textAlign("CENTER", "CENTER");
            text(this.money, this.w / 2, this.h / 2);

            if (this.action === elevatorStates.loading || this.action === elevatorStates.unloading) {
                noStroke();
                fill(255);
                rect(22, -85 / 8, 66, 17 / 2, 1);
                fill(255, 214, 89);
                rect(this.w / 5, -this.h / 16, map(this.action === elevatorStates.loading ? this.loadTimer : this.unloadTimer, 0, this.loadBarMax, 0, this.w * 3 / 5), this.h / 20, 1);
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
            storehouse : this.storehouse.toJSON(),
            action : this.action,
            money : this.money,
            moveSpeed : this.moveSpeed,
            loadSpeed : this.loadSpeed,
            maxLoad : this.maxLoad,
            loadTimer : this.loadTimer,
            unloadTimer : this.unloadTimer,
            loadBarMax : this.loadBarMax,
            crates : this.crates.map(crate => crate.toJSON()),
            curCrateIndex : this.curCrateIndex
        };
    }

    static fromJSON (data, shafts, storehouse) {
        const elevator = new Elevator(data.x, data.y, data.w, data.h, shafts, storehouse);
        elevator.action = data.action;
        elevator.money = data.money;
        elevator.moveSpeed = data.moveSpeed;
        elevator.loadSpeed = data.loadSpeed;
        elevator.maxLoad = data.maxLoad;
        elevator.loadTimer = data.loadTimer;
        elevator.unloadTimer = data.unloadTimer;
        elevator.loadBarMax = data.loadBarMax;
        elevator.curCrateIndex = data.curCrateIndex;

        return elevator;
    }

}
