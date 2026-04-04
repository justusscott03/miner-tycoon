import { ShapeUIBindings } from "../../ui/UIBindings/ShapeUIBindings.js";

export class Exporter {
    constructor(
        private output: HTMLPreElement,
        private button: HTMLButtonElement,
        private shapes: ShapeUIBindings<any>[]
    ) {}

    init() {
        this.button.addEventListener("click", () => {
            const code = this.exportCode();
            this.output.textContent = code;
        });
    }

    exportCode(): string {
        return this.shapes.map(s => s.toCode()).join("\n");
    }
}
