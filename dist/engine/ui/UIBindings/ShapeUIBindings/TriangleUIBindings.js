import { NumberUI } from "../TypeUIBindings/NumberUI.js";
import { ColorUI } from "../TypeUIBindings/ColorUI.js";
import { ShapeUIBindings } from "../ShapeUIBindings.js";
import { ColorHelpers } from "../../../helpers/ColorHelpers.js";
import { Vector2UI } from "../TypeUIBindings/Vector2UI.js";
export class TriangleUIBindings extends ShapeUIBindings {
    constructor() {
        super();
        this.params = {
            x: new NumberUI(0),
            y: new NumberUI(0),
            point1: new Vector2UI({ x: 0, y: 0 }),
            point2: new Vector2UI({ x: 50, y: 100 }),
            point3: new Vector2UI({ x: 100, y: 0 }),
            color: new ColorUI("#ff0000"),
            stroke: new ColorUI("#000000"),
            strokeWeight: new NumberUI(1)
        };
    }
    toCode() {
        const { x, y, color, stroke, point1, point2, point3 } = this.params;
        const c = ColorHelpers.hexToRGB(color.value);
        const s = ColorHelpers.hexToRGB(stroke.value);
        return `fill(${c.r}, ${c.g}, ${c.b}, ${color.alpha});
stroke(${s.r}, ${s.g}, ${s.b}, ${stroke.alpha});
triangle(${point1.value.x + x.value}, ${point1.value.y + y.value}, ${point2.value.x + x.value}, ${point2.value.y + y.value}, ${point3.value.x + x.value}, ${point3.value.y + y.value});
`.trim();
    }
    render(ctx) {
        const { x, y, point1, point2, point3, color, stroke, strokeWeight } = this.params;
        const fillRGB = ColorHelpers.hexToRGB(color.value);
        ctx.fillStyle = `rgba(${fillRGB.r}, ${fillRGB.g}, ${fillRGB.b}, ${color.alpha})`;
        const strokeRGB = ColorHelpers.hexToRGB(stroke.value);
        ctx.strokeStyle = `rgba(${strokeRGB.r}, ${strokeRGB.g}, ${strokeRGB.b}, ${stroke.alpha})`;
        ctx.lineWidth = strokeWeight.value;
        ctx.save();
        ctx.translate(x.value, y.value);
        ctx.beginPath();
        ctx.moveTo(point1.value.x, point1.value.y);
        ctx.lineTo(point2.value.x, point2.value.y);
        ctx.lineTo(point3.value.x, point3.value.y);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();
    }
}
