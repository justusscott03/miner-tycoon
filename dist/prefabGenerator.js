/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/engine/config/ComponentRegistry.ts"
/*!************************************************!*\
  !*** ./src/engine/config/ComponentRegistry.ts ***!
  \************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ComponentRegistry: () => (/* binding */ ComponentRegistry)
/* harmony export */ });
/* harmony import */ var _core_ECS_components_SpriteRenderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/ECS/components/SpriteRenderer */ "./src/engine/core/ECS/components/SpriteRenderer.ts");
/* harmony import */ var _core_ECS_components_ui_ProgressBarUI__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/ECS/components/ui/ProgressBarUI */ "./src/engine/core/ECS/components/ui/ProgressBarUI.ts");


const ComponentRegistry = {
    SpriteRenderer: _core_ECS_components_SpriteRenderer__WEBPACK_IMPORTED_MODULE_0__.SpriteRendererDef,
    ProgressBarUI: _core_ECS_components_ui_ProgressBarUI__WEBPACK_IMPORTED_MODULE_1__.ProgressBarUIDef
};


/***/ },

/***/ "./src/engine/config/ImportMap.ts"
/*!****************************************!*\
  !*** ./src/engine/config/ImportMap.ts ***!
  \****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ImportMap: () => (/* binding */ ImportMap)
/* harmony export */ });
const ImportMap = {
    Vector2: "src/engine/core/math/Vector2",
    color: "src/engine/lib/colors",
    Prefab: "src/engine/core/ECS/Prefab"
};


/***/ },

/***/ "./src/engine/core/ECS/components/Renderer.ts"
/*!****************************************************!*\
  !*** ./src/engine/core/ECS/components/Renderer.ts ***!
  \****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Renderer: () => (/* binding */ Renderer)
/* harmony export */ });
/* harmony import */ var _main_Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../main/Component */ "./src/engine/core/ECS/main/Component.ts");

class Renderer extends _main_Component__WEBPACK_IMPORTED_MODULE_0__.Component {
    Render() { }
}


/***/ },

/***/ "./src/engine/core/ECS/components/SpriteRenderer.ts"
/*!**********************************************************!*\
  !*** ./src/engine/core/ECS/components/SpriteRenderer.ts ***!
  \**********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SpriteRenderer: () => (/* binding */ SpriteRenderer),
/* harmony export */   SpriteRendererDef: () => (/* binding */ SpriteRendererDef)
/* harmony export */ });
/* harmony import */ var _helpers_ImageManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../helpers/ImageManager */ "./src/engine/helpers/ImageManager.ts");
/* harmony import */ var _lib_shapes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../lib/shapes */ "./src/engine/lib/shapes.ts");
/* harmony import */ var _Renderer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Renderer */ "./src/engine/core/ECS/components/Renderer.ts");
/* harmony import */ var _math_Vector2__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../math/Vector2 */ "./src/engine/core/math/Vector2.ts");
/* harmony import */ var _ui_UIBindings_TypeUIBindings_NumberUI__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../ui/UIBindings/TypeUIBindings/NumberUI */ "./src/engine/ui/UIBindings/TypeUIBindings/NumberUI.ts");
/* harmony import */ var _ui_UIBindings_TypeUIBindings_Vector2UI__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../ui/UIBindings/TypeUIBindings/Vector2UI */ "./src/engine/ui/UIBindings/TypeUIBindings/Vector2UI.ts");
/* harmony import */ var _ui_UIBindings_TypeUIBindings_StringUI__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../ui/UIBindings/TypeUIBindings/StringUI */ "./src/engine/ui/UIBindings/TypeUIBindings/StringUI.ts");







const SpriteRendererDef = {
    import: "src/engine/core/ECS/components/SpriteRenderer.js",
    params: {
        sprite: new _ui_UIBindings_TypeUIBindings_StringUI__WEBPACK_IMPORTED_MODULE_6__.StringUI("Sprite Name"),
        width: new _ui_UIBindings_TypeUIBindings_NumberUI__WEBPACK_IMPORTED_MODULE_4__.NumberUI(0),
        height: new _ui_UIBindings_TypeUIBindings_NumberUI__WEBPACK_IMPORTED_MODULE_4__.NumberUI(0),
        position: new _ui_UIBindings_TypeUIBindings_Vector2UI__WEBPACK_IMPORTED_MODULE_5__.Vector2UI({ x: 0, y: 0 })
    }
};
class SpriteRenderer extends _Renderer__WEBPACK_IMPORTED_MODULE_2__.Renderer {
    constructor() {
        super(...arguments);
        this.spriteName = "";
        this.width = 0;
        this.height = 0;
        this.spriteOffset = _math_Vector2__WEBPACK_IMPORTED_MODULE_3__.Vector2.zero;
    }
    initialize(spriteName, width, height, spriteOffset = _math_Vector2__WEBPACK_IMPORTED_MODULE_3__.Vector2.zero) {
        this.spriteName = spriteName;
        this.width = width;
        this.height = height;
        this.spriteOffset = spriteOffset;
    }
    Render() {
        if (!this.spriteName)
            return;
        const img = _helpers_ImageManager__WEBPACK_IMPORTED_MODULE_0__.ImageManager.Instance.get(this.spriteName);
        const scale = this.transform.scale;
        const offset = this.spriteOffset;
        (0,_lib_shapes__WEBPACK_IMPORTED_MODULE_1__.image)(img, offset.x, offset.y, this.width * scale.x, this.height * scale.y);
    }
}


/***/ },

/***/ "./src/engine/core/ECS/components/UIComponent.ts"
/*!*******************************************************!*\
  !*** ./src/engine/core/ECS/components/UIComponent.ts ***!
  \*******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UIComponent: () => (/* binding */ UIComponent)
/* harmony export */ });
/* harmony import */ var _main_Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../main/Component */ "./src/engine/core/ECS/main/Component.ts");
/* harmony import */ var _math_Vector2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../math/Vector2 */ "./src/engine/core/math/Vector2.ts");


