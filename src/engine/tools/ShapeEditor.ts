import { EllipseUIBindings } from "../ui/UIBindings/ShapeUIBindings/EllipseUIBindings.js";
import { RectUIBindings } from "../ui/UIBindings/ShapeUIBindings/RectUIBindings.js";
import { ShapeUIBindings } from "../ui/UIBindings/ShapeUIBindings.js";
import { TriangleUIBindings } from "../ui/UIBindings/ShapeUIBindings/TriangleUIBindings.js";
import { PathUIBindings } from "../ui/UIBindings/ShapeUIBindings/PathUIBindings.js";

enum ShapeTypes {
    Rectangle = "rectangle",
    Ellipse = "ellipse",
    Triangle = "triangle",
    Path = "path"
}

const ShapeRegistry = {
    [ShapeTypes.Rectangle]: RectUIBindings,
    [ShapeTypes.Ellipse]: EllipseUIBindings,
    [ShapeTypes.Triangle]: TriangleUIBindings,
    [ShapeTypes.Path]: PathUIBindings
};

export class ShapeEditor {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;

    toolbar: HTMLElement;
    inspector: HTMLElement;
    hierarchy: HTMLElement;
    output: HTMLPreElement;
    exportBtn: HTMLButtonElement;

    shapes: ShapeUIBindings<any>[] = [];
    selectedShape: ShapeUIBindings<any> | null = null;
    currentTool: ShapeTypes | null = null;

    constructor(canvasId: string, toolbarId: string, inspectorId: string, hierarchyId: string, outputId: string, exportBtnId: string) {
        this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        this.ctx = this.canvas.getContext("2d")!;

        this.toolbar = document.getElementById(toolbarId)!;
        this.inspector = document.getElementById(inspectorId)!;
        this.hierarchy = document.getElementById(hierarchyId)!;
        this.output = document.getElementById(outputId)! as HTMLPreElement;
        this.exportBtn = document.getElementById(exportBtnId)! as HTMLButtonElement;

        this.initToolbar();
        this.initCanvas();
        this.initExportButton();
        this.renderLoop();
    }

    initToolbar() {
        Object.values(ShapeTypes).forEach(type => {
            const button = document.createElement("button");
            button.textContent = type;
            button.className = "menuSideBarItem";

            button.onclick = () => {
                this.currentTool = type;

                this.toolbar.querySelectorAll("button")
                    .forEach(b => b.classList.remove("active"));

                button.classList.add("active");
            };

            this.toolbar.appendChild(button);
        });
    }

    initCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        this.canvas.addEventListener("click", (e) => {
            const rect = this.canvas.getBoundingClientRect();

            const mouse = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            };

            // If tool selected → create new shape
            if (this.currentTool) {
                const BindingClass = ShapeRegistry[this.currentTool];
                if (!BindingClass) return;

                // Create a fresh shape with cloned params
                const shape = new BindingClass().clone();

                // Set initial position if exists
                if (shape.params.x) shape.params.x.value = mouse.x;
                if (shape.params.y) shape.params.y.value = mouse.y;

                this.shapes.push(shape);
                this.selectShape(shape);

                this.currentTool = null;

                this.renderHierarchy();

                return;
            }

            // Otherwise: select existing shape
            const clicked = this.shapes.find(shape => this.hitTest(shape, mouse));
            if (clicked) this.selectShape(clicked);
        });
    }

    initExportButton() {
        this.exportBtn.addEventListener("click", () => {
            const code = this.exportCode();
            this.output.textContent = code;
        });
    }

    hitTest(shape: ShapeUIBindings<any>, mouse: { x: number; y: number }): boolean {
        return shape.hitTest(mouse);
    }

    selectShape(shape: ShapeUIBindings<any>) {
        this.selectedShape = shape;
        this.renderInspector();
        this.renderHierarchy();
    }

    renderHierarchy() {
        this.hierarchy.innerHTML = "<h2>Layers</h2>";

        [...this.shapes].forEach((shape, i) => {
            const index = this.shapes.length - 1 - i; // ⭐ reverse
            shape = this.shapes[index];

            const item = document.createElement("div");
            item.className = "layerItem";
            item.textContent = `${index}: ${shape.constructor.name}`;

            if (shape === this.selectedShape) {
                item.classList.add("selected");
            }

            item.onclick = () => {
                this.selectShape(shape);
            };

            item.draggable = true;

            item.ondragstart = (e) => {
                e.dataTransfer!.setData("text/plain", index.toString());
            };

            item.ondragover = (e) => e.preventDefault();

            item.ondrop = (e) => {
                e.preventDefault();
                const from = Number(e.dataTransfer!.getData("text/plain"));
                const to = index;
                this.moveLayer(from, to);
            };

            this.hierarchy.appendChild(item);
        });
    }

    moveLayer(from: number, to: number) {
        const item = this.shapes.splice(from, 1)[0];
        this.shapes.splice(to, 0, item);

        this.renderHierarchy();
    }

    renderInspector() {
        this.inspector.innerHTML = "<h2>Inspector</h2>";

        if (!this.selectedShape) return;

        const params = this.selectedShape.params;

        Object.keys(params).forEach(name => {
            const ui = params[name];

            const label = document.createElement("label");
            label.textContent = name;
            label.style.marginRight = "5px";

            const element = ui.render((val: any) => {
                ui.value = val;
            });

            this.inspector.appendChild(label);
            this.inspector.appendChild(element);
            this.inspector.appendChild(document.createElement("br"));
        });
    }

    renderLoop() {
        const slider = document.getElementById("myRange")! as HTMLInputElement;
        const output = document.getElementById("valueDisplay")! as HTMLSpanElement;

        let gridSize = 40;

        output.textContent = slider.value;

        slider.oninput = () => {
            output.textContent = slider.value;
            gridSize = parseInt(slider.value);
        };

        const loop = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            // Draw grid
            this.ctx.strokeStyle = "#59b2f2";
            this.ctx.lineWidth = 1;
            for (let x = 0; x < this.canvas.width; x += gridSize) {
                this.ctx.beginPath();
                this.ctx.moveTo(x, 0);
                this.ctx.lineTo(x, this.canvas.height);
                this.ctx.stroke();
            }
            for (let y = 0; y < this.canvas.height; y += gridSize) {
                this.ctx.beginPath();
                this.ctx.moveTo(0, y);
                this.ctx.lineTo(this.canvas.width, y);
                this.ctx.stroke();
            }

            // Render shapes
            this.shapes.forEach(shape => shape.render(this.ctx));

            requestAnimationFrame(loop);
        };

        loop();
    }

    exportCode(): string {
        return this.shapes.map(s => s.toCode()).join("\n");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    new ShapeEditor("shapeEditorCanvas", "shapeTypeContainer", "shapeInspector", "shapeHierarchyPanel", "shapeEditorExportOutput", "exportButton");
});
