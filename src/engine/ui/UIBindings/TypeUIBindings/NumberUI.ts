import { ParamUI } from "../ParamUI";

export class NumberUI extends ParamUI<number> {
    render(onChange: (value: number) => void): HTMLElement {
        const input = document.createElement("input");
        input.type = "number";
        input.value = this.value.toString();

        input.classList.add("paramInput");

        input.oninput = () => {
            this.value = Number(input.value);
            onChange(this.value);
        };

        return input;
    }

    toCode(): string {
        return `${this.value}`;
    }

    clone() {
        return new NumberUI(this.value);
    }
}