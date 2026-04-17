/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/engine/Engine.ts"
/*!******************************!*\
  !*** ./src/engine/Engine.ts ***!
  \******************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Engine: () => (/* binding */ Engine)
/* harmony export */ });
/* harmony import */ var _game_content_ImageManifest__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../game/content/ImageManifest */ "./src/game/content/ImageManifest.ts");
/* harmony import */ var _core_scene_SceneManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./core/scene/SceneManager */ "./src/engine/core/scene/SceneManager.ts");
/* harmony import */ var _helpers_CanvasManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./helpers/CanvasManager */ "./src/engine/helpers/CanvasManager.ts");
/* harmony import */ var _helpers_ImageManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./helpers/ImageManager */ "./src/engine/helpers/ImageManager.ts");
/* harmony import */ var _helpers_ScreenManager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./helpers/ScreenManager */ "./src/engine/helpers/ScreenManager.ts");
/* harmony import */ var _helpers_TimeManager__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./helpers/TimeManager */ "./src/engine/helpers/TimeManager.ts");
/* harmony import */ var _ui_UserInput__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ui/UserInput */ "./src/engine/ui/UserInput.ts");







class Engine {
    static start() {
        _helpers_CanvasManager__WEBPACK_IMPORTED_MODULE_2__.CanvasManager.init("canvas");
        _helpers_ScreenManager__WEBPACK_IMPORTED_MODULE_4__.ScreenManager.init(716, 962);
        _ui_UserInput__WEBPACK_IMPORTED_MODULE_6__.UserInput.init();
        _helpers_ImageManager__WEBPACK_IMPORTED_MODULE_3__.ImageManager.init(_helpers_CanvasManager__WEBPACK_IMPORTED_MODULE_2__.CanvasManager.canvas);
        _game_content_ImageManifest__WEBPACK_IMPORTED_MODULE_0__.ImageManifest.registerImages();
        const loop = () => {
            if (!_helpers_ImageManager__WEBPACK_IMPORTED_MODULE_3__.ImageManager.Instance.loaded) {
                _helpers_ImageManager__WEBPACK_IMPORTED_MODULE_3__.ImageManager.Instance.loadNext();
            }
            else {
                _helpers_TimeManager__WEBPACK_IMPORTED_MODULE_5__.Time.update();
                _helpers_TimeManager__WEBPACK_IMPORTED_MODULE_5__.Time._fixedAccumulator += _helpers_TimeManager__WEBPACK_IMPORTED_MODULE_5__.Time.deltaTime;
                const scene = _core_scene_SceneManager__WEBPACK_IMPORTED_MODULE_1__.SceneManager.activeScene;
                while (_helpers_TimeManager__WEBPACK_IMPORTED_MODULE_5__.Time._fixedAccumulator >= _helpers_TimeManager__WEBPACK_IMPORTED_MODULE_5__.Time.fixedDeltaTime) {
                    scene.fixedUpdate();
                    _helpers_TimeManager__WEBPACK_IMPORTED_MODULE_5__.Time._fixedAccumulator -= _helpers_TimeManager__WEBPACK_IMPORTED_MODULE_5__.Time.fixedDeltaTime;
                }
                scene.update();
                scene.lateUpdate();
                scene.render();
                scene.renderUI();
            }
            requestAnimationFrame(loop);
        };
        requestAnimationFrame(loop);
    }
}


/***/ },

/***/ "./src/engine/config/Physics2D.ts"
/*!****************************************!*\
  !*** ./src/engine/config/Physics2D.ts ***!
  \****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Physics2D: () => (/* binding */ Physics2D)
/* harmony export */ });
class Physics2D {
}
Physics2D.gravity = { x: 0, y: 500 }; // pixels per second squared


/***/ },

/***/ "./src/engine/core/ECS/Prefab.ts"
/*!***************************************!*\
  !*** ./src/engine/core/ECS/Prefab.ts ***!
  \***************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Prefab: () => (/* binding */ Prefab)
/* harmony export */ });
/* harmony import */ var _main_GameObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./main/GameObject */ "./src/engine/core/ECS/main/GameObject.ts");

class Prefab extends _main_GameObject__WEBPACK_IMPORTED_MODULE_0__.GameObject {
    static instantiate() {
        return new this();
    }
}


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

/***/ "./src/engine/core/ECS/components/Transform.ts"
/*!*****************************************************!*\
  !*** ./src/engine/core/ECS/components/Transform.ts ***!
  \*****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Transform: () => (/* binding */ Transform)
/* harmony export */ });
/* harmony import */ var _main_Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../main/Component */ "./src/engine/core/ECS/main/Component.ts");
/* harmony import */ var _math_Vector2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../math/Vector2 */ "./src/engine/core/math/Vector2.ts");


class Transform extends _main_Component__WEBPACK_IMPORTED_MODULE_0__.Component {
    constructor() {
        super();
        this.position = new _math_Vector2__WEBPACK_IMPORTED_MODULE_1__.Vector2(0, 0); // local position
        this.scale = new _math_Vector2__WEBPACK_IMPORTED_MODULE_1__.Vector2(1, 1); // local scale
        this.rotation = 0; // local rotation (radians)
        this.parent = null; // parent transform
    }
    // -------------------------
    // World-space getters
    // -------------------------
    get worldPosition() {
        if (!this.parent)
            return this.position.clone();
        return this.parent.worldPosition.add(this.position);
    }
    get worldScale() {
        if (!this.parent)
            return this.scale.clone();
        return this.parent.worldScale.multiply(this.scale);
    }
    get worldRotation() {
        if (!this.parent)
            return this.rotation;
        return this.parent.worldRotation + this.rotation;
    }
    // -------------------------
    // Apply to Canvas context
    // -------------------------
    applyToContext(ctx) {
        const pos = this.worldPosition;
        const scale = this.worldScale;
        const rot = this.worldRotation;
        ctx.translate(pos.x, pos.y);
        ctx.rotate(rot);
        ctx.scale(scale.x, scale.y);
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

/***/ "./src/engine/core/ECS/components/physics/RigidBody2D.ts"
/*!***************************************************************!*\
  !*** ./src/engine/core/ECS/components/physics/RigidBody2D.ts ***!
  \***************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RigidBody2D: () => (/* binding */ RigidBody2D)
/* harmony export */ });
/* harmony import */ var _main_Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../main/Component */ "./src/engine/core/ECS/main/Component.ts");
/* harmony import */ var _helpers_TimeManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../helpers/TimeManager */ "./src/engine/helpers/TimeManager.ts");
/* harmony import */ var _config_Physics2D__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../config/Physics2D */ "./src/engine/config/Physics2D.ts");


 // We'll define this next
