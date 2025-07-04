import { Crate } from "./crate.js";
import { Button } from "./button.js";
import { Miner } from "./miner.js";
import { UpgradePage } from "./upgradePage.js";

import { fill, stroke } from "../PJS/colors.js";
import { rect } from "../PJS/shapes.js";
import { textAlign, text } from "../PJS/text.js";

import { upgradePages } from "../config/entityUpgradePages.js";

const ctx = document.getElementById("canvas").getContext("2d");

export class Shaft {

    /**
     * Creates a new Shaft object.
     * @param { number } x - The x-position of the shaft.
     * @param { number } y - The y-position of the shaft.
     * @param { number } w - The width of the shaft.
     * @param { number } h - The height of the shaft.
     * @param { number } id - The id of the shaft (1 - 30).
     */
    constructor (x, y, w, h, id) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.id = id;

        this.crate = new Crate(this.x + this.w / 80, this.y + this.h * 3 / 5, this.w / 7, this.h * 2 / 5);

        this.minerOffset = this.w / 8;
        this.numMiners = 0;
        this.miners = [];
        this.recruitMiner();

        this.pageOut = false;

        this.level = 1;
        this.boostLevels = [10, 25, 50, 100, 200, 300, 400, 500, 600, 800];

        const t = this;
        this.pageOutButton = new Button(this.x + this.w * 4 / 5, this.y + this.h / 4, 50, 50, "Level\n" + this.level, 17, function () {
            t.pageOut = true;
        });

        this.page = new UpgradePage(this);
        upgradePages.push(this.page);
    }

    recruitMiner() {
        if (this.numMiners < 6) {
            this.miners.push(new Miner(this.x + this.minerOffset, this.y + this.h / 4, this.w / 10, this.h * 3 / 4, this.crate));
            this.numMiners++;
        }
    }

    update () {}

    draw () {
        fill(150);
        rect(this.x, this.y, this.w, this.h);

        stroke(0);
        fill(100, 100, 100);
        rect(127, this.y + 25, 46, 46, 10);
        rect(131, this.y + 29, 38, 38, 8);

        fill(0);
        rect(this.x, this.y + this.h, this.w, 13);

        fill(255);
        ctx.font = "bold 30px Arial";
        textAlign("CENTER", "CENTER");
        text(this.id, 150, this.y + 50);
        
        for (let i = 0; i < this.miners.length; i++) {
            this.miners[i].display();
        }

        this.crate.draw();

        this.pageOutButton.draw();
        


    }

    display () {
        this.update();
        this.draw();
    }

    toJSON () {
        return {
            x : this.x,
            y : this.y,
            w : this.w,
            h : this.h,
            id : this.id,
            crate : this.crate.toJSON(),
            minerOffset : this.minerOffset,
            numMiners : this.numMiners,
            miners : this.miners.map(miner => miner.toJSON()),
            level : this.level
        };
    }

    static fromJSON (data) {
        const shaft = new Shaft(data.x, data.y, data.w, data.h, data.id);
        shaft.crate = Crate.fromJSON(data.crate);
        shaft.minerOffset = data.minerOffset;
        shaft.numMiners = data.numMiners;
        shaft.miners = data.miners.map(minerData => Miner.fromJSON(minerData, shaft.crate));
        shaft.level = data.level;

        return shaft;
    }

}
