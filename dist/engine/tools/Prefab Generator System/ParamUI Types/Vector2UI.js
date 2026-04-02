import { ParamUI } from "../ParamUI.js";
export class Vector2UI extends ParamUI {
    render(onChange) {
        const container = document.createElement("div");
        const xInput = document.createElement("input");
        const yInput = document.createElement("input");
        xInput.type = "number";
        yInput.type = "number";
        xInput.value = this.value.x.toString();
        yInput.value = this.value.y.toString();
        const update = () => {
            this.value = {
                x: Number(xInput.value),
                y: Number(yInput.value)
            };
            onChange(this.value);
        };
        xInput.oninput = update;
        yInput.oninput = update;
        xInput.classList.add("paramInput");
        yInput.classList.add("paramInput");
        container.appendChild(xInput);
        container.appendChild(yInput);
        return container;
    }
    toCode() {
        return `new Vector2(${this.value.x}, ${this.value.y})`;
    }
    clone() {
        return new Vector2UI({ x: this.value.x, y: this.value.y });
    }
    getImports() {
        return ["Vector2"];
    }
}
