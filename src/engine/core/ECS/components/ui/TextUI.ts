import { UIComponent } from "../UIComponent";
import { fill } from "../../../../lib/colors";
import { textAlign, textSize, text, HorizontalAlign } from "../../../../lib/text";
import { Vector2 } from "../../../math/Vector2";
import { InferValues } from "../../main/Component";
import { ColorUI } from "../../../../ui/UIBindings/TypeUIBindings/ColorUI";
import { NumberUI } from "../../../../ui/UIBindings/TypeUIBindings/NumberUI";
import { Vector2UI } from "../../../../ui/UIBindings/TypeUIBindings/Vector2UI";
import { StringUI } from "../../../../ui/UIBindings/TypeUIBindings/StringUI";
import { BooleanUI } from "../../../../ui/UIBindings/TypeUIBindings/BooleanUI";
import { EnumUI } from "../../../../ui/UIBindings/TypeUIBindings/EnumUI";

export const TextUIDef = {
    import: "src/engine/core/ECS/components/ui/TextUI",
    params: {
        content: new StringUI(""),
        fontSize: new NumberUI(20),
        color: new ColorUI("#000000"),
        align: new EnumUI<HorizontalAlign>(["LEFT", "CENTER", "RIGHT"], "LEFT"),
        screenSpace: new BooleanUI(true),
        relativePosition: new Vector2UI({ x: 0, y: 0 })
    }
} as const;

export type TextUIValues = InferValues<typeof TextUIDef>;

export class TextUI extends UIComponent {
    content = "";
    fontSize = 20;
    color = "#000000";
    align: HorizontalAlign = "LEFT";
    screenSpace = true;
    relativePosition: Vector2 = Vector2.zero;

    initialize(values: TextUIValues) {
        Object.assign(this, values);
    }

    RenderUI() {
        fill(this.color);
        textAlign(this.align, "CENTER");
        textSize(this.fontSize);

        const x = this.transform.position.x + this.relativePosition.x;
        const y = this.transform.position.y + this.relativePosition.y;

        text(this.content, x, y);
    }
}