class UIComponent extends _main_Component__WEBPACK_IMPORTED_MODULE_0__.Component {
    constructor() {
        super(...arguments);
        this.screenSpace = true; // default: UI is screen-space
        this.relativePosition = _math_Vector2__WEBPACK_IMPORTED_MODULE_1__.Vector2.zero;
        this.hidden = false;
    }
    RenderUI() { }
}


/***/ },

/***/ "./src/engine/core/ECS/components/ui/ProgressBarUI.ts"
/*!************************************************************!*\
  !*** ./src/engine/core/ECS/components/ui/ProgressBarUI.ts ***!
  \************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ProgressBarUI: () => (/* binding */ ProgressBarUI),
/* harmony export */   ProgressBarUIDef: () => (/* binding */ ProgressBarUIDef)
/* harmony export */ });
/* harmony import */ var _lib_colors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../lib/colors */ "./src/engine/lib/colors.ts");
/* harmony import */ var _lib_shapes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../lib/shapes */ "./src/engine/lib/shapes.ts");
/* harmony import */ var _lib_math__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../lib/math */ "./src/engine/lib/math.ts");
/* harmony import */ var _UIComponent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../UIComponent */ "./src/engine/core/ECS/components/UIComponent.ts");
/* harmony import */ var _math_Vector2__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../math/Vector2 */ "./src/engine/core/math/Vector2.ts");
/* harmony import */ var _ui_UIBindings_TypeUIBindings_NumberUI__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../ui/UIBindings/TypeUIBindings/NumberUI */ "./src/engine/ui/UIBindings/TypeUIBindings/NumberUI.ts");
/* harmony import */ var _ui_UIBindings_TypeUIBindings_Vector2UI__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../ui/UIBindings/TypeUIBindings/Vector2UI */ "./src/engine/ui/UIBindings/TypeUIBindings/Vector2UI.ts");
/* harmony import */ var _ui_UIBindings_TypeUIBindings_ColorUI__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../ui/UIBindings/TypeUIBindings/ColorUI */ "./src/engine/ui/UIBindings/TypeUIBindings/ColorUI.ts");








const ProgressBarUIDef = {
    import: "src/engine/core/ECS/components/ui/ProgressBarUI",
    params: {
        fillColor: new _ui_UIBindings_TypeUIBindings_ColorUI__WEBPACK_IMPORTED_MODULE_7__.ColorUI("#FF0000"),
        backColor: new _ui_UIBindings_TypeUIBindings_ColorUI__WEBPACK_IMPORTED_MODULE_7__.ColorUI("#646464"),
        max: new _ui_UIBindings_TypeUIBindings_NumberUI__WEBPACK_IMPORTED_MODULE_5__.NumberUI(100),
        w: new _ui_UIBindings_TypeUIBindings_NumberUI__WEBPACK_IMPORTED_MODULE_5__.NumberUI(100),
        relativePosition: new _ui_UIBindings_TypeUIBindings_Vector2UI__WEBPACK_IMPORTED_MODULE_6__.Vector2UI({ x: 0, y: 0 })
    }
};
class ProgressBarUI extends _UIComponent__WEBPACK_IMPORTED_MODULE_3__.UIComponent {
    constructor() {
        super(...arguments);
        this.fillColor = "#FF0000";
        this.backColor = "#888888";
        this.current = 50;
        this.max = 100;
        this.w = 100;
        this.h = 40;
    }
    initialize(fillColor, backColor, max, w = 100, h = 40, relativePosition = _math_Vector2__WEBPACK_IMPORTED_MODULE_4__.Vector2.zero) {
        this.fillColor = fillColor;
        this.backColor = backColor;
        this.max = max;
        this.w = w;
        this.h = h;
        this.relativePosition = relativePosition;
    }
    RenderUI() {
        let x = this.transform.position.x + this.relativePosition.x;
        let y = this.transform.position.y + this.relativePosition.y;
        (0,_lib_colors__WEBPACK_IMPORTED_MODULE_0__.noStroke)();
        (0,_lib_colors__WEBPACK_IMPORTED_MODULE_0__.fill)(this.backColor);
        (0,_lib_shapes__WEBPACK_IMPORTED_MODULE_1__.rect)(x, y, this.w, this.h);
        (0,_lib_colors__WEBPACK_IMPORTED_MODULE_0__.fill)(this.fillColor);
        (0,_lib_shapes__WEBPACK_IMPORTED_MODULE_1__.rect)(x, y, (0,_lib_math__WEBPACK_IMPORTED_MODULE_2__.map)(this.current, 0, this.max, 0, this.w), this.h);
    }
}


/***/ },

/***/ "./src/engine/core/ECS/main/Component.ts"
/*!***********************************************!*\
  !*** ./src/engine/core/ECS/main/Component.ts ***!
  \***********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Component: () => (/* binding */ Component)
/* harmony export */ });
/* harmony import */ var _EngineObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EngineObject */ "./src/engine/core/ECS/main/EngineObject.ts");

class Component extends _EngineObject__WEBPACK_IMPORTED_MODULE_0__.EngineObject {
    get transform() {
        return this.gameObject.transform;
    }
    GetComponent(type) {
        return this.gameObject.GetComponent(type);
    }
    AddComponent(type) {
        return this.gameObject.AddComponent(type);
    }
    RemoveComponent(type) {
        return this.gameObject.RemoveComponent(type);
    }
}


/***/ },

/***/ "./src/engine/core/ECS/main/EngineObject.ts"
/*!**************************************************!*\
  !*** ./src/engine/core/ECS/main/EngineObject.ts ***!
  \**************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EngineObject: () => (/* binding */ EngineObject)
/* harmony export */ });
class EngineObject {
    constructor() {
        this.id = EngineObject._nextId++;
    }
}
EngineObject._nextId = 1;


/***/ },

/***/ "./src/engine/core/math/Vector2.ts"
/*!*****************************************!*\
  !*** ./src/engine/core/math/Vector2.ts ***!
  \*****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Vector2: () => (/* binding */ Vector2)
