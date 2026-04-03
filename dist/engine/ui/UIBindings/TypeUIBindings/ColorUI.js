import { ColorHelpers } from "../../../helpers/ColorHelpers.js";
import { ParamUI } from "../ParamUI.js";
let colorUICounter = 0;
export class ColorUI extends ParamUI {
    constructor(defaultColor) {
        super(defaultColor);
        this.alpha = 1;
        this.id = colorUICounter++;
        //console.log("Created ColorUI with id:", this.id);
    }
    render(onChange) {
        const container = document.createElement("div");
        const colorInput = document.createElement("input");
        colorInput.type = "color";
        colorInput.value = this.value;
        colorInput.classList.add("paramInput");
        const textInput = document.createElement("input");
        textInput.type = "text";
        textInput.value = this.value;
        textInput.classList.add("paramInput");
        const alphaSlider = document.createElement("input");
        alphaSlider.type = "range";
        alphaSlider.min = "0";
        alphaSlider.max = "1";
        alphaSlider.step = "0.01";
        alphaSlider.value = this.alpha.toString();
        alphaSlider.classList.add("paramInput");
        const update = (val) => {
            if (!/^#([0-9A-F]{3}){1,2}$/i.test(val))
                return;
            this.value = val;
            colorInput.value = val;
            textInput.value = val;
            onChange(this.value);
        };
        colorInput.oninput = () => update(colorInput.value);
        textInput.oninput = () => update(textInput.value);
        alphaSlider.oninput = () => {
            this.alpha = Number(alphaSlider.value);
            onChange(this.value);
        };
        container.appendChild(colorInput);
        container.appendChild(textInput);
        container.appendChild(alphaSlider);
        return container;
    }
    toCode() {
        const { r, g, b } = ColorHelpers.hexToRGB(this.value);
        if (this.alpha < 1) {
            return `color(${r}, ${g}, ${b}, ${this.alpha})`;
        }
        return `color(${r}, ${g}, ${b})`;
    }
    clone() {
        const cloned = new ColorUI(this.value);
        cloned.alpha = this.alpha;
        return cloned;
    }
    getImports() {
        return ["color"];
    }
}
