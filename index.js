function KhanMiner () {

// Variables
let money = 0, places = 0, superCash = 0;
let lastTime = Date.now(), currentTime, deltaTime;

const elevatorStates = {
    movingUp : 0,
    movingDown : 1,
    loading : 2,
    unloading : 3
};


// Screen resize while keeping aspect ratio
const originalWidth = 721.5, originalHeight = 962;

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

}
Marsaglia.createRandomized = function () {
    let now = new Date();
    return new Marsaglia((now / 60000) & 0xFFFFFFFF, now & 0xFFFFFFFF);
};
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


// Number abbreviation for money counting, credit to Electric Dolphin ⚡️🐬 (@Dolphin0002)
const numberLetters = ["K", "B", "M", "T", "aa", "ab", "ac", "ad", "ae", "af", "ag", "ah", "ai", "aj", "ak"];
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
class Crate {

    /**
     * Creates a new Crate object
     * @param { number } x - The x-position of the crate
     * @param { number } y - The y-position of the crate
     * @param { number } w - The width of the crate
     * @param { number } h - The height of the crate
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
     * Adds money to the crate
     * @param { number } amount - The amount of money being added
     */
    add (amount) {
        if (amount > 0) {
            this.money += amount;
        }
    }

}

class Miner {

    /**
     * Creates a new Miner object
     * @param { number } x - The x-position of the miner
     * @param { number } y - The y-position of the miner
     * @param { number } w - The width of the miner
     * @param { number } h - The height of the miner
     * @param { Crate } crate - The crate that the miner will offload into
     */
    constructor (x, y, w, h, crate) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.crate = crate;

        this.s = 1;

        this.action = "toDigging";

