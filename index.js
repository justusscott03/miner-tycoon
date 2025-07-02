import { constrain, lerp } from "./PJS/math.js";
import { background } from "./PJS/colors.js";
import { pushMatrix, scale, popMatrix, resetMatrix } from "./PJS/transformation.js";

import { Button } from "./entities/button.js";
import { Mine } from "./entities/mine.js";

import { user } from "./helpers/ui.js";
import { screenSize } from "./helpers/screenResize.js";
import { money } from "./helpers/moneyManagment.js";
import { loadFromDB, saveToDB } from "./helpers/database.js";
import { frameTime, getFormattedTime, getFormattedDate } from "./helpers/timeManager.js";
import { imageLoader } from "./helpers/imageLoading.js";

function KhanMiner () {


document.getElementById("returnToGame").addEventListener("click", function () {
    document.getElementById("savePage").style.display = "none";
});

// Canvas
const canvas = document.getElementById("canvas");
canvas.width = screenSize.originalWidth;
canvas.height = screenSize.originalHeight;


// Mine
const mine = new Mine();
let currentMine = mine;

canvas.addEventListener("wheel", function (e) {          
    e.preventDefault();

    let targetY = currentMine.y;
    targetY += e.deltaY * 2;
    currentMine.y = lerp(currentMine.y, targetY, 0.1);
    currentMine.y = constrain(currentMine.y, -4950, 0);
});


// Button definitions
const button = new Button(100, 100, 100, 100, "Shaft", function () {
    currentMine.buildShaft();
});
const savePageButton = new Button(500, 0, 50, 50, "", function () {
    document.getElementById("savePage").style.display = "block";
});


// Load and save game functions
let saves = [];

function saveGame () {

    const state = {
        totalMoney : money.total,
        superCash : money.super,
        mine : currentMine.toJSON()
    };

    if (saves.length >= 10) {
        saves.shift();
        for (let i = 0; i < document.getElementsByClassName("saves").length; i++) {
            const saveDiv = document.getElementsByClassName("saves")[i];
            if (saveDiv.dataset.saveIndex) {
                saveDiv.dataset.saveIndex = Number(saveDiv.dataset.saveIndex) - 1;
            }
        }
        document.getElementById("savePage").removeChild(document.getElementsByClassName("saves")[0]);
    }

    saves.push(state);
    saveToDB("main", saves);

    const newSave = document.createElement("div");
    newSave.className = "saves fredoka";
    newSave.innerHTML = `${getFormattedTime()}&nbsp;&nbsp;|&nbsp;&nbsp;${getFormattedDate()}<br>Click to load save`;
    newSave.dataset.saveIndex = saves.length - 1;

    newSave.addEventListener("click", function(e) {
        e.stopPropagation();
        loadGame(Number(this.dataset.saveIndex)).then(() => {
            console.log(`Loaded save ${this.dataset.saveIndex}`);
        });
    });

    document.getElementById("savePage").appendChild(newSave);
}

async function loadGame(index) {
    const allSaves = await loadFromDB("main");
    const savesArr = allSaves && Array.isArray(allSaves.data) ? allSaves.data : [];
    if (savesArr.length > 0) {
        saves = savesArr;
        const save = saves[index];
        if (save) {
            money.total = save.totalMoney;
            money.super = save.superCash;
            currentMine = Mine.fromJSON(save.mine);
        } 
        else {
            console.error("Save not found at index:", index);
        }
    } 
    else {
        console.error("No saves found.");
    }
}

setInterval(() => { saveGame(); }, 1000);
window.addEventListener("beforeunload", function (e) {
    saveGame();
});

// Draw and mouseClicked functions
function draw () {

    try {

        if (!imageLoader.loaded) {
            imageLoader.load();
        }
        else {

            frameTime.current = Date.now();
            frameTime.delta = (frameTime.current - frameTime.last) / 1000;
            frameTime.last = frameTime.current;
            
            resetMatrix();
            
            background(255);

            pushMatrix();

                scale(screenSize.scaledWidth / screenSize.originalWidth, screenSize.scaledHeight / screenSize.originalHeight);

                currentMine.display();

                button.draw();
                savePageButton.draw();

            popMatrix();

            user.update();

        }

        requestAnimationFrame(draw);

    }
    catch (e) {
        console.error(e);
    }

}
draw();


}

KhanMiner();
