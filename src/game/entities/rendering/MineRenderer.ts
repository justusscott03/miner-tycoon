// src/rendering/MineRenderer.js

import { pushMatrix, translate, popMatrix } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.2/transformation.js";
import { fill, noStroke, strokeWeight, stroke } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.2/colors.js";
import { image, rect } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.2/shapes.js";
import { beginShape, vertex, endShape } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.2/complexShapes.js";
import { textAlign, text } from "https://cdn.jsdelivr.net/gh/justusscott03/PJSLibrary@v1.1.2/text.js";

import { ShaftRenderer } from "./ShaftRenderer.js";
import { ElevatorRenderer } from "./ElevatorRenderer.js";
import { StorehouseRenderer } from "./StorehouseRenderer.js";
import { WarehouseRenderer } from "./WarehouseRenderer.js";
import { CarrierRenderer } from "./CarrierRenderer.js";

import { ImageManager } from "../../../engine/helpers/ImageManager.js";
import { MoneyState } from "../../state/MoneyState.js";

import { MineState } from "../state/MineState.js";
import { CanvasManager } from "../../../engine/helpers/CanvasManager.js";
import { UserInput } from "../../../engine/ui/UserInput.js";

export class MineRenderer {
    state: MineState;

    shaftRenderers: ShaftRenderer[];
    elevatorRenderer: ElevatorRenderer;
    storehouseRenderer: StorehouseRenderer;
    warehouseRenderer: WarehouseRenderer;
    carrierRenderers: CarrierRenderer[];

    input: UserInput

    constructor(state: MineState, input: UserInput) {
        this.state = state;
        this.input = input;

        this.shaftRenderers = state.shafts.map(s => new ShaftRenderer(s, input));
        this.elevatorRenderer = new ElevatorRenderer(state.elevator);
        this.storehouseRenderer = new StorehouseRenderer(state.storehouse);
        this.warehouseRenderer = new WarehouseRenderer(state.warehouse);
        this.carrierRenderers = state.carriers.map(c => new CarrierRenderer(c));
    }

    syncChildren() {
        if (this.shaftRenderers.length !== this.state.shafts.length) {
            this.shaftRenderers = this.state.shafts.map(s => new ShaftRenderer(s, this.input));
        }
        if (this.carrierRenderers.length !== this.state.carriers.length) {
            this.carrierRenderers = this.state.carriers.map(c => new CarrierRenderer(c));
        }
    }

    drawBackground() {
        const s = this.state;
        const shaftCount = s.shafts.length === 0 ? 1 : s.shafts.length;

        fill(135, 109, 47);
        rect(0, 0, CanvasManager.width, CanvasManager.height * 10);

        noStroke();
        fill(34, 139, 34);
        rect(0, 550, CanvasManager.width, 10);

        fill(31, 58, 67);
        strokeWeight(2);
        stroke(0);
        beginShape();
            vertex(85, 550);
            vertex(85, 697 + shaftCount * 175);
            vertex(115, 715 + shaftCount * 175);
            vertex(185, 715 + shaftCount * 175);
            vertex(215, 697 + shaftCount * 175);
            vertex(215, 550);
            vertex(205, 550);
            vertex(205, 690 + shaftCount * 175);
            vertex(180, 705 + shaftCount * 175);
            vertex(120, 705 + shaftCount * 175);
            vertex(95, 690 + shaftCount * 175);
            vertex(95, 550);
        endShape();

        noStroke();
        fill(32);
        beginShape();
            vertex(96, 550);
            vertex(96, 690 + shaftCount * 175);
            vertex(120, 704 + shaftCount * 175);
            vertex(180, 704 + shaftCount * 175);
            vertex(204, 690 + shaftCount * 175);
            vertex(204, 550);
        endShape();

        fill(42);
        beginShape();
            vertex(106, 550);
            vertex(106, 685 + shaftCount * 175);
            vertex(121, 695 + shaftCount * 175);
            vertex(179, 695 + shaftCount * 175);
            vertex(194, 685 + shaftCount * 175);
            vertex(194, 550);
        endShape();

        fill(62);
        beginShape();
            vertex(114, 550);
            vertex(114, 682 + shaftCount * 175);
            vertex(122, 687 + shaftCount * 175);
            vertex(178, 687 + shaftCount * 175);
            vertex(186, 682 + shaftCount * 175);
            vertex(186, 550);
        endShape();
    }

    drawForeground(delta: number) {
        const s = this.state;

        this.shaftRenderers.forEach(r => r.display(delta));

        if (s.displayElevator) {
            fill(28);
            rect(115, 360, 7, s.elevator.y - 349);
            rect(178, 360, 7, s.elevator.y - 349);
            this.elevatorRenderer.display(delta);
        }

        this.storehouseRenderer.display();
        image(ImageManager.Instance.get("elevatorDropoff"), 83, 545, 134, 31);
        this.warehouseRenderer.display();

        this.carrierRenderers.forEach(r => r.display(delta));

        fill(0);
        textAlign("CENTER", "CENTER");
        text(MoneyState.Instance.total.toString(), CanvasManager.width / 2, 50);

        image(ImageManager.Instance.get("topBottomGradient"), 0, 0, CanvasManager.width, 50);
        image(ImageManager.Instance.get("topBottomGradient"), 0, CanvasManager.height - 50, CanvasManager.width, 50);
    }

    display(delta: number) {
        this.state.update(delta);
        this.syncChildren();

        pushMatrix();
        translate(0, this.state.y);

        this.drawBackground();
        this.drawForeground(delta);

        popMatrix();
    }
}
