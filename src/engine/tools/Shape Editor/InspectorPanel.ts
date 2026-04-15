import { Layer } from "./Layers/Layer.js";
import { GroupLayer } from "./Layers/GroupLayer.js";
import { BaseLayer } from "./Layers/BaseLayer.js";

export class InspectorPanel {
    constructor(private container: HTMLElement) {}

    render(layers: BaseLayer[]) {
        this.container.innerHTML = "<h2>Inspector</h2>";

        if (layers.length === 0) {
            return;
        }

        // MULTI-SELECT
        if (layers.length > 1) {
            const info = document.createElement("div");
            info.textContent = `${layers.length} layers selected`;
            this.container.appendChild(info);
            return;
        }

        // SINGLE LAYER
        const layer = layers[0];

        // Layer name
        const nameLabel = document.createElement("label");
        nameLabel.textContent = "Name:";
        this.container.appendChild(nameLabel);

        const nameInput = document.createElement("input");
        nameInput.value = layer.name;
        nameInput.oninput = () => (layer.name = nameInput.value);
        this.container.appendChild(nameInput);
        this.container.appendChild(document.createElement("br"));
        this.container.appendChild(document.createElement("br"));

        // If it's a group, show group inspector
        if (layer.isGroup()) {
            this.renderGroupInspector(layer as GroupLayer);
            return;
        }

        // Otherwise: render shape params
        const shape = (layer as Layer).shape;

        if (!shape.params || Object.keys(shape.params).length === 0) {
            const info = document.createElement("div");
            info.textContent = "This shape has no editable parameters.";
            this.container.appendChild(info);
            return;
        }

        Object.entries(shape.params).forEach(([name, ui]: [string, any]) => {
            const label = document.createElement("label");
            label.textContent = name;

            const element = ui.render((val: any) => (ui.value = val));

            this.container.appendChild(label);
            this.container.appendChild(element);
            this.container.appendChild(document.createElement("br"));
        });
    }

    private renderGroupInspector(group: GroupLayer) {
        const info = document.createElement("div");
        info.textContent = `Group contains ${group.children.length} layers`;
        this.container.appendChild(info);
    }
}