class RigidBody2D extends _main_Component__WEBPACK_IMPORTED_MODULE_0__.Component {
    constructor() {
        super(...arguments);
        this.linearVelocity = { x: 0, y: 0 };
        this.useGravity = true;
        this.gravityScale = 1;
        this.mass = 1;
    }
    physicsStep() {
        // Apply gravity
        if (this.useGravity) {
            this.linearVelocity.y += _config_Physics2D__WEBPACK_IMPORTED_MODULE_2__.Physics2D.gravity.y * this.gravityScale * _helpers_TimeManager__WEBPACK_IMPORTED_MODULE_1__.Time.fixedDeltaTime;
            this.linearVelocity.x += _config_Physics2D__WEBPACK_IMPORTED_MODULE_2__.Physics2D.gravity.x * this.gravityScale * _helpers_TimeManager__WEBPACK_IMPORTED_MODULE_1__.Time.fixedDeltaTime;
        }
        // Integrate velocity → position
        this.transform.position.x += this.linearVelocity.x * _helpers_TimeManager__WEBPACK_IMPORTED_MODULE_1__.Time.fixedDeltaTime;
        this.transform.position.y += this.linearVelocity.y * _helpers_TimeManager__WEBPACK_IMPORTED_MODULE_1__.Time.fixedDeltaTime;
    }
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

/***/ "./src/engine/core/ECS/main/Behavior.ts"
/*!**********************************************!*\
  !*** ./src/engine/core/ECS/main/Behavior.ts ***!
  \**********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Behavior: () => (/* binding */ Behavior)
/* harmony export */ });
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Component */ "./src/engine/core/ECS/main/Component.ts");

class Behavior extends _Component__WEBPACK_IMPORTED_MODULE_0__.Component {
    constructor() {
        super(...arguments);
        this.enabled = true;
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

/***/ "./src/engine/core/ECS/main/GameObject.ts"
/*!************************************************!*\
  !*** ./src/engine/core/ECS/main/GameObject.ts ***!
  \************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GameObject: () => (/* binding */ GameObject)
/* harmony export */ });
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Component */ "./src/engine/core/ECS/main/Component.ts");
/* harmony import */ var _components_Transform__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/Transform */ "./src/engine/core/ECS/components/Transform.ts");
/* harmony import */ var _EngineObject__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./EngineObject */ "./src/engine/core/ECS/main/EngineObject.ts");



class GameObject extends _EngineObject__WEBPACK_IMPORTED_MODULE_2__.EngineObject {
    constructor() {
        super();
        this.components = [];
        this.children = [];
        this.transform = new _components_Transform__WEBPACK_IMPORTED_MODULE_1__.Transform();
        this.transform = this.AddComponent(_components_Transform__WEBPACK_IMPORTED_MODULE_1__.Transform);
    }
    // -------------------------
    // AddComponent<T>
    // -------------------------
    AddComponent(type) {
        const comp = new type();
        comp.gameObject = this;
        this.components.push(comp);
        return comp;
    }
    GetComponent(type) {
        if (typeof type === "string") {
            return (this.components.find(c => c.constructor.name === type) || null);
        }
        const comp = this.components.find(c => c instanceof type);
        return comp ? comp : null;
    }
    // -------------------------
    // RemoveComponent
    // -------------------------
    RemoveComponent(type) {
        // Remove by instance
        if (type instanceof _Component__WEBPACK_IMPORTED_MODULE_0__.Component) {
            const index = this.components.indexOf(type);
            if (index !== -1) {
                this.components.splice(index, 1);
                return true;
            }
            return false;
        }
        // Remove by string name
        if (typeof type === "string") {
            const index = this.components.findIndex(c => c.constructor.name === type);
            if (index !== -1) {
                this.components.splice(index, 1);
                return true;
            }
            return false;
        }
        // Remove by constructor
        const index = this.components.findIndex(c => c instanceof type);
        if (index !== -1) {
            this.components.splice(index, 1);
            return true;
        }
        return false;
    }
    addChild(child) {
        child.transform.parent = this.transform;
        this.children.push(child);
    }
}


/***/ },

/***/ "./src/engine/core/ECS/main/MonoBehavior.ts"
/*!**************************************************!*\
  !*** ./src/engine/core/ECS/main/MonoBehavior.ts ***!
  \**************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MonoBehavior: () => (/* binding */ MonoBehavior)
/* harmony export */ });
/* harmony import */ var _Behavior__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Behavior */ "./src/engine/core/ECS/main/Behavior.ts");

class MonoBehavior extends _Behavior__WEBPACK_IMPORTED_MODULE_0__.Behavior {
    Awake() { }
    Start() { }
    FixedUpdate() { }
    Update() { }
    LateUpdate() { }
    OnDestroy() { }
}


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

/***/ "./src/engine/core/scene/Scene.ts"
/*!****************************************!*\
  !*** ./src/engine/core/scene/Scene.ts ***!
  \****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Scene: () => (/* binding */ Scene)
/* harmony export */ });
/* harmony import */ var _lib_colors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/colors */ "./src/engine/lib/colors.ts");
/* harmony import */ var _helpers_CanvasManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../helpers/CanvasManager */ "./src/engine/helpers/CanvasManager.ts");
/* harmony import */ var _ECS_components_physics_RigidBody2D__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ECS/components/physics/RigidBody2D */ "./src/engine/core/ECS/components/physics/RigidBody2D.ts");
/* harmony import */ var _ECS_components_Renderer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../ECS/components/Renderer */ "./src/engine/core/ECS/components/Renderer.ts");
/* harmony import */ var _ECS_components_UIComponent__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../ECS/components/UIComponent */ "./src/engine/core/ECS/components/UIComponent.ts");
/* harmony import */ var _ECS_main_MonoBehavior__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../ECS/main/MonoBehavior */ "./src/engine/core/ECS/main/MonoBehavior.ts");






