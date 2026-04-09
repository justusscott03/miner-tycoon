export class TransformGizmo {
    constructor(canvas) {
        this.canvas = canvas;
        this.dragging = false;
        this.dragMode = null;
        this.startMouse = { x: 0, y: 0 };
        this.startParams = {};
    }
    draw(ctx, shape) {
        const { x, y, width, height } = this.getBounds(shape);
        // Bounding box
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, width, height);
        // Handles (sides only)
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
    getBounds(shape) {
        var _a, _b, _c, _d;
        const x = shape.params.x.value;
        const y = shape.params.y.value;
        const width = (_b = (_a = shape.params.w) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : 50;
        const height = (_d = (_c = shape.params.h) === null || _c === void 0 ? void 0 : _c.value) !== null && _d !== void 0 ? _d : 50;
        return { x, y, width, height };
    }
    onMouseDown(mouse, shape) {
        var _a, _b;
        const { x, y, width, height } = this.getBounds(shape);
        const handleSize = 10;
        // Check handles
        const handles = [
            { mode: "scale-left", x: x - handleSize / 2, y: y + height / 2 - handleSize / 2 },
            { mode: "scale-right", x: x + width - handleSize / 2, y: y + height / 2 - handleSize / 2 },
            { mode: "scale-top", x: x + width / 2 - handleSize / 2, y: y - handleSize / 2 },
            { mode: "scale-bottom", x: x + width / 2 - handleSize / 2, y: y + height - handleSize / 2 }
        ];
        for (const h of handles) {
            if (mouse.x >= h.x &&
                mouse.x <= h.x + handleSize &&
                mouse.y >= h.y &&
                mouse.y <= h.y + handleSize) {
                this.dragging = true;
                this.dragMode = h.mode;
                this.startMouse = Object.assign({}, mouse);
                this.startParams = {
                    x: shape.params.x.value,
                    y: shape.params.y.value,
                    width: (_a = shape.params.w) === null || _a === void 0 ? void 0 : _a.value,
                    height: (_b = shape.params.h) === null || _b === void 0 ? void 0 : _b.value
                };
                return true;
            }
        }
        // Otherwise: move mode
        if (mouse.x >= x &&
            mouse.x <= x + width &&
            mouse.y >= y &&
            mouse.y <= y + height) {
            this.dragging = true;
            this.dragMode = "move";
            this.startMouse = Object.assign({}, mouse);
            this.startParams = {
                x: shape.params.x.value,
                y: shape.params.y.value
            };
            return true;
        }
        return false;
    }
    onMouseMove(mouse, shape) {
        if (!this.dragging || !this.dragMode)
            return;
        const dx = mouse.x - this.startMouse.x;
        const dy = mouse.y - this.startMouse.y;
        if (this.dragMode === "move") {
            shape.params.x.value = this.startParams.x + dx;
            shape.params.y.value = this.startParams.y + dy;
        }
        if (this.dragMode === "scale-left") {
            shape.params.x.value = this.startParams.x + dx;
            shape.params.w.value = this.startParams.w - dx;
        }
        if (this.dragMode === "scale-right") {
            shape.params.w.value = this.startParams.w + dx;
        }
        if (this.dragMode === "scale-top") {
            shape.params.y.value = this.startParams.y + dy;
            shape.params.h.value = this.startParams.h - dy;
        }
        if (this.dragMode === "scale-bottom") {
            shape.params.h.value = this.startParams.h + dy;
        }
    }
    onMouseUp() {
        this.dragging = false;
        this.dragMode = null;
    }
}
