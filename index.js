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
let totalMoney = 0, places = 0, superCash = 0;
let lastTime = Date.now(), currentTime, deltaTime;

const minerStates = {
    toDigging : 0,
    digging : 1,
    toCrate : 2
};

const elevatorStates = {
    movingUp : 0,
    movingDown : 1,
    loading : 2,
    unloading : 3
};

const carrierStates = {
    toStorehouse : 0,
    loading : 1,
    toWarehouse : 2,
    unloading : 3
};


// Screen resize while keeping aspect ratio
const originalWidth = 716, originalHeight = 962;

let screenWidth = window.innerWidth, screenHeight = window.innerHeight;

const aspectRatio = originalWidth / originalHeight;

let scaledWidth, scaledHeight;
if (screenWidth / screenHeight > aspectRatio) {
    scaledHeight = screenHeight;
    scaledWidth = scaledHeight * aspectRatio;
}
else {
    scaledWidth = screenWidth;
    scaledHeight = scaledWidth / aspectRatio;
}

function debounce (func, delay) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(function () { func.apply(this, args) }, delay);
    }
}

window.addEventListener("resize", debounce(
    function (event) {
        screenWidth = window.innerWidth;
        screenHeight = window.innerHeight;
        if (screenWidth / screenHeight > aspectRatio) {
            scaledHeight = screenHeight;
            scaledWidth = scaledHeight * aspectRatio;
        }
        else {
            scaledWidth = screenWidth;
            scaledHeight = scaledWidth / aspectRatio;
        }
    }, 300
));


// Canvas
const canvas = document.getElementById("canvas"), ctx = canvas.getContext("2d");


// Canvas resize
canvas.width = originalWidth;
canvas.height = originalHeight;


// PJS
const CORNER = 0, CORNERS = 1, RADIUS = 2, CENTER = 3, SQUARE = "butt", PROJECT = "square", ROUND = "round", MITER = "miter", BEVEL = "bevel", LEFT = 37, RIGHT = 39, BOTTOM = 102, BASELINE = 0;
let curRectMode = CORNER, curEllipseMode = CENTER, requiresFirstVertex = true, angleMode = "degrees", globalFont = "serif", globalSize = 10;

function roundRect (x, y, width, height, radius) {
    ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.arcTo(x + width, y, x + width, y + radius, radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.arcTo(x + width, y + height, x + width - radius, y + height, radius);
        ctx.lineTo(x + radius, y + height);
        ctx.arcTo(x, y + height, x, y + height - radius, radius);
        ctx.lineTo(x, y + radius);
        ctx.arcTo(x, y, x + radius, y, radius);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}
function rect (x, y, w, h, radius) {
    let xPos, yPos, width, height;

    if (curRectMode === CORNER) {
        xPos = x;
        yPos = y;
        width = w;
        height = h;
    }
    else if (curRectMode === CORNERS) {
        xPos = x;
        yPos = y;
        width = w - x;
        height = h - y;
    }
    else if (curRectMode === CENTER) {
        xPos = x - w / 2;
        yPos = y - h / 2;
        width = w;
        height = h;
    }
    else if (curRectMode === RADIUS) {
        xPos = x - w;
        yPos = y - h;
        width = w * 2;
        height = h * 2;
    }

    if (arguments.length === 4) {
        ctx.fillRect(xPos, yPos, width, height);
        ctx.strokeRect(xPos, yPos, width, height);
    }
    else if (arguments.length > 4) {
        roundRect(xPos, yPos, width, height, radius);
    }
}
function arc (x, y, w, h, start, stop) {
    if (stop < start) {
        return;
    }

    ctx.save();
    ctx.translate(x, y);
    ctx.scale(1, h / w);

    ctx.beginPath();
    ctx.arc(0, 0, w / 2, start * Math.PI / 180, stop * Math.PI / 180);
    ctx.fill();
    ctx.stroke();

    ctx.restore();
}
function ellipse (x, y, w, h) {
    let xPos, yPos, width, height;
    
    if (curEllipseMode === CENTER) {
        xPos = x;
        yPos = y;
        width = w;
        height = h;
    }
    else if (curEllipseMode === RADIUS) {
        xPos = x;
        yPos = y;
        width = w * 2;
        height = h * 2;
    }
    else if (curEllipseMode === CORNER) {
        xPos = x + w / 2;
        yPos = y + h / 2;
        width = w;
        height = h;
    }
    else if (curEllipseMode === CORNERS) {
        xPos = (x + w) / 2;
        yPos = (y + h) / 2;
        width = w - x;
        height = h - y;
    }

    arc(xPos, yPos, width, height, 0, 360);
}
function triangle (x1, y1, x2, y2, x3, y3) {
    ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineTo(x3, y3);
    ctx.closePath();

    ctx.fill();
    ctx.stroke();
}
function quad (x1, y1, x2, y2, x3, y3, x4, y4) {
    ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineTo(x3, y3);
        ctx.lineTo(x4, y4);
    ctx.closePath();

    ctx.fill();
    ctx.stroke();
}
function image (image, x, y, w = image.width, h = image.height) {

    ctx.drawImage(image, x, y, w, h);

    if (arguments.length !== 3 && arguments.length !== 5) {
        console.error(`image() requires 3 or 5 parameters, not ${arguments.length}`)
    }
}
function line (x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);

    ctx.stroke();
}
function point (x, y) {
    ctx.fillRect(x, y, 1, 1);
}
function bezier (x1, y1, cx1, cy1, cx2, cy2, x2, y2) {
    ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.bezierCurveTo(cx1, cy1, cx2, cy2, x2, y2);
    ctx.closePath();

    ctx.fill();
    ctx.stroke();
}
function ellipseMode (MODE) {
    if (![CORNER, CORNERS, RADIUS, CENTER].includes(MODE)) {
        console.error("Invalid ellipseMode MODE:", MODE);
    }

    curEllipseMode = MODE;
}
function rectMode (MODE) {
    if (![CORNER, CORNERS, RADIUS, CENTER].includes(MODE)) {
        console.error("Invalid rectMode MODE:", MODE);
    }

    curRectMode = MODE;
}
function strokeCap (MODE) {
    if (![ROUND, SQUARE, PROJECT].includes(MODE)) {
        console.error("Invalid strokeCap mode:", MODE);
    }

    ctx.lineCap = MODE;
}

