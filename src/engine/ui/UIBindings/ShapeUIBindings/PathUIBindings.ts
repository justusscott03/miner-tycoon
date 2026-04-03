import { ShapeUIBindings, BaseParams } from "../ShapeUIBindings.js";
import { ListUI } from "../ListUI.js";
import { Vector2UI } from "../TypeUIBindings/Vector2UI.js";
import { NumberUI } from "../TypeUIBindings/NumberUI.js";
import { ColorUI } from "../TypeUIBindings/ColorUI.js";

interface PathParams extends BaseParams {
    points: ListUI<Vector2UI>;
}

export class PathUIBindings extends ShapeUIBindings<PathParams> {
    constructor() {
        super();
        this.params = {
            x: new NumberUI(0),
            y: new NumberUI(0),

            points: new ListUI<Vector2UI>([
                new Vector2UI({ x: 0, y: 0 }),
                new Vector2UI({ x: 100, y: 100 })
            ]),

            color: new ColorUI("#ff0000"),
            stroke: new ColorUI("#000000"),
            strokeWeight: new NumberUI(1)
        };
    }

    toCode(): string {
        const pts = this.params.points.value;

        let code = "beginShape();\n";
        for (const p of pts) {
            code += `vertex(${p.value.x}, ${p.value.y});\n`;
        }
        code += "endShape();";

        return code;
    }

    render(ctx: CanvasRenderingContext2D): void {
        const { x, y, points, color, stroke, strokeWeight } = this.params;

        const pts = points.value;
        if (pts.length < 2) return;

        ctx.save();
        ctx.translate(x.value, y.value);

        ctx.beginPath();
        ctx.moveTo(pts[0].value.x, pts[0].value.y);

        for (let i = 1; i < pts.length; i++) {
            ctx.lineTo(pts[i].value.x, pts[i].value.y);
        }

        ctx.lineWidth = strokeWeight.value;
        ctx.strokeStyle = stroke.value;
        ctx.fillStyle = color.value;
        ctx.fill();
        ctx.stroke();
        ctx.restore();
    }
}
