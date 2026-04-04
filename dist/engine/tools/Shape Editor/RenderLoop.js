export class RenderLoop {
    constructor(ctx, shapes) {
        this.ctx = ctx;
        this.shapes = shapes;
    }
    start(gridSizeSlider) {
        let gridSize = Number(gridSizeSlider.value);
        gridSizeSlider.addEventListener("input", () => {
            gridSize = Number(gridSizeSlider.value);
            if (isNaN(gridSize) || gridSize <= 0) {
                gridSize = 50;
            }
            const valueDisplay = document.getElementById("valueDisplay");
            if (valueDisplay) {
                valueDisplay.textContent = gridSize.toString();
            }
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
            // Draw shapes
            this.shapes.forEach(shape => shape.render(ctx));
            requestAnimationFrame(loop);
        };
        loop();
    }
}