class Scene {
    constructor() {
        this.gameObjects = [];
        this.started = false;
        this.destroyQueue = [];
    }
    addGameObject(go) {
        var _a, _b;
        this.gameObjects.push(go);
        if (this.started) {
            // Run Awake immediately
            for (const comp of go.components) {
                if (comp instanceof _ECS_main_MonoBehavior__WEBPACK_IMPORTED_MODULE_5__.MonoBehavior) {
                    (_a = comp.Awake) === null || _a === void 0 ? void 0 : _a.call(comp);
                }
            }
            // Run Start immediately
            for (const comp of go.components) {
                if (comp instanceof _ECS_main_MonoBehavior__WEBPACK_IMPORTED_MODULE_5__.MonoBehavior && comp.enabled) {
                    (_b = comp.Start) === null || _b === void 0 ? void 0 : _b.call(comp);
                }
            }
        }
        return go;
    }
    removeGameObject(go) {
        this.destroyQueue.push(go);
    }
    awake() {
        var _a;
        for (const go of this.gameObjects) {
            for (const comp of go.components) {
                if (comp instanceof _ECS_main_MonoBehavior__WEBPACK_IMPORTED_MODULE_5__.MonoBehavior) {
                    (_a = comp.Awake) === null || _a === void 0 ? void 0 : _a.call(comp);
                }
            }
        }
    }
    /** Called once before the first update */
    start() {
        var _a;
        this.awake();
        for (const go of this.gameObjects) {
            for (const comp of go.components) {
                if (comp instanceof _ECS_main_MonoBehavior__WEBPACK_IMPORTED_MODULE_5__.MonoBehavior && comp.enabled) {
                    (_a = comp.Start) === null || _a === void 0 ? void 0 : _a.call(comp);
                }
            }
        }
        this.started = true;
    }
    fixedUpdate() {
        var _a;
        // Call MonoBehavior.FixedUpdate()
        for (const go of this.gameObjects) {
            for (const comp of go.components) {
                if (comp instanceof _ECS_main_MonoBehavior__WEBPACK_IMPORTED_MODULE_5__.MonoBehavior && comp.enabled) {
                    (_a = comp.FixedUpdate) === null || _a === void 0 ? void 0 : _a.call(comp);
                }
            }
        }
        // Physics step
        for (const go of this.gameObjects) {
            const rb = go.GetComponent(_ECS_components_physics_RigidBody2D__WEBPACK_IMPORTED_MODULE_2__.RigidBody2D);
            if (rb)
                rb.physicsStep();
        }
    }
    /** Called every frame */
    update() {
        var _a;
        if (!this.started)
            this.start();
        for (const go of this.gameObjects) {
            for (const comp of go.components) {
                if (comp instanceof _ECS_main_MonoBehavior__WEBPACK_IMPORTED_MODULE_5__.MonoBehavior && comp.enabled) {
                    (_a = comp.Update) === null || _a === void 0 ? void 0 : _a.call(comp);
                }
            }
        }
        // Process destruction safely
        if (this.destroyQueue.length > 0) {
            for (const go of this.destroyQueue) {
                const index = this.gameObjects.indexOf(go);
                if (index !== -1) {
                    this.gameObjects.splice(index, 1);
                }
            }
            this.destroyQueue.length = 0;
        }
    }
    /** Called every frame after update */
    lateUpdate() {
        var _a;
        for (const go of this.gameObjects) {
            for (const comp of go.components) {
                if (comp instanceof _ECS_main_MonoBehavior__WEBPACK_IMPORTED_MODULE_5__.MonoBehavior && comp.enabled) {
                    (_a = comp.LateUpdate) === null || _a === void 0 ? void 0 : _a.call(comp);
                }
            }
        }
    }
    /** Called every frame to draw */
    render() {
        const ctx = _helpers_CanvasManager__WEBPACK_IMPORTED_MODULE_1__.CanvasManager.ctx;
        (0,_lib_colors__WEBPACK_IMPORTED_MODULE_0__.background)(150, 150, 150);
        for (const go of this.gameObjects) {
            this.renderGameObject(go, ctx);
        }
    }
    renderGameObject(go, ctx) {
        ctx.save();
        go.transform.applyToContext(ctx);
        for (const comp of go.components) {
            if (comp instanceof _ECS_components_Renderer__WEBPACK_IMPORTED_MODULE_3__.Renderer)
                comp.Render();
        }
        for (const child of go.children) {
            this.renderGameObject(child, ctx);
        }
        ctx.restore();
    }
    renderUI() {
        var _a;
        for (const go of this.gameObjects) {
            for (const comp of go.components) {
                if (comp instanceof _ECS_components_UIComponent__WEBPACK_IMPORTED_MODULE_4__.UIComponent) {
                    if (!comp.hidden) {
                        (_a = comp.RenderUI) === null || _a === void 0 ? void 0 : _a.call(comp);
                    }
                }
            }
        }
    }
}


/***/ },

/***/ "./src/engine/core/scene/SceneManager.ts"
/*!***********************************************!*\
  !*** ./src/engine/core/scene/SceneManager.ts ***!
  \***********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SceneManager: () => (/* binding */ SceneManager)
/* harmony export */ });
class SceneManager {
    static get activeScene() {
        if (!this._activeScene) {
            throw new Error("No active scene loaded.");
        }
        return this._activeScene;
    }
    static loadScene(scene) {
        // Optional: call OnDestroy on old scene
        this._activeScene = scene;
    }
    static unloadScene() {
        this._activeScene = null;
    }
}
SceneManager._activeScene = null;


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
    static init(canvasId) {
        const canvas = document.getElementById(canvasId);
        if (!canvas)
            throw new Error(`Canvas #${canvasId} not found`);
        const ctx = canvas.getContext("2d");
        if (!ctx)
            throw new Error("2D context not supported");
        this.canvas = canvas;
        this.ctx = ctx;
        this.width = canvas.width;
        this.height = canvas.height;
    }
    static resize(originalWidth, originalHeight, newWidth, newHeight) {
        // Set the internal resolution (actual drawing buffer)
        this.canvas.width = originalWidth;
        this.canvas.height = originalHeight;
        // Update CanvasManager's stored values
        this.width = originalWidth;
        this.height = originalHeight;
        // Apply CSS scaling for display size
        this.canvas.style.width = `${newWidth}px`;
        this.canvas.style.height = `${newHeight}px`;
    }
}


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

/***/ "./src/engine/helpers/ScreenManager.ts"
/*!*********************************************!*\
  !*** ./src/engine/helpers/ScreenManager.ts ***!
  \*********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ScreenManager: () => (/* binding */ ScreenManager)
/* harmony export */ });
class ScreenManager {
    static init(originalWidth, originalHeight) {
        if (!this._instance) {
            this._instance = new ScreenManager(originalWidth, originalHeight);
        }
        return this._instance;
    }
    static get Instance() {
        if (!this._instance) {
            throw new Error("ScreenManager not initialized. Call ScreenManager.init() first.");
        }
        return this._instance;
    }
    constructor(originalWidth, originalHeight) {
        this.scaledWidth = 0;
        this.scaledHeight = 0;
        this.onResizeCallback = null;
        this.originalWidth = originalWidth;
        this.originalHeight = originalHeight;
        this.aspectRatio = originalWidth / originalHeight;
        this.updateSize();
        this.attachResizeListener();
    }
    onResize(callback) {
        this.onResizeCallback = callback;
    }
    updateSize() {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        if (screenWidth / screenHeight > this.aspectRatio) {
            this.scaledHeight = screenHeight;
            this.scaledWidth = this.scaledHeight * this.aspectRatio;
        }
        else {
            this.scaledWidth = screenWidth;
            this.scaledHeight = this.scaledWidth / this.aspectRatio;
        }
        if (this.onResizeCallback) {
            this.onResizeCallback();
        }
    }
    debounce(func, delay) {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = window.setTimeout(() => func.apply(this, args), delay);
        };
    }
    attachResizeListener() {
        window.addEventListener("resize", this.debounce(() => this.updateSize(), 100));
    }
    get width() {
        return this.scaledWidth;
    }
    get height() {
        return this.scaledHeight;
    }
}
ScreenManager._instance = null;


/***/ },

/***/ "./src/engine/helpers/TimeManager.ts"
/*!*******************************************!*\
  !*** ./src/engine/helpers/TimeManager.ts ***!
  \*******************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Time: () => (/* binding */ Time)
