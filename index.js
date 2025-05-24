(function () {

// Variables
let money = 0;
let places = 0;
let superCash = 0;
let curRectMode = "CORNER";
let curEllipseMode = "CENTER"
let requiresFirstVertex = true;
let angleMode = "degrees";
let globalFont = "serif";
let globalSize = 10;


// Screen resize while keeping aspect ratio
const originalWidth = 721.5;
const originalHeight = 962;

let screenWidth = window.innerWidth;
let screenHeight = window.innerHeight;

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


// Canvases
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const uiCanvas = document.getElementById("ui-canvas");


// Canvas resize
canvas.width = originalWidth;
canvas.height = originalHeight;

uiCanvas.width = originalWidth;
uiCanvas.height = originalHeight;


// PJS
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

    if (curRectMode === "CORNER") {
        xPos = x;
        yPos = y;
        width = w;
        height = h;
    }
    else if (curRectMode === "CORNERS") {
        xPos = x;
        yPos = y;
        width = w - x;
        height = h - y;
    }
    else if (curRectMode === "CENTER") {
        xPos = x - w / 2;
        yPos = y - h / 2;
        width = w;
        height = h;
    }
    else if (curRectMode === "RADIUS") {
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
    
    if (curEllipseMode === "CENTER") {
        xPos = x;
        yPos = y;
        width = w;
        height = h;
    }
    else if (curEllipseMode === "RADIUS") {
        xPos = x;
        yPos = y;
        width = w * 2;
        height = h * 2;
    }
    else if (curEllipseMode === "CORNER") {
        xPos = x + w / 2;
        yPos = y + h / 2;
        width = w;
        height = h;
    }
    else if (curEllipseMode === "CORNERS") {
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
    curEllipseMode = MODE;
}
function rectMode (MODE) {
    curRectMode = MODE;
}
function strokeCap (MODE) {
    if (MODE === "SQUARE") {
        MODE = "butt";
    }
    if (MODE === "ROUND") {
        MODE = "round";
    }
    if (MODE === "PROJECT") {
        MODE = "square";
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
function textAlign (ALIGN, YALIGN = "BASELINE") {
    if (ALIGN === "LEFT") {
        ALIGN = "start";
    }
    if (ALIGN === "CENTER") {
        ALIGN = "center";
    }
    if (ALIGN === "RIGHT") {
        ALIGN = "end";
    }

    if (YALIGN === "BASELINE") {
        YALIGN = "alphabetic";
    }
    if (YALIGN === "CENTER") {
        YALIGN = "middle";
    }
    if (YALIGN === "BOTTOM") {
        YALIGN = "bottom";
    }
    
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

    constructor (x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.lvl = 1;
        this.money = 0;
    }

    draw () {
        noStroke();
        fill(255, 0, 0);
        rect(this.x, this.y, this.w, this.h);

        fill(0);
        textAlign("CENTER", "CENTER");
        textSize(50);
        text(abbreviateNum(this.money), this.x + this.w / 2, this.y - this.h / 2);
    }

}

class Miner {

    /**
     * 
     * @param { number } x 
     * @param { number } y 
     * @param { number } w 
     * @param { number } h 
     */
    constructor (x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.s = 1;
        this.action = "toDigging";
        this.maxLoad = 10;
        this.has = 0;
        this.loadSpeed = 5;
    }

    update () {
        switch (this.action) {
            case "toDigging" :
                if (this.x < 500) {
                    this.x++;
                }
                else {
                    this.action = "digging";
                }
            break;
            case "digging" : 
                this.has += this.loadSpeed / 60;
                if (this.has >= this.maxLoad) {
                    this.has = this.maxLoad;
                    this.action = "toCrate";
                }
            break;
            case "toCrate" :  
                if (this.x > 300) {
                    this.x--;
                }
            break;
        }
        console.log(this.action)
    }

    draw () {
        pushMatrix();

            translate(this.x, this.y);
            scale(this.s, 1);

            noStroke();
            fill(0);
            rect(0, 0, this.w, this.h);

            if (this.action === "digging") {
                fill(255);
                rect(-this.w / 6, -this.h / 6, this.w * 4 / 3, this.h / 10);

                fill(255, 214, 89);
                rect(-this.w / 6, -this.h / 6, map(this.has, 0, this.maxLoad, 0, this.w * 4 / 3), this.h / 10);
            }

        popMatrix();
    }

    display () {
        this.update();
        this.draw();
    }

}

class Elevator {

    constructor (x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.loading = false;
        this.unloading = false;
        this.pageOut = false;
    }

    draw () {
        fill(0);
        rect(this.x, this.y, this.w, this.h);
    }

}

class Storehouse {

    constructor (x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.money = 0;
    }

    draw () {
        fill(0);
        rect(this.x, this.y, this.w, this.h);
    }

}

class Carrier {

    constructor (x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.loading = false;
        this.unloading = false;
    }

    draw () {
        fill(255);
        rect(this.x, this.y, this.w, this.h);
    }

}

class Warehouse {

    constructor (x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    draw () {
        fill(0);
        rect(this.x, this.y, this.w, this.h);
    }

}

class Shaft {

    constructor (x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.crate = new Crate(this.x + this.w / 20, this.y + this.h * 2 / 3, this.w / 6, this.h / 3);
        this.workersX = 0;
        this.numWorkers = 1;
        this.workers = [
            new Miner(this.x + this.workersX, this.y + this.h / 3, this.w / 10, this.h * 2 / 3),
            new Miner(this.x + this.workersX, this.y + this.h / 3, this.w / 10, this.h * 2 / 3),
            new Miner(this.x + this.workersX, this.y + this.h / 3, this.w / 10, this.h * 2 / 3),
            new Miner(this.x + this.workersX, this.y + this.h / 3, this.w / 10, this.h * 2 / 3),
            new Miner(this.x + this.workersX, this.y + this.h / 3, this.w / 10, this.h * 2 / 3),
            new Miner(this.x + this.workersX, this.y + this.h / 3, this.w / 10, this.h * 2 / 3)
        ];
        this.built = false;
        this.pageOut = false;
    }

    update () {}

    draw () {
        fill(150);
        rect(this.x, this.y, this.w, this.h);
        for (var i = 0; i < this.numWorkers; i++) {
            this.workers[i].display();
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
        this.numShafts = 1;
        this.shafts = [];
        for (let i = 0; i < 30; i++) {
            this.shafts.push(new Shaft(250, this.y + 300 + i * 150, 471.5, 150));
        }

        this.elevator = new Elevator();
        this.storeHouse = new Storehouse();
        this.warehouse = new Warehouse();
        this.numCarriers = 1;
        this.carriers = [];
    }

    update () {}

    draw () {
        background(135, 109, 47);
        for (var i = 0; i < this.numShafts; i++) {
            this.shafts[i].display();
        }
    }

    display () {
        this.update();
        this.draw();
    }

}

const mine = new Mine();

//}

/** Buttons **/
// {

class Button {

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
        noStroke();
        pushMatrix();
            translate(this.x + this.w / 2, this.y + this.h / 2);
            scale(this.s);
            translate(-(this.x + this.w / 2), -(this.y + this.h / 2));
            fill(219, 243, 255);
            quad(this.x + 5, this.y, this.x + 95, this.y, this.x + 92, this.y + 3, this.x + 8, this.y + 3);
            fill(185, 227, 247);
            quad(this.x + 5, this.y, this.x + 8, this.y + 3, this.x + 4, this.y + 8, this.x, this.y + 7);
            quad(this.x + 95, this.y, this.x + 92, this.y + 3, this.x + 96, this.y + 8, this.x + this.w, this.y + 7);
            fill(150, 222, 255);
            beginShape();
                //vertex(this.x + 
            endShape();
            
            pushMatrix();
                translate(this.x + this.w / 2, this.y + this.h / 2);
                scale(this.w / 40, this.h / 20);
                translate(-(this.x + this.w / 2), -(this.y + this.h / 2));
                fill(0);
                textAlign(CENTER, CENTER);
                text(this.txt, this.x + this.w / 2, this.y + this.h / 2);
            popMatrix();
            
        popMatrix();
        
        if (this.mouseOver) {
            this.s = lerp(this.s, 1.2, 0.1);
        }
        else {
            this.s = lerp(this.s, 1, 0.1);
        }
        
        this.mouseOver = mouseX > this.x && mouseX < this.x + this.w &&
                         mouseY > this.y && mouseY < this.y + this.h;
    }

    clicked () {
        if (this.mouseOver) {
            this.func();
        }
    }

}

//}

/** Draw and mouseClicked functions **/
// {

function draw () {

    try {

        resetMatrix();
        
        background(255);

        pushMatrix();
            scale(scaledWidth / originalWidth, scaledHeight / originalHeight);

            mine.display();

        popMatrix();

        requestAnimationFrame(draw);

    }
    catch (e) {
        console.error(e);
    }

}

draw();

//}

}) ();
