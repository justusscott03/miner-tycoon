import { BaseLayer } from "./Layers/BaseLayer.js";
import { Layer } from "./Layers/Layer.js";
import { GroupLayer } from "./Layers/GroupLayer.js";

export class HierarchyPanel {
    private _layers: BaseLayer[] = [];
    private _selected: BaseLayer | null = null;
    private _onSelect!: (layer: BaseLayer) => void;
    private _onMove!: (draggedId: string, targetId: string | null) => void;
    private _onContext!: (x: number, y: number, layer: BaseLayer) => void;

    constructor(private container: HTMLElement) {}

    render(
        layers: BaseLayer[],
        selected: BaseLayer | null,
        onSelect: (layer: BaseLayer) => void,
        onMove: (draggedId: string, targetId: string | null) => void,
        onContext: (x: number, y: number, layer: BaseLayer) => void
    ) {
        this._layers = layers;
        this._selected = selected;
        this._onSelect = onSelect;
        this._onMove = onMove;
        this._onContext = onContext;

        this.container.innerHTML = "<h2>Layers</h2>";

        layers.forEach(layer => {
            this.renderNode(layer, 0);
        });
    }

    private renderNode(node: BaseLayer, depth: number) {
        const item = document.createElement("div");
        item.className = "layerItem";
        item.style.marginLeft = `${depth * 20}px`;

        // Collapse arrow for groups
        if (node.isGroup()) {
            const group = node as GroupLayer;

            if (group.collapsed === undefined) group.collapsed = false;

            const arrow = document.createElement("span");
            arrow.textContent = group.collapsed ? "▶" : "▼";
            arrow.style.cursor = "pointer";
            arrow.style.marginRight = "4px";

            arrow.onclick = e => {
                e.stopPropagation();
                group.collapsed = !group.collapsed;
                this.renderRoot();
            };

            item.appendChild(arrow);
        } else {
            const spacer = document.createElement("span");
            spacer.textContent = "• ";
            spacer.style.opacity = "0";
            spacer.style.marginRight = "4px";
            item.appendChild(spacer);
        }

        // Label
        const label = document.createElement("span");
        label.textContent = node.name;
        item.appendChild(label);

        // Highlight selected
        if (node === this._selected) item.classList.add("selected");

        // Click to select
        item.onclick = () => this._onSelect(node);

        // Right-click
        item.oncontextmenu = e => {
            e.preventDefault();
            this._onContext(e.clientX, e.clientY, node);
        };

        // Drag-and-drop
        item.draggable = true;
        item.ondragstart = e => e.dataTransfer!.setData("layerId", node.id);
        item.ondragover = e => e.preventDefault();
        item.ondrop = e => {
            e.preventDefault();
            const draggedId = e.dataTransfer!.getData("layerId");
            this._onMove(draggedId, node.id);
        };

        this.container.appendChild(item);

        // Render children if expanded
        if (node.isGroup() && !(node as GroupLayer).collapsed) {
            (node as GroupLayer).children.forEach(child =>
                this.renderNode(child, depth + 1)
            );
        }
    }

    renderRoot() {
        this.render(
            this._layers,
            this._selected,
            this._onSelect,
            this._onMove,
            this._onContext
        );
    }
}
