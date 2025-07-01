import { rect, arc, ellipse, triangle, quad, image, line, point, bezier, ellipseMode, rectMode, strokeCap } from "./PJS/shapes.js";
import { beginShape, endShape, vertex, bezierVertex, strokeJoin } from "./PJS/complexShapes.js";
import { random, dist, constrain, min, max, abs, log, pow, sq, sqrt, round, ceil, floor, map, lerp, noise } from "./PJS/math.js";
import { color, fill, noFill, background, noStroke, strokeWeight, stroke, lerpColor } from "./PJS/colors.js";
import { textFont, textSize, textAlign, text, outlinedText } from "./PJS/text.js";
import { radians, degrees, sin, cos, tan, asin, acos, atan, atan2 } from "./PJS/trigonometry.js";
import { pushMatrix, translate, rotate, scale, popMatrix, resetMatrix } from "./PJS/transformation.js";
import { get, cursor } from "./PJS/other.js";

import { Crate } from "./entities/crate.js";
import { Miner } from "./entities/miner.js";
import { Elevator } from "./entities/elevator.js";
import { Carrier } from "./entities/carrier.js";
import { Storehouse } from "./entities/storehouse.js";
import { Warehouse } from "./entities/warehouse.js";
import { Shaft } from "./entities/shaft.js";
import { Button } from "./entities/button.js";
import { Mine } from "./entities/mine.js";

import { user } from "./helpers/ui.js";
import { screenSize } from "./helpers/screenResize.js";
import { money } from "./helpers/moneyManagment.js";


async function createDatabase () {
    return new Promise((resolve, reject) => {
        const request = window.indexedDB.open("KhanMinerDB", 1);

        request.onupgradeneeded = function (event) {
            const db = event.target.result;
            if (!db.objectStoreNames.contains("worlds")) {
                db.createObjectStore("worlds", { keyPath: "id" });
            }
        };

        request.onsuccess = function () {
            resolve(request.result);
        };

        request.onerror = function (e) {
            reject(e);
        };
    });
}

// Helper to get the object store and transaction
async function getStore (mode = "readonly") {
    const db = await createDatabase();
    const tx = db.transaction("worlds", mode);
    const store = tx.objectStore("worlds");
    return { db, store };
}

async function loadFromDB (id) {
    const { db, store } = await getStore("readonly");
    return new Promise((resolve) => {
        const req = id ? store.get(id) : store.getAll();
        req.onsuccess = function () {
            resolve(req.result);
            db.close();
        };
        req.onerror = function () {
            resolve(null);
            db.close();
        };
    });
}

async function saveToDB (id, data) {
    const { db, store } = await getStore("readwrite");
    return new Promise((resolve, reject) => {
        const req = store.put({ id: id, data: data });
        req.onsuccess = function () {
            resolve(req.result);
            db.close();
        };
        req.onerror = function (e) {
            reject(e);
            db.close();
        };
    });
}

async function deleteFromDB (id) {
    const { db, store } = await getStore("readwrite");
    return new Promise((resolve, reject) => {
        const req = store.delete(id);
        req.onsuccess = function () {
            resolve(req.result);
            db.close();
        };
        req.onerror = function (e) {
            reject(e);
            db.close();
        };
    });
}

function KhanMiner () {


document.getElementById("returnToGame").addEventListener("click", function () {
    document.getElementById("savePage").style.display = "none";
});

// Variables
let lastTime = Date.now(), currentTime, deltaTime;

// Canvas
const canvas = document.getElementById("canvas"), ctx = canvas.getContext("2d");
canvas.width = screenSize.originalWidth;
canvas.height = screenSize.originalHeight;


// Image library
const images = {
    elevator : function () {

        background(0, 0, 0, 0);

        return get(0, 0, 110, 170);

    }
};
let curLoad = 0;
let loaded = false;
function load () {
    let obj = Object.keys(images);

    resetCanvas(canvas, ctx);
    
    images[obj[curLoad]] = images[obj[curLoad]]();
    
    curLoad++;
    
    if (curLoad >= Object.keys(images).length) {
        loaded = true;
    }
    
}


// Game classes
class UpgradePage {

    constructor () {}

}

class Barrier {

    constructor (x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

}

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
    const now = new Date();
    const formattedDate = `${now.getMonth() + 1} \u2022 ${now.getDate()} \u2022 ${now.getFullYear()}`;
    const formattedTime = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;

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
    newSave.innerHTML = `${formattedTime}&nbsp;&nbsp;|&nbsp;&nbsp;${formattedDate}<br>Click to load save`;
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
            totalMoney = save.totalMoney;
            superCash = save.superCash;
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

setInterval(() => { saveGame(); }, 60000);
window.addEventListener("beforeunload", function (e) {
    saveGame();
});

// Draw and mouseClicked functions
function draw () {

    try {

        currentTime = Date.now();
        deltaTime = (currentTime - lastTime) / 1000;
        lastTime = currentTime;
        
        resetMatrix();
        
        background(255);

        pushMatrix();

            scale(screenSize.scaledWidth / screenSize.originalWidth, screenSize.scaledHeight / screenSize.originalHeight);

            currentMine.display(deltaTime);

            button.draw();
            savePageButton.draw();

        popMatrix();

        user.update();

        requestAnimationFrame(draw);

    }
    catch (e) {
        console.error(e);
    }

}
draw();


}

KhanMiner();
