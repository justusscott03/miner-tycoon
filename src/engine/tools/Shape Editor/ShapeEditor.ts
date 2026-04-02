import { RectUIBindings } from "./Shape UI Bindings/RectUIBindings.js";
import { ShapeUIBindings } from "./ShapeUIBindings.js";

enum ShapeTypes {
    Rectangle = "rectangle",
    //Ellipse = "ellipse"
}

const ShapeRegistry = {
    [ShapeTypes.Rectangle]: RectUIBindings,
    // [ShapeTypes.Ellipse]: EllipseUIBindings
};

export class ShapeEditor {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;

    toolbar: HTMLElement;
    inspector: HTMLElement;

    shapes: ShapeUIBindings<any>[] = [];
    selectedShape: ShapeUIBindings<any> | null = null;
    currentTool: ShapeTypes | null = null;

    constructor(canvasId: string, toolbarId: string, inspectorId: string) {
        this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        this.ctx = this.canvas.getContext("2d")!;

        this.toolbar = document.getElementById(toolbarId)!;
        this.inspector = document.getElementById(inspectorId)!;

        this.initToolbar();
        this.initCanvas();
        this.renderLoop();
    }

    // ----------------------------
    // TOOLBAR
    // ----------------------------
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

    // ----------------------------
    // CANVAS INPUT
    // ----------------------------
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

                return;
            }

            // Otherwise: select existing shape
            const clicked = this.shapes.find(shape => this.hitTest(shape, mouse));
            if (clicked) this.selectShape(clicked);
        });
    }

    // ----------------------------
    // SIMPLE HIT TEST (RECT ONLY FOR NOW)
    // ----------------------------
    hitTest(shape: ShapeUIBindings<any>, mouse: { x: number; y: number }): boolean {
        const p = shape.params;

        if (p.x && p.y && p.w && p.h) {
            return (
                mouse.x >= p.x.value &&
                mouse.x <= p.x.value + p.w.value &&
                mouse.y >= p.y.value &&
                mouse.y <= p.y.value + p.h.value
            );
        }

        return false;
    }

    // ----------------------------
    // SELECTION
    // ----------------------------
    selectShape(shape: ShapeUIBindings<any>) {
        this.selectedShape = shape;
        this.renderInspector();
    }

    // ----------------------------
    // INSPECTOR UI
    // ----------------------------
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

    // ----------------------------
    // RENDER LOOP
    // ----------------------------
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

    // ----------------------------
    // EXPORT
    // ----------------------------
    exportCode(): string {
        return this.shapes.map(s => s.toCode()).join("\n");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    new ShapeEditor("shapeEditorCanvas", "shapeTypeContainer", "shapeInspector");
});
