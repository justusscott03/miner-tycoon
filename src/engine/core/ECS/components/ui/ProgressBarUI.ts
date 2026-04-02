import { fill, noStroke } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.2/colors.js";
import { rect } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.2/shapes.js";
import { map } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.2/math.js";

import { UIComponent } from "../UIComponent.js";
import { Vector2 } from "../../../math/Vector2.js";
import { ComponentDefinition } from "../../main/Component.js";

import { NumberUI } from "../../../../tools/Prefab Generator System/ParamUI Types/NumberUI.js";
import { Vector2UI } from "../../../../tools/Prefab Generator System/ParamUI Types/Vector2UI.js";
import { ColorUI } from "../../../../tools/Prefab Generator System/ParamUI Types/ColorUI.js";

type ProgressBarUIValues = {
    fillColor: string;
    backColor: string;
    max: number;
    w: number;
    relativePosition: { x: number, y: number };
};

export const ProgressBarUIDef: ComponentDefinition<ProgressBarUIValues> = {
    import: "src/engine/core/ECS/components/ui/ProgressBarUI.js",

    params: {
        fillColor: new ColorUI("#FF0000"),
        backColor: new ColorUI("#646464"),
        max: new NumberUI(100),
        w: new NumberUI(100),
        relativePosition: new Vector2UI({ x: 0, y: 0 })
    }
};

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