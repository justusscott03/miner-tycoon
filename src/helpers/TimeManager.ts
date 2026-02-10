export class TimeManager {
    last: number;
    current: number;
    delta: number;

    constructor() {
        this.last = Date.now();
        this.current = 0;
        this.delta = 0;
    }

    update() {
        this.current = Date.now();
        this.delta = (this.current - this.last) / 1000; // seconds
        this.last = this.current;
    }

    getFormattedTime(): string {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, "0");
        const minutes = String(now.getMinutes()).padStart(2, "0");
        const seconds = String(now.getSeconds()).padStart(2, "0");
        return `${hours}:${minutes}:${seconds}`;
    }

    getFormattedDate(): string {
        const now = new Date();
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const day = String(now.getDate()).padStart(2, "0");
        const year = now.getFullYear();
        return `${month} \u2022 ${day} \u2022 ${year}`;
    }
}
