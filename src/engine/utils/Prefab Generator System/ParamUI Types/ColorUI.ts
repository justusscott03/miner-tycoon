import { ParamUI } from "../ParamUI.js";

export class ColorUI extends ParamUI<string> {

    constructor(defaultColor: string) {
        super(defaultColor); // e.g. "#ffd659"
    }

    render(onChange: (value: string) => void): HTMLElement {
        const container = document.createElement("div");

        const colorInput = document.createElement("input");
        colorInput.type = "color";
        colorInput.value = this.value;

        const textInput = document.createElement("input");
        textInput.type = "text";
        textInput.value = this.value;
        textInput.style.marginLeft = "5px";
        textInput.style.width = "80px";

        const update = (val: string) => {
            if (!/^#([0-9A-F]{3}){1,2}$/i.test(val)) return;

            this.value = val;
            colorInput.value = val;
            textInput.value = val;
            onChange(this.value);
        };

        colorInput.oninput = () => update(colorInput.value);
        textInput.oninput = () => update(textInput.value);

        container.appendChild(colorInput);
        container.appendChild(textInput);

        return container;
    }

    toCode(): string {
        const { r, g, b } = this.hexToRgb(this.value);
        return `color(${r}, ${g}, ${b})`;
    }

    clone(): ColorUI {
        return new ColorUI(this.value);
    }

    getImports(): string[] {
        return ["color"]
    }

    // ----------------------------
    // Helpers
    // ----------------------------

    private hexToRgb(hex: string): { r: number; g: number; b: number } {
        const cleaned = hex.replace("#", "");

        if (cleaned.length === 3) {
            return {
                r: parseInt(cleaned[0] + cleaned[0], 16),
                g: parseInt(cleaned[1] + cleaned[1], 16),
                b: parseInt(cleaned[2] + cleaned[2], 16)
            };
        }

        return {
            r: parseInt(cleaned.substring(0, 2), 16),
            g: parseInt(cleaned.substring(2, 4), 16),
            b: parseInt(cleaned.substring(4, 6), 16)
        };
    }
}