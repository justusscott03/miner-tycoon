export class InspectorPanel {
    constructor(container) {
        this.container = container;
    }
    render(layer) {
        this.container.innerHTML = "<h2>Inspector</h2>";
        if (!layer)
            return;
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
            this.renderGroupInspector(layer);
            return;
        }
        // Otherwise: render shape params
        const shape = layer.shape;
        if (!shape.params || Object.keys(shape.params).length === 0) {
            const info = document.createElement("div");
            info.textContent = "This shape has no editable parameters.";
            this.container.appendChild(info);
            return;
        }
        Object.entries(shape.params).forEach(([name, ui]) => {
            const label = document.createElement("label");
            label.textContent = name;
            const element = ui.render((val) => (ui.value = val));
            this.container.appendChild(label);
            this.container.appendChild(element);
            this.container.appendChild(document.createElement("br"));
        });
    }
    renderGroupInspector(group) {
        const info = document.createElement("div");
        info.textContent = `Group contains ${group.children.length} layers`;
        this.container.appendChild(info);
    }
}