/* harmony export */ });
class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    set(newX, newY) {
        this.x = newX;
        this.y = newY;
    }
    static add(a, b) {
        return new Vector2(a.x + b.x, a.y + b.y);
    }
    add(add) {
        this.x += add.x;
        this.y += add.y;
        return this;
    }
    static sub(a, b) {
        return new Vector2(a.x - b.x, a.y - b.y);
    }
    sub(sub) {
        this.x -= sub.x;
        this.y -= sub.y;
        return this;
    }
    static multiply(a, b) {
        return new Vector2(a.x * b.x, a.y * b.y);
    }
    multiply(scale) {
        this.x *= scale.x;
        this.y *= scale.y;
        return this;
    }
    static dist(a, b) {
        let distX = Math.abs(a.x - b.x);
        let distY = Math.abs(a.y - b.y);
        return new Vector2(Math.sqrt(distX * distX), Math.sqrt(distY * distY));
    }
    clone() {
        return new Vector2(this.x, this.y);
    }
    static get zero() {
        return new Vector2(0, 0);
    }
    static get right() {
        return new Vector2(1, 0);
    }
    static get left() {
        return new Vector2(-1, 0);
    }
    static get up() {
        return new Vector2(0, 1);
    }
    static get down() {
        return new Vector2(0, -1);
    }
}


/***/ },

/***/ "./src/engine/helpers/CanvasManager.ts"
/*!*********************************************!*\
  !*** ./src/engine/helpers/CanvasManager.ts ***!
  \*********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CanvasManager: () => (/* binding */ CanvasManager)
/* harmony export */ });
// src/engine/CanvasManager.ts
class CanvasManager {
    // Lazy getter for canvas
    static getCanvas() {
        if (!this.canvas) {
            const found = document.getElementById("canvas");
            if (!found) {
                throw new Error("CanvasManager: Canvas element #canvas not found in DOM");
            }
            this.canvas = found;
            this.width = found.width;
            this.height = found.height;
        }
        return this.canvas;
    }
    // Lazy getter for ctx
    static getCtx() {
        if (!this.ctx) {
            const context = this.getCanvas().getContext("2d");
            if (!context) {
                throw new Error("CanvasManager: 2D context not supported");
            }
            this.ctx = context;
        }
        return this.ctx;
    }
    // Optional explicit initialization
    static init(canvasId) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) {
            throw new Error(`CanvasManager: Canvas #${canvasId} not found`);
        }
        const ctx = canvas.getContext("2d");
        if (!ctx) {
            throw new Error("CanvasManager: 2D context not supported");
        }
        this.canvas = canvas;
        this.ctx = ctx;
        this.width = canvas.width;
        this.height = canvas.height;
        console.log(`Canvas initialized: ${canvasId} (${this.width}x${this.height})`);
    }
    // Resize logic
    static resize(originalWidth, originalHeight, newWidth, newHeight) {
        const canvas = this.getCanvas();
        canvas.width = originalWidth;
        canvas.height = originalHeight;
        this.width = originalWidth;
        this.height = originalHeight;
        canvas.style.width = `${newWidth}px`;
        canvas.style.height = `${newHeight}px`;
    }
}
CanvasManager.width = 0;
CanvasManager.height = 0;


/***/ },

/***/ "./src/engine/helpers/ColorHelpers.ts"
/*!********************************************!*\
  !*** ./src/engine/helpers/ColorHelpers.ts ***!
  \********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ColorHelpers: () => (/* binding */ ColorHelpers)
/* harmony export */ });
class ColorHelpers {
    static hexToRGB(hex) {
        const cleaned = hex.replace("#", "");
        if (cleaned.length === 3) {
            return {
                r: parseInt(cleaned[0] + cleaned[0], 16),
                g: parseInt(cleaned[1] + cleaned[1], 16),
                b: parseInt(cleaned[2] + cleaned[2], 16)
            };
        }
        return {
            r: parseInt(cleaned.substring(0, 2), 16),
            g: parseInt(cleaned.substring(2, 4), 16),
            b: parseInt(cleaned.substring(4, 6), 16)
        };
    }
}


/***/ },

/***/ "./src/engine/helpers/ImageManager.ts"
/*!********************************************!*\
  !*** ./src/engine/helpers/ImageManager.ts ***!
  \********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ImageManager: () => (/* binding */ ImageManager)
/* harmony export */ });
class ImageManager {
    static init(canvas) {
        if (!this._instance) {
            this._instance = new ImageManager(canvas);
        }
        return this._instance;
    }
    static get Instance() {
        if (!this._instance) {
            throw new Error("ImageManager not initialized. Call ImageManager.init(canvas) first.");
        }
        return this._instance;
    }
    // ─────────────────────────────────────────────
    // Constructor
    // ─────────────────────────────────────────────
    constructor(canvas) {
        this.canvas = canvas;
        /** Map of image name → generator function */
        this.generators = {};
        /** Map of image name → cached image data */
        this.cache = {};
        /** Loading progress */
        this.curLoad = 0;
        this.loaded = false;
        this.ctx = canvas.getContext("2d");
    }
    // ─────────────────────────────────────────────
    // Engine API
    // ─────────────────────────────────────────────
    /** Clears the offscreen canvas before generating an image */
    resetCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.globalAlpha = 1.0;
        this.ctx.globalCompositeOperation = "source-over";
        this.ctx.lineWidth = 1.0;
        this.ctx.lineCap = "butt";
        this.ctx.lineJoin = "miter";
        this.ctx.miterLimit = 10;
        this.ctx.strokeStyle = "#000000";
        this.ctx.fillStyle = "#000000";
        this.ctx.font = "10px sans-serif";
        this.ctx.textAlign = "start";
        this.ctx.textBaseline = "alphabetic";
    }
    /** Register a new image generator (game layer calls this) */
    register(name, generator) {
        this.generators[name] = generator;
    }
    /** Incrementally generate the next image */
    loadNext() {
        const keys = Object.keys(this.generators);
        this.resetCanvas();
        const key = keys[this.curLoad];
        this.cache[key] = this.generators[key]();
        this.curLoad++;
        if (this.curLoad >= keys.length) {
            this.loaded = true;
        }
    }
    /** Retrieve a generated image */
    get(name) {
        return this.cache[name];
    }
}
// ─────────────────────────────────────────────
// Singleton
// ─────────────────────────────────────────────
ImageManager._instance = null;


