// src/engine/UpgradeableState.ts

import { entityBoostLevels } from "../config/entityBoostLevels.js";
import { UpgradePageState } from "../ui/UpgradePageState.js";

export interface ButtonData {
    x: number;
    y: number;
    w: number;
    h: number;
    fontSize: number;
}

export class UpgradeableState {
    level = 1;
    maxLevel: number;
    boostLevels: number[];

    buttonData: ButtonData = {
        x: 0,
        y: 0,
        w: 0,
        h: 0,
        fontSize: 15
    };

    upgradePage: UpgradePageState;
    pageOutButton: any = null; // renderer fills this in

    constructor() {
        const entityName = this.constructor.name
            .replace("State", "")
            .toLowerCase();

        this.boostLevels = [...entityBoostLevels[entityName as keyof typeof entityBoostLevels]];
        this.maxLevel = this.boostLevels[this.boostLevels.length - 1];

        this.upgradePage = new UpgradePageState(this);
    }

    initButton(data: ButtonData) {
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
