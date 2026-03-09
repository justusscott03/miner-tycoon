import { MonoBehavior } from "../../engine/core/MonoBehavior.js";

export interface ShaftSaveData {
    x: number;
    y: number;
    w: number;
    h: number;
    id: number;
    crate: any;
    minerOffset: number;
    numMiners: number;
    miners: any[];
    level: number;
}

export class ShaftBehavior extends MonoBehavior {

}