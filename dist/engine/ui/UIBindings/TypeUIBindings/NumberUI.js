import { ParamUI } from "../ParamUI.js";
export class NumberUI extends ParamUI {
    render(onChange) {
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
    toCode() {
        return `${this.value}`;
    }
    clone() {
        return new NumberUI(this.value);
    }
}
