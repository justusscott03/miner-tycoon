import { ParamUI } from "../ParamUI.js";
export class BooleanUI extends ParamUI {
    render(onChange) {
        const container = document.createElement("div");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = this.value;
        checkbox.classList.add("paramInput");
        checkbox.onchange = () => {
            this.value = checkbox.checked;
            onChange(this.value);
        };
        container.appendChild(checkbox);
        return container;
    }
    toCode() {
        return this.value ? "true" : "false";
    }
    clone() {
        return new BooleanUI(this.value);
    }
}
