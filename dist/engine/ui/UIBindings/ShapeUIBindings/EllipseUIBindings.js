import { NumberUI } from "../TypeUIBindings/NumberUI.js";
import { ColorUI } from "../TypeUIBindings/ColorUI.js";
import { ShapeUIBindings } from "../ShapeUIBindings.js";
import { ColorHelpers } from "../../../helpers/ColorHelpers.js";
export class EllipseUIBindings extends ShapeUIBindings {
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
    toCode() {
        const { x, y, w, h, color, stroke } = this.params;
        const c = ColorHelpers.hexToRGB(color.value);
        const s = ColorHelpers.hexToRGB(stroke.value);
        return `fill(${c.r}, ${c.g}, ${c.b}, ${color.alpha});
stroke(${s.r}, ${s.g}, ${s.b}, ${stroke.alpha});
ellipse(${x.value}, ${y.value}, ${w.value}, ${h.value});`;
    }
    render(ctx) {
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
}
