import { Layer } from "./Layers/Layer.js";
export class RenderLoop {
    constructor(ctx, layers, selection, gizmo) {
        this.ctx = ctx;
        this.layers = layers;
        this.selection = selection;
        this.gizmo = gizmo;
    }
    start(gridSizeSlider) {
        let gridSize = Number(gridSizeSlider.value);
        gridSizeSlider.addEventListener("input", () => {
            gridSize = Number(gridSizeSlider.value);
            if (isNaN(gridSize) || gridSize <= 0)
                gridSize = 50;
            const valueDisplay = document.getElementById("valueDisplay");
            if (valueDisplay)
                valueDisplay.textContent = gridSize.toString();
        });
        const loop = () => {
            const { ctx } = this;
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            // Draw grid
            ctx.strokeStyle = "#59b2f2";
            ctx.lineWidth = 1;
            for (let x = 0; x < ctx.canvas.width; x += gridSize) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, ctx.canvas.height);
                ctx.stroke();
            }
            for (let y = 0; y < ctx.canvas.height; y += gridSize) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(ctx.canvas.width, y);
                ctx.stroke();
            }
            // Draw layers recursively
            this.layers.forEach(layer => this.drawNode(layer));
            // Draw gizmo on selected layer
            if (this.selection.selected) {
                this.gizmo.draw(ctx, this.selection.selected);
            }
            requestAnimationFrame(loop);
        };
        loop();
    }
    drawNode(node) {
        if (!node.visible)
            return;
        if (node instanceof Layer) {
            // Leaf layer
            node.shape.render(this.ctx);
        }
        else if (node.isGroup()) {
            // Group layer
            const group = node;
            group.children.forEach(child => this.drawNode(child));
        }
    }
}
