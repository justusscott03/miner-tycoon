import { constrain } from "./math.js";

const ctx = document.getElementById("canvas").getContext("2d");

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

export { color, fill, noFill, background, noStroke, strokeWeight, stroke, lerpColor };