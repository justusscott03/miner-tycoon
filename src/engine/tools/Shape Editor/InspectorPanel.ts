import { ShapeUIBindings } from "../../ui/UIBindings/ShapeUIBindings.js";

export class InspectorPanel {
    constructor(private container: HTMLElement) {}

    render(shape: ShapeUIBindings<any> | null) {
        this.container.innerHTML = "<h2>Inspector</h2>";
        if (!shape) return;

        Object.entries(shape.params).forEach(([name, ui]: [string, any]) => {
            const label = document.createElement("label");
            label.textContent = name;

            const element = ui.render((val: any) => ui.value = val);

            this.container.appendChild(label);
            this.container.appendChild(element);
            this.container.appendChild(document.createElement("br"));
        });
    }
}
