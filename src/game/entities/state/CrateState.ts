// src/engine/CrateState.ts

export interface CrateSaveData {
    x: number;
    y: number;
    w: number;
    h: number;
    lvl: number;
    money: number;
    hasUnloaded: boolean;
}

export class CrateState {
    x: number;
    y: number;
    w: number;
    h: number;

    lvl = 1;
    money = 100;
    hasUnloaded = false;

    // Renderer will be attached later in JS
    renderer: any;

    constructor(x: number, y: number, w: number, h: number) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    add(amount: number) {
        if (amount > 0) {
            this.money += amount;
        }
    }

    toJSON(): CrateSaveData {
        return {
            x: this.x,
            y: this.y,
            w: this.w,
            h: this.h,
            lvl: this.lvl,
            money: this.money,
            hasUnloaded: this.hasUnloaded
        };
    }

    static fromJSON(data: CrateSaveData): CrateState {
        const crate = new CrateState(data.x, data.y, data.w, data.h);
        crate.lvl = data.lvl;
        crate.money = data.money;
        crate.hasUnloaded = data.hasUnloaded;
        return crate;
    }
}
