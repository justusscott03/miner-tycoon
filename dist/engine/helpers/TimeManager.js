export class Time {
    static update() {
        this._current = performance.now();
        this.deltaTime = (this._current - this._last) / 1000; // seconds
        this.time += this.deltaTime;
        this._last = this._current;
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