function beginShape () {
    requiresFirstVertex = true;
    ctx.beginPath();
}
function endShape () {
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}
function vertex (x, y) {
    if (requiresFirstVertex) {
        ctx.moveTo(x, y);
        requiresFirstVertex = false;
    }
    else {
        ctx.lineTo(x, y);
    }
}
function bezierVertex (cx1, cy1, cx2, cy2, x, y) {
    if (requiresFirstVertex) {
        throw new Error("vertex() must be used at least once before calling bezierVertex()")
    }
    else {
        ctx.bezierCurveTo(cx1, cy1, cx2, cy2, x, y);
    }
}
function strokeJoin (MODE) {
    if (![MITER, BEVEL, ROUND].includes(MODE)) {
        console.error("Invalid strokeJoin MODE:", MODE);
    }

    ctx.lineJoin = MODE;
}

function random (low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}
function dist (x1, y1, x2, y2) {
    let distX = x1 - x2;
    let distY = y1 - y2;

    return Math.sqrt(sq(distX) + sq(distY));
}
function constrain (num, lower, upper) {
    return num < lower ? lower : num > upper ? upper : num;
}
function min (num1, num2) {
    return num1 < num2 ? num1 : num2;
}
function max (num1, num2) {
    return num1 > num2 ? num1 : num2;
}
function abs (num) {
    return Math.abs(num);
}
function log (num) {
    return Math.log(num);
}
function pow (num, exponent) {
    return Math.pow(num, exponent);
}
function sq (num) {
    return num * num;
}
function sqrt (num) {
    return Math.sqrt(num);
}
function round (num) {
    return Math.round(num);
}
function ceil (num) {
    return Math.ceil(num);
}
function floor (num) {
    return Math.floor(num);
}
function map (value, start1, stop1, start2, stop2) {
    return start2 + ((value - start1) * (stop2 - start2)) / (stop1 - start1);
}
function lerp (a, b, t) {
    return a + t * (b - a);
}
// Adapted from Khan Academy's ProcessingJS noise(): https://cdn.jsdelivr.net/gh/Khan/processing-js@master/processing.js
class Marsaglia {

    constructor (i1, i2) {
        // from http://www.math.uni-bielefeld.de/~sillke/ALGORITHMS/random/marsaglia-c
        this.z = i1 || 362436069;
        this.w = i2 || 521288629;
    }

    nextInt () {
        this.z = (36969 * (this.z & 65535) + (this.z >>> 16)) & 0xFFFFFFFF;
        this.w = (18000 * (this.w & 65535) + (this.w >>> 16)) & 0xFFFFFFFF;
        return (((this.z & 0xFFFF) << 16) | (this.w & 0xFFFF)) & 0xFFFFFFFF;
    }

    nextDouble () {
        let i = this.nextInt() / 4294967296;
        return i < 0 ? i + 1 : i;
    }

    static createRandomized () {
        let now = new Date();
        return new Marsaglia((now / 60000) & 0xFFFFFFFF, now & 0xFFFFFFFF);
    }

}
class PerlinNoise {
    constructor (seed) {
        let rnd = seed !== undefined ? new Marsaglia(seed) : Marsaglia.createRandomized();
        let i, j;
        // http://www.noisemachine.com/talk1/17b.html
        // http://mrl.nyu.edu/~perlin/noise/
        // generate permutation
        this.perm = new Uint8Array(512);
        for (i = 0; i < 256; ++i) { 
            this.perm[i] = i; 
        }
        for (i = 0; i < 256; ++i) { 
            let t = this.perm[j = rnd.nextInt() & 0xFF]; 
            this.perm[j] = this.perm[i]; 
            this.perm[i] = t; 
        }
        // copy to avoid taking mod in perm[0];
        for (i = 0; i < 256; ++i) { 
            this.perm[i + 256] = this.perm[i]; 
        }
    }

    grad3d (i, x, y, z) {
        let h = i & 15; // convert into 12 gradient directions
        let u = h < 8 ? x : y,
            v = h < 4 ? y : h === 12 || h === 14 ? x : z;
        return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
    };

    grad2d (i, x, y) {
        let v = (i & 1) === 0 ? x : y;
        return (i & 2) === 0 ? -v : v;
    };

