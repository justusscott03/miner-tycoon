import { Layer } from "./Layers/Layer.js";
export class TransformGizmo {
    constructor(canvas) {
        this.canvas = canvas;
        this.dragging = false;
        this.dragMode = null;
        this.startMouse = { x: 0, y: 0 };
        this.startBounds = null;
        this.startParams = {};
    }
    // ------------------------------------------------------------
    // DRAW
    // ------------------------------------------------------------
    draw(ctx, layer) {
        const b = layer.getBounds();
        const x = b.left;
        const y = b.top;
        const width = b.right - b.left;
        const height = b.bottom - b.top;
        // Bounding box
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, width, height);
        // Handles
        const handleSize = 10;
        const handles = [
            { mode: "scale-left", x: x - handleSize / 2, y: y + height / 2 - handleSize / 2 },
            { mode: "scale-right", x: x + width - handleSize / 2, y: y + height / 2 - handleSize / 2 },
            { mode: "scale-top", x: x + width / 2 - handleSize / 2, y: y - handleSize / 2 },
            { mode: "scale-bottom", x: x + width / 2 - handleSize / 2, y: y + height - handleSize / 2 }
        ];
        ctx.fillStyle = "#4aa3ff";
        handles.forEach(h => ctx.fillRect(h.x, h.y, handleSize, handleSize));
    }
    // ------------------------------------------------------------
    // MOUSE DOWN
    // ------------------------------------------------------------
    onMouseDown(mouse, layer) {
        const b = layer.getBounds();
        const x = b.left;
        const y = b.top;
        const width = b.right - b.left;
        const height = b.bottom - b.top;
        const handleSize = 10;
        const handles = [
            { mode: "scale-left", x: x - handleSize / 2, y: y + height / 2 - handleSize / 2 },
            { mode: "scale-right", x: x + width - handleSize / 2, y: y + height / 2 - handleSize / 2 },
            { mode: "scale-top", x: x + width / 2 - handleSize / 2, y: y - handleSize / 2 },
            { mode: "scale-bottom", x: x + width / 2 - handleSize / 2, y: y + height - handleSize / 2 }
        ];
        // Check handle hit
        for (const h of handles) {
            if (mouse.x >= h.x &&
                mouse.x <= h.x + handleSize &&
                mouse.y >= h.y &&
                mouse.y <= h.y + handleSize) {
                this.dragging = true;
                this.dragMode = h.mode;
                this.startMouse = Object.assign({}, mouse);
                this.startBounds = Object.assign({}, b);
                this.captureStartParams(layer);
                return true;
            }
        }
        // Check move mode
        if (mouse.x >= x &&
            mouse.x <= x + width &&
            mouse.y >= y &&
            mouse.y <= y + height) {
            this.dragging = true;
            this.dragMode = "move";
            this.startMouse = Object.assign({}, mouse);
            this.startBounds = Object.assign({}, b);
            this.captureStartParams(layer);
            return true;
        }
        return false;
    }
    // ------------------------------------------------------------
    // CAPTURE START PARAMS
    // ------------------------------------------------------------
    captureStartParams(layer) {
        var _a, _b, _c, _d;
        if (layer instanceof Layer) {
            const p = layer.shape.params;
            this.startParams = {
                x: (_a = p.x) === null || _a === void 0 ? void 0 : _a.value,
                y: (_b = p.y) === null || _b === void 0 ? void 0 : _b.value,
                w: (_c = p.w) === null || _c === void 0 ? void 0 : _c.value,
                h: (_d = p.h) === null || _d === void 0 ? void 0 : _d.value
            };
        }
    }
    // ------------------------------------------------------------
    // MOUSE MOVE
    // ------------------------------------------------------------
    onMouseMove(mouse, layer) {
        if (!this.dragging || !this.dragMode)
            return;
        const dx = mouse.x - this.startMouse.x;
        const dy = mouse.y - this.startMouse.y;
        if (!(layer instanceof Layer))
            return; // groups not directly scalable yet
        const p = layer.shape.params;
        if (this.dragMode === "move") {
            if (p.x)
                p.x.value = this.startParams.x + dx;
            if (p.y)
                p.y.value = this.startParams.y + dy;
        }
        if (this.dragMode === "scale-left") {
            if (p.x)
                p.x.value = this.startParams.x + dx;
            if (p.w)
                p.w.value = this.startParams.w - dx;
        }
        if (this.dragMode === "scale-right") {
            if (p.w)
                p.w.value = this.startParams.w + dx;
        }
        if (this.dragMode === "scale-top") {
            if (p.y)
                p.y.value = this.startParams.y + dy;
            if (p.h)
                p.h.value = this.startParams.h - dy;
        }
        if (this.dragMode === "scale-bottom") {
            if (p.h)
                p.h.value = this.startParams.h + dy;
        }
    }
    // ------------------------------------------------------------
    // MOUSE UP
    // ------------------------------------------------------------
    onMouseUp() {
        this.dragging = false;
        this.dragMode = null;
    }
}
