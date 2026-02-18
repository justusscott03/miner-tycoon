// src/engine/ShaftState.ts
import { CrateState } from "./CrateState.js";
import { MinerState } from "./MinerState.js";
import { MinerStates } from "../../config/MinerStates.js";
import { UpgradeableState } from "./UpgradeableState.js";
export class ShaftState extends UpgradeableState {
    constructor(x, y, w, h, id) {
        super();
        this.numMiners = 0;
        this.miners = [];
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.id = id;
        this.initButton({ x: this.x + this.w * 4 / 5, y: this.y + this.h / 4, w: 60, h: 60, fontSize: 17 });
        this.crate = new CrateState(this.x + this.w / 80, this.y + (this.h * 3) / 5, this.w / 7, (this.h * 2) / 5);
        this.minerOffset = this.w / 8;
        this.recruitMiner();
    }
    recruitMiner() {
        if (this.numMiners < 6) {
            const miner = new MinerState(this.x + this.minerOffset, this.y + this.h / 4, this.w / 10, (this.h * 3) / 4, this.crate);
            miner.action = MinerStates.ToDigging;
            this.miners.push(miner);
            this.numMiners++;
        }
    }
    update(delta) {
        for (const miner of this.miners) {
            miner.update(delta);
        }
    }
    toJSON() {
        return {
            x: this.x,
            y: this.y,
            w: this.w,
            h: this.h,
            id: this.id,
            crate: this.crate.toJSON(),
            minerOffset: this.minerOffset,
            numMiners: this.numMiners,
            miners: this.miners.map(m => m.toJSON()),
            level: this.level
        };
    }
    static fromJSON(data) {
        const shaft = new ShaftState(data.x, data.y, data.w, data.h, data.id);
        shaft.crate = CrateState.fromJSON(data.crate);
        shaft.minerOffset = data.minerOffset;
        shaft.numMiners = data.numMiners;
        shaft.miners = data.miners.map(m => MinerState.fromJSON(m, shaft.crate));
        shaft.level = data.level;
        return shaft;
    }
}
