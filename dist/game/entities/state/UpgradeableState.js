// src/engine/UpgradeableState.ts
import { entityBoostLevels } from "../../config/entityBoostLevels.js";
import { UpgradePageState } from "./UpgradePageState.js";
export class UpgradeableState {
    constructor() {
        this.level = 1;
        this.buttonData = {
            x: 0,
            y: 0,
            w: 0,
            h: 0,
            fontSize: 15
        };
        this.pageOutButton = null; // renderer fills this in
        const entityName = this.constructor.name
            .replace("State", "")
            .toLowerCase();
        this.boostLevels = [...entityBoostLevels[entityName]];
        this.maxLevel = this.boostLevels[this.boostLevels.length - 1];
        this.upgradePage = new UpgradePageState(this);
    }
    initButton(data) {
        this.buttonData = data;
    }
    upgrade() {
        if (this.level < this.maxLevel) {
            this.level++;
        }
    }
    toJSON() {
        return {
            level: this.level
        };
    }
}