    grad1d (i, x) {
        return (i & 1) === 0 ? -x : x;
    };

    noise3d (x, y, z) {
        let X = Math.floor(x) & 255, Y = Math.floor(y) & 255, Z = Math.floor(z) & 255;
        x -= Math.floor(x); y -= Math.floor(y); z -= Math.floor(z);
        let fx = (3 - 2 * x) * x * x, fy = (3 - 2 * y) * y * y, fz = (3 - 2 * z) * z * z;
        let p0 = this.perm[X] + Y, p00 = this.perm[p0] + Z, p01 = this.perm[p0 + 1] + Z,
            p1 = this.perm[X + 1] + Y, p10 = this.perm[p1] + Z, p11 = this.perm[p1 + 1] + Z;
        return lerp(
            lerp( 
                lerp(
                    this.grad3d(this.perm[p00], x, y, z), 
                    this.grad3d(this.perm[p10], x - 1, y, z),
                    fx
                ), 
                lerp(
                    this.grad3d(this.perm[p01], x, y - 1, z), 
                    this.grad3d(this.perm[p11], x - 1, y - 1,z),
                    fx
                ),
                fy
            ),
            lerp(
                lerp(
                    this.grad3d(this.perm[p00 + 1], x, y, z - 1), 
                    this.grad3d(this.perm[p10 + 1], x - 1, y, z - 1),
                    fx
                ),
                lerp(
                    this.grad3d(this.perm[p01 + 1], x, y - 1, z - 1), 
                    this.grad3d(this.perm[p11 + 1], x - 1, y - 1, z - 1),
                    fx
                ),
                fy
            ),
            fz
        );
    };

    noise2d (x, y) {
        let X = Math.floor(x) & 255, Y = Math.floor(y) & 255;
        x -= Math.floor(x); y -= Math.floor(y);
        let fx = (3 - 2 * x) * x * x, fy = (3 - 2 * y) * y * y;
        let p0 = this.perm[X] + Y, p1 = this.perm[X + 1] + Y;
        return lerp(
            lerp(
                this.grad2d(this.perm[p0], x, y), 
                this.grad2d(this.perm[p1], x - 1, y),
                fx
            ),
            lerp(
                this.grad2d(this.perm[p0 + 1], x, y - 1), 
                this.grad2d(this.perm[p1 + 1], x - 1, y - 1),
                fx
            ),
            fy
        );
    };

    noise1d (x) {
        let X = Math.floor(x) & 255;
        x -= Math.floor(x);
        let fx = (3 - 2 * x) * x * x;
        return lerp(
            this.grad1d(this.perm[X], x), 
            this.grad1d(this.perm[X + 1], x - 1),
            fx
        );
    };
}
let noiseProfile = { 
    generator: undefined, 
    octaves: 4, 
    fallout: 0.5, 
    seed: undefined
};
function noise (x, y, z) {
    if (noiseProfile.generator === undefined) {
        // caching
        noiseProfile.generator = new PerlinNoise(noiseProfile.seed);
    }
    let generator = noiseProfile.generator;
    let effect = 1, k = 1, sum = 0;
    for (let i = 0; i < noiseProfile.octaves; i++) {
        effect *= noiseProfile.fallout;
        switch (arguments.length) {
            case 1:
                sum += effect * (1 + generator.noise1d(k*x))/2; 
            break;
            case 2:
                sum += effect * (1 + generator.noise2d(k*x, k*y))/2; 
            break;
            case 3:
                sum += effect * (1 + generator.noise3d(k*x, k*y, k*z))/2; 
            break;
        }
        k *= 2;
    }
    return sum;
}

function toHex (num) {
    let chars = "0123456789ABCDEF";
    
    return chars[(num - (num % 16)) / 16] + chars[num % 16];
}
function color (r, g, b, a) {
    if (g === undefined && b === undefined && a === undefined) {
        g = r;
        b = r;
        a = 255;
    }
    if (b === undefined && a === undefined) {
        a = g;
        g = r;
        b = r;
    }
    if (a === undefined) {
        a = 255;
    }
    
    ctx.globalAlpha = constrain(a / 255, 0, 1);
    return "#" + toHex(r) + toHex(g) + toHex(b);
}
function fill (r, g, b, a) {
    if (typeof r === "string") {
        ctx.fillStyle = r;
    }
    else {
        if (g === undefined && b === undefined && a === undefined) {
            g = r;
            b = r;
            a = 255;
        }
        if (b === undefined && a === undefined) {
            a = g;
            g = r;
            b = r;
        }
        if (a === undefined) {
            a = 255;
        }
        
        ctx.globalAlpha = constrain(a / 255, 0, 1);
        ctx.fillStyle = "#" + toHex(r) + toHex(g) + toHex(b);
    }
}
function noFill () {
    ctx.fillStyle = "rgba(0, 0, 0, 0)";
}
function background (r, g, b, a) {
    fill(r, g, b, a);
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}
function noStroke () {
    ctx.strokeStyle = "rgba(0, 0, 0, 0)";
}
function strokeWeight (thickness) {
    ctx.lineWidth = thickness;
}
function stroke (r, g, b, a) {
    if (typeof r === "string") {
        ctx.strokeStyle = r;
    }
    else {
        if (g === undefined && b === undefined && a === undefined) {
            g = r;
            b = r;
            a = 255;
        }
        if (b === undefined && a === undefined) {
            a = g;
            g = r;
            b = r;
        }
        if (a === undefined) {
            a = 255;
        }
        
        ctx.globalAlpha = constrain(a / 255, 0, 1);
        ctx.strokeStyle = "#" + toHex(r) + toHex(g) + toHex(b);
    }
}
function lerpColor (color1, color2, amt) {
    const parseColor = function (color) {
        let r, g, b;
        if (color.startsWith("#")) {
            const bigint = parseInt(color.slice(1), 16);
            r = (bigint >> 16) & 255;
            g = (bigint >> 8) & 255;
            b = bigint & 255;
        } 
        else if (color.startsWith("rgb")) {
            const match = color.match(/\d+/g);
            r = parseInt(match[0]);
            g = parseInt(match[1]);
            b = parseInt(match[2]);
          }
          return { r, g, b };
    };
  
    const c1 = parseColor(color1);
    const c2 = parseColor(color2);
  
    const r = Math.round(c1.r + (c2.r - c1.r) * amt);
    const g = Math.round(c1.g + (c2.g - c1.g) * amt);
    const b = Math.round(c1.b + (c2.b - c1.b) * amt);
  
    return `rgb(${r}, ${g}, ${b})`;
}