        this.maxLoad = 10;
        this.has = 0;
        this.loadSpeed = 5;
    }

    update () {

        switch (this.action) {

            case "toDigging" :
                this.s = 1;
                if (this.x < 500) {
                    this.x++;
                }
                else {
                    this.action = "digging";
                }
            break;

            case "digging" : 
                this.s = 1;
                this.has += this.loadSpeed * deltaTime;
                if (this.has >= this.maxLoad) {
                    this.has = this.maxLoad;
                    this.action = "toCrate";
                }
            break;

            case "toCrate" :
                this.s = -1;
                if (this.x > 300) {
                    this.x--;
                }
                else {
                    this.crate.add(this.has);
                    this.has = 0;
                    this.action = "toDigging";
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

            if (this.action === "digging") {
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

}

class Elevator {

    /**
     * Creates a new Elevator object
     * @param { number } x - The x-position of the elevator
     * @param { number } y - The y-position of the elevator
     * @param { number } w - The width of the elevator
     * @param { number } h - The height of the elevator
     * @param { Shaft[] } shafts - The shafts that the elevator will visit
     * @param { Storehouse } storehouse - The storehouse that the elevator will drop its load in
     */
    constructor (x, y, w, h, shafts, storehouse) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.storehouse = storehouse;

        this.action = elevatorStates.movingDown;

        this.money = 0;

        this.moveSpeed = 2;
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

                this.y += this.moveSpeed;

                for (let i = 0; i < this.crates.length; i++) {
                    const crate = this.crates[i];
                    
                    if (!crate.hasUnloaded && this.y + this.h > crate.y + crate.h) {
                        this.y = crate.y + crate.h - this.h;
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

                this.y -= this.moveSpeed;

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
        fill(0);
        beginShape();
            vertex(this.x, this.y + this.h / 20);
            vertex(this.x + this.w * 2 / 15, this.y);
            vertex(this.x + this.w * 13 / 15, this.y);
            vertex(this.x + this.w, this.y + this.h / 20);
            vertex(this.x + this.w, this.y + this.h * 19 / 20);
            vertex(this.x + this.w * 13 / 15, this.y + this.h);
            vertex(this.x + this.w * 2 / 15, this.y + this.h);
            vertex(this.x, this.y + this.h * 19 / 20);
        endShape();

        fill(255);
        textAlign(CENTER, CENTER);
        text(this.money, this.x + this.w / 2, this.y + this.h / 2);

        if (this.action === elevatorStates.loading || this.action === elevatorStates.unloading) {
            fill(255);
            rect(this.x + this.w / 5, this.y - this.h / 16, this.w * 3 / 5, this.h / 20, 1);
            fill(255, 214, 89);
            rect(this.x + this.w / 5, this.y - this.h / 16, map(this.action === elevatorStates.loading ? this.loadTimer : this.unloadTimer, 0, this.loadBarMax, 0, this.w * 3 / 5), this.h / 20, 1);
        }
    }

    display () {
        this.update();
        this.draw();
    }

}

class Storehouse {

    /**
     * Creates a new Storehouse object
     * @param { number } x - The x-position of the storehouse
     * @param { number } y - The y-position of the storehouse
     * @param { number } w - The width of the storehouse
     * @param { number } h - The height of the storehouse
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
        text(this.money, this.x + this.w / 2, this.y + this.h / 2);
    }

}

class Carrier {

    /**
     * Creates a new Carrier object
     * @param { number } x - The x-coordinate of the carrier
     * @param { number } y - The y-coordinate of the carrier
     * @param { number } w - The width of the carrier
     * @param { number } h - The height of the carrier
     * @param { Storehouse} storehouse - The storehouse from which the carrier will get its load
     * @param { Warehouse } warehouse - The warehouse at which the carrier will drop of its load
     */
    constructor (x, y, w, h, storehouse, warehouse) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.storehouse = storehouse;
        this.warehouse = warehouse;

        this.state = "toStorehouse";
    }

    update () {}

    draw () {
        fill(255);
        rect(this.x, this.y, this.w, this.h);
    }

    display () {
        this.update();
        this.draw();
    }

}

class Warehouse {

    /**
     * Creates a new Warehouse object
     * @param { number } x - The x-position of the warehouse
     * @param { number } y - The y-position of the warehouse
     * @param { number } w - The width of the warehouse
     * @param { number } h - The height of the warehouse
     * @param { Carrier[] } carriers - The carriers that will drop their load into the warehouse
     */
    constructor (x, y, w, h, carriers) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.carriers = carriers;
    }

    display () {
        fill(0);
        rect(this.x, this.y, this.w, this.h);
    }

}

class Shaft {

    /**
     * Creates a new Shaft object
     * @param { number } x - The x-position of the shaft
     * @param { number } y - The y-position of the shaft
     * @param { number } w - The width of the shaft
     * @param { number } h - The height of the shaft
     * @param { number } id - The id of the shaft (1 - 30)
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
        rect(100, this.y + 25, 50, 50, 10);
        rect(104, this.y + 29, 42, 42, 6);

        fill(255);
        ctx.font = "bold 30px Arial";
        textAlign(CENTER, CENTER);
        text(this.id, 125, this.y + 53);
        
        for (let i = 0; i < this.miners.length; i++) {
            this.miners[i].display();
        }
        this.crate.draw();
    }

    display () {
        this.update();
        this.draw();
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
        this.buildShaft();

        this.storehouse = new Storehouse(50, 150, 150, 300);

        this.elevator = new Elevator(60, 525, 130, 200, [...this.shafts], this.storehouse);

        this.numCarriers = 1;
        this.carriers = [];
        this.recruitCarrier();

        this.warehouse = new Warehouse(0, 0, 0, 0, [...this.carriers]);
    }

    buildShaft () {
        if (this.numShafts < 30) {
            this.shafts.push(new Shaft(200, 700 + this.shaftOffset, 521.5, 100, this.numShafts + 1));
            this.numShafts++;
            this.shaftOffset += 175;
        }
    }

    recruitCarrier () {
        if (this.numCarriers < 5) {
            this.carriers.push(new Carrier(0, 0, 100, 100, this.storehouse, this.warehouse));
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
            rect(0, 450, canvas.width, 50);

            for (let i = 0; i < 5; i++) {
                let lesserValue = (i === 0 ? 0 : 5) + i * 5;

                fill(i * 15 + 20);
                beginShape();
                    vertex(i * 5 + 50, 500);
                    vertex(-i * 5 + 200, 500);
                    vertex(-i * 5 + 200, this.shafts.length * 175 + 630 - lesserValue);
                    vertex(-i * 5 + 190, this.shafts.length * 175 + 640 - lesserValue);
                    vertex(i * 5 + 60, this.shafts.length * 175 + 640 - lesserValue);
                    vertex(i * 5 + 50, this.shafts.length * 175 + 630 - lesserValue);
                endShape();
            }

            for (let i = 0; i < this.shafts.length; i++) {
                this.shafts[i].display();
            }

            this.elevator.display();

            this.storehouse.display();

            for (let i = 0; i < this.carriers.length; i++) {
                //this.carriers[i].display();
            }

            this.warehouse.display();
        popMatrix();
    }

    display () {
        this.update();
        this.draw();
    }

}

const mine = new Mine();
let currentMine = mine;


// Button class
class Button {

    /**
     * Creates a new Button object
     * @param { number } x - The x-position
     * @param { number } y - The y-position
     * @param { number } w - The width of the button
     * @param { number } h - The height of the button
     * @param { string } txt - The text on the button
     * @param { Function } func - The function to call on click
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
            this.s = lerp(this.s, 1.2, 0.1);
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
                scale(this.w / 80, this.h / 40);
                translate(-(this.x + this.w / 2), -(this.y + this.h / 2));
                fill(0);
                textSize(20);
                textAlign(CENTER, CENTER);
                text(this.txt, this.x + this.w / 2, this.y + this.h / 2);
            popMatrix();
            
        popMatrix();
    }

}
const button = new Button(100, 100, 100, 50, "Shaft", function () {
    currentMine.buildShaft();
    if (currentMine.shafts.length !== 30) {
        currentMine.elevator.crates = currentMine.shafts.map(shaft => shaft.crate);
    }
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

            mine.display();

            button.draw();

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
