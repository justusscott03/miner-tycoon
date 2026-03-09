import { fill, noStroke } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.2/colors.js";
import { UIComponent } from "../UIComponent.js";
import { Vector2 } from "../../math/Vector2.js";
import { rect } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.2/shapes.js";
import { map } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.2/math.js";

export class ProgressBarUI extends UIComponent {
    fillColor: string = "#FF0000";
    backColor: string = "#888888";
    current: number = 50;
    max: number = 100;
    w: number = 100;
    h: number = 40;

    initialize(fillColor: string, backColor: string, max: number, w: number = 100, h: number = 40, relativePosition: Vector2 = Vector2.zero): void {
        this.fillColor = fillColor;
        this.backColor = backColor;
        this.max = max;
        this.w = w;
        this.h = h;
        this.relativePosition = relativePosition;
    }

    RenderUI(): void {
        let x = this.transform.position.x + this.relativePosition.x;
        let y = this.transform.position.y + this.relativePosition.y;

        noStroke();

        fill(this.backColor);
        rect(x, y, this.w, this.h);

        fill(this.fillColor);
        rect(x, y, map(this.current, 0, this.max, 0, this.w), this.h);
    }
}