function textFont (font) {
    globalFont = font;
    ctx.font = `${globalSize}px ${globalFont}`;
}
function createFont (font) {
    return font;
}
function textSize (size) {
    globalSize = size;
    ctx.font = `${globalSize}px ${globalFont}`;
}
function textAlign (ALIGN, YALIGN = BASELINE) {
    if (![LEFT, CENTER, RIGHT].includes(ALIGN)) {
        console.error("Invalid textAlign ALIGN:", ALIGN);
    }
    if (![BASELINE, CENTER, BOTTOM].includes(YALIGN)) {
        console.error("Invalid textAlign YALIGN:", YALIGN);
    }

    ALIGN = ALIGN === LEFT ? "start" : ALIGN === CENTER ? "center" : "end";
    YALIGN = YALIGN === BASELINE ? "alphabetic" : YALIGN === CENTER ? "middle" : "bottom";
    
    ctx.textAlign = ALIGN;
    ctx.textBaseline = YALIGN;
}
function text (message, x, y) {
    ctx.fillText(message, x, y);
}
function outlinedText (message, x, y, weight, main, outline, inc = 10) {
    fill(outline);
    for (let i = 0; i < 360; i += inc) {
        text(message, x + sin(i) * weight, y + cos(i) * weight);
    }
    fill(main);
    text(message, x, y);
};

function pushMatrix () {
    ctx.save();
}
function translate (x, y) {
    ctx.translate(x, y);
}
function rotate (angle) {
    ctx.rotate(angle * Math.PI / 180);
}
function scale (amountX, amountY) {
    if (amountY === undefined) {
        amountY = amountX;
    }

    ctx.scale(amountX, amountY);
}
function popMatrix () {
    ctx.restore();
}
function resetMatrix () {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
}

function radians (angle) {
    return angle * Math.PI / 180;
}
function degrees (angle) {
    return angle * 180 / Math.PI;
}
function sin (degrees) {
    return Math.sin(radians(degrees));
}
function cos (degrees) {
    return Math.cos(radians(degrees));
}
function tan (degrees) {
    return Math.tan(radians(degrees));
}
function asin (degrees) {
    return degrees(Math.asin(degrees));
}
function acos (degrees) {
    return degrees(Math.acos(degrees));
}
function atan (degrees) {
    return degrees(Math.atan(degrees));
}
function atan2 (y, x) {
    return degrees(Math.atan2(y, x));
}

function get (x = 0, y = 0, w = canvas.width, h = canvas.height) {

    if (arguments.length === 0 || arguments.length === 4) {
        let imgData = ctx.getImageData(x, y, w, h);

        let offCanvas = document.createElement("canvas");
        offCanvas.width = imgData.width;
        offCanvas.height = imgData.height;
        let offCtx = offCanvas.getContext("2d");

        offCtx.putImageData(imgData, 0, 0);

        return offCanvas;
    }
    else if (arguments.length === 2) {
        let imageData = ctx.getImageData(x, y, 1, 1);
        let [r, g, b, a] = imageData.data;
        return `rgba(${r}, ${g}, ${b}, ${a})`;
    }
    else {
        console.error(`get() requires 0, 2, or, 4 parameters, not ${arguments.length}`)
    }
}
function cursor (cursor) {
    document.body.style.cursor = cursor;
}


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

// Number abbreviation for money counting, credit to Electric Dolphin ⚡️🐬 (@Dolphin0002)
const numberLetters = ["K", "B", "M", "T", "aa", "ab", "ac", "ad", "ae", "af", "ag", "ah", "ai", "aj", "ak"];
/**
 * Estimates the exponent (power of ten) of a given number when expressed in scientific notation.
 * @param { number } num - The number whose exponent is being extracted.
 * @returns { string|number } The exponent as a string if scientific notation is used; otherwise, the length of the number minus one.
 */
