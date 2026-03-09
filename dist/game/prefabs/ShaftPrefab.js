import { MonoBehavior } from "../../engine/core/MonoBehavior.js";
import { MinerPrefab } from "../prefabs/MinerPrefab.js";
import { TextUI } from "../../engine/core/components/ui/TextUI.js";
import { MinerBehavior } from "../entities/MinerBehavior.js";
import { CrateBehavior } from "../entities/CrateBehavior.js";
import { Prefab } from "../../engine/core/Prefab.js";
import { SpriteRenderer } from "../../engine/core/components/SpriteRenderer.js";
export class ShaftBehavior extends MonoBehavior {
    constructor() {
        super(...arguments);
        this.id = 0;
        this.w = 0;
        this.h = 0;
        this.minerOffset = 0;
        this.numMiners = 0;
        this.miners = [];
    }
    Awake() {
        this.idLabel = this.GetComponent(TextUI);
    }
    Start() {
        // Position label
        this.idLabel.content = this.id.toString();
    }
    recruitMiner() {
        if (this.numMiners >= 6)
            return;
        const miner = MinerPrefab.instantiate();
        miner.transform.parent = this.transform;
        // Position miner relative to shaft
        miner.transform.position.x = this.minerOffset;
        miner.transform.position.y = this.h / 4;
        // Assign crate reference
        const minerBehavior = miner.GetComponent(MinerBehavior);
        minerBehavior.crate = this.crate.GetComponent(CrateBehavior);
        this.miners.push(miner);
        this.numMiners++;
    }
    // Update() {
    //     // Update miners
    //     for (const miner of this.miners) {
    //         miner.GetComponent("MinerBehavior")!.Update();
    //     }
    // }
    toJSON() {
        return {
            x: this.transform.position.x,
            y: this.transform.position.y,
            w: this.w,
            h: this.h,
            id: this.id,
            crate: this.crate.GetComponent(CrateBehavior).toJSON(),
            minerOffset: this.minerOffset,
            numMiners: this.numMiners,
            miners: this.miners.map(m => m.GetComponent(MinerBehavior).toJSON()),
            level: 0 // upgrade system later
        };
    }
    static fromJSON(data) {
        const shaft = ShaftPrefab.instantiate();
        const behavior = shaft.GetComponent(ShaftBehavior);
        shaft.transform.position.set(data.x, data.y);
        behavior.w = data.w;
        behavior.h = data.h;
        behavior.id = data.id;
        behavior.minerOffset = data.minerOffset;
        // Restore crate
        behavior.crate = CrateBehavior.fromJSON(data.crate);
        behavior.crate.transform.parent = shaft.transform;
        // Restore miners
        for (const minerData of data.miners) {
            const miner = MinerBehavior.fromJSON(minerData);
            miner.transform.parent = shaft.transform;
            const minerBehavior = miner.GetComponent(MinerBehavior);
            minerBehavior.crate = behavior.crate.GetComponent(CrateBehavior);
            behavior.miners.push(miner);
        }
        behavior.numMiners = data.numMiners;
        return shaft;
    }
}
export class ShaftPrefab extends Prefab {
    constructor() {
        super();
        const spriteRenderer = this.AddComponent(SpriteRenderer);
        spriteRenderer.initialize("shaft", 500, 100);
        this.AddComponent(ShaftBehavior);
    }
}
