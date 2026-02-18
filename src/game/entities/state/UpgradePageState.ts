// src/ui/UpgradePageState.ts

import { UpgradeableState } from "./UpgradeableState";

export class UpgradePageState {
    subject: UpgradeableState;
    pageOut = false;
    s = 0;

    constructor(subject: any) {
        this.subject = subject;
    }

    update(delta: number) {
        const target = this.pageOut ? 1 : 0;
        this.s += (target - this.s) * 0.2;
    }
}