function tenthRoot (num) {
    const numStr = num.toString();
    if (numStr[1] === ".") {
        return numStr.substring(numStr.indexOf("e") + 2);
    } 
    else if (numStr[1] === "e") {
        return numStr.substring(3);
    } 
    else {
        return numStr.length - 1;
    }
}

/**
 * Abbreviates a large number to a shorter format (e.g., `1,000,000` → `1M`, `10,000,000,000,000` → `10T`).
 * @param { number } num - The number to abbreviate.
 * @param { boolean } forceZeroes - Whether to display trailing zeroes (up to four significant digits).
 * @returns { string } The abbreviated number string.
 */
function abbreviateNum (num, forceZeroes) {
    if (num < 1000) {
        return num.toString();
    }
    let numStr = num.toString();
    let numStrArr = numStr.split("");
    let numPow = numStr.length - 1;
    if (numStrArr[1] === ".") {
        numPow = numStr.substring(numStrArr.indexOf("e") + 2);
        numStrArr.splice(1, 1);
    }
    if (numStrArr[1] === "e") {
        numPow = numStr.substring(3);
        numStrArr = [numStrArr[0], 0, 0, 0];
    }
    numStr = numStrArr.join("");
    let newNumStr = numStr.slice(0, numPow % 3 + 1) + "." + numStr.slice(numPow % 3 + 1);
    if (!forceZeroes) {
        let newNumArr = newNumStr.substr(0, 5).split("");
        for (let i = newNumArr.length - 1; i >= 0; i--) {
            if (newNumArr[i] !== "0") {
                break;
            } 
            else {
                newNumArr.splice(i, 1);
            }
        }
        if (newNumArr[newNumArr.length - 1] === ".") {
            newNumArr.splice(newNumArr.length - 1, 1);
        }
        newNumStr = newNumArr.join("");
    }
    return newNumStr.substr(0, 5) + numberLetters[floor(numPow/3) - 1];
}


// Game classes
class UpgradePage {

    constructor () {}

}

class Button {

    /**
     * Creates a new Button object.
     * @param { number } x - The x-position.
     * @param { number } y - The y-position.
     * @param { number } w - The width of the button.
     * @param { number } h - The height of the button.
     * @param { string } txt - The text on the button.
     * @param { Function } func - The function to call on click.
     */
    constructor (x, y, w, h, txt, func) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.txt = txt;
        this.func = func;
        this.s = 3;
        this.mouseOver = false;
    }

    draw () {
        this.mouseOver = user.mouseX > this.x && user.mouseX < this.x + this.w &&
                         user.mouseY > this.y && user.mouseY < this.y + this.h;

        if (this.mouseOver) {
            this.s = lerp(this.s, 1.1, 0.1);
            if (user.mouseClicked) {
                this.func();
            }
        }
        else {
            this.s = lerp(this.s, 1, 0.1);
        }

        noStroke();
        pushMatrix();
            translate(this.x + this.w / 2, this.y + this.h / 2);
            scale(this.s);
            translate(-(this.x + this.w / 2), -(this.y + this.h / 2));
            fill(255);
            rect(this.x, this.y, this.w, this.h);
            
            pushMatrix();
                translate(this.x + this.w / 2, this.y + this.h / 2);
                scale(this.w / 40, this.h / 40);
                translate(-(this.x + this.w / 2), -(this.y + this.h / 2));

                strokeWeight(0.5);
                stroke(0);
                fill(255);
                textSize(20);
                textAlign(CENTER, CENTER);
                outlinedText(this.txt, this.x + this.w / 2, this.y + this.h / 2, 1, color(255), color(0));
            popMatrix();
            
        popMatrix();
    }

}

class Crate {

    /**
     * Creates a new Crate object.
     * @param { number } x - The x-position of the crate.
     * @param { number } y - The y-position of the crate.
     * @param { number } w - The width of the crate.
     * @param { number } h - The height of the crate.
     */
    constructor (x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        this.lvl = 1;
        this.money = 100;

        this.hasUnloaded = false;
    }

    draw () {
        noStroke();
        fill(255, 0, 0);
        rect(this.x, this.y, this.w, this.h);

        fill(0);
        textAlign(CENTER, CENTER);
        textSize(30);
        text(abbreviateNum(this.money), this.x + this.w / 2, this.y - this.h / 2);
    }

    /**
     * Adds money to the crate.
     * @param { number } amount - The amount of money being added.
     */
    add (amount) {
        if (amount > 0) {
            this.money += amount;
        }
    }

    toJSON () {
        return {
            x : this.x,
            y : this.y,
            w : this.w,
            h : this.h,
            lvl : this.lvl,
            money : this.money,
            hasUnloaded : this.hasUnloaded
        };
    }

    static fromJSON (data) {
        const crate = new Crate(data.x, data.y, data.w, data.h);
        crate.lvl = data.lvl;
        crate.money = data.money;
        crate.hasUnloaded = data.hasUnloaded;

        return crate;
    }

}

class Miner {

    /**
     * Creates a new Miner object.
     * @param { number } x - The x-position of the miner.
     * @param { number } y - The y-position of the miner.
     * @param { number } w - The width of the miner.
     * @param { number } h - The height of the miner.
     * @param { Crate } crate - The crate that the miner will offload into.
     */
    constructor (x, y, w, h, crate) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.crate = crate;

        this.s = 1;

        this.action = minerStates.toDigging;

