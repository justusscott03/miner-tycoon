export class Time {
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
    static getFormattedTime() {
        const now = new Date();
        return now.toLocaleTimeString();
    }
    static getFormattedDate() {
        const now = new Date();
        return now.toLocaleDateString("en-US", {
            month: "2-digit",
            day: "2-digit",
            year: "numeric"
        }).replace(/\//g, " • ");
    }
}
Time._last = performance.now();
Time._current = performance.now();
Time.deltaTime = 0;
Time.time = 0;
// --- FPS tracking ---
Time._frames = 0;
Time._lastFpsUpdate = performance.now();
Time.fps = 0;
Time.fixedDeltaTime = 1 / 50; // 50 Hz like Unity
Time._fixedAccumulator = 0;
