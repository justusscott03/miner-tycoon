// src/engine/StorehouseState.ts
export class StorehouseState {
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
        const s = new StorehouseState(data.x, data.y, data.w, data.h);
        s.money = data.money;
        return s;
    }
}