        this.maxLoad = 10;
        this.has = 0;
        this.loadSpeed = 5;
        this.moveSpeed = 60;
    }

    update () {

        switch (this.action) {

            case minerStates.toDigging :

                this.s = 1;

                if (this.x < 500) {
                    this.x += this.moveSpeed * deltaTime;
                }
                else {
                    this.action = minerStates.digging;
                }

            break;

            case minerStates.digging : 

                this.s = 1;

                this.has += this.loadSpeed * deltaTime;
                if (this.has >= this.maxLoad) {
                    this.has = this.maxLoad;
                    this.action = minerStates.toCrate;
                }

            break;

            case minerStates.toCrate :

                this.s = -1;

                if (this.x > 300) {
                    this.x -= this.moveSpeed * deltaTime;
                }
                else {
                    this.crate.add(this.has);
                    this.has = 0;
                    this.action = minerStates.toDigging;
                }

            break;

        }

    }

    draw () {
        pushMatrix();

            translate(this.x + this.w / 2, this.y);
            scale(this.s, 1);
            translate(-this.x - this.w / 2, -this.y);

            noStroke();
            fill(0);
            rect(this.x, this.y, this.w / 2, this.h);
            fill(255);
            rect(this.x + this.w / 2, this.y, this.w / 2, this.h);

            if (this.action === minerStates.digging) {
                fill(255);
                rect(this.x - this.w / 6, this.y - this.h / 6, this.w * 4 / 3, this.h / 10);

                fill(255, 214, 89);
                rect(this.x - this.w / 6, this.y - this.h / 6, map(this.has, 0, this.maxLoad, 0, this.w * 4 / 3), this.h / 10);
            }

        popMatrix();
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
            crate : this.crate.toJSON(),
            s : this.s,
            action : this.action,
            maxLoad : this.maxLoad,
            has : this.has,
            loadSpeed : this.loadSpeed,
            moveSpeed : this.moveSpeed
        };
    }

    static fromJSON (data, crate) {
        const miner = new Miner(data.x, data.y, data.w, data.h, crate);
        miner.x = data.x;
        miner.y = data.y;
        miner.w = data.w;
        miner.h = data.h;
        miner.s = data.s;
        miner.action = data.action;
        miner.maxLoad = data.maxLoad;
        miner.has = data.has;
        miner.loadSpeed = data.loadSpeed;
        miner.moveSpeed = data.moveSpeed;

        return miner;
    }

}

class Elevator {

    /**
     * Creates a new Elevator object.
     * @param { number } x - The x-position of the elevator.
     * @param { number } y - The y-position of the elevator.
     * @param { number } w - The width of the elevator.
     * @param { number } h - The height of the elevator.
     * @param { Shaft[] } shafts - The shafts that the elevator will visit.
     * @param { Storehouse } storehouse - The storehouse that the elevator will drop its load in.
     */
    constructor (x, y, w, h, shafts, storehouse) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.storehouse = storehouse;

        this.action = elevatorStates.movingDown;

        this.money = 0;

        this.moveSpeed = 120;
        this.loadSpeed = 2;
        this.maxLoad = 100;
        this.loadTimer = 0;
        this.unloadTimer = 0;

        this.loadBarMax = 0;

        this.crates = shafts.map(shaft => shaft.crate);
        this.curCrate = null;
        this.curCrateIndex = null;

        this.pageOut = false;
    }

    update () {

        switch (this.action) {

            case elevatorStates.movingDown :

                this.y += this.moveSpeed * deltaTime;

                for (let i = 0; i < this.crates.length; i++) {
                    const crate = this.crates[i];
                    
                    if (!crate.hasUnloaded && this.y + this.h * 14 / 17 > crate.y + crate.h) {
                        this.y = crate.y + crate.h - this.h * 14 / 17;
                        this.curCrate = crate;
                        this.curCrateIndex = i;
                        this.action = elevatorStates.loading;
                    }
                }

            break;

            case elevatorStates.loading : 
                
                let moneyToLoad = this.curCrate.money;
                if (this.money + moneyToLoad > this.maxLoad) {
                    moneyToLoad = this.maxLoad - this.money;
                }
                
                const loadTime = moneyToLoad / this.loadSpeed;
                this.loadBarMax = loadTime;

                this.loadTimer++;
                if (this.loadTimer > loadTime) {
                    this.loadTimer = 0;
                    this.money += moneyToLoad;
                    this.curCrate.money -= moneyToLoad;
                    this.curCrate.hasUnloaded = true;
                    this.curCrate = null;
                    if (this.curCrateIndex !== this.crates.length - 1 && this.money < this.maxLoad) {
                        this.action = elevatorStates.movingDown;
                    }
                    else {
                        this.action = elevatorStates.movingUp;
                    }
                }
                
            break;

            case elevatorStates.movingUp :

                this.y -= this.moveSpeed * deltaTime;

                if (this.y < 525) {
                    this.action = elevatorStates.unloading;
                }

            break;

            case elevatorStates.unloading :

                const moneyToUnload = this.money;

                const unloadTime = moneyToUnload / this.loadSpeed;
                this.loadBarMax = unloadTime;

                this.unloadTimer++;
                if (this.unloadTimer > unloadTime) {
                    this.unloadTimer = 0;
                    this.storehouse.money += this.money;
                    this.money = 0;
                    this.action = elevatorStates.movingDown;
                    this.crates.forEach(crate => crate.hasUnloaded = false);
                }

            break;

        }
        
    }

    draw () {

        pushMatrix();

            translate(this.x, this.y);
            scale(this.w / 110, this.h / 170);

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

            fill(255);
            textAlign(CENTER, CENTER);
            text(this.money, this.w / 2, this.h / 2);

            if (this.action === elevatorStates.loading || this.action === elevatorStates.unloading) {
                noStroke();
                fill(255);
                rect(22, -85 / 8, 66, 17 / 2, 1);
                fill(255, 214, 89);
                rect(this.w / 5, -this.h / 16, map(this.action === elevatorStates.loading ? this.loadTimer : this.unloadTimer, 0, this.loadBarMax, 0, this.w * 3 / 5), this.h / 20, 1);
            }

        popMatrix();
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
            storehouse : this.storehouse.toJSON(),
            action : this.action,
            money : this.money,
            moveSpeed : this.moveSpeed,
            loadSpeed : this.loadSpeed,
            maxLoad : this.maxLoad,
            loadTimer : this.loadTimer,
            unloadTimer : this.unloadTimer,
            loadBarMax : this.loadBarMax,
            crates : this.crates.map(crate => crate.toJSON()),
            curCrateIndex : this.curCrateIndex
        };
    }

    static fromJSON (data, shafts, storehouse) {
        const elevator = new Elevator(data.x, data.y, data.w, data.h, shafts, storehouse);
        elevator.action = data.action;
        elevator.money = data.money;
        elevator.moveSpeed = data.moveSpeed;
        elevator.loadSpeed = data.loadSpeed;
        elevator.maxLoad = data.maxLoad;
        elevator.loadTimer = data.loadTimer;
        elevator.unloadTimer = data.unloadTimer;
        elevator.loadBarMax = data.loadBarMax;
        elevator.curCrateIndex = data.curCrateIndex;

        return elevator;
    }

}