/***/ },

/***/ "./src/engine/helpers/PathHelpers.ts"
/*!*******************************************!*\
  !*** ./src/engine/helpers/PathHelpers.ts ***!
  \*******************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PathHelpers: () => (/* binding */ PathHelpers)
/* harmony export */ });
class PathHelpers {
    static getRelativeImportPath(fromFolder, toPath) {
        const fromParts = fromFolder.split("/").filter(Boolean);
        const toParts = toPath.split("/").filter(Boolean);
        // Remove common prefix
        while (fromParts.length && toParts.length && fromParts[0] === toParts[0]) {
            fromParts.shift();
            toParts.shift();
        }
        // Go up for each remaining folder in fromParts
        const ups = fromParts.map(() => "..");
        return [...ups, ...toParts].join("/");
    }
    static isExternalPath(path) {
        return /^[a-z]+:\/\//i.test(path) || path.startsWith("//");
    }
}


/***/ },

/***/ "./src/engine/lib/colors.ts"
/*!**********************************!*\
  !*** ./src/engine/lib/colors.ts ***!
  \**********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   background: () => (/* binding */ background),
/* harmony export */   color: () => (/* binding */ color),
/* harmony export */   fill: () => (/* binding */ fill),
/* harmony export */   gradient: () => (/* binding */ gradient),
/* harmony export */   lerpColor: () => (/* binding */ lerpColor),
/* harmony export */   noFill: () => (/* binding */ noFill),
/* harmony export */   noStroke: () => (/* binding */ noStroke),
/* harmony export */   stroke: () => (/* binding */ stroke),
/* harmony export */   strokeWeight: () => (/* binding */ strokeWeight)
/* harmony export */ });
/* harmony import */ var _helpers_CanvasManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers/CanvasManager */ "./src/engine/helpers/CanvasManager.ts");
/* harmony import */ var _math__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./math */ "./src/engine/lib/math.ts");


const ctx = _helpers_CanvasManager__WEBPACK_IMPORTED_MODULE_0__.CanvasManager.getCtx();
function toHex(num) {
    const chars = "0123456789ABCDEF";
    return chars[(num - (num % 16)) / 16] + chars[num % 16];
}
function color(r, g, b, a = 255) {
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
    ctx.globalAlpha = (0,_math__WEBPACK_IMPORTED_MODULE_1__.constrain)(a / 255, 0, 1);
    return "#" + toHex(r) + toHex(g) + toHex(b);
}
function fill(r, g = 255, b = 255, a = 255) {
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
        ctx.globalAlpha = (0,_math__WEBPACK_IMPORTED_MODULE_1__.constrain)(a / 255, 0, 1);
        ctx.fillStyle = "#" + toHex(r) + toHex(g) + toHex(b);
    }
}
function noFill() {
    ctx.fillStyle = "rgba(0, 0, 0, 0)";
}
function background(r, g, b, a = 255) {
    fill(r, g, b, a);
    ctx.fillRect(0, 0, _helpers_CanvasManager__WEBPACK_IMPORTED_MODULE_0__.CanvasManager.width, _helpers_CanvasManager__WEBPACK_IMPORTED_MODULE_0__.CanvasManager.height);
}
function noStroke() {
    ctx.strokeStyle = "rgba(0, 0, 0, 0)";
}
function strokeWeight(thickness) {
    ctx.lineWidth = thickness;
}
function stroke(r, g, b, a = 255) {
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
        ctx.globalAlpha = (0,_math__WEBPACK_IMPORTED_MODULE_1__.constrain)(a / 255, 0, 1);
        ctx.strokeStyle = "#" + toHex(r) + toHex(g) + toHex(b);
    }
}
function lerpColor(color1, color2, amt) {
    function parseColor(color) {
        if (color.startsWith("#")) {
            const bigint = parseInt(color.slice(1), 16);
            return {
                r: (bigint >> 16) & 255,
                g: (bigint >> 8) & 255,
                b: bigint & 255
            };
        }
        if (color.startsWith("rgb")) {
            const match = color.match(/\d+/g);
            if (!match || match.length < 3) {
                throw new Error(`Invalid rgb() color: ${color}`);
            }
            return {
                r: parseInt(match[0]),
                g: parseInt(match[1]),
                b: parseInt(match[2])
            };
        }
        throw new Error(`Unsupported color format: ${color}`);
    }
    const c1 = parseColor(color1);
    const c2 = parseColor(color2);
    const r = Math.round(c1.r + (c2.r - c1.r) * amt);
    const g = Math.round(c1.g + (c2.g - c1.g) * amt);
    const b = Math.round(c1.b + (c2.b - c1.b) * amt);
    return `rgb(${r}, ${g}, ${b})`;
}
function gradient(x, y, width, height, color1, color2, direction = "vertical") {
    if (direction !== "vertical" && direction !== "horizontal") {
        throw new Error("Direction must be 'vertical' or 'horizontal'.");
    }
    if (direction === "vertical") {
        const gradient = ctx.createLinearGradient(x, y, x, y + height);
        gradient.addColorStop(0, color1);
        gradient.addColorStop(1, color2);
        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, width, height);
        return;
    }
    else if (direction === "horizontal") {
        const gradient = ctx.createLinearGradient(x, y, x + width, y);
        gradient.addColorStop(0, color1);
        gradient.addColorStop(1, color2);
        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, width, height);
        return;
    }
}



/***/ },

/***/ "./src/engine/lib/math.ts"
/*!********************************!*\
  !*** ./src/engine/lib/math.ts ***!
  \********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   abs: () => (/* binding */ abs),