/* harmony export */ });
class Time {
    static update() {
        this._current = performance.now();
        // Delta time
        this.deltaTime = (this._current - this._last) / 1000;
        this.time += this.deltaTime;
        this._last = this._current;
        // FPS counter
        this._frames++;
        if (this._current - this._lastFpsUpdate >= 1000) {
            this.fps = this._frames;
            this._frames = 0;
            this._lastFpsUpdate = this._current;
        }
    }
    static getFormattedTime() {
        const now = new Date();
        return now.toLocaleTimeString();
    }
    static getFormattedDate() {
        const now = new Date();
        return now.toLocaleDateString("en-US", {
            month: "2-digit",
            day: "2-digit",
            year: "numeric"
        }).replace(/\//g, " • ");
    }
}
Time._last = performance.now();
Time._current = performance.now();
Time.deltaTime = 0;
Time.time = 0;
// --- FPS tracking ---
Time._frames = 0;
Time._lastFpsUpdate = performance.now();
Time.fps = 0;
Time.fixedDeltaTime = 1 / 50; // 50 Hz like Unity
Time._fixedAccumulator = 0;


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


const ctx = _helpers_CanvasManager__WEBPACK_IMPORTED_MODULE_0__.CanvasManager.ctx;
function toHex(num) {
    let chars = "0123456789ABCDEF";
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

/***/ "./src/engine/lib/complexShapes.ts"
/*!*****************************************!*\
  !*** ./src/engine/lib/complexShapes.ts ***!
  \*****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   beginShape: () => (/* binding */ beginShape),
/* harmony export */   bezierVertex: () => (/* binding */ bezierVertex),
/* harmony export */   endShape: () => (/* binding */ endShape),
/* harmony export */   strokeJoin: () => (/* binding */ strokeJoin),
/* harmony export */   vertex: () => (/* binding */ vertex)
/* harmony export */ });
/* harmony import */ var _pjsSettings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pjsSettings */ "./src/engine/lib/pjsSettings.ts");
/* harmony import */ var _helpers_CanvasManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers/CanvasManager */ "./src/engine/helpers/CanvasManager.ts");


const ctx = _helpers_CanvasManager__WEBPACK_IMPORTED_MODULE_1__.CanvasManager.ctx;
function beginShape() {
    _pjsSettings__WEBPACK_IMPORTED_MODULE_0__.pjsSettings.requiresFirstVertex = true;
    ctx.beginPath();
}
function endShape() {
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}
function vertex(x, y) {
    if (_pjsSettings__WEBPACK_IMPORTED_MODULE_0__.pjsSettings.requiresFirstVertex) {
        ctx.moveTo(x, y);
        _pjsSettings__WEBPACK_IMPORTED_MODULE_0__.pjsSettings.requiresFirstVertex = false;
    }
    else {
        ctx.lineTo(x, y);
    }
}
function bezierVertex(cx1, cy1, cx2, cy2, x, y) {
    if (_pjsSettings__WEBPACK_IMPORTED_MODULE_0__.pjsSettings.requiresFirstVertex) {
        throw new Error("vertex() must be used at least once before calling bezierVertex()");
    }
    else {
        ctx.bezierCurveTo(cx1, cy1, cx2, cy2, x, y);
    }
}
function strokeJoin(MODE) {
    if (!["MITER", "BEVEL", "ROUND"].includes(MODE)) {
        console.error("Invalid strokeJoin MODE:", MODE);
    }
    ctx.lineJoin = MODE;
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

/***/ "./src/engine/lib/other.ts"
/*!*********************************!*\
  !*** ./src/engine/lib/other.ts ***!
  \*********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   cursor: () => (/* binding */ cursor),
/* harmony export */   endMask: () => (/* binding */ endMask),
/* harmony export */   get: () => (/* binding */ get),
/* harmony export */   startMask: () => (/* binding */ startMask)
/* harmony export */ });
/* harmony import */ var _helpers_CanvasManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers/CanvasManager */ "./src/engine/helpers/CanvasManager.ts");

const ctx = _helpers_CanvasManager__WEBPACK_IMPORTED_MODULE_0__.CanvasManager.ctx;
function get(x = 0, y = 0, w = _helpers_CanvasManager__WEBPACK_IMPORTED_MODULE_0__.CanvasManager.width, h = _helpers_CanvasManager__WEBPACK_IMPORTED_MODULE_0__.CanvasManager.height) {
    //if (arguments.length === 0 || arguments.length === 4) {
    const imgData = ctx.getImageData(x, y, w, h);
    const offCanvas = document.createElement("canvas");
    offCanvas.width = imgData.width;
    offCanvas.height = imgData.height;
    const offCtx = offCanvas.getContext("2d");
    offCtx.putImageData(imgData, 0, 0);
    return offCanvas;
    //}
    // if (arguments.length === 2) {
    //     const imageData = ctx.getImageData(x, y, 1, 1);
    //     const [r, g, b, a] = imageData.data;
    //     return `rgba(${r}, ${g}, ${b}, ${a})`;
    // }
    //console.error(`get() requires 0, 2, or 4 parameters, not ${arguments.length}`);
    //eturn undefined;
}
function startMask(shape) {
    ctx.save();
    shape();
    ctx.clip();
}
function endMask() {
    ctx.restore();
}
function cursor(cursor) {
    document.body.style.cursor = cursor;
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


/***/ },

/***/ "./src/engine/ui/UserInput.ts"
/*!************************************!*\
  !*** ./src/engine/ui/UserInput.ts ***!
  \************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UserInput: () => (/* binding */ UserInput)
/* harmony export */ });
/* harmony import */ var _helpers_CanvasManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers/CanvasManager */ "./src/engine/helpers/CanvasManager.ts");
/* harmony import */ var _helpers_ScreenManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers/ScreenManager */ "./src/engine/helpers/ScreenManager.ts");


class UserInput {
    static init() {
        if (!this._instance) {
            this._instance = new UserInput();
        }
        return this._instance;
    }
    static get Instance() {
        if (!this._instance) {
            throw new Error("UserInput not initialized. Call UserInput.init() first.");
        }
        return this._instance;
    }
    constructor() {
        this.mouseX = 0;
        this.mouseY = 0;
        this.mousePressed = false;
        this.mouseClicked = false;
        this.keys = {};
        this.attachMouseListeners();
        this.attachKeyboardListeners();
    }
    attachMouseListeners() {
        const canvas = _helpers_CanvasManager__WEBPACK_IMPORTED_MODULE_0__.CanvasManager.canvas;
        canvas.addEventListener("mousedown", () => {
            this.mousePressed = true;
        });
        canvas.addEventListener("mouseup", () => {
            this.mousePressed = false;
            this.mouseClicked = true;
        });
        canvas.addEventListener("mousemove", (e) => {
            const rect = canvas.getBoundingClientRect();
            const screen = _helpers_ScreenManager__WEBPACK_IMPORTED_MODULE_1__.ScreenManager.Instance;
            const scaleX = screen.originalWidth / rect.width;
            const scaleY = screen.originalHeight / rect.height;
            this.mouseX = (e.clientX - rect.left) * scaleX;
            this.mouseY = (e.clientY - rect.top) * scaleY;
        });
        canvas.addEventListener("contextmenu", (e) => {
            // e.preventDefault(); // optional
        });
    }
    attachKeyboardListeners() {
        document.addEventListener("keydown", (e) => {
            this.keys[e.key.toLowerCase()] = true;
        });
        document.addEventListener("keyup", (e) => {
            this.keys[e.key.toLowerCase()] = false;
        });
    }
    update() {
        this.mouseClicked = false;
    }
}
UserInput._instance = null;


/***/ },

/***/ "./src/game/TestScene.ts"
/*!*******************************!*\
  !*** ./src/game/TestScene.ts ***!
  \*******************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TestScene: () => (/* binding */ TestScene)
