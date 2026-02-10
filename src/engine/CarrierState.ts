// src/engine/CarrierState.ts

import { CarrierStates } from "../config/CarrierStates.js";
import type { StorehouseState } from "./StorehouseState.js";
import type { WarehouseState } from "./WarehouseState.js";

export interface CarrierSaveData {
    x: number;
    y: number;
    w: number;
    h: number;
    action: CarrierStates;
    money: number;
    moveSpeed: number;
    loadSpeed: number;
    maxLoad: number;
    loadTimer: number;
    unloadTimer: number;
    loadBarMax: number;
    s: number;
}

export class CarrierState {
    x: number;
    y: number;
    w: number;
    h: number;

    storehouse: StorehouseState;
    warehouse: WarehouseState;

    s = -1;

    action: CarrierStates = CarrierStates.ToStorehouse;

    money = 0;
    moveSpeed = 60;
    loadSpeed = 2;
    maxLoad = 100;

    loadTimer = 0;
    unloadTimer = 0;
    loadBarMax = 0;

    constructor(x: number, y: number, w: number, h: number, storehouse: StorehouseState, warehouse: WarehouseState) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        this.storehouse = storehouse;
        this.warehouse = warehouse;
    }

    update(delta: number) {
        switch (this.action) {
            case CarrierStates.ToStorehouse:
                this.s = -1;
                this.x -= this.moveSpeed * delta;

                if (this.x < 300) {
                    this.action = CarrierStates.Loading;
                }
                break;

            case CarrierStates.Loading:
                let moneyToLoad = Math.min(this.storehouse.money, this.maxLoad);

                const loadTime = moneyToLoad / this.loadSpeed;
                this.loadBarMax = loadTime;

                this.loadTimer++;
                if (this.loadTimer > loadTime) {
                    this.loadTimer = 0;
                    this.money += moneyToLoad;
                    this.storehouse.money -= moneyToLoad;
                    this.action = CarrierStates.ToWarehouse;
                }
                break;

            case CarrierStates.ToWarehouse:
                this.s = 1;
                this.x += this.moveSpeed * delta;

                if (this.x > 370) {
                    this.action = CarrierStates.Unloading;
                }
                break;

            case CarrierStates.Unloading:
                const moneyToUnload = this.money;
                const unloadTime = moneyToUnload / this.loadSpeed;
                this.loadBarMax = unloadTime;

                this.unloadTimer++;
                if (this.unloadTimer > unloadTime) {
                    this.unloadTimer = 0;
                    this.warehouse.money += this.money;
                    this.money = 0;
                    this.action = CarrierStates.ToStorehouse;
                }
                break;
        }
    }

    toJSON(): CarrierSaveData {
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
            s: this.s
        };
    }

    static fromJSON(data: CarrierSaveData, storehouse: StorehouseState, warehouse: WarehouseState): CarrierState {
        const c = new CarrierState(data.x, data.y, data.w, data.h, storehouse, warehouse);

        c.action = data.action;
        c.money = data.money;
        c.moveSpeed = data.moveSpeed;
        c.loadSpeed = data.loadSpeed;
        c.maxLoad = data.maxLoad;
        c.loadTimer = data.loadTimer;
        c.unloadTimer = data.unloadTimer;
        c.loadBarMax = data.loadBarMax;
        c.s = data.s;

        return c;
    }
}
