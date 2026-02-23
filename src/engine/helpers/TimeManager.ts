export class Time {
    private static _last = performance.now();
    private static _current = performance.now();
    static deltaTime = 0;
    static time = 0;

    static update() {
        this._current = performance.now();
        this.deltaTime = (this._current - this._last) / 1000; // seconds
        this.time += this.deltaTime;
        this._last = this._current;
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