/* harmony export */   ceil: () => (/* binding */ ceil),
/* harmony export */   constrain: () => (/* binding */ constrain),
/* harmony export */   dist: () => (/* binding */ dist),
/* harmony export */   floor: () => (/* binding */ floor),
/* harmony export */   lerp: () => (/* binding */ lerp),
/* harmony export */   log: () => (/* binding */ log),
/* harmony export */   map: () => (/* binding */ map),
/* harmony export */   max: () => (/* binding */ max),
/* harmony export */   min: () => (/* binding */ min),
/* harmony export */   noise: () => (/* binding */ noise),
/* harmony export */   pow: () => (/* binding */ pow),
/* harmony export */   random: () => (/* binding */ random),
/* harmony export */   round: () => (/* binding */ round),
/* harmony export */   sq: () => (/* binding */ sq),
/* harmony export */   sqrt: () => (/* binding */ sqrt)
/* harmony export */ });
function random(low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}
function dist(x1, y1, x2, y2) {
    let distX = x1 - x2;
    let distY = y1 - y2;
    return Math.sqrt(sq(distX) + sq(distY));
}
function constrain(num, lower, upper) {
    return num < lower ? lower : num > upper ? upper : num;
}
function min(num1, num2) {
    return num1 < num2 ? num1 : num2;
}
function max(num1, num2) {
    return num1 > num2 ? num1 : num2;
}
function abs(num) {
    return Math.abs(num);
}
function log(num) {
    return Math.log(num);
}
function pow(num, exponent) {
    return Math.pow(num, exponent);
}
function sq(num) {
    return num * num;
}
function sqrt(num) {
    return Math.sqrt(num);
}
function round(num) {
    return Math.round(num);
}
function ceil(num) {
    return Math.ceil(num);
}
function floor(num) {
    return Math.floor(num);
}
function map(value, start1, stop1, start2, stop2) {
    return start2 + ((value - start1) * (stop2 - start2)) / (stop1 - start1);
}
function lerp(a, b, t) {
    return a + t * (b - a);
}
// Adapted from Khan Academy's ProcessingJS noise(): https://cdn.jsdelivr.net/gh/Khan/processing-js@master/processing.js
class Marsaglia {
    constructor(i1, i2 = 521288629) {
        this.z = i1 || 362436069;
        this.w = i2 || 521288629;
    }
    nextInt() {
        this.z = (36969 * (this.z & 65535) + (this.z >>> 16)) & 0xFFFFFFFF;
        this.w = (18000 * (this.w & 65535) + (this.w >>> 16)) & 0xFFFFFFFF;
        return (((this.z & 0xFFFF) << 16) | (this.w & 0xFFFF)) >>> 0;
    }
    nextDouble() {
        const i = this.nextInt() / 4294967296;
        return i < 0 ? i + 1 : i;
    }
    static createRandomized() {
        const now = Date.now();
        return new Marsaglia((now / 60000) & 0xFFFFFFFF, now & 0xFFFFFFFF);
    }
}
class PerlinNoise {
    constructor(seed) {
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
    grad3d(i, x, y, z) {
        let h = i & 15; // convert into 12 gradient directions
        let u = h < 8 ? x : y, v = h < 4 ? y : h === 12 || h === 14 ? x : z;
        return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
    }
    ;
    grad2d(i, x, y) {
        let v = (i & 1) === 0 ? x : y;
        return (i & 2) === 0 ? -v : v;
    }
    ;
    grad1d(i, x) {
        return (i & 1) === 0 ? -x : x;
    }
    ;
    noise3d(x, y, z) {
        let X = Math.floor(x) & 255, Y = Math.floor(y) & 255, Z = Math.floor(z) & 255;
        x -= Math.floor(x);
        y -= Math.floor(y);
        z -= Math.floor(z);
        let fx = (3 - 2 * x) * x * x, fy = (3 - 2 * y) * y * y, fz = (3 - 2 * z) * z * z;
        let p0 = this.perm[X] + Y, p00 = this.perm[p0] + Z, p01 = this.perm[p0 + 1] + Z, p1 = this.perm[X + 1] + Y, p10 = this.perm[p1] + Z, p11 = this.perm[p1 + 1] + Z;
        return lerp(lerp(lerp(this.grad3d(this.perm[p00], x, y, z), this.grad3d(this.perm[p10], x - 1, y, z), fx), lerp(this.grad3d(this.perm[p01], x, y - 1, z), this.grad3d(this.perm[p11], x - 1, y - 1, z), fx), fy), lerp(lerp(this.grad3d(this.perm[p00 + 1], x, y, z - 1), this.grad3d(this.perm[p10 + 1], x - 1, y, z - 1), fx), lerp(this.grad3d(this.perm[p01 + 1], x, y - 1, z - 1), this.grad3d(this.perm[p11 + 1], x - 1, y - 1, z - 1), fx), fy), fz);
    }
    ;
    noise2d(x, y) {
        let X = Math.floor(x) & 255, Y = Math.floor(y) & 255;
        x -= Math.floor(x);
        y -= Math.floor(y);
        let fx = (3 - 2 * x) * x * x, fy = (3 - 2 * y) * y * y;
        let p0 = this.perm[X] + Y, p1 = this.perm[X + 1] + Y;
        return lerp(lerp(this.grad2d(this.perm[p0], x, y), this.grad2d(this.perm[p1], x - 1, y), fx), lerp(this.grad2d(this.perm[p0 + 1], x, y - 1), this.grad2d(this.perm[p1 + 1], x - 1, y - 1), fx), fy);
    }
    ;
    noise1d(x) {
        let X = Math.floor(x) & 255;
        x -= Math.floor(x);
        let fx = (3 - 2 * x) * x * x;
        return lerp(this.grad1d(this.perm[X], x), this.grad1d(this.perm[X + 1], x - 1), fx);
    }
    ;
}
let noiseProfile = {
    generator: undefined,
    octaves: 4,
    fallout: 0.5,
    seed: undefined
};
function noise(x, y, z) {
    if (noiseProfile.generator === undefined) {
        noiseProfile.generator = new PerlinNoise(noiseProfile.seed);
    }
    let generator = noiseProfile.generator;
    let effect = 1, k = 1, sum = 0;
    for (let i = 0; i < noiseProfile.octaves; i++) {
        effect *= noiseProfile.fallout;
        switch (arguments.length) {
            case 1:
                sum += effect * (1 + generator.noise1d(k * x)) / 2;
                break;
            case 2:
                sum += effect * (1 + generator.noise2d(k * x, k * y)) / 2;
                break;
            case 3:
                sum += effect * (1 + generator.noise3d(k * x, k * y, k * z)) / 2;
                break;
        }
        k *= 2;
    }
    return sum;
}



/***/ },

