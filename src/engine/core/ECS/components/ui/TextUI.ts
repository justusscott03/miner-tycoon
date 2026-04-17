import { UIComponent } from "../UIComponent";
import { fill } from "../../../../lib/colors";
import { textAlign, textSize, text, HorizontalAlign } from "../../../../lib/text";
import { Vector2 } from "../../../math/Vector2.js";

export class TextUI extends UIComponent {
    content = "";
    fontSize = 20;
    color = "#000000";
    align: HorizontalAlign = "LEFT"; // LEFT, CENTER, RIGHT

    initialize(content: string, fontSize: number, color: string, align: HorizontalAlign, screenSpace: boolean = true, relativePositon: Vector2 = Vector2.zero) {
        this.content = content;
        this.fontSize = fontSize;
        this.color = color;
        this.align = align;
        this.screenSpace = screenSpace;
        this.relativePosition = relativePositon;
    }

    RenderUI() {
        fill(this.color);
        textAlign(this.align, "CENTER");
        textSize(this.fontSize);

        let x = this.transform.position.x + this.relativePosition.x;
        let y = this.transform.position.y + this.relativePosition.y;

        text(this.content, x, y);
    }
}
