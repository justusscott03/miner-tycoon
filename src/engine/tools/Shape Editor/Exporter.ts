import { BaseLayer } from "./Layers/BaseLayer";
import { Layer } from "./Layers/Layer";

export class Exporter {
    constructor(
        private output: HTMLPreElement,
        private button: HTMLButtonElement,
        private layers: BaseLayer[]
    ) {}

    init() {
        this.button.addEventListener("click", () => {
            const code = this.exportCode();
            this.output.textContent = code;
        });
    }

    exportCode(): string {
        return this.layers
            .filter(l => l instanceof Layer)
            .map(l => (l as Layer).shape.toCode())
            .join("\n");
    }
}
