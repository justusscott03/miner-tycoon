import { TextUI } from "../../engine/core/ECS/components/ui/TextUI";
import { MonoBehavior } from "../../engine/core/ECS/main/MonoBehavior";
import { Time } from "../../engine/helpers/TimeManager";
import { MoneyFormatter } from "../helpers/MoneyFormatter";
import { CratePrefab } from "../prefabs/CratePrefab";

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