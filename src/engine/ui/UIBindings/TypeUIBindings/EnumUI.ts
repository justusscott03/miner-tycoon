import { ParamUI } from "../ParamUI";

export class EnumUI<T extends Record<string, string | number>> extends ParamUI<T[keyof T]> {
    private enumObj: T;

    constructor(enumObj: T, defaultValue: T[keyof T]) {
        super(defaultValue);
        this.enumObj = enumObj;
    }

    render(onChange: (value: T[keyof T]) => void): HTMLElement {
        const container = document.createElement("div");

        const select = document.createElement("select");
        select.classList.add("paramInput");

        // Extract enum keys (filter out reverse numeric mappings)
        const keys = Object.keys(this.enumObj).filter(
            k => isNaN(Number(k)) // ignore numeric reverse mappings
        );

        keys.forEach(key => {
            const option = document.createElement("option");
            option.value = key;
            option.textContent = key;

            if (this.enumObj[key] === this.value) {
                option.selected = true;
            }

            select.appendChild(option);
        });

        select.onchange = () => {
            const selectedKey = select.value as keyof T;
            this.value = this.enumObj[selectedKey];
            onChange(this.value);
        };

        container.appendChild(select);
        return container;
    }

    toCode(): string {
        // Produces: MyEnum.SomeValue
        const key = Object.keys(this.enumObj).find(
            k => this.enumObj[k] === this.value
        );

        return key ? `${this.enumObj.constructor.name}.${key}` : "undefined";
    }

    clone() {
        return new EnumUI(this.enumObj, this.value);
    }
}
