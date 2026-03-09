import { TextUI } from "../../engine/core/components/ui/TextUI.js";
import { MonoBehavior } from "../../engine/core/MonoBehavior.js";
import { Time } from "../../engine/helpers/TimeManager.js";
import { MoneyFormatter } from "../helpers/MoneyFormatter.js";
import { CratePrefab } from "../prefabs/CratePrefab.js";

export interface CrateSaveData {
    lvl: number;
    money: number;
    hasUnloaded: boolean;
}

export class CrateBehavior extends MonoBehavior {
    money: number = 0;
    lvl: number = 1;
    private hasUnloaded: boolean = false;

    moneyText!: TextUI;

    Awake(): void {
        this.moneyText = this.GetComponent(TextUI)!;
    }

    Update(): void {
        this.money += Time.deltaTime;

        this.moneyText.content = MoneyFormatter.abbreviate(Math.round(this.money));
    }

    add(amount: number) {
        if (amount > 0) {
            this.money += amount;
        }
    }

    toJSON(): CrateSaveData {
        return {
            lvl: this.lvl,
            money: this.money,
            hasUnloaded: this.hasUnloaded
        };
    }

    static fromJSON(data: CrateSaveData): CratePrefab {
        const crateGO = CratePrefab.instantiate();
        const crateBehavior = crateGO.GetComponent(CrateBehavior)!;
        crateBehavior.lvl = data.lvl;
        crateBehavior.money = data.money;
        crateBehavior.hasUnloaded = data.hasUnloaded;
        return crateGO;
    }
}