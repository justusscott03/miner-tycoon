import { elevatorStates } from "../config/entityStates.js";
import { pushMatrix, translate, scale, popMatrix } from "../PJS/transformation.js";
import { noStroke, fill, stroke, strokeWeight } from "../PJS/colors.js";
import { rect, ellipse } from "../PJS/shapes.js";
import { beginShape, vertex, endShape } from "../PJS/complexShapes.js";
import { textAlign, text } from "../PJS/text.js";
import { map } from "../PJS/math.js";

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

    update (deltaTime) {

        switch (this.action) {

            case elevatorStates.movingDown :

                this.y += this.moveSpeed * deltaTime;

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

                this.y -= this.moveSpeed * deltaTime;

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

            fill(136, 198, 221);
            strokeWeight(2);
            stroke(0);
            rect(30, 150, 50, 12, 5);
            rect(15, 140, 80, 13, 1);

            beginShape();
                vertex(0, 11);
                vertex(110, 11);
                vertex(110, 133);
                vertex(90, 145);
                vertex(25, 145);
                vertex(0, 133);
            endShape();

            ellipse(20, 8, 16, 16);
            ellipse(90, 8, 16, 16);
            ellipse(20, 8, 2, 2);
            ellipse(90, 8, 2, 2);

            beginShape();
                vertex(30, 11);
                vertex(80, 11);
                vertex(80, 7);
                vertex(70, 0);
                vertex(40, 0);
                vertex(30, 7);
            endShape();

            fill(0, 0, 0, 0);
            stroke(0);
            beginShape();
                vertex(8, 19);
                vertex(102, 19);
                vertex(102, 40);
                vertex(100, 45);
                vertex(100, 65);
                vertex(98, 70);
                vertex(98, 85);
                vertex(100, 90);
                vertex(100, 110);
                vertex(102, 115);
                vertex(102, 126);
                vertex(85, 137);
                vertex(30, 137);
                vertex(8, 126);
                vertex(8, 115);
                vertex(10, 110);
                vertex(10, 90);
                vertex(12, 85);
                vertex(12, 70);
                vertex(10, 65);
                vertex(10, 45);
                vertex(8, 40);
            endShape();

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