import { NumberUI } from "../TypeUIBindings/NumberUI.js";
import { ColorUI } from "../TypeUIBindings/ColorUI.js";
import { BaseParams, ShapeUIBindings } from "../ShapeUIBindings.js";
import { ColorHelpers } from "../../../helpers/ColorHelpers.js";

interface RectParams extends BaseParams {
    w: NumberUI;
    h: NumberUI;
    radius: NumberUI;
}

export class RectUIBindings extends ShapeUIBindings<RectParams> {
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

    toCode(): string {
        const { x, y, w, h, radius, color, stroke } = this.params;

        const c = ColorHelpers.hexToRGB(color.value);
        const s = ColorHelpers.hexToRGB(stroke.value);

        return `fill(${c.r}, ${c.g}, ${c.b}, ${color.alpha});
stroke(${s.r}, ${s.g}, ${s.b}, ${stroke.alpha});
rect(${x.value}, ${y.value}, ${w.value}, ${h.value}, ${radius.value});`;
    }

    render(ctx: CanvasRenderingContext2D): void {
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
}
