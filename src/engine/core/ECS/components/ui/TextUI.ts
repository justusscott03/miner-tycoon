import { UIComponent } from "../UIComponent.js";
import { fill } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.2/colors.js";
import { textAlign, textSize, text } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.2/text.js";
import { Vector2 } from "../../../math/Vector2.js";

export class TextUI extends UIComponent {
    content = "";
    fontSize = 20;
    color = "#000000";
    align = "LEFT"; // LEFT, CENTER, RIGHT

    initialize(content: string, fontSize: number, color: string, align: string, screenSpace: boolean = true, relativePositon: Vector2 = Vector2.zero) {
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