/***/ "./src/engine/lib/pjsSettings.ts"
/*!***************************************!*\
  !*** ./src/engine/lib/pjsSettings.ts ***!
  \***************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   pjsSettings: () => (/* binding */ pjsSettings)
/* harmony export */ });
const pjsSettings = {
    curRectMode: "CORNER",
    curEllipseMode: "CENTER",
    requiresFirstVertex: true,
    angleMode: "degrees",
    globalFont: "serif",
    globalSize: 10,
    globalWeight: "normal",
    globalStyle: "normal"
};


/***/ },

/***/ "./src/engine/lib/shapes.ts"
/*!**********************************!*\
  !*** ./src/engine/lib/shapes.ts ***!
  \**********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   arc: () => (/* binding */ arc),
/* harmony export */   bezier: () => (/* binding */ bezier),
/* harmony export */   ellipse: () => (/* binding */ ellipse),
/* harmony export */   ellipseMode: () => (/* binding */ ellipseMode),
/* harmony export */   image: () => (/* binding */ image),
/* harmony export */   line: () => (/* binding */ line),
/* harmony export */   point: () => (/* binding */ point),
/* harmony export */   quad: () => (/* binding */ quad),
/* harmony export */   rect: () => (/* binding */ rect),
/* harmony export */   rectMode: () => (/* binding */ rectMode),
/* harmony export */   roundRect: () => (/* binding */ roundRect),
/* harmony export */   strokeCap: () => (/* binding */ strokeCap),
/* harmony export */   triangle: () => (/* binding */ triangle)
/* harmony export */ });
/* harmony import */ var _pjsSettings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pjsSettings */ "./src/engine/lib/pjsSettings.ts");
/* harmony import */ var _helpers_CanvasManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers/CanvasManager */ "./src/engine/helpers/CanvasManager.ts");


const ctx = _helpers_CanvasManager__WEBPACK_IMPORTED_MODULE_1__.CanvasManager.ctx;
function roundRect(x, y, width, height, radius) {
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
function rect(x, y, w, h, radius = 0) {
    let xPos = 0, yPos = 0, width = 0, height = 0;
    if (_pjsSettings__WEBPACK_IMPORTED_MODULE_0__.pjsSettings.curRectMode === "CORNER") {
        xPos = x;
        yPos = y;
        width = w;
        height = h;
    }
    else if (_pjsSettings__WEBPACK_IMPORTED_MODULE_0__.pjsSettings.curRectMode === "CORNERS") {
        xPos = x;
        yPos = y;
        width = w - x;
        height = h - y;
    }
    else if (_pjsSettings__WEBPACK_IMPORTED_MODULE_0__.pjsSettings.curRectMode === "CENTER") {
        xPos = x - w / 2;
        yPos = y - h / 2;
        width = w;
        height = h;
    }
    else if (_pjsSettings__WEBPACK_IMPORTED_MODULE_0__.pjsSettings.curRectMode === "RADIUS") {
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
function arc(x, y, w, h, start, stop) {
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
function ellipse(x, y, w, h) {
    let xPos = 0, yPos = 0, width = 0, height = 0;
    if (_pjsSettings__WEBPACK_IMPORTED_MODULE_0__.pjsSettings.curEllipseMode === "CENTER") {
        xPos = x;
        yPos = y;
        width = w;
        height = h;
    }
    else if (_pjsSettings__WEBPACK_IMPORTED_MODULE_0__.pjsSettings.curEllipseMode === "RADIUS") {
        xPos = x;
        yPos = y;
        width = w * 2;
        height = h * 2;
    }
    else if (_pjsSettings__WEBPACK_IMPORTED_MODULE_0__.pjsSettings.curEllipseMode === "CORNER") {
        xPos = x + w / 2;
        yPos = y + h / 2;
        width = w;
        height = h;
    }
    else if (_pjsSettings__WEBPACK_IMPORTED_MODULE_0__.pjsSettings.curEllipseMode === "CORNERS") {
        xPos = (x + w) / 2;
        yPos = (y + h) / 2;
        width = w - x;
        height = h - y;
    }
    arc(xPos, yPos, width, height, 0, 360);
}
function triangle(x1, y1, x2, y2, x3, y3) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}
function quad(x1, y1, x2, y2, x3, y3, x4, y4) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.lineTo(x4, y4);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}
function image(image, x, y, w = image.width, h = image.height) {
    ctx.drawImage(image, x, y, w, h);
    if (arguments.length !== 3 && arguments.length !== 5) {
        console.error(`image() requires 3 or 5 parameters, not ${arguments.length}`);
    }
}
function line(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}
function point(x, y) {
    ctx.fillRect(x, y, 1, 1);
}
function bezier(x1, y1, cx1, cy1, cx2, cy2, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.bezierCurveTo(cx1, cy1, cx2, cy2, x2, y2);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}
function ellipseMode(MODE) {
    _pjsSettings__WEBPACK_IMPORTED_MODULE_0__.pjsSettings.curEllipseMode = MODE;
}
function rectMode(MODE) {
    _pjsSettings__WEBPACK_IMPORTED_MODULE_0__.pjsSettings.curRectMode = MODE;
}
function strokeCap(MODE) {
    ctx.lineCap = MODE;
}



/***/ },

/***/ "./src/engine/ui/UIBindings/ParamUI.ts"
/*!*********************************************!*\
  !*** ./src/engine/ui/UIBindings/ParamUI.ts ***!
  \*********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ParamUI: () => (/* binding */ ParamUI)
/* harmony export */ });
class ParamUI {
    constructor(defaultValue) {
        this.value = defaultValue;
    }
    getImports() {
        return [];
    }
}


/***/ },

/***/ "./src/engine/ui/UIBindings/TypeUIBindings/ColorUI.ts"
/*!************************************************************!*\
  !*** ./src/engine/ui/UIBindings/TypeUIBindings/ColorUI.ts ***!
  \************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ColorUI: () => (/* binding */ ColorUI)