/* harmony export */ });
/* harmony import */ var _engine_core_scene_Scene__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../engine/core/scene/Scene */ "./src/engine/core/scene/Scene.ts");
/* harmony import */ var _prefabs_MinerPrefab__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./prefabs/MinerPrefab */ "./src/game/prefabs/MinerPrefab.ts");


class TestScene extends _engine_core_scene_Scene__WEBPACK_IMPORTED_MODULE_0__.Scene {
    constructor() {
        super();
        const miner = _prefabs_MinerPrefab__WEBPACK_IMPORTED_MODULE_1__.MinerPrefab.instantiate();
        miner.transform.position.set(200, 200);
        this.addGameObject(miner);
    }
}


/***/ },

/***/ "./src/game/config/MinerStates.ts"
/*!****************************************!*\
  !*** ./src/game/config/MinerStates.ts ***!
  \****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MinerStates: () => (/* binding */ MinerStates)
/* harmony export */ });
var MinerStates;
(function (MinerStates) {
    MinerStates["ToDigging"] = "toDigging";
    MinerStates["Digging"] = "digging";
    MinerStates["ToCrate"] = "toCrate";
})(MinerStates || (MinerStates = {}));


/***/ },

/***/ "./src/game/content/ImageManifest.ts"
/*!*******************************************!*\
  !*** ./src/game/content/ImageManifest.ts ***!
  \*******************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ImageManifest: () => (/* binding */ ImageManifest)
/* harmony export */ });
/* harmony import */ var _engine_lib_colors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../engine/lib/colors */ "./src/engine/lib/colors.ts");
/* harmony import */ var _engine_lib_other__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../engine/lib/other */ "./src/engine/lib/other.ts");
/* harmony import */ var _engine_lib_shapes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../engine/lib/shapes */ "./src/engine/lib/shapes.ts");
/* harmony import */ var _engine_lib_complexShapes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../engine/lib/complexShapes */ "./src/engine/lib/complexShapes.ts");
/* harmony import */ var _engine_helpers_ImageManager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../engine/helpers/ImageManager */ "./src/engine/helpers/ImageManager.ts");
/* harmony import */ var _engine_helpers_CanvasManager__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../engine/helpers/CanvasManager */ "./src/engine/helpers/CanvasManager.ts");






