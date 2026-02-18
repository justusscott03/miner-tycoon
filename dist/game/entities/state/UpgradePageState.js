// src/ui/UpgradePageState.ts
export class UpgradePageState {
    constructor(subject) {
        this.pageOut = false;
        this.s = 0;
        this.subject = subject;
    }
    update(delta) {
        const target = this.pageOut ? 1 : 0;
        this.s += (target - this.s) * 0.2;
    }
}
