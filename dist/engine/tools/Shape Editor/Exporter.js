export class Exporter {
    constructor(output, button, shapes) {
        this.output = output;
        this.button = button;
        this.shapes = shapes;
    }
    init() {
        this.button.addEventListener("click", () => {
            const code = this.exportCode();
            this.output.textContent = code;
        });
    }
    exportCode() {
        return this.shapes.map(s => s.toCode()).join("\n");
    }
}
