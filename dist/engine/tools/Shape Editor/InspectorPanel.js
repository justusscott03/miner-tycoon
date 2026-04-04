export class InspectorPanel {
    constructor(container) {
        this.container = container;
    }
    render(shape) {
        this.container.innerHTML = "<h2>Inspector</h2>";
        if (!shape)
            return;
        Object.entries(shape.params).forEach(([name, ui]) => {
            const label = document.createElement("label");
            label.textContent = name;
            const element = ui.render((val) => ui.value = val);
            this.container.appendChild(label);
            this.container.appendChild(element);
            this.container.appendChild(document.createElement("br"));
        });
    }
}
