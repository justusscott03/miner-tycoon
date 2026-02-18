// src/engine/ElevatorState.ts
import { ElevatorStates } from "../../config/ElevatorStates.js";
export class ElevatorState {
    constructor(x, y, w, h, crates, storehouse) {
        this.action = ElevatorStates.MovingDown;
        this.money = 0;
        this.moveSpeed = 120;
        this.loadSpeed = 2;
        this.maxLoad = 100;
        this.loadTimer = 0;
        this.unloadTimer = 0;
        this.loadBarMax = 0;
        this.curCrate = null;
        this.curCrateIndex = null;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.crates = crates;
        this.storehouse = storehouse;
    }
    update(delta) {
        switch (this.action) {
            case ElevatorStates.MovingDown:
                this.y += this.moveSpeed * delta;
                for (let i = 0; i < this.crates.length; i++) {
                    const crate = this.crates[i];
                    if (!crate.hasUnloaded && this.y + this.h * 14 / 17 > crate.y + crate.h) {
                        this.y = crate.y + crate.h - this.h * 14 / 17;
                        this.curCrate = crate;
                        this.curCrateIndex = i;
                        this.action = ElevatorStates.Loading;
                    }
                }
                break;
            case ElevatorStates.Loading:
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
                        this.action = ElevatorStates.MovingDown;
                    }
                    else {
                        this.action = ElevatorStates.MovingUp;
                    }
                }
                break;
            case ElevatorStates.MovingUp:
                this.y -= this.moveSpeed * delta;
                if (this.y < this.storehouse.y + this.storehouse.h + 31) {
                    this.action = ElevatorStates.Unloading;
                }
                break;
            case ElevatorStates.Unloading:
                const moneyToUnload = this.money;
                const unloadTime = moneyToUnload / this.loadSpeed;
                this.loadBarMax = unloadTime;
                this.unloadTimer++;
                if (this.unloadTimer > unloadTime) {
                    this.unloadTimer = 0;
                    this.storehouse.money += this.money;
                    this.money = 0;
                    this.action = ElevatorStates.MovingDown;
                    this.crates.forEach(crate => crate.hasUnloaded = false);
                }
                break;
        }
    }
    toJSON() {
        return {
            x: this.x,
            y: this.y,
            w: this.w,
            h: this.h,
            action: this.action,
            money: this.money,
            moveSpeed: this.moveSpeed,
            loadSpeed: this.loadSpeed,
            maxLoad: this.maxLoad,
            loadTimer: this.loadTimer,
            unloadTimer: this.unloadTimer,
            loadBarMax: this.loadBarMax,
            curCrateIndex: this.curCrateIndex
        };
    }
    static fromJSON(data, crates, storehouse) {
        const e = new ElevatorState(data.x, data.y, data.w, data.h, crates, storehouse);
        e.action = data.action;
        e.money = data.money;
        e.moveSpeed = data.moveSpeed;
        e.loadSpeed = data.loadSpeed;
        e.maxLoad = data.maxLoad;
        e.loadTimer = data.loadTimer;
        e.unloadTimer = data.unloadTimer;
        e.loadBarMax = data.loadBarMax;
        e.curCrateIndex = data.curCrateIndex;
        return e;
    }
}
