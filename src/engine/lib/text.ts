import { pjsSettings } from "./pjsSettings";
import { fill } from "./colors";
import { sin, cos } from "./trigonometry";
import { CanvasManager } from "../helpers/CanvasManager";

const ctx = CanvasManager.getCtx();

function textFont (font: string) {
    pjsSettings.globalFont = font;
    updateText();
}

function textSize (size: number) {
    pjsSettings.globalSize = size;
    updateText();
}

function textWeight(weight: string) {
    if (!["lighter", "normal", "bold", "bolder"].includes(weight)) {
        console.error("Invalid textWeight:", weight);
    }   

    pjsSettings.globalWeight = weight;
    updateText();
}

type TextStyle = "normal" | "italic";
function textStyle(style: TextStyle) {
    pjsSettings.globalStyle = style;
    updateText();
}

function updateText() {
    ctx.font = `${pjsSettings.globalStyle} ${pjsSettings.globalWeight} ${pjsSettings.globalSize}px ${pjsSettings.globalFont}`;
}

enum HorizontalAlign {
    LEFT = "LEFT",
    CENTER = "CENTER",
    RIGHT = "RIGHT"
}

enum VerticalAlign {
    BASELINE = "BASELINE",
    CENTER = "CENTER",
    BOTTOM = "BOTTOM"
}

function textAlign(ALIGN: HorizontalAlign, YALIGN: VerticalAlign = VerticalAlign.BASELINE) {
    const h = ALIGN === "LEFT" ? "start"
            : ALIGN === "CENTER" ? "center"
            : "end";

    const v = YALIGN === "BASELINE" ? "alphabetic"
            : YALIGN === "CENTER" ? "middle"
            : "bottom";

    ctx.textAlign = h;
    ctx.textBaseline = v;
}


function text (message: string, x: number, y: number) {
    ctx.fillText(message, x, y);
}

function outlinedText (message: string, x: number, y: number, weight: number, main: string, outline: string, inc: number = 10) {
    fill(outline);
    for (let i = 0; i < 360; i += inc) {
        text(message, x + sin(i) * weight, y + cos(i) * weight);
    }
    fill(main);
    text(message, x, y);
}

export { textFont, textSize, textWeight, textStyle, textAlign, text, outlinedText, HorizontalAlign, VerticalAlign };