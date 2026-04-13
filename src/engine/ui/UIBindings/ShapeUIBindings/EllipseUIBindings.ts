import { NumberUI } from "../TypeUIBindings/NumberUI.js";
import { ColorUI } from "../TypeUIBindings/ColorUI.js";
import { BaseParams, ShapeUIBindings } from "../ShapeUIBindings.js";
import { ColorHelpers } from "../../../helpers/ColorHelpers.js";
import { Bounds } from "../../../tools/Shape Editor/Layers/BaseLayer.js";

interface EllipseParams extends BaseParams {
    w: NumberUI;
    h: NumberUI;
}


export class EllipseUIBindings extends ShapeUIBindings<EllipseParams> {
    constructor() {
        super();
        this.params = {
            x: new NumberUI(0),
            y: new NumberUI(0),

            w: new NumberUI(100),
            h: new NumberUI(100),

            color: new ColorUI("#ff0000"),
            stroke: new ColorUI("#000000"),
            strokeWeight: new NumberUI(1)
        };
    }

    toCode(): string {
        const { x, y, w, h, color, stroke } = this.params;

        const c = ColorHelpers.hexToRGB(color.value);
        const s = ColorHelpers.hexToRGB(stroke.value);

        return `fill(${c.r}, ${c.g}, ${c.b}, ${Math.round(color.alpha * 255)});
stroke(${s.r}, ${s.g}, ${s.b}, ${stroke.alpha});
ellipse(${x.value}, ${y.value}, ${w.value}, ${h.value});`;
    }

    render(ctx: CanvasRenderingContext2D): void {
        const { x, y, w, h, color, stroke, strokeWeight } = this.params;

        const fillRGB = ColorHelpers.hexToRGB(color.value);
        ctx.fillStyle = `rgba(${fillRGB.r}, ${fillRGB.g}, ${fillRGB.b}, ${color.alpha})`;

        const strokeRGB = ColorHelpers.hexToRGB(stroke.value);
        ctx.strokeStyle = `rgba(${strokeRGB.r}, ${strokeRGB.g}, ${strokeRGB.b}, ${stroke.alpha})`;
        ctx.lineWidth = strokeWeight.value;

        ctx.beginPath();
        ctx.ellipse(x.value, y.value, w.value / 2, h.value / 2, 0, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }

    hitTest(point: { x: number; y: number }): boolean {
        const { x, y, w, h } = this.params;

        const rx = w.value / 2;
        const ry = h.value / 2;

        const dx = point.x - x.value;
        const dy = point.y - y.value;

        return (dx*dx) / (rx*rx) + (dy*dy) / (ry*ry) <= 1;
    }

    getBounds(): Bounds {
        const { x, y, w, h } = this.params;

        return {
            left: x.value - w.value / 2,
            top: y.value - h.value / 2,
            right: x.value + w.value / 2,
            bottom: y.value + h.value / 2
        };
    }

    scaleFromBounds(oldB: Bounds, newB: Bounds): void {
        const newWidth = newB.right - newB.left;
        const newHeight = newB.bottom - newB.top;

        const cx = newB.left + newWidth / 2;
        const cy = newB.top + newHeight / 2;

        this.params.x.value = cx;
        this.params.y.value = cy;
        this.params.w.value = newWidth;
        this.params.h.value = newHeight;
    }
}
