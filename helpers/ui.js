import { screenSize } from "./screenResize.js";

// UI, credit to Dat (@Dddatt)
const canvas = document.getElementById("canvas");

export const user = (function (out) {
        
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
        out.mouseX = e.x * (screenSize.originalWidth / window.innerWidth);
        out.mouseY = e.y * (screenSize.originalHeight / window.innerHeight);
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
    
    out.update = function () {
        out.mouseClicked = false;
    };
    
    return out;
    
}) ({});
