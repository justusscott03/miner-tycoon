import { Layer } from "./Layers/Layer.js";
export class Exporter {
    constructor(output, button, layers) {
        this.output = output;
        this.button = button;
        this.layers = layers;
    }
    init() {
        this.button.addEventListener("click", () => {
            const code = this.exportCode();
            this.output.textContent = code;
        });
    }
    exportCode() {
        return this.layers
            .filter(l => l instanceof Layer)
            .map(l => l.shape.toCode())
            .join("\n");
    }
}