/* harmony export */ });
/* harmony import */ var _helpers_ColorHelpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../helpers/ColorHelpers */ "./src/engine/helpers/ColorHelpers.ts");
/* harmony import */ var _ParamUI__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ParamUI */ "./src/engine/ui/UIBindings/ParamUI.ts");


let colorUICounter = 0;
class ColorUI extends _ParamUI__WEBPACK_IMPORTED_MODULE_1__.ParamUI {
    constructor(defaultColor) {
        super(defaultColor);
        this.alpha = 1;
        this.id = colorUICounter++;
        //console.log("Created ColorUI with id:", this.id);
    }
    render(onChange) {
        const container = document.createElement("div");
        const colorInput = document.createElement("input");
        colorInput.type = "color";
        colorInput.value = this.value;
        colorInput.classList.add("paramInput");
        const textInput = document.createElement("input");
        textInput.type = "text";
        textInput.value = this.value;
        textInput.classList.add("paramInput");
        const alphaSlider = document.createElement("input");
        alphaSlider.type = "range";
        alphaSlider.min = "0";
        alphaSlider.max = "1";
        alphaSlider.step = "0.01";
        alphaSlider.value = this.alpha.toString();
        alphaSlider.classList.add("paramInput");
        const update = (val) => {
            if (!/^#([0-9A-F]{3}){1,2}$/i.test(val))
                return;
            this.value = val;
            colorInput.value = val;
            textInput.value = val;
            onChange(this.value);
        };
        colorInput.oninput = () => update(colorInput.value);
        textInput.oninput = () => update(textInput.value);
        alphaSlider.oninput = () => {
            this.alpha = Number(alphaSlider.value);
            onChange(this.value);
        };
        container.appendChild(colorInput);
        container.appendChild(textInput);
        container.appendChild(alphaSlider);
        return container;
    }
    toCode() {
        const { r, g, b } = _helpers_ColorHelpers__WEBPACK_IMPORTED_MODULE_0__.ColorHelpers.hexToRGB(this.value);
        if (this.alpha < 1) {
            return `color(${r}, ${g}, ${b}, ${this.alpha})`;
        }
        return `color(${r}, ${g}, ${b})`;
    }
    clone() {
        const cloned = new ColorUI(this.value);
        cloned.alpha = this.alpha;
        return cloned;
    }
    getImports() {
        return ["color"];
    }
}


/***/ },

/***/ "./src/engine/ui/UIBindings/TypeUIBindings/NumberUI.ts"
/*!*************************************************************!*\
  !*** ./src/engine/ui/UIBindings/TypeUIBindings/NumberUI.ts ***!
  \*************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NumberUI: () => (/* binding */ NumberUI)
/* harmony export */ });
/* harmony import */ var _ParamUI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ParamUI */ "./src/engine/ui/UIBindings/ParamUI.ts");

class NumberUI extends _ParamUI__WEBPACK_IMPORTED_MODULE_0__.ParamUI {
    render(onChange) {
        const input = document.createElement("input");
        input.type = "number";
        input.value = this.value.toString();
        input.classList.add("paramInput");
        input.oninput = () => {
            this.value = Number(input.value);
            onChange(this.value);
        };
        return input;
    }
    toCode() {
        return `${this.value}`;
    }
    clone() {
        return new NumberUI(this.value);
    }
}


/***/ },

/***/ "./src/engine/ui/UIBindings/TypeUIBindings/StringUI.ts"
/*!*************************************************************!*\
  !*** ./src/engine/ui/UIBindings/TypeUIBindings/StringUI.ts ***!
  \*************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StringUI: () => (/* binding */ StringUI)
/* harmony export */ });
/* harmony import */ var _ParamUI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ParamUI */ "./src/engine/ui/UIBindings/ParamUI.ts");

class StringUI extends _ParamUI__WEBPACK_IMPORTED_MODULE_0__.ParamUI {
    render(onChange) {
        const input = document.createElement("input");
        input.type = "text";
        input.value = this.value.toString();
        input.classList.add("paramInput");
        input.oninput = () => {
            this.value = String(input.value);
            onChange(this.value);
        };
        return input;
    }
    toCode() {
        return `"${this.value}"`;
    }
    clone() {
        return new StringUI(this.value);
    }
}


/***/ },

/***/ "./src/engine/ui/UIBindings/TypeUIBindings/Vector2UI.ts"
/*!**************************************************************!*\
  !*** ./src/engine/ui/UIBindings/TypeUIBindings/Vector2UI.ts ***!
  \**************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Vector2UI: () => (/* binding */ Vector2UI)
/* harmony export */ });
/* harmony import */ var _ParamUI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ParamUI */ "./src/engine/ui/UIBindings/ParamUI.ts");

class Vector2UI extends _ParamUI__WEBPACK_IMPORTED_MODULE_0__.ParamUI {
    render(onChange) {
        const container = document.createElement("div");
        const xInput = document.createElement("input");
        const yInput = document.createElement("input");
        xInput.type = "number";
        yInput.type = "number";
        xInput.value = this.value.x.toString();
        yInput.value = this.value.y.toString();
        const update = () => {
            this.value = {
                x: Number(xInput.value),
                y: Number(yInput.value)
            };
            onChange(this.value);
        };
        xInput.oninput = update;
        yInput.oninput = update;
        xInput.classList.add("paramInput");
        yInput.classList.add("paramInput");
        container.appendChild(xInput);
        container.appendChild(yInput);
        return container;
    }
    toCode() {
        return `new Vector2(${this.value.x}, ${this.value.y})`;
    }
    clone() {
        return new Vector2UI({ x: this.value.x, y: this.value.y });
    }
    getImports() {
        return ["Vector2"];
    }
}


/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!*********************************************!*\
  !*** ./src/engine/tools/PrefabGenerator.ts ***!
  \*********************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PrefabGenerator: () => (/* binding */ PrefabGenerator)
/* harmony export */ });
/* harmony import */ var _config_ComponentRegistry__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config/ComponentRegistry */ "./src/engine/config/ComponentRegistry.ts");
/* harmony import */ var _config_ImportMap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../config/ImportMap */ "./src/engine/config/ImportMap.ts");
/* harmony import */ var _helpers_PathHelpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helpers/PathHelpers */ "./src/engine/helpers/PathHelpers.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};



