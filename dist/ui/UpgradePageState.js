// src/ui/UpgradePageState.ts
export class UpgradePageState {
    constructor(subject) {
        this.pageOut = false; // Whether the page is opening
        this.s = 0; // Animation scale (0 → closed, 1 → open)
        this.subject = subject;
    }
    update(delta) {
        const target = this.pageOut ? 1 : 0;
        this.s += (target - this.s) * 0.2;
    }
}
