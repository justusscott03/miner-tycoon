import { Storehouse } from "./storehouse.js";
import { Warehouse } from "./warehouse.js";
import { Elevator } from "./elevator.js";
import { Shaft } from "./shaft.js";
import { Carrier } from "./carrier.js";
import { pushMatrix, translate, popMatrix } from "../PJS/transformation.js";
import { fill, noStroke, strokeWeight, stroke } from "../PJS/colors.js";
import { rect } from "../PJS/shapes.js";
import { beginShape, vertex, endShape } from "../PJS/complexShapes.js";
import { textAlign, text } from "../PJS/text.js";
import { money } from "../helpers/moneyManagment.js";

export class Mine {

    constructor () {
        this.y = 0;

        this.numShafts = 0;
        this.shaftOffset = 0;
        this.shafts = [];

        this.storehouse = new Storehouse(85, 275, 130, 275);
        this.warehouse = new Warehouse(485, 275, 130, 275);

        this.displayElevator = false;
        this.elevator = new Elevator(95, 525, 110, 170, [...this.shafts], this.storehouse);

        this.numCarriers = 1;
        this.carriers = [];
        this.recruitCarrier();
    }

    buildShaft () {
        if (this.numShafts < 30) {
            this.shafts.push(new Shaft(215, 740 + this.shaftOffset, 501, 100, this.numShafts + 1));
            this.elevator.crates = this.shafts.map(shaft => shaft.crate);
            if (this.numShafts === 0) {
                this.displayElevator = true;
            }
            this.numShafts++;
            this.shaftOffset += 175;
        }
    }

    recruitCarrier () {
        if (this.numCarriers < 5) {
            this.carriers.push(new Carrier(450, 375, 52.15, 75, this.storehouse, this.warehouse));
            this.numCarriers++;
        }
    }

    update () {}

    draw () {
        pushMatrix();
            translate(0, this.y);

            fill(135, 109, 47);
            rect(0, 0, canvas.width, canvas.height * 10);

            noStroke();
            fill(34, 139, 34);
            rect(0, 550, canvas.width, 10);
            
            fill(31, 58, 67);
            strokeWeight(2);
            stroke(0);
            beginShape();
                vertex(85, 550);
                vertex(85, 697 + (this.shafts.length === 0 ? 1 : this.shafts.length) * 175);
                vertex(115, 715 + (this.shafts.length === 0 ? 1 : this.shafts.length) * 175);
                vertex(185, 715 + (this.shafts.length === 0 ? 1 : this.shafts.length) * 175);
                vertex(215, 697 + (this.shafts.length === 0 ? 1 : this.shafts.length) * 175);
                vertex(215, 550);
                vertex(205, 550);
                vertex(205, 690 + (this.shafts.length === 0 ? 1 : this.shafts.length) * 175);
                vertex(180, 705 + (this.shafts.length === 0 ? 1 : this.shafts.length) * 175);
                vertex(120, 705 + (this.shafts.length === 0 ? 1 : this.shafts.length) * 175);
                vertex(95, 690 + (this.shafts.length === 0 ? 1 : this.shafts.length) * 175);
                vertex(95, 550);
            endShape();

            fill(28);
            rect(115, 360, 7, this.elevator.y - 349);
            rect(178, 360, 7, this.elevator.y - 349);

            for (let i = 0; i < this.shafts.length; i++) {
                this.shafts[i].display();
            }

            if (this.displayElevator) {
                this.elevator.display();
            }

            this.storehouse.display();

            this.warehouse.display();

            // for (let i = 0; i < this.carriers.length; i++) {
            //     this.carriers[i].display();
            // }

            fill(0);
            textAlign("CENTER", "CENTER");
            text(money.total, canvas.width / 2, 50);
        popMatrix();
    }

    display () {
        this.update();
        this.draw();
    }

    toJSON () {
        return {
            y : this.y,
            numShafts : this.numShafts,
            shaftOffset : this.shaftOffset,
            shafts : this.shafts.map(shaft => shaft.toJSON()),
            storehouse : this.storehouse.toJSON(),
            displayElevator : this.displayElevator,
            elevator : this.elevator.toJSON(),
            numCarriers : this.numCarriers,
            carriers : this.carriers.map(carrier => carrier.toJSON()),
            warehouse : this.warehouse.toJSON()
        };
    }

    static fromJSON (data) {
        const mine = new Mine();
        mine.y = data.y;
        mine.numShafts = data.numShafts;
        mine.shaftOffset = data.shaftOffset;
        mine.shafts = data.shafts.map(shaftData => Shaft.fromJSON(shaftData));
        mine.storehouse = Storehouse.fromJSON(data.storehouse);
        mine.warehouse = Warehouse.fromJSON(data.warehouse);
        mine.displayElevator = data.displayElevator;
        mine.elevator = Elevator.fromJSON(data.elevator, [...mine.shafts], mine.storehouse);
        mine.numCarriers = data.numCarriers;
        mine.carriers = data.carriers.map(carrierData => Carrier.fromJSON(carrierData, mine.storehouse, mine.warehouse));

        return mine;
    }

}
