import { UIComponent } from "../UIComponent";
import { fill } from "../../../../lib/colors";
import { textAlign, textSize, text, HorizontalAlign, VerticalAlign } from "../../../../lib/text";
import { Vector2 } from "../../../math/Vector2";
import { ComponentDefinition } from "../../main/Component";
import { ColorUI } from "../../../../ui/UIBindings/TypeUIBindings/ColorUI";
import { NumberUI } from "../../../../ui/UIBindings/TypeUIBindings/NumberUI";
import { Vector2UI } from "../../../../ui/UIBindings/TypeUIBindings/Vector2UI";
import { StringUI } from "../../../../ui/UIBindings/TypeUIBindings/StringUI";
import { BooleanUI } from "../../../../ui/UIBindings/TypeUIBindings/BooleanUI";
import { EnumUI } from "../../../../ui/UIBindings/TypeUIBindings/EnumUI";

type TextUIValues = {
    content: string;
    fontSize: number;
    color: string;
    align: HorizontalAlign;
    screenSpace: boolean;
    relativePosition: { x: number, y: number };
};

export const TextUIDef: ComponentDefinition<TextUIValues> = {
    import: "src/engine/core/ECS/components/ui/TextUI",

    params: {
        content: new StringUI(""),
        fontSize: new NumberUI(20),
        color: new ColorUI("#000000"),
        align: new EnumUI(HorizontalAlign, HorizontalAlign.LEFT),
        screenSpace: new BooleanUI(true),
        relativePosition: new Vector2UI({ x: 0, y: 0 })
    }
};

export class TextUI extends UIComponent {
    content = "";
    fontSize = 20;
    color = "#000000";
    align: HorizontalAlign = HorizontalAlign.LEFT;
    screenSpace = true;
    relativePosition: Vector2 = Vector2.zero;

    initialize(
        content: string,
        fontSize: number,
        color: string,
        align: HorizontalAlign,
        screenSpace: boolean = true,
        relativePosition: Vector2 = Vector2.zero
    ) {
        this.content = content;
        this.fontSize = fontSize;
        this.color = color;
        this.align = align;
        this.screenSpace = screenSpace;
        this.relativePosition = relativePosition;
    }

    RenderUI() {
        fill(this.color);
        textAlign(this.align, VerticalAlign.CENTER);
        textSize(this.fontSize);

        const x = this.transform.position.x + this.relativePosition.x;
        const y = this.transform.position.y + this.relativePosition.y;

        text(this.content, x, y);
    }
}