class ImageManifest {
    static registerImages() {
        const img = _engine_helpers_ImageManager__WEBPACK_IMPORTED_MODULE_4__.ImageManager.Instance;
        const canvas = _engine_helpers_CanvasManager__WEBPACK_IMPORTED_MODULE_5__.CanvasManager.canvas;
        img.register("topBottomGradient", () => {
            (0,_engine_lib_colors__WEBPACK_IMPORTED_MODULE_0__.background)(0, 0, 0, 0);
            (0,_engine_lib_colors__WEBPACK_IMPORTED_MODULE_0__.fill)(40, 75, 105);
            (0,_engine_lib_shapes__WEBPACK_IMPORTED_MODULE_2__.rect)(0, 0, canvas.width, 2);
            (0,_engine_lib_shapes__WEBPACK_IMPORTED_MODULE_2__.rect)(0, 48, canvas.width, 2);
            (0,_engine_lib_colors__WEBPACK_IMPORTED_MODULE_0__.gradient)(0, 2, canvas.width, 46, (0,_engine_lib_colors__WEBPACK_IMPORTED_MODULE_0__.color)(98, 147, 188), (0,_engine_lib_colors__WEBPACK_IMPORTED_MODULE_0__.color)(50, 93, 128));
            return (0,_engine_lib_other__WEBPACK_IMPORTED_MODULE_1__.get)(0, 0, canvas.width, 50);
        });
        img.register("miner", () => {
            (0,_engine_lib_colors__WEBPACK_IMPORTED_MODULE_0__.background)(0, 0, 0, 0);
            (0,_engine_lib_colors__WEBPACK_IMPORTED_MODULE_0__.noStroke)();
            (0,_engine_lib_colors__WEBPACK_IMPORTED_MODULE_0__.fill)(0);
            (0,_engine_lib_shapes__WEBPACK_IMPORTED_MODULE_2__.rect)(0, 0, 25, 75);
            (0,_engine_lib_colors__WEBPACK_IMPORTED_MODULE_0__.fill)(255);
            (0,_engine_lib_shapes__WEBPACK_IMPORTED_MODULE_2__.rect)(25, 0, 25, 75);
            return (0,_engine_lib_other__WEBPACK_IMPORTED_MODULE_1__.get)(0, 0, 50, 75);
        });
        img.register("elevator", () => {
            (0,_engine_lib_colors__WEBPACK_IMPORTED_MODULE_0__.background)(0, 0, 0, 0);
            (0,_engine_lib_colors__WEBPACK_IMPORTED_MODULE_0__.fill)(136, 198, 221);
            (0,_engine_lib_colors__WEBPACK_IMPORTED_MODULE_0__.strokeWeight)(2);
            (0,_engine_lib_colors__WEBPACK_IMPORTED_MODULE_0__.stroke)(0);
            (0,_engine_lib_shapes__WEBPACK_IMPORTED_MODULE_2__.rect)(30, 150, 50, 12, 5);
            (0,_engine_lib_shapes__WEBPACK_IMPORTED_MODULE_2__.rect)(15, 140, 80, 13, 1);
            (0,_engine_lib_complexShapes__WEBPACK_IMPORTED_MODULE_3__.beginShape)();
            (0,_engine_lib_complexShapes__WEBPACK_IMPORTED_MODULE_3__.vertex)(0, 11);
            (0,_engine_lib_complexShapes__WEBPACK_IMPORTED_MODULE_3__.vertex)(110, 11);
            (0,_engine_lib_complexShapes__WEBPACK_IMPORTED_MODULE_3__.vertex)(110, 133);
            (0,_engine_lib_complexShapes__WEBPACK_IMPORTED_MODULE_3__.vertex)(90, 145);
            (0,_engine_lib_complexShapes__WEBPACK_IMPORTED_MODULE_3__.vertex)(25, 145);
            (0,_engine_lib_complexShapes__WEBPACK_IMPORTED_MODULE_3__.vertex)(0, 133);
            (0,_engine_lib_complexShapes__WEBPACK_IMPORTED_MODULE_3__.endShape)();
            (0,_engine_lib_shapes__WEBPACK_IMPORTED_MODULE_2__.ellipse)(20, 8, 16, 16);
            (0,_engine_lib_shapes__WEBPACK_IMPORTED_MODULE_2__.ellipse)(90, 8, 16, 16);
            (0,_engine_lib_shapes__WEBPACK_IMPORTED_MODULE_2__.ellipse)(20, 8, 2, 2);
            (0,_engine_lib_shapes__WEBPACK_IMPORTED_MODULE_2__.ellipse)(90, 8, 2, 2);
            (0,_engine_lib_complexShapes__WEBPACK_IMPORTED_MODULE_3__.beginShape)();
            (0,_engine_lib_complexShapes__WEBPACK_IMPORTED_MODULE_3__.vertex)(30, 11);
            (0,_engine_lib_complexShapes__WEBPACK_IMPORTED_MODULE_3__.vertex)(80, 11);
            (0,_engine_lib_complexShapes__WEBPACK_IMPORTED_MODULE_3__.vertex)(80, 7);
            (0,_engine_lib_complexShapes__WEBPACK_IMPORTED_MODULE_3__.vertex)(70, 1);
            (0,_engine_lib_complexShapes__WEBPACK_IMPORTED_MODULE_3__.vertex)(40, 1);
            (0,_engine_lib_complexShapes__WEBPACK_IMPORTED_MODULE_3__.vertex)(30, 7);
            (0,_engine_lib_complexShapes__WEBPACK_IMPORTED_MODULE_3__.endShape)();
            (0,_engine_lib_colors__WEBPACK_IMPORTED_MODULE_0__.fill)(0, 0, 0, 0);
            (0,_engine_lib_colors__WEBPACK_IMPORTED_MODULE_0__.stroke)(0);
            (0,_engine_lib_complexShapes__WEBPACK_IMPORTED_MODULE_3__.beginShape)();
            (0,_engine_lib_complexShapes__WEBPACK_IMPORTED_MODULE_3__.vertex)(8, 19);
            (0,_engine_lib_complexShapes__WEBPACK_IMPORTED_MODULE_3__.vertex)(102, 19);
            (0,_engine_lib_complexShapes__WEBPACK_IMPORTED_MODULE_3__.vertex)(102, 40);
            (0,_engine_lib_complexShapes__WEBPACK_IMPORTED_MODULE_3__.vertex)(100, 45);
            (0,_engine_lib_complexShapes__WEBPACK_IMPORTED_MODULE_3__.vertex)(100, 65);
            (0,_engine_lib_complexShapes__WEBPACK_IMPORTED_MODULE_3__.vertex)(98, 70);
            (0,_engine_lib_complexShapes__WEBPACK_IMPORTED_MODULE_3__.vertex)(98, 85);
            (0,_engine_lib_complexShapes__WEBPACK_IMPORTED_MODULE_3__.vertex)(100, 90);
            (0,_engine_lib_complexShapes__WEBPACK_IMPORTED_MODULE_3__.vertex)(100, 110);
            (0,_engine_lib_complexShapes__WEBPACK_IMPORTED_MODULE_3__.vertex)(102, 115);
            (0,_engine_lib_complexShapes__WEBPACK_IMPORTED_MODULE_3__.vertex)(102, 126);
            (0,_engine_lib_complexShapes__WEBPACK_IMPORTED_MODULE_3__.vertex)(85, 137);
            (0,_engine_lib_complexShapes__WEBPACK_IMPORTED_MODULE_3__.vertex)(30, 137);
            (0,_engine_lib_complexShapes__WEBPACK_IMPORTED_MODULE_3__.vertex)(8, 126);
            (0,_engine_lib_complexShapes__WEBPACK_IMPORTED_MODULE_3__.vertex)(8, 115);
            (0,_engine_lib_complexShapes__WEBPACK_IMPORTED_MODULE_3__.vertex)(10, 110);
            (0,_engine_lib_complexShapes__WEBPACK_IMPORTED_MODULE_3__.vertex)(10, 90);
            (0,_engine_lib_complexShapes__WEBPACK_IMPORTED_MODULE_3__.vertex)(12, 85);
            (0,_engine_lib_complexShapes__WEBPACK_IMPORTED_MODULE_3__.vertex)(12, 70);
            (0,_engine_lib_complexShapes__WEBPACK_IMPORTED_MODULE_3__.vertex)(10, 65);
            (0,_engine_lib_complexShapes__WEBPACK_IMPORTED_MODULE_3__.vertex)(10, 45);
            (0,_engine_lib_complexShapes__WEBPACK_IMPORTED_MODULE_3__.vertex)(8, 40);
            (0,_engine_lib_complexShapes__WEBPACK_IMPORTED_MODULE_3__.endShape)();
            return (0,_engine_lib_other__WEBPACK_IMPORTED_MODULE_1__.get)(0, 0, 110, 170);
        });
        img.register("elevatorDropoff", () => {
            (0,_engine_lib_colors__WEBPACK_IMPORTED_MODULE_0__.background)(0, 0, 0, 0);
            (0,_engine_lib_colors__WEBPACK_IMPORTED_MODULE_0__.stroke)(0);
            (0,_engine_lib_colors__WEBPACK_IMPORTED_MODULE_0__.strokeWeight)(2);
            (0,_engine_lib_complexShapes__WEBPACK_IMPORTED_MODULE_3__.beginShape)();
            (0,_engine_lib_complexShapes__WEBPACK_IMPORTED_MODULE_3__.vertex)(1, 1);
            (0,_engine_lib_complexShapes__WEBPACK_IMPORTED_MODULE_3__.vertex)(135, 1);
            (0,_engine_lib_complexShapes__WEBPACK_IMPORTED_MODULE_3__.vertex)(135, 8);
            (0,_engine_lib_complexShapes__WEBPACK_IMPORTED_MODULE_3__.vertex)(125, 16);
            (0,_engine_lib_complexShapes__WEBPACK_IMPORTED_MODULE_3__.vertex)(11, 16);
            (0,_engine_lib_complexShapes__WEBPACK_IMPORTED_MODULE_3__.vertex)(1, 8);
            (0,_engine_lib_complexShapes__WEBPACK_IMPORTED_MODULE_3__.endShape)();
            (0,_engine_lib_colors__WEBPACK_IMPORTED_MODULE_0__.noStroke)();
            (0,_engine_lib_colors__WEBPACK_IMPORTED_MODULE_0__.fill)(89, 139, 162);
            (0,_engine_lib_shapes__WEBPACK_IMPORTED_MODULE_2__.rect)(2, 2, 132, 2);
            (0,_engine_lib_colors__WEBPACK_IMPORTED_MODULE_0__.fill)(58, 104, 120);
            (0,_engine_lib_shapes__WEBPACK_IMPORTED_MODULE_2__.rect)(2, 4, 132, 4);
            (0,_engine_lib_colors__WEBPACK_IMPORTED_MODULE_0__.fill)(51, 87, 101);
            (0,_engine_lib_shapes__WEBPACK_IMPORTED_MODULE_2__.quad)(2, 8, 11, 15, 125, 15, 134, 8);
            (0,_engine_lib_colors__WEBPACK_IMPORTED_MODULE_0__.stroke)(0);
            (0,_engine_lib_colors__WEBPACK_IMPORTED_MODULE_0__.strokeWeight)(2);
            (0,_engine_lib_colors__WEBPACK_IMPORTED_MODULE_0__.fill)(218, 96, 21);
            (0,_engine_lib_shapes__WEBPACK_IMPORTED_MODULE_2__.quad)(42, 25, 54, 16, 81, 16, 93, 25);
            (0,_engine_lib_shapes__WEBPACK_IMPORTED_MODULE_2__.quad)(42, 25, 93, 25, 84, 30, 51, 30);
            (0,_engine_lib_colors__WEBPACK_IMPORTED_MODULE_0__.noStroke)();
            (0,_engine_lib_colors__WEBPACK_IMPORTED_MODULE_0__.fill)(107, 32, 13);
            (0,_engine_lib_complexShapes__WEBPACK_IMPORTED_MODULE_3__.beginShape)();
            (0,_engine_lib_complexShapes__WEBPACK_IMPORTED_MODULE_3__.vertex)(48, 24);
            (0,_engine_lib_complexShapes__WEBPACK_IMPORTED_MODULE_3__.vertex)(57, 18);
            (0,_engine_lib_complexShapes__WEBPACK_IMPORTED_MODULE_3__.vertex)(59, 18);
            (0,_engine_lib_complexShapes__WEBPACK_IMPORTED_MODULE_3__.vertex)(54, 22);
            (0,_engine_lib_complexShapes__WEBPACK_IMPORTED_MODULE_3__.vertex)(81, 22);
            (0,_engine_lib_complexShapes__WEBPACK_IMPORTED_MODULE_3__.vertex)(76, 18);
            (0,_engine_lib_complexShapes__WEBPACK_IMPORTED_MODULE_3__.vertex)(78, 18);
            (0,_engine_lib_complexShapes__WEBPACK_IMPORTED_MODULE_3__.vertex)(87, 24);
            (0,_engine_lib_complexShapes__WEBPACK_IMPORTED_MODULE_3__.endShape)();
            (0,_engine_lib_shapes__WEBPACK_IMPORTED_MODULE_2__.quad)(49, 26, 86, 26, 81, 29, 54, 29);
            (0,_engine_lib_colors__WEBPACK_IMPORTED_MODULE_0__.fill)(213, 68, 23);
            (0,_engine_lib_shapes__WEBPACK_IMPORTED_MODULE_2__.quad)(59, 18, 66, 18, 61, 22, 54, 22);
            (0,_engine_lib_shapes__WEBPACK_IMPORTED_MODULE_2__.quad)(76, 18, 69, 18, 74, 22, 81, 22);
            return (0,_engine_lib_other__WEBPACK_IMPORTED_MODULE_1__.get)(0, 0, 136, 31);
        });
        img.register("button", () => {
            (0,_engine_lib_colors__WEBPACK_IMPORTED_MODULE_0__.background)(0, 0, 0, 0);
            (0,_engine_lib_colors__WEBPACK_IMPORTED_MODULE_0__.noStroke)();
            (0,_engine_lib_colors__WEBPACK_IMPORTED_MODULE_0__.fill)(0);
            (0,_engine_lib_shapes__WEBPACK_IMPORTED_MODULE_2__.rect)(0, 0, 60, 60);
            (0,_engine_lib_colors__WEBPACK_IMPORTED_MODULE_0__.fill)(169, 218, 246);
            (0,_engine_lib_shapes__WEBPACK_IMPORTED_MODULE_2__.quad)(12, 3, 10, 0, 50, 0, 48, 3);
            (0,_engine_lib_colors__WEBPACK_IMPORTED_MODULE_0__.fill)(108, 189, 234);
            (0,_engine_lib_shapes__WEBPACK_IMPORTED_MODULE_2__.quad)(0, 10, 3, 12, 12, 3, 10, 0);
            (0,_engine_lib_shapes__WEBPACK_IMPORTED_MODULE_2__.quad)(60, 10, 57, 12, 48, 3, 50, 0);
            (0,_engine_lib_colors__WEBPACK_IMPORTED_MODULE_0__.fill)(26, 97, 141);
            (0,_engine_lib_shapes__WEBPACK_IMPORTED_MODULE_2__.quad)(0, 10, 3, 12, 3, 30, 0, 30);
            (0,_engine_lib_shapes__WEBPACK_IMPORTED_MODULE_2__.quad)(60, 10, 57, 12, 57, 30, 60, 30);
            (0,_engine_lib_colors__WEBPACK_IMPORTED_MODULE_0__.fill)(26, 84, 126);
            (0,_engine_lib_shapes__WEBPACK_IMPORTED_MODULE_2__.quad)(0, 50, 3, 48, 3, 30, 0, 30);
            (0,_engine_lib_shapes__WEBPACK_IMPORTED_MODULE_2__.quad)(60, 50, 57, 48, 57, 30, 60, 30);
            (0,_engine_lib_colors__WEBPACK_IMPORTED_MODULE_0__.fill)(25, 73, 103);
            (0,_engine_lib_complexShapes__WEBPACK_IMPORTED_MODULE_3__.beginShape)();
            (0,_engine_lib_complexShapes__WEBPACK_IMPORTED_MODULE_3__.vertex)(0, 50);
            (0,_engine_lib_complexShapes__WEBPACK_IMPORTED_MODULE_3__.vertex)(3, 48);
            (0,_engine_lib_complexShapes__WEBPACK_IMPORTED_MODULE_3__.vertex)(57, 48);
            (0,_engine_lib_complexShapes__WEBPACK_IMPORTED_MODULE_3__.vertex)(60, 50);
            (0,_engine_lib_complexShapes__WEBPACK_IMPORTED_MODULE_3__.endShape)();
            return (0,_engine_lib_other__WEBPACK_IMPORTED_MODULE_1__.get)(0, 0, 60, 60);
        });
        img.register("crate", () => {
            (0,_engine_lib_colors__WEBPACK_IMPORTED_MODULE_0__.noStroke)();
            (0,_engine_lib_colors__WEBPACK_IMPORTED_MODULE_0__.fill)(255, 0, 0);
            (0,_engine_lib_shapes__WEBPACK_IMPORTED_MODULE_2__.rect)(0, 0, 70, 40);
            return (0,_engine_lib_other__WEBPACK_IMPORTED_MODULE_1__.get)(0, 0, 70, 40);
        });
        img.register("shaft", () => {
            (0,_engine_lib_colors__WEBPACK_IMPORTED_MODULE_0__.fill)(150);
            (0,_engine_lib_shapes__WEBPACK_IMPORTED_MODULE_2__.rect)(0, 0, 500, 100);
            (0,_engine_lib_colors__WEBPACK_IMPORTED_MODULE_0__.stroke)(0);
            (0,_engine_lib_colors__WEBPACK_IMPORTED_MODULE_0__.fill)(100, 100, 100);
            (0,_engine_lib_shapes__WEBPACK_IMPORTED_MODULE_2__.rect)(127, 25, 46, 46, 10);
            (0,_engine_lib_shapes__WEBPACK_IMPORTED_MODULE_2__.rect)(131, 29, 38, 38, 8);
            (0,_engine_lib_colors__WEBPACK_IMPORTED_MODULE_0__.fill)(0);
            (0,_engine_lib_shapes__WEBPACK_IMPORTED_MODULE_2__.rect)(0, 100, 500, 13);
            return (0,_engine_lib_other__WEBPACK_IMPORTED_MODULE_1__.get)(0, 0, 500, 100);
        });
    }
}


