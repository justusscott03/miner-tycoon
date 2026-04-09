import { UpgradeableState } from "./UpgradeableState.js";
import { lerp } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.2/math.js";

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