const prefabOutputPath = "src/game/prefabs/";
// ----------------------------
// PREFAB GENERATOR CLASS
// ----------------------------
class PrefabGenerator {
    constructor(containerId, selectId, classNameId, generateBtnId, downloadBtnId, componentListId, outputId) {
        var _a;
        this.state = { className: "", components: [] };
        this.outputDirHandle = null;
        // DOM elements
        this.container = document.getElementById(containerId);
        this.select = document.getElementById(selectId);
        if (!this.select)
            throw new Error("componentSelect element missing!");
        this.classNameInput = document.getElementById(classNameId);
        const generateBtn = document.getElementById(generateBtnId);
        const downloadBtn = document.getElementById(downloadBtnId);
        const componentList = document.getElementById(componentListId);
        const output = document.getElementById(outputId);
        // Initialize class name input
        this.classNameInput.oninput = (e) => {
            this.state.className = e.target.value;
        };
        // Populate component select
        Object.keys(_config_ComponentRegistry__WEBPACK_IMPORTED_MODULE_0__.ComponentRegistry).forEach((name) => {
            const option = document.createElement("option");
            option.value = name;
            option.textContent = name;
            this.select.appendChild(option);
        });
        // Add component button
        (_a = document.getElementById("addComponentButton")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => this.addComponent(componentList));
        // Generate code button
        generateBtn.addEventListener("click", () => {
            const code = this.generatePrefabCode();
            output.textContent = code;
        });
        // Download prefab file
        downloadBtn.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () {
            const code = this.generatePrefabCode();
            const filename = `${this.state.className || "Prefab"}.ts`;
            yield this.saveToDirectory(filename, code);
        }));
        const chooseDirBtn = document.getElementById("chooseOutputDir");
        chooseDirBtn.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () {
            try {
                this.outputDirHandle = yield window.showDirectoryPicker();
                console.log("Directory selected:", this.outputDirHandle);
            }
            catch (err) {
                console.warn("Directory selection cancelled.");
            }
        }));
    }
    addComponent(container) {
        const type = this.select.value;
        const definition = _config_ComponentRegistry__WEBPACK_IMPORTED_MODULE_0__.ComponentRegistry[type];
        if (!definition)
            return;
        // Initialize values from UI defaults
        const values = {};
        for (const [key, ui] of Object.entries(definition.params)) {
            values[key] = ui.clone(); // 🔥 THIS FIXES EVERYTHING
        }
        this.state.components.push({ type, definition, values });
        this.renderComponents(container);
    }
    renderComponents(container) {
        container.innerHTML = "";
        this.state.components.forEach((comp, index) => {
            const div = document.createElement("div");
            div.style.border = "1px solid #ccc";
            div.style.padding = "10px";
            div.style.marginBottom = "10px";
            const title = document.createElement("h4");
            title.textContent = comp.type;
            div.appendChild(title);
            // Render each param UI
            for (const [paramName, uiInstance] of Object.entries(comp.values)) {
                const label = document.createElement("label");
                label.textContent = paramName;
                const element = uiInstance.render((val) => {
                    uiInstance.value = val;
                });
                div.appendChild(label);
                div.appendChild(element);
                div.appendChild(document.createElement("br"));
            }
            const removeBtn = document.createElement("button");
            removeBtn.textContent = "Remove";
            removeBtn.onclick = () => {
                this.state.components.splice(index, 1);
                this.renderComponents(container);
            };
            div.appendChild(removeBtn);
            container.appendChild(div);
        });
    }
    generatePrefabCode() {
        const imports = new Set();
        imports.add(this.buildImport("Prefab"));
        let body = "";
        // First pass: collect imports
        this.state.components.forEach((comp) => {
            imports.add(this.buildImport(comp.type, comp.definition.import));
            Object.values(comp.values).forEach(ui => {
                ui.getImports().forEach(symbol => {
                    imports.add(this.buildImport(symbol));
                });
            });
        });
        // Second pass: build body
        this.state.components.forEach((comp, i) => {
            const varName = comp.type.toLowerCase() + i;
            body += `        const ${varName} = this.AddComponent(${comp.type});\n`;
            const paramValues = Object.keys(comp.definition.params)
                .map(key => comp.values[key].toCode())
                .join(", ");
            body += `        ${varName}.initialize(${paramValues});\n\n`;
        });
        return `${[...imports].join("\n")}

export class ${this.state.className || "NewPrefab"} extends Prefab {
    constructor() {
        super();

${body}
    }
}
`;
    }
    saveToDirectory(filename, content) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.outputDirHandle) {
                alert("Please choose an output directory first.");
                return;
            }
            // Create or overwrite the file
            const fileHandle = yield this.outputDirHandle.getFileHandle(filename, { create: true });
            const writable = yield fileHandle.createWritable();
            yield writable.write(content);
            yield writable.close();
            console.log("Saved:", filename);
        });
    }
    buildImport(symbol, overridePath) {
        const absolutePath = overridePath !== null && overridePath !== void 0 ? overridePath : _config_ImportMap__WEBPACK_IMPORTED_MODULE_1__.ImportMap[symbol];
        if (!absolutePath) {
            console.error("ImportMap:", _config_ImportMap__WEBPACK_IMPORTED_MODULE_1__.ImportMap);
            throw new Error(`No import path found for symbol: ${symbol}`);
        }
        const finalPath = _helpers_PathHelpers__WEBPACK_IMPORTED_MODULE_2__.PathHelpers.isExternalPath(absolutePath)
            ? absolutePath
            : _helpers_PathHelpers__WEBPACK_IMPORTED_MODULE_2__.PathHelpers.getRelativeImportPath(prefabOutputPath, absolutePath);
        return `import { ${symbol} } from "${finalPath}";`;
    }
}
// ----------------------------
// USAGE
// ----------------------------
document.addEventListener("DOMContentLoaded", () => {
    new PrefabGenerator("prefabContainer", "componentSelect", "className", "generateButton", "downloadButton", "componentList", "output");
});

})();

/******/ })()
;
//# sourceMappingURL=prefabGenerator.js.map