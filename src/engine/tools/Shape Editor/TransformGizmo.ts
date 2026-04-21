import { BaseLayer, Bounds } from "./Layers/BaseLayer";

export class TransformGizmo {
    private dragging = false;
    private dragMode: "move" | "scale-left" | "scale-right" | "scale-top" | "scale-bottom" | null = null;
    private startMouse = { x: 0, y: 0 };
    private startBounds: Bounds | null = null;
    private frozenLocal: any = null;

    constructor() {}

    draw(ctx: CanvasRenderingContext2D, layer: BaseLayer) {
        const b = layer.getBounds();
        const x = b.left;
        const y = b.top;
        const width = b.right - b.left;
        const height = b.bottom - b.top;

        ctx.strokeStyle = "#4aa3ff";
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, width, height);

        const handleSize = 10;

        const handles = [
            { mode: "scale-left",   x: x - handleSize/2,           y: y + height/2 - handleSize/2 },
            { mode: "scale-right",  x: x + width - handleSize/2,   y: y + height/2 - handleSize/2 },
            { mode: "scale-top",    x: x + width/2 - handleSize/2, y: y - handleSize/2 },
            { mode: "scale-bottom", x: x + width/2 - handleSize/2, y: y + height - handleSize/2 }
        ];

        ctx.fillStyle = "#4aa3ff";
        handles.forEach(h => ctx.fillRect(h.x, h.y, handleSize, handleSize));
    }

    onMouseDown(mouse: { x: number; y: number }, layer: BaseLayer): boolean {
        const b = layer.getBounds();
        const x = b.left;
        const y = b.top;
        const width = b.right - b.left;
        const height = b.bottom - b.top;

        const handleSize = 10;

        const handles = [
            { mode: "scale-left",   x: x - handleSize/2,           y: y + height/2 - handleSize/2 },
            { mode: "scale-right",  x: x + width - handleSize/2,   y: y + height/2 - handleSize/2 },
            { mode: "scale-top",    x: x + width/2 - handleSize/2, y: y - handleSize/2 },
            { mode: "scale-bottom", x: x + width/2 - handleSize/2, y: y + height - handleSize/2 }
        ];

        for (const h of handles) {
            if (
                mouse.x >= h.x &&
                mouse.x <= h.x + handleSize &&
                mouse.y >= h.y &&
                mouse.y <= h.y + handleSize
            ) {
                this.dragging = true;
                this.dragMode = h.mode as any;
                this.startMouse = { ...mouse };
                this.startBounds = { ...b };
                this.frozenLocal = layer.freezeLocalGeometry();
                return true;
            }
        }

        if (
            mouse.x >= x &&
            mouse.x <= x + width &&
            mouse.y >= y &&
            mouse.y <= y + height
        ) {
            this.dragging = true;
            this.dragMode = "move";
            this.startMouse = { ...mouse };
            this.startBounds = { ...b };
            this.frozenLocal = layer.freezeLocalGeometry();
            return true;
        }

        return false;
    }

    onMouseMove(mouse: { x: number; y: number }, layer: BaseLayer) {
        if (!this.dragging || !this.dragMode || !this.startBounds) return;

        const dx = mouse.x - this.startMouse.x;
        const dy = mouse.y - this.startMouse.y;

        const oldB = this.startBounds;
        const newB: Bounds = { ...oldB };

        if (this.dragMode === "move") {
            const w = oldB.right - oldB.left;
            const h = oldB.bottom - oldB.top;

            newB.left = oldB.left + dx;
            newB.right = newB.left + w;
            newB.top = oldB.top + dy;
            newB.bottom = newB.top + h;

            layer.scaleFromBounds(oldB, newB, this.frozenLocal);
            return;
        }

        if (this.dragMode === "scale-left")   newB.left   = oldB.left   + dx;
        if (this.dragMode === "scale-right")  newB.right  = oldB.right  + dx;
        if (this.dragMode === "scale-top")    newB.top    = oldB.top    + dy;
        if (this.dragMode === "scale-bottom") newB.bottom = oldB.bottom + dy;

        layer.scaleFromBounds(oldB, newB, this.frozenLocal);
    }

    onMouseUp() {
        this.dragging = false;
        this.dragMode = null;
        this.startBounds = null;
        this.frozenLocal = null;
    }
}
