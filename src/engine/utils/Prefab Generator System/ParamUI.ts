export abstract class ParamUI<T> {
    value: T;

    constructor(defaultValue: T) {
        this.value = defaultValue;
    }

    abstract render(onChange: (value: T) => void): HTMLElement;
    abstract toCode(): string;
    abstract clone(): ParamUI<T>;

    getImports(): string[] {
        return [];
    }
}