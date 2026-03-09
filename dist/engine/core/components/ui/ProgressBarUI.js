import { fill, noStroke } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.2/colors.js";
import { UIComponent } from "../UIComponent.js";
import { Vector2 } from "../../math/Vector2.js";
import { rect } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.2/shapes.js";
import { map } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.2/math.js";
export class ProgressBarUI extends UIComponent {
    constructor() {
        super(...arguments);
        this.fillColor = "#FF0000";
        this.backColor = "#888888";
        this.current = 50;
        this.max = 100;
        this.w = 100;
        this.h = 40;
    }
    initialize(fillColor, backColor, max, w = 100, h = 40, relativePosition = Vector2.zero) {
        this.fillColor = fillColor;
        this.backColor = backColor;
        this.max = max;
        this.w = w;
        this.h = h;
        this.relativePosition = relativePosition;
    }
    RenderUI() {
        let x = this.transform.position.x + this.relativePosition.x;
        let y = this.transform.position.y + this.relativePosition.y;
        noStroke();
        fill(this.backColor);
        rect(x, y, this.w, this.h);
        fill(this.fillColor);
        rect(x, y, map(this.current, 0, this.max, 0, this.w), this.h);
    }
}
