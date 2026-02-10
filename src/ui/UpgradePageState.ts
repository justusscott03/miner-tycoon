// src/ui/UpgradePageState.ts

export class UpgradePageState {
    subject: any;     // The ShaftState, ElevatorState, etc.
    pageOut = false;  // Whether the page is opening
    s = 0;            // Animation scale (0 → closed, 1 → open)

    constructor(subject: any) {
        this.subject = subject;
    }

    update(delta: number) {
        const target = this.pageOut ? 1 : 0;
        this.s += (target - this.s) * 0.2;
    }
}
