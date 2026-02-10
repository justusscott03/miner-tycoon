// src/engine/MinerState.ts
import { MinerStates } from "../config/MinerStates.js";
export class MinerState {
    constructor(x, y, w, h, crate) {
        this.s = 1;
        this.action = MinerStates.ToDigging;
        this.maxLoad = 10;
        this.has = 0;
        this.loadSpeed = 5;
        this.moveSpeed = 60;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.crate = crate;
    }
    update(delta) {
        switch (this.action) {
            case MinerStates.ToDigging:
                this.s = 1;
                if (this.x < 500) {
                    this.x += this.moveSpeed * delta;
                }
                else {
                    this.action = MinerStates.Digging;
                }
                break;
            case MinerStates.Digging:
                this.s = 1;
                this.has += this.loadSpeed * delta;
                if (this.has >= this.maxLoad) {
                    this.has = this.maxLoad;
                    this.action = MinerStates.ToCrate;
                }
                break;
            case MinerStates.ToCrate:
                this.s = -1;
                if (this.x > 300) {
                    this.x -= this.moveSpeed * delta;
                }
                else {
                    this.crate.add(this.has);
                    this.has = 0;
                    this.action = MinerStates.ToDigging;
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
            s: this.s,
            action: this.action,
            maxLoad: this.maxLoad,
            has: this.has,
            loadSpeed: this.loadSpeed,
            moveSpeed: this.moveSpeed
        };
    }
    static fromJSON(data, crate) {
        const miner = new MinerState(data.x, data.y, data.w, data.h, crate);
        miner.s = data.s;
        miner.action = data.action;
        miner.maxLoad = data.maxLoad;
        miner.has = data.has;
        miner.loadSpeed = data.loadSpeed;
        miner.moveSpeed = data.moveSpeed;
        return miner;
    }
}
