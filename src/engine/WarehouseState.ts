// src/engine/WarehouseState.ts

export interface WarehouseSaveData {
    x: number;
    y: number;
    w: number;
    h: number;
    money: number;
}

export class WarehouseState {
    x: number;
    y: number;
    w: number;
    h: number;

    money = 0;

    constructor(x: number, y: number, w: number, h: number) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    toJSON(): WarehouseSaveData {
        return {
            x: this.x,
            y: this.y,
            w: this.w,
            h: this.h,
            money: this.money
        };
    }

    static fromJSON(data: WarehouseSaveData): WarehouseState {
        const w = new WarehouseState(data.x, data.y, data.w, data.h);
        w.money = data.money;
        return w;
    }
}