class Storehouse {

    /**
     * Creates a new Storehouse object.
     * @param { number } x - The x-position of the storehouse.
     * @param { number } y - The y-position of the storehouse.
     * @param { number } w - The width of the storehouse.
     * @param { number } h - The height of the storehouse.
     */
    constructor (x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.money = 0;
    }

    display () {
        fill(0);
        rect(this.x, this.y, this.w, this.h);
        fill(255);
        textSize(50);
        textAlign(CENTER, CENTER);
        text(this.money, this.x + this.w / 2, this.y + this.h / 2);
    }

    toJSON () {
        return {
            x : this.x,
            y : this.y,
            w : this.w,
            h : this.h,
            money : this.money
        };
    }

    static fromJSON (data) {
        const storehouse = new Storehouse(data.x, data.y, data.w, data.h);
        storehouse.money = data.money;

        return storehouse;
    }

}

class Carrier {

    /**
     * Creates a new Carrier object.
     * @param { number } x - The x-coordinate of the carrier.
     * @param { number } y - The y-coordinate of the carrier.
     * @param { number } w - The width of the carrier.
     * @param { number } h - The height of the carrier.
     * @param { Storehouse} storehouse - The storehouse from which the carrier will get its load.
     * @param { Warehouse } warehouse - The warehouse at which the carrier will drop of its load.
     */
    constructor (x, y, w, h, storehouse, warehouse) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.storehouse = storehouse;
        this.warehouse = warehouse;

        this.s = -1;

        this.action = carrierStates.toStorehouse;

        this.money = 0;

        this.moveSpeed = 60;
        this.loadSpeed = 2;
        this.maxLoad = 100;
        this.loadTimer = 0;
        this.unloadTimer = 0;

