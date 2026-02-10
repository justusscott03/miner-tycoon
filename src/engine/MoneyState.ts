export class MoneyState {
    private static _instance: MoneyState | null = null;

    total = 0;
    super = 0;

    private constructor() {}

    static get Instance(): MoneyState {
        if (!this._instance) {
            this._instance = new MoneyState();
        }
        return this._instance;
    }

    add(amount: number) {
        this.total += amount;
    }

    spend(amount: number): boolean {
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

    static fromJSON(data: any) {
        const m = MoneyState.Instance;
        m.total = data.total;
        m.super = data.super;
        return m;
    }
}

