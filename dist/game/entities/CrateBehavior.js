import { TextUI } from "../../engine/core/components/ui/TextUI.js";
import { MonoBehavior } from "../../engine/core/MonoBehavior.js";
import { Time } from "../../engine/helpers/TimeManager.js";
import { MoneyFormatter } from "../helpers/MoneyFormatter.js";
import { CratePrefab } from "../prefabs/CratePrefab.js";
export class CrateBehavior extends MonoBehavior {
    constructor() {
        super(...arguments);
        this.money = 0;
        this.lvl = 1;
        this.hasUnloaded = false;
    }
    Awake() {
        this.moneyText = this.GetComponent(TextUI);
    }
    Update() {
        this.money += Time.deltaTime;
        this.moneyText.content = MoneyFormatter.abbreviate(Math.round(this.money));
    }
    add(amount) {
        if (amount > 0) {
            this.money += amount;
        }
    }
    toJSON() {
        return {
            lvl: this.lvl,
            money: this.money,
            hasUnloaded: this.hasUnloaded
        };
    }
    static fromJSON(data) {
        const crateGO = CratePrefab.instantiate();
        const crateBehavior = crateGO.GetComponent(CrateBehavior);
        crateBehavior.lvl = data.lvl;
        crateBehavior.money = data.money;
        crateBehavior.hasUnloaded = data.hasUnloaded;
        return crateGO;
    }
}
