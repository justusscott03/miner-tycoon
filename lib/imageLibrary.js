import { background, fill, strokeWeight, stroke, noStroke } from "../PJS/colors.js";
import { get } from "../PJS/other.js";
import { rect, ellipse } from "../PJS/shapes.js";
import { beginShape, vertex, endShape } from "../PJS/complexShapes.js";

export const images = {

    miner : function () {

        background(0, 0, 0, 0);

        noStroke();
        fill(0);
        rect(0, 0, 25, 75);
        fill(255);
        rect(25, 0, 25, 75);

        return get(0, 0, 50, 75);

    },

    elevator : function () {

        background(0, 0, 0, 0);

        fill(136, 198, 221);
        strokeWeight(2);
        stroke(0);
        rect(30, 150, 50, 12, 5);
        rect(15, 140, 80, 13, 1);

        beginShape();
            vertex(0, 11);
            vertex(110, 11);
            vertex(110, 133);
            vertex(90, 145);
            vertex(25, 145);
            vertex(0, 133);
        endShape();

        ellipse(20, 8, 16, 16);
        ellipse(90, 8, 16, 16);
        ellipse(20, 8, 2, 2);
        ellipse(90, 8, 2, 2);

        beginShape();
            vertex(30, 11);
            vertex(80, 11);
            vertex(80, 7);
            vertex(70, 0);
            vertex(40, 0);
            vertex(30, 7);
        endShape();

        fill(0, 0, 0, 0);
        stroke(0);
        beginShape();
            vertex(8, 19);
            vertex(102, 19);
            vertex(102, 40);
            vertex(100, 45);
            vertex(100, 65);
            vertex(98, 70);
            vertex(98, 85);
            vertex(100, 90);
            vertex(100, 110);
            vertex(102, 115);
            vertex(102, 126);
            vertex(85, 137);
            vertex(30, 137);
            vertex(8, 126);
            vertex(8, 115);
            vertex(10, 110);
            vertex(10, 90);
            vertex(12, 85);
            vertex(12, 70);
            vertex(10, 65);
            vertex(10, 45);
            vertex(8, 40);
        endShape();

        return get(0, 0, 110, 170);

    }

};
