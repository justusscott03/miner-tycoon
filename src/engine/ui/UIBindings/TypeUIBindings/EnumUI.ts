import { ParamUI } from "../ParamUI";

export class EnumUI<T extends string | number> extends ParamUI<T> {
    private options: T[];

    constructor(options: T[], defaultValue: T) {
        super(defaultValue);
        this.options = options;
    }

    render(onChange: (value: T) => void): HTMLElement {
        const container = document.createElement("div");
        const select = document.createElement("select");
        select.classList.add("paramInput");

        this.options.forEach(opt => {
            const option = document.createElement("option");
            option.value = String(opt);
            option.textContent = String(opt);

            if (opt === this.value) {
                option.selected = true;
            }

            select.appendChild(option);
        });

        select.onchange = () => {
            const selected = select.value as T;
            this.value = selected;
            onChange(selected);
        };

        container.appendChild(select);
        return container;
    }

    toCode(): string {
        return JSON.stringify(this.value);
    }

    clone() {
        return new EnumUI(this.options, this.value);
    }
}