/***/ },

/***/ "./src/game/entities/MinerBehavior.ts"
/*!********************************************!*\
  !*** ./src/game/entities/MinerBehavior.ts ***!
  \********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MinerBehavior: () => (/* binding */ MinerBehavior)
/* harmony export */ });
/* harmony import */ var _engine_core_ECS_components_ui_ProgressBarUI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../engine/core/ECS/components/ui/ProgressBarUI */ "./src/engine/core/ECS/components/ui/ProgressBarUI.ts");
/* harmony import */ var _engine_core_ECS_main_MonoBehavior__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../engine/core/ECS/main/MonoBehavior */ "./src/engine/core/ECS/main/MonoBehavior.ts");
/* harmony import */ var _engine_helpers_TimeManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../engine/helpers/TimeManager */ "./src/engine/helpers/TimeManager.ts");
/* harmony import */ var _config_MinerStates__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../config/MinerStates */ "./src/game/config/MinerStates.ts");
/* harmony import */ var _prefabs_MinerPrefab__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../prefabs/MinerPrefab */ "./src/game/prefabs/MinerPrefab.ts");





class MinerBehavior extends _engine_core_ECS_main_MonoBehavior__WEBPACK_IMPORTED_MODULE_1__.MonoBehavior {
    constructor() {
        super(...arguments);
        this.maxLoad = 100;
        this.currentLoad = 0;
        this.loadSpeed = 50;
        this.moveSpeed = 60;
        this.direction = 1;
        this.action = _config_MinerStates__WEBPACK_IMPORTED_MODULE_3__.MinerStates.ToDigging;
    }
    Awake() {
        this.progressBar = this.GetComponent(_engine_core_ECS_components_ui_ProgressBarUI__WEBPACK_IMPORTED_MODULE_0__.ProgressBarUI);
    }
    Update() {
        this.progressBar.hidden = this.action != _config_MinerStates__WEBPACK_IMPORTED_MODULE_3__.MinerStates.Digging;
        this.progressBar.max = this.maxLoad;
        this.progressBar.current = this.currentLoad;
        this.transform.scale.x = this.direction;
        let x = this.transform.position.x;
        switch (this.action) {
            case _config_MinerStates__WEBPACK_IMPORTED_MODULE_3__.MinerStates.ToDigging:
                this.direction = 1;
                if (x < 500) {
                    this.transform.position.x += this.moveSpeed * _engine_helpers_TimeManager__WEBPACK_IMPORTED_MODULE_2__.Time.deltaTime;
                }
                else {
                    this.action = _config_MinerStates__WEBPACK_IMPORTED_MODULE_3__.MinerStates.Digging;
                }
                break;
            case _config_MinerStates__WEBPACK_IMPORTED_MODULE_3__.MinerStates.Digging:
                this.direction = 1;
                this.currentLoad += this.loadSpeed * _engine_helpers_TimeManager__WEBPACK_IMPORTED_MODULE_2__.Time.deltaTime;
                if (this.currentLoad >= this.maxLoad) {
                    this.currentLoad = this.maxLoad;
                    this.action = _config_MinerStates__WEBPACK_IMPORTED_MODULE_3__.MinerStates.ToCrate;
                }
                break;
            case _config_MinerStates__WEBPACK_IMPORTED_MODULE_3__.MinerStates.ToCrate:
                this.direction = -1;
                if (x > 300) {
                    this.transform.position.x -= this.moveSpeed * _engine_helpers_TimeManager__WEBPACK_IMPORTED_MODULE_2__.Time.deltaTime;
                }
                else {
                    this.crate.add(this.currentLoad);
                    this.currentLoad = 0;
                    this.action = _config_MinerStates__WEBPACK_IMPORTED_MODULE_3__.MinerStates.ToDigging;
                }
                break;
        }
    }
    toJSON() {
        return {
            maxLoad: this.maxLoad,
            currentLoad: this.currentLoad,
            loadSpeed: this.loadSpeed,
            moveSpeed: this.moveSpeed
        };
    }
    static fromJSON(data) {
        const minerGO = _prefabs_MinerPrefab__WEBPACK_IMPORTED_MODULE_4__.MinerPrefab.instantiate();
        const minerBehavior = minerGO.GetComponent(MinerBehavior);
        minerBehavior.maxLoad = data.maxLoad;
        minerBehavior.currentLoad = data.currentLoad;
        minerBehavior.loadSpeed = data.loadSpeed;
        minerBehavior.moveSpeed = data.moveSpeed;
        return minerGO;
    }
}


