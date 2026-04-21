import { fill, noStroke } from "../../../../lib/colors";
import { rect } from "../../../../lib/shapes";
import { map } from "../../../../lib/math";

import { UIComponent } from "../UIComponent";
import { Vector2 } from "../../../math/Vector2";
import { ComponentDefinition, InferValues } from "../../main/Component";

import { NumberUI } from "../../../../ui/UIBindings/TypeUIBindings/NumberUI";
import { Vector2UI } from "../../../../ui/UIBindings/TypeUIBindings/Vector2UI";
import { ColorUI } from "../../../../ui/UIBindings/TypeUIBindings/ColorUI";

export const ProgressBarUIDef = {
    import: "src/engine/core/ECS/components/ui/ProgressBarUI",

    params: {
        fillColor: new ColorUI("#FF0000"),
        backColor: new ColorUI("#646464"),
        max: new NumberUI(100),
        w: new NumberUI(100),
        h: new NumberUI(40),
        relativePosition: new Vector2UI({ x: 0, y: 0 })
    }
} as const;

export type ProgressBarUIValues = InferValues<typeof ProgressBarUIDef>;

export class ProgressBarUI extends UIComponent {
    fillColor: string = "#FF0000";
    backColor: string = "#888888";
    current: number = 50;
    max: number = 100;
    w: number = 100;
    h: number = 40;
    relativePosition: Vector2 = Vector2.zero;

    initialize(values: ProgressBarUIValues): void {
        Object.assign(this, values);
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