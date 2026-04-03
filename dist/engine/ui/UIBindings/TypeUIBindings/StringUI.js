import { ParamUI } from "../ParamUI.js";
export class StringUI extends ParamUI {
    render(onChange) {
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
    toCode() {
        return `"${this.value}"`;
    }
    clone() {
        return new StringUI(this.value);
    }
}