/***/ },

/***/ "./src/game/prefabs/MinerPrefab.ts"
/*!*****************************************!*\
  !*** ./src/game/prefabs/MinerPrefab.ts ***!
  \*****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MinerPrefab: () => (/* binding */ MinerPrefab)
/* harmony export */ });
/* harmony import */ var _engine_lib_colors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../engine/lib/colors */ "./src/engine/lib/colors.ts");
/* harmony import */ var _engine_core_ECS_components_SpriteRenderer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../engine/core/ECS/components/SpriteRenderer */ "./src/engine/core/ECS/components/SpriteRenderer.ts");
/* harmony import */ var _engine_core_ECS_components_ui_ProgressBarUI__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../engine/core/ECS/components/ui/ProgressBarUI */ "./src/engine/core/ECS/components/ui/ProgressBarUI.ts");
/* harmony import */ var _engine_core_math_Vector2__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../engine/core/math/Vector2 */ "./src/engine/core/math/Vector2.ts");
/* harmony import */ var _engine_core_ECS_Prefab__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../engine/core/ECS/Prefab */ "./src/engine/core/ECS/Prefab.ts");
/* harmony import */ var _entities_MinerBehavior__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../entities/MinerBehavior */ "./src/game/entities/MinerBehavior.ts");






class MinerPrefab extends _engine_core_ECS_Prefab__WEBPACK_IMPORTED_MODULE_4__.Prefab {
    constructor() {
        super();
        const spriteRenderer = this.AddComponent(_engine_core_ECS_components_SpriteRenderer__WEBPACK_IMPORTED_MODULE_1__.SpriteRenderer);
        spriteRenderer.initialize("miner", 50, 75, new _engine_core_math_Vector2__WEBPACK_IMPORTED_MODULE_3__.Vector2(0, 0));
        const progressBar = this.AddComponent(_engine_core_ECS_components_ui_ProgressBarUI__WEBPACK_IMPORTED_MODULE_2__.ProgressBarUI);
        progressBar.initialize((0,_engine_lib_colors__WEBPACK_IMPORTED_MODULE_0__.color)(255, 214, 89), (0,_engine_lib_colors__WEBPACK_IMPORTED_MODULE_0__.color)(255), 0, 200 / 3, 15 / 2, new _engine_core_math_Vector2__WEBPACK_IMPORTED_MODULE_3__.Vector2(-25 / 3, -25 / 2));
        this.AddComponent(_entities_MinerBehavior__WEBPACK_IMPORTED_MODULE_5__.MinerBehavior);
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
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _engine_core_scene_SceneManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./engine/core/scene/SceneManager */ "./src/engine/core/scene/SceneManager.ts");
/* harmony import */ var _engine_Engine__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./engine/Engine */ "./src/engine/Engine.ts");
/* harmony import */ var _game_TestScene__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./game/TestScene */ "./src/game/TestScene.ts");



_engine_core_scene_SceneManager__WEBPACK_IMPORTED_MODULE_0__.SceneManager.loadScene(new _game_TestScene__WEBPACK_IMPORTED_MODULE_2__.TestScene());
_engine_Engine__WEBPACK_IMPORTED_MODULE_1__.Engine.start();

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map