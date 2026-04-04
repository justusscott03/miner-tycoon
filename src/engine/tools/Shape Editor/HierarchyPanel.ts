import { ShapeUIBindings } from "../../ui/UIBindings/ShapeUIBindings.js";

export class HierarchyPanel {
    constructor(private container: HTMLElement) {}

    render(
        shapes: ShapeUIBindings<any>[],
        selected: ShapeUIBindings<any> | null,
        onSelect: (shape: ShapeUIBindings<any>) => void,
        onMove: (from: number, to: number) => void,
        onContext: (x: number, y: number, shape: ShapeUIBindings<any>, index: number) => void
    ) {
        this.container.innerHTML = "<h2>Layers</h2>";

        shapes.slice().reverse().forEach((shape, i) => {
            const index = shapes.length - 1 - i;

            const item = document.createElement("div");
            item.className = "layerItem";
            item.textContent = `${index}: ${shape.name}`;

            if (shape === selected) item.classList.add("selected");

            item.onclick = () => onSelect(shape);

            item.draggable = true;
            item.ondragstart = e => {
                e.dataTransfer!.setData("text/plain", index.toString());
            };
            item.ondragover = e => e.preventDefault();
            item.ondrop = e => {
                e.preventDefault();
                const from = Number(e.dataTransfer!.getData("text/plain"));
                onMove(from, index);
            };

            item.oncontextmenu = e => {
                e.preventDefault();
                onContext(e.clientX, e.clientY, shape, index);
            };

            this.container.appendChild(item);
        });
    }
}
