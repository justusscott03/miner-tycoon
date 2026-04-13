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
    hitTest(point) {
        const { x, y, point1, point2, point3 } = this.params;
        const p = point;
        const a = { x: point1.value.x + x.value, y: point1.value.y + y.value };
        const b = { x: point2.value.x + x.value, y: point2.value.y + y.value };
        const c = { x: point3.value.x + x.value, y: point3.value.y + y.value };
        const area = (v1, v2, v3) => Math.abs((v1.x * (v2.y - v3.y) + v2.x * (v3.y - v1.y) + v3.x * (v1.y - v2.y)) / 2);
        const A = area(a, b, c);
        const A1 = area(p, b, c);
        const A2 = area(a, p, c);
        const A3 = area(a, b, p);
        return Math.abs(A - (A1 + A2 + A3)) < 0.1;
    }
    getBounds() {
        const { x, y, point1, point2, point3 } = this.params;
        const points = [
            { x: point1.value.x + x.value, y: point1.value.y + y.value },
            { x: point2.value.x + x.value, y: point2.value.y + y.value },
            { x: point3.value.x + x.value, y: point3.value.y + y.value }
        ];
        const left = Math.min(...points.map(p => p.x));
        const right = Math.max(...points.map(p => p.x));
        const top = Math.min(...points.map(p => p.y));
        const bottom = Math.max(...points.map(p => p.y));
        return { left, top, right, bottom };
    }
    freezeLocalGeometry() {
        return {
            offsetX: this.params.x.value,
            offsetY: this.params.y.value,
            points: [
                { x: this.params.point1.value.x, y: this.params.point1.value.y },
                { x: this.params.point2.value.x, y: this.params.point2.value.y },
                { x: this.params.point3.value.x, y: this.params.point3.value.y }
            ]
        };
    }
    scaleFromBounds(oldB, newB, frozen) {
        const sx = (newB.right - newB.left) / (oldB.right - oldB.left);
        const sy = (newB.bottom - newB.top) / (oldB.bottom - oldB.top);
        const { offsetX, offsetY, points } = frozen;
        const params = [this.params.point1, this.params.point2, this.params.point3];
        params.forEach((param, i) => {
            const worldX = points[i].x + offsetX;
            const worldY = points[i].y + offsetY;
            const scaledX = newB.left + (worldX - oldB.left) * sx;
            const scaledY = newB.top + (worldY - oldB.top) * sy;
            param.value.x = scaledX - offsetX;
            param.value.y = scaledY - offsetY;
        });
    }
}
