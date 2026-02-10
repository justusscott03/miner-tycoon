export class MoneyState {
    constructor() {
        this.total = 0;
        this.super = 0;
    }
    static get Instance() {
        if (!this._instance) {
            this._instance = new MoneyState();
        }
        return this._instance;
    }
    add(amount) {
        this.total += amount;
    }
    spend(amount) {
        if (this.total >= amount) {
            this.total -= amount;
            return true;
        }
        return false;
    }
    reset() {
        this.total = 0;
        this.super = 0;
    }
    toJSON() {
        return {
            total: this.total,
            super: this.super
        };
    }
    static fromJSON(data) {
        const m = MoneyState.Instance;
        m.total = data.total;
        m.super = data.super;
        return m;
    }
}
MoneyState._instance = null;
