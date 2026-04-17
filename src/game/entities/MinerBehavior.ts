import { ProgressBarUI } from "../../engine/core/ECS/components/ui/ProgressBarUI";
import { MonoBehavior } from "../../engine/core/ECS/main/MonoBehavior";
import { Time } from "../../engine/helpers/TimeManager";
import { MinerStates } from "../config/MinerStates";
import { MinerPrefab } from "../prefabs/MinerPrefab";
import { CrateBehavior } from "./CrateBehavior";

export interface MinerSaveData {
    maxLoad: number;
    currentLoad: number;
    loadSpeed: number;
    moveSpeed: number;
}

export class MinerBehavior extends MonoBehavior {
    maxLoad: number = 100;
    currentLoad: number = 0;
    loadSpeed: number = 50;
    moveSpeed: number = 60;
    direction: number = 1;

    action: MinerStates = MinerStates.ToDigging;

    progressBar!: ProgressBarUI;

    crate!: CrateBehavior;

    Awake(): void {
        this.progressBar = this.GetComponent(ProgressBarUI)!;
    }

    Update(): void {
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

    toJSON(): MinerSaveData {
        return {
            maxLoad: this.maxLoad,
            currentLoad: this.currentLoad,
            loadSpeed: this.loadSpeed,
            moveSpeed: this.moveSpeed
        };
    }

    static fromJSON(data: MinerSaveData): MinerPrefab {
        const minerGO = MinerPrefab.instantiate();
        const minerBehavior = minerGO.GetComponent(MinerBehavior)!;

        minerBehavior.maxLoad = data.maxLoad;
        minerBehavior.currentLoad = data.currentLoad;
        minerBehavior.loadSpeed = data.loadSpeed;
        minerBehavior.moveSpeed = data.moveSpeed;

        return minerGO;
    }
}
