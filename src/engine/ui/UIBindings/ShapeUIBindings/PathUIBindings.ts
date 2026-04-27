import { ShapeUIBindings, BaseParams } from "../ShapeUIBindings";
import { ListUI } from "../ListUI";
import { Vector2UI } from "../TypeUIBindings/Vector2UI";
import { NumberUI } from "../TypeUIBindings/NumberUI";
import { ColorUI } from "../TypeUIBindings/ColorUI";
import { ColorHelpers } from "../../../helpers/ColorHelpers";
import { Bounds } from "../../../tools/Shape Editor/Layers/BaseLayer";

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
        const { points, color, stroke} = this.params;

        let code = `fill(${ColorHelpers.hexToRGB(color.value).r}, ${ColorHelpers.hexToRGB(color.value).g}, ${ColorHelpers.hexToRGB(color.value).b}, ${Math.round(color.alpha * 255)});
stroke(${ColorHelpers.hexToRGB(stroke.value).r}, ${ColorHelpers.hexToRGB(stroke.value).g}, ${ColorHelpers.hexToRGB(stroke.value).b}, ${Math.round(stroke.alpha * 255)});
beginShape();\n`;
        for (const p of points.value) {
            code += `   vertex(${p.value.x + this.params.x.value}, ${p.value.y + this.params.y.value});\n`;
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

        const fillRGB = ColorHelpers.hexToRGB(color.value);
        ctx.fillStyle = `rgba(${fillRGB.r}, ${fillRGB.g}, ${fillRGB.b}, ${color.alpha})`;

        const strokeRGB = ColorHelpers.hexToRGB(stroke.value);
        ctx.strokeStyle = `rgba(${strokeRGB.r}, ${strokeRGB.g}, ${strokeRGB.b}, ${stroke.alpha})`;

        ctx.fill();
        ctx.stroke();
        ctx.restore();
    }

    hitTest(point: { x: number; y: number }): boolean {
        // Convert local points to world space
        const pts = this.params.points.value.map(p => ({
            x: p.value.x + this.params.x.value,
            y: p.value.y + this.params.y.value
        }));

        // 1. Check stroke hit (distance to segments)
        const distToSegment = (p: { x: number; y: number }, a: { x: number; y: number }, b: { x: number; y: number }) => {
            const A = p.x - a.x;
            const B = p.y - a.y;
            const C = b.x - a.x;
            const D = b.y - a.y;

            const dot = A*C + B*D;
            const lenSq = C*C + D*D;
            let t = dot / lenSq;

            t = Math.max(0, Math.min(1, t));

            const projX = a.x + t * C;
            const projY = a.y + t * D;

            const dx = p.x - projX;
            const dy = p.y - projY;

            return Math.sqrt(dx*dx + dy*dy);
        };

        for (let i = 0; i < pts.length - 1; i++) {
            if (distToSegment(point, pts[i], pts[i+1]) < 6) {
                return true;
            }
        }

        // 2. Check fill hit (point inside polygon)
        let inside = false;
        for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
            const xi = pts[i].x, yi = pts[i].y;
            const xj = pts[j].x, yj = pts[j].y;

            const intersect =
                ((yi > point.y) !== (yj > point.y)) &&
                (point.x < (xj - xi) * (point.y - yi) / (yj - yi) + xi);

            if (intersect) inside = !inside;
        }

        return inside;
    }

    getBounds() {
        const pts = this.params.points.value;
        if (pts.length === 0) {
            return { left: 0, top: 0, right: 0, bottom: 0 };
        }

        let left = Infinity, top = Infinity, right = -Infinity, bottom = -Infinity;

        for (const p of pts) {
            const px = p.value.x + this.params.x.value;
            const py = p.value.y + this.params.y.value;

            left = Math.min(left, px);
            top = Math.min(top, py);
            right = Math.max(right, px);
            bottom = Math.max(bottom, py);
        }

        return { left, top, right, bottom };
    }

    freezeLocalGeometry(): any {
        return {
            offsetX: this.params.x.value,
            offsetY: this.params.y.value,
            points: this.params.points.value.map(p => ({ x: p.value.x, y: p.value.y }))
        };
    }

    scaleFromBounds(oldB: Bounds, newB: Bounds, frozen: any): void {
        const sx = (newB.right - newB.left) / (oldB.right - oldB.left);
        const sy = (newB.bottom - newB.top) / (oldB.bottom - oldB.top);

        const { offsetX, offsetY, points } = frozen;

        this.params.points.value.forEach((p, i) => {
            const worldX = points[i].x + offsetX;
            const worldY = points[i].y + offsetY;

            const scaledX = newB.left + (worldX - oldB.left) * sx;
            const scaledY = newB.top + (worldY - oldB.top) * sy;

            p.value.x = scaledX - offsetX;
            p.value.y = scaledY - offsetY;
        });
    }

}
