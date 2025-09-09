import { entityBoostLevels } from "../config/entityBoostLevels.js";
import { Button } from "./button.js";
import { upgradePages, UpgradePage } from "./upgradePage.js";

export class Upgradeable {

    constructor (buttonData = { x : 0, y : 0, fontSize : 15 }) {
        const entityName = this.constructor.name.toLowerCase();

        this.buttonData = buttonData;

        this.level = 1;
        this.maxLevel = entityBoostLevels[entityName][entityBoostLevels[entityName].length - 1];
        this.boostLevels = [...entityBoostLevels[entityName]];
        
        this.upgradePage = new UpgradePage(this);
        upgradePages.push(this.upgradePage);

        this.pageOutButton = null;
    }

    initButton (data) {
        // console.log("button initizlized in", this.constructor.name, { data });
        this.buttonData.x = data.x ?? console.error("No x position provided for upgradeable button.");
        this.buttonData.y = data.y ?? console.error("No y position provided for upgradeable button.");
        this.buttonData.fontSize = data.fontSize ?? console.error("No font size provided for upgradeable button.");

        this.pageOutButton = new Button(this.buttonData.x, this.buttonData.y, 50, 50, "Level\n" + this.level, this.buttonData.fontSize, () => {
            this.upgradePage.pageOut = true;
        });
    }

}