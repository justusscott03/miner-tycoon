import { ProgressBarUI } from "../../engine/core/components/ui/ProgressBarUI.js";
import { MonoBehavior } from "../../engine/core/MonoBehavior.js";
import { Time } from "../../engine/helpers/TimeManager.js";
import { MinerStates } from "../config/MinerStates.js";
import { MinerPrefab } from "../prefabs/MinerPrefab.js";
export class MinerBehavior extends MonoBehavior {
    constructor() {
        super(...arguments);
        this.maxLoad = 100;
        this.currentLoad = 0;
        this.loadSpeed = 50;
        this.moveSpeed = 60;
        this.direction = 1;
        this.action = MinerStates.ToDigging;
    }
    Awake() {
        this.progressBar = this.GetComponent(ProgressBarUI);
    }
    Update() {
        this.progressBar.hidden = this.action != MinerStates.Digging;
        this.progressBar.max = this.maxLoad;
        this.progressBar.current = this.currentLoad;
        this.transform.scale.x = this.direction;
        let x = this.transform.position.x;
        switch (this.action) {
            case MinerStates.ToDigging:
                this.direction = 1;
                if (x < 500) {
                    this.transform.position.x += this.moveSpeed * Time.deltaTime;
                }
                else {
                    this.action = MinerStates.Digging;
                }
                break;
            case MinerStates.Digging:
                this.direction = 1;
                this.currentLoad += this.loadSpeed * Time.deltaTime;
                if (this.currentLoad >= this.maxLoad) {
                    this.currentLoad = this.maxLoad;
                    this.action = MinerStates.ToCrate;
                }
                break;
            case MinerStates.ToCrate:
                this.direction = -1;
                if (x > 300) {
                    this.transform.position.x -= this.moveSpeed * Time.deltaTime;
                }
                else {
                    this.crate.add(this.currentLoad);
                    this.currentLoad = 0;
                    this.action = MinerStates.ToDigging;
                }
                break;
        }
    }
    toJSON() {
        return {
            maxLoad: this.maxLoad,
            currentLoad: this.currentLoad,
            loadSpeed: this.loadSpeed,
            moveSpeed: this.moveSpeed
        };
    }
    static fromJSON(data) {
        const minerGO = MinerPrefab.instantiate();
        const minerBehavior = minerGO.GetComponent(MinerBehavior);
        minerBehavior.maxLoad = data.maxLoad;
        minerBehavior.currentLoad = data.currentLoad;
        minerBehavior.loadSpeed = data.loadSpeed;
        minerBehavior.moveSpeed = data.moveSpeed;
        return minerGO;
    }
}
