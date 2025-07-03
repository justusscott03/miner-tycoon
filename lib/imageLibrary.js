import { background, fill, strokeWeight, stroke, noStroke, gradient, color } from "../PJS/colors.js";
import { get } from "../PJS/other.js";
import { rect, ellipse, quad } from "../PJS/shapes.js";
import { beginShape, vertex, endShape } from "../PJS/complexShapes.js";

const canvas = document.getElementById("canvas");

export const images = {

    topBottomGradient : function () {

        background(0, 0, 0, 0);

        fill(40, 75, 105);
        rect(0, 0, canvas.width, 2);
        rect(0, 48, canvas.width, 2);

        gradient(0, 2, canvas.width, 46, color(98, 147, 188), color(50, 93, 128));

        return get(0, 0, canvas.width, 50);

    },

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
            vertex(70, 1);
            vertex(40, 1);
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

    },
    
    elevatorDropoff : function () {

        background(0, 0, 0, 0);

        stroke(0);
        strokeWeight(2);
        beginShape();
            vertex(1, 1);
            vertex(135, 1);
            vertex(135, 8);
            vertex(125, 16);
            vertex(11, 16);
            vertex(1, 8);
        endShape();

        noStroke();
        fill(89, 139, 162);
        rect(2, 2, 132, 2);

        fill(58, 104, 120);
        rect(2, 4, 132, 4);

        fill(51, 87, 101);
        quad(2, 8, 11, 15, 125, 15, 134, 8);

        stroke(0);
        strokeWeight(2);
        fill(218, 96, 21);
        quad(42, 25, 54, 16, 81, 16, 93, 25);
        quad(42, 25, 93, 25, 84, 30, 51, 30);

        noStroke();
        fill(107, 32, 13);
        beginShape();
            vertex(48, 24);
            vertex(57, 18);
            vertex(59, 18);
            vertex(54, 22);
            vertex(81, 22);
            vertex(76, 18);
            vertex(78, 18);
            vertex(87, 24);
        endShape();
        quad(49, 26, 86, 26, 81, 29, 54, 29);

        fill(213, 68, 23);
        quad(59, 18, 66, 18, 61, 22, 54, 22);
        quad(76, 18, 69, 18, 74, 22, 81, 22);

        return get(0, 0, 136, 31);

    }

};
