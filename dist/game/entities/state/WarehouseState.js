// src/engine/WarehouseState.ts
export class WarehouseState {
    constructor(x, y, w, h) {
        this.money = 0;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
    toJSON() {
        return {
            x: this.x,
            y: this.y,
            w: this.w,
            h: this.h,
            money: this.money
        };
    }
    static fromJSON(data) {
        const w = new WarehouseState(data.x, data.y, data.w, data.h);
        w.money = data.money;
        return w;
    }
}
