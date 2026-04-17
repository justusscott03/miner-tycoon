import { UpgradeableState } from "./UpgradeableState";
import { lerp } from "../../../engine/lib/math";

export class UpgradePageState {
    subject: UpgradeableState;
    pageOut = false;
    s = 0;

    constructor(subject: UpgradeableState) {
        this.subject = subject;
    }

    update() {
        const target = this.pageOut ? 1 : 0;
        //this.s += (target - this.s) * 0.2;
        this.s = lerp(this.s, target, 0.1);
    }
}

