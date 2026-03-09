export class Time {
    private static _last = performance.now();
    private static _current = performance.now();

    static deltaTime = 0;
    static time = 0;

    // --- FPS tracking ---
    private static _frames = 0;
    private static _lastFpsUpdate = performance.now();
    static fps = 0;

    static fixedDeltaTime = 1 / 50; // 50 Hz like Unity
    static _fixedAccumulator = 0;

    static update() {
        this._current = performance.now();

        // Delta time
        this.deltaTime = (this._current - this._last) / 1000;
        this.time += this.deltaTime;
        this._last = this._current;

        // FPS counter
        this._frames++;
        if (this._current - this._lastFpsUpdate >= 1000) {
            this.fps = this._frames;
            this._frames = 0;
            this._lastFpsUpdate = this._current;
        }
    }

    static getFormattedTime(): string {
        const now = new Date();
        return now.toLocaleTimeString();
    }

    static getFormattedDate(): string {
        const now = new Date();
        return now.toLocaleDateString("en-US", {
            month: "2-digit",
            day: "2-digit",
            year: "numeric"
        }).replace(/\//g, " • ");
    }
}
