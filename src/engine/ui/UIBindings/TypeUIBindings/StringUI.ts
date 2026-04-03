import { ParamUI } from "../ParamUI.js";

export class StringUI extends ParamUI<string> {
    render(onChange: (value: string) => void): HTMLElement {
        const input = document.createElement("input");
        input.type = "text";
        input.value = this.value.toString();

        input.classList.add("paramInput");

        input.oninput = () => {
            this.value = String(input.value);
            onChange(this.value);
        };

        return input;
    }

    toCode(): string {
        return `"${this.value}"`;
    }

    clone() {
        return new StringUI(this.value);
    }
}