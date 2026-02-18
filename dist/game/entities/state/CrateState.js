// src/engine/CrateState.ts
export class CrateState {
    constructor(x, y, w, h) {
        this.lvl = 1;
        this.money = 100;
        this.hasUnloaded = false;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
    add(amount) {
        if (amount > 0) {
            this.money += amount;
        }
    }
    toJSON() {
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
    static fromJSON(data) {
        const crate = new CrateState(data.x, data.y, data.w, data.h);
        crate.lvl = data.lvl;
        crate.money = data.money;
        crate.hasUnloaded = data.hasUnloaded;
        return crate;
    }
}
