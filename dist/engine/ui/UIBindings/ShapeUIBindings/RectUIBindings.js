import { NumberUI } from "../TypeUIBindings/NumberUI.js";
import { ColorUI } from "../TypeUIBindings/ColorUI.js";
import { ShapeUIBindings } from "../ShapeUIBindings.js";
import { ColorHelpers } from "../../../helpers/ColorHelpers.js";
export class RectUIBindings extends ShapeUIBindings {
    constructor() {
        super();
        this.params = {
            x: new NumberUI(0),
            y: new NumberUI(0),
            w: new NumberUI(100),
            h: new NumberUI(100),
            radius: new NumberUI(0),
            color: new ColorUI("#ff0000"),
            stroke: new ColorUI("#000000"),
            strokeWeight: new NumberUI(1)
        };
    }
    toCode() {
        const { x, y, w, h, radius, color, stroke } = this.params;
        const c = ColorHelpers.hexToRGB(color.value);
        const s = ColorHelpers.hexToRGB(stroke.value);
        return `fill(${c.r}, ${c.g}, ${c.b}, ${color.alpha});
stroke(${s.r}, ${s.g}, ${s.b}, ${stroke.alpha});
rect(${x.value}, ${y.value}, ${w.value}, ${h.value}, ${radius.value});`;
    }
    render(ctx) {
        const { x, y, w, h, radius, color, stroke, strokeWeight } = this.params;
        const fillRGB = ColorHelpers.hexToRGB(color.value);
        ctx.fillStyle = `rgba(${fillRGB.r}, ${fillRGB.g}, ${fillRGB.b}, ${color.alpha})`;
        const strokeRGB = ColorHelpers.hexToRGB(stroke.value);
        ctx.strokeStyle = `rgba(${strokeRGB.r}, ${strokeRGB.g}, ${strokeRGB.b}, ${stroke.alpha})`;
        ctx.lineWidth = strokeWeight.value;
        ctx.beginPath();
        ctx.roundRect(x.value, y.value, w.value, h.value, radius.value);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }
    hitTest(point) {
        const { x, y, w, h } = this.params;
        return (point.x >= x.value &&
            point.x <= x.value + w.value &&
            point.y >= y.value &&
            point.y <= y.value + h.value);
    }
    getBounds() {
        const { x, y, w, h } = this.params;
        return {
            left: x.value,
            top: y.value,
            right: x.value + w.value,
            bottom: y.value + h.value
        };
    }
    scaleFromBounds(oldB, newB) {
        this.params.x.value = newB.left;
        this.params.y.value = newB.top;
        this.params.w.value = newB.right - newB.left;
        this.params.h.value = newB.bottom - newB.top;
    }
}
