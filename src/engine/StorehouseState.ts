// src/engine/StorehouseState.ts

export interface StorehouseSaveData {
    x: number;
    y: number;
    w: number;
    h: number;
    money: number;
}

export class StorehouseState {
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

    toJSON(): StorehouseSaveData {
        return {
            x: this.x,
            y: this.y,
            w: this.w,
            h: this.h,
            money: this.money
        };
    }

    static fromJSON(data: StorehouseSaveData): StorehouseState {
        const s = new StorehouseState(data.x, data.y, data.w, data.h);
        s.money = data.money;
        return s;
    }
}