        this.loadBarMax = 0;
    }

    update () {

        switch (this.action) {

            case carrierStates.toStorehouse :

                this.s = -1;    
            
                this.x -= this.moveSpeed * deltaTime;

                if (this.x < 300) {
                    this.action = carrierStates.loading;
                }

            break;

            case carrierStates.loading :

                let moneyToLoad = this.storehouse.money;
                if (this.storehouse.money > this.maxLoad) {
                    moneyToLoad = this.maxLoad;
                }

                const loadTime = moneyToLoad / this.loadSpeed;
                this.loadBarMax = loadTime;

                this.loadTimer++;
                if (this.loadTimer > loadTime) {
                    this.loadTimer = 0;
                    this.money += moneyToLoad;
                    this.storehouse.money -= moneyToLoad;
                    this.action = carrierStates.toWarehouse;
                }

            break;

            case carrierStates.toWarehouse :

                this.s = 1;

                this.x += this.moveSpeed * deltaTime;

                if (this.x > 370) {
                    this.action = carrierStates.unloading;
                }

            break;

            case carrierStates.unloading :

                let moneyToUnload = this.money;

                const unloadTime = moneyToUnload / this.loadSpeed;
                this.loadBarMax = unloadTime;

                this.unloadTimer++;
                if (this.unloadTimer > unloadTime) {
                    this.unloadTimer = 0;
                    totalMoney += this.money;
                    this.money = 0;
                    this.action = carrierStates.toStorehouse;
                }

            break;

        }

    }

    draw () {
        pushMatrix();
            translate(this.x + this.w / 2, this.y);
            scale(this.s, 1);
            translate(-this.x - this.w / 2, -this.y);

            fill(255);
            rect(this.x + this.w / 2, this.y, this.w / 2, this.h);
            fill(0);
            rect(this.x, this.y, this.w / 2, this.h);

            fill(0);
            rect(this.x + this.w + 5, this.y + this.h / 3, this.w * 1.5, this.h * 2 / 3);
        popMatrix();

        fill(round(255 / 2));
        textAlign(CENTER, CENTER);
        textSize(40);
        text(this.money, this.x + this.w / 2, this.y + this.h / 2);


        if (this.action === carrierStates.loading || this.action === carrierStates.unloading) {
            fill(255);
            rect(this.x - this.w / 6, this.y - this.h / 6, this.w * 4 / 3, this.h / 10);

            fill(255, 214, 89);
            rect(this.x - this.w / 6, this.y - this.h / 6, map(this.action === carrierStates.loading ? this.loadTimer : this.unloadTimer, 0, this.loadBarMax, 0, this.w * 4 / 3), this.h / 10);
        }
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
            storehouse : this.storehouse.toJSON(),
            warehouse : this.warehouse.toJSON(),
            s : this.s,
            action : this.action,
            money : this.money,
            moveSpeed : this.moveSpeed,
            loadSpeed : this.loadSpeed,
            maxLoad : this.maxLoad,
            loadTimer : this.loadTimer,
            unloadTimer : this.unloadTimer,
            loadBarMax : this.loadBarMax
        };
    }

    static fromJSON (data, storehouse, warehouse) {
        const carrier = new Carrier(data.x, data.y, data.w, data.h, storehouse, warehouse);
        carrier.s = data.s;
        carrier.action = data.action;
        carrier.money = data.money;
        carrier.moveSpeed = data.moveSpeed;
        carrier.loadSpeed = data.loadSpeed;
        carrier.maxLoad = data.maxLoad;
        carrier.loadTimer = data.loadTimer;
        carrier.unloadTimer = data.unloadTimer;
        carrier.loadBarMax = data.loadBarMax;

        return carrier;
    }

}

class Warehouse {

    /**
     * Creates a new Warehouse object.
     * @param { number } x - The x-position of the warehouse.
     * @param { number } y - The y-position of the warehouse.
     * @param { number } w - The width of the warehouse.
     * @param { number } h - The height of the warehouse.
     */
    constructor (x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    display () {
        fill(0);
        rect(this.x, this.y, this.w, this.h);
    }

    toJSON () {
        return {
            x : this.x,
            y : this.y,
            w : this.w,
            h : this.h
        };
    }
    
    static fromJSON (data) {
        return new Warehouse(data.x, data.y, data.w, data.h);
    }

}

class Shaft {

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
        this.pageOutButton = new Button(this.x + this.w * 4 / 5, this.y + this.h / 4, 50, 50, this.level, function () {
            t.pageOut = true;
        });
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
        textAlign(CENTER, CENTER);
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

class Barrier {

    constructor (x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

}

class Mine {

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
            textAlign(CENTER, CENTER);
            text(totalMoney, canvas.width / 2, 50);
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

const mine = new Mine();
let currentMine = mine;


// Button definitions
const button = new Button(100, 100, 100, 100, "Shaft", function () {
    currentMine.buildShaft();
});
const savePageButton = new Button(500, 0, 50, 50, "", function () {
    document.getElementById("savePage").style.display = "block";
});


// UI, credit to Dat (@Dddatt)
const user = (function (out) {
        
    out.mouseX = 0;
    out.mouseY = 0;
    out.mousePressed = false;
    out.mouseClicked = false;
    
    out.keys = {};
    
    canvas.addEventListener("mousedown", function (e) {
        out.mousePressed = true;
    });
    
    canvas.addEventListener("mouseup", function (e) {
        out.mousePressed = false;
        out.mouseClicked = true;
    });
    
    canvas.addEventListener("mousemove", function (e) {
        out.mouseX = e.x * (originalWidth / window.innerWidth);
        out.mouseY = e.y * (originalHeight / window.innerHeight);
    });
    
    document.addEventListener("keydown", function (e) {
        let key = e.key.toLowerCase();
        
        out.keys[key] = true;
    });
    
    document.addEventListener("keyup", function (e) {
        out.keys[e.key.toLowerCase()] = false;
    });
    
    document.addEventListener("contextmenu", function (e) {
        //e.preventDefault();
    });
    
    canvas.addEventListener("wheel", function (e) {          
        e.preventDefault();

        let targetY = currentMine.y;
        targetY += e.deltaY * 2;
        currentMine.y = lerp(currentMine.y, targetY, 0.1);
        currentMine.y = constrain(currentMine.y, -4950, 0);
    });
    
    out.update = function () {
        out.mouseClicked = false;
    };
    
    return out;
    
}) ({});


// Load and save game functions
let saves = [];

function saveGame () {
    const now = new Date();
    const formattedDate = `${now.getMonth() + 1} \u2022 ${now.getDate()} \u2022 ${now.getFullYear()}`;
    const formattedTime = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;

    const state = {
        totalMoney : totalMoney,
        superCash : superCash,
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

            scale(scaledWidth / originalWidth, scaledHeight / originalHeight);

            currentMine.display();

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
