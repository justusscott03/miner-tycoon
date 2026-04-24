/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/engine/EditorBootstrapper.ts"
/*!******************************************!*\
  !*** ./src/engine/EditorBootstrapper.ts ***!
  \******************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EditorBootstrapper: () => (/* binding */ EditorBootstrapper)
/* harmony export */ });
/* harmony import */ var _windows_WindowManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./windows/WindowManager */ "./src/engine/windows/WindowManager.ts");
/* harmony import */ var _windows_ShapeEditorWindow__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./windows/ShapeEditorWindow */ "./src/engine/windows/ShapeEditorWindow.ts");
/* harmony import */ var _windows_PrefabGeneratorWindow__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./windows/PrefabGeneratorWindow */ "./src/engine/windows/PrefabGeneratorWindow.ts");
/* harmony import */ var _windows_ProjectWindow__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./windows/ProjectWindow */ "./src/engine/windows/ProjectWindow.ts");




class EditorBootstrapper {
    constructor() { }
    start() {
        this.windowManager = new _windows_WindowManager__WEBPACK_IMPORTED_MODULE_0__.WindowManager();
        // Initialize editor tools
        new _windows_ShapeEditorWindow__WEBPACK_IMPORTED_MODULE_1__.ShapeEditorWindow("shapeEditorCanvas", "shapeTypeContainer", "shapeInspector", "shapeHierarchyPanel", "shapeEditorExportOutput", "exportButton", "layerContextMenu");
        new _windows_PrefabGeneratorWindow__WEBPACK_IMPORTED_MODULE_2__.PrefabGeneratorWindow("prefabContainer", "componentSelect", "className", "generateButton", "downloadButton", "componentList", "output");
        new _windows_ProjectWindow__WEBPACK_IMPORTED_MODULE_3__.ProjectWindow("projectTree");
        console.log("Editor initialized");
    }
}


/***/ },

/***/ "./src/engine/config/ComponentRegistry.ts"
/*!************************************************!*\
  !*** ./src/engine/config/ComponentRegistry.ts ***!
  \************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ComponentRegistry: () => (/* binding */ ComponentRegistry)
/* harmony export */ });
/* harmony import */ var _core_ECS_ComponentScanner__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/ECS/ComponentScanner */ "./src/engine/core/ECS/ComponentScanner.ts");

(0,_core_ECS_ComponentScanner__WEBPACK_IMPORTED_MODULE_0__.autoScanComponents)();
const ComponentRegistry = _core_ECS_ComponentScanner__WEBPACK_IMPORTED_MODULE_0__.ComponentRegistry;


/***/ },

/***/ "./src/engine/config/ImportMap.ts"
/*!****************************************!*\
  !*** ./src/engine/config/ImportMap.ts ***!
  \****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
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

/***/ "./src/engine/config/Physics2D.ts"
/*!****************************************!*\
  !*** ./src/engine/config/Physics2D.ts ***!
  \****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Physics2D: () => (/* binding */ Physics2D)
/* harmony export */ });
class Physics2D {
}
Physics2D.gravity = { x: 0, y: 500 }; // pixels per second squared


/***/ },

/***/ "./src/engine/core/ECS/ComponentScanner.ts"
/*!*************************************************!*\
  !*** ./src/engine/core/ECS/ComponentScanner.ts ***!
  \*************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ComponentRegistry: () => (/* binding */ ComponentRegistry),
/* harmony export */   autoScanComponents: () => (/* binding */ autoScanComponents)
/* harmony export */ });
/* harmony import */ var _main_MonoBehavior__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./main/MonoBehavior */ "./src/engine/core/ECS/main/MonoBehavior.ts");
/* harmony import */ var _config_ImportMap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../config/ImportMap */ "./src/engine/config/ImportMap.ts");


const ComponentRegistry = {};
function autoScanComponents() {
    const contexts = [
        __webpack_require__("./src/engine/core/ECS/components sync recursive \\.ts$"),
        __webpack_require__("./src/game/components sync recursive \\.ts$")
    ];
    for (const context of contexts) {
        context.keys().forEach((key) => {
            const module = context(key);
            // Webpack gives us the actual file path here
            const resolvedPath = context.resolve(key);
            for (const exportName in module) {
                const value = module[exportName];
                // -----------------------------
                // DATA COMPONENT (ComponentDefinition)
                // -----------------------------
                if (value &&
                    typeof value === "object" &&
                    "params" in value) {
                    const name = exportName.replace("Def", "");
                    // Remove extension from resolvedPath
                    const cleanedPath = resolvedPath.replace(/\.(ts|js)$/, "");
                    ComponentRegistry[name] = {
                        type: "data",
                        name,
                        def: value,
                        importPath: cleanedPath
                    };
                    _config_ImportMap__WEBPACK_IMPORTED_MODULE_1__.ImportMap[name] = cleanedPath;
                    continue;
                }
                // -----------------------------
                // SCRIPT COMPONENT (MonoBehavior)
                // -----------------------------
                if (typeof value === "function" &&
                    value.prototype instanceof _main_MonoBehavior__WEBPACK_IMPORTED_MODULE_0__.MonoBehavior) {
                    const cleanedPath = resolvedPath.replace(/\.(ts|js)$/, "");
                    ComponentRegistry[exportName] = {
                        type: "script",
                        name: exportName,
                        ctor: value,
                        importPath: cleanedPath
                    };
                    _config_ImportMap__WEBPACK_IMPORTED_MODULE_1__.ImportMap[exportName] = cleanedPath;
                }
            }
        });
    }
    return ComponentRegistry;
}


/***/ },

/***/ "./src/engine/core/ECS/Prefab.ts"
/*!***************************************!*\
  !*** ./src/engine/core/ECS/Prefab.ts ***!
  \***************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

/***/ "./src/engine/core/ECS/components/physics/Collider2D.ts"
/*!**************************************************************!*\
  !*** ./src/engine/core/ECS/components/physics/Collider2D.ts ***!
  \**************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Collider2D: () => (/* binding */ Collider2D)
/* harmony export */ });
/* harmony import */ var _main_Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../main/Component */ "./src/engine/core/ECS/main/Component.ts");

class Collider2D extends _main_Component__WEBPACK_IMPORTED_MODULE_0__.Component {
    constructor() {
        super(...arguments);
        this.isTrigger = false;
    }
    // Override in specific collider types
    get bounds() {
        return {
            x: this.transform.position.x,
            y: this.transform.position.y,
            width: 0,
            height: 0
        };
    }
}


/***/ },

/***/ "./src/engine/core/ECS/components/physics/RigidBody2D.ts"
/*!***************************************************************!*\
  !*** ./src/engine/core/ECS/components/physics/RigidBody2D.ts ***!
  \***************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
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

"use strict";
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
        h: new _ui_UIBindings_TypeUIBindings_NumberUI__WEBPACK_IMPORTED_MODULE_5__.NumberUI(40),
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
        this.relativePosition = _math_Vector2__WEBPACK_IMPORTED_MODULE_4__.Vector2.zero;
    }
    initialize(values) {
        Object.assign(this, values);
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

/***/ "./src/engine/core/ECS/components/ui/TextUI.ts"
/*!*****************************************************!*\
  !*** ./src/engine/core/ECS/components/ui/TextUI.ts ***!
  \*****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TextUI: () => (/* binding */ TextUI),
/* harmony export */   TextUIDef: () => (/* binding */ TextUIDef)
/* harmony export */ });
/* harmony import */ var _UIComponent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../UIComponent */ "./src/engine/core/ECS/components/UIComponent.ts");
/* harmony import */ var _lib_colors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../lib/colors */ "./src/engine/lib/colors.ts");
/* harmony import */ var _lib_text__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../lib/text */ "./src/engine/lib/text.ts");
/* harmony import */ var _math_Vector2__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../math/Vector2 */ "./src/engine/core/math/Vector2.ts");
/* harmony import */ var _ui_UIBindings_TypeUIBindings_ColorUI__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../ui/UIBindings/TypeUIBindings/ColorUI */ "./src/engine/ui/UIBindings/TypeUIBindings/ColorUI.ts");
/* harmony import */ var _ui_UIBindings_TypeUIBindings_NumberUI__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../ui/UIBindings/TypeUIBindings/NumberUI */ "./src/engine/ui/UIBindings/TypeUIBindings/NumberUI.ts");
/* harmony import */ var _ui_UIBindings_TypeUIBindings_Vector2UI__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../ui/UIBindings/TypeUIBindings/Vector2UI */ "./src/engine/ui/UIBindings/TypeUIBindings/Vector2UI.ts");
/* harmony import */ var _ui_UIBindings_TypeUIBindings_StringUI__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../ui/UIBindings/TypeUIBindings/StringUI */ "./src/engine/ui/UIBindings/TypeUIBindings/StringUI.ts");
/* harmony import */ var _ui_UIBindings_TypeUIBindings_BooleanUI__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../ui/UIBindings/TypeUIBindings/BooleanUI */ "./src/engine/ui/UIBindings/TypeUIBindings/BooleanUI.ts");
/* harmony import */ var _ui_UIBindings_TypeUIBindings_EnumUI__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../ui/UIBindings/TypeUIBindings/EnumUI */ "./src/engine/ui/UIBindings/TypeUIBindings/EnumUI.ts");










const TextUIDef = {
    import: "src/engine/core/ECS/components/ui/TextUI",
    params: {
        content: new _ui_UIBindings_TypeUIBindings_StringUI__WEBPACK_IMPORTED_MODULE_7__.StringUI(""),
        fontSize: new _ui_UIBindings_TypeUIBindings_NumberUI__WEBPACK_IMPORTED_MODULE_5__.NumberUI(20),
        color: new _ui_UIBindings_TypeUIBindings_ColorUI__WEBPACK_IMPORTED_MODULE_4__.ColorUI("#000000"),
        align: new _ui_UIBindings_TypeUIBindings_EnumUI__WEBPACK_IMPORTED_MODULE_9__.EnumUI(["LEFT", "CENTER", "RIGHT"], "LEFT"),
        screenSpace: new _ui_UIBindings_TypeUIBindings_BooleanUI__WEBPACK_IMPORTED_MODULE_8__.BooleanUI(true),
        relativePosition: new _ui_UIBindings_TypeUIBindings_Vector2UI__WEBPACK_IMPORTED_MODULE_6__.Vector2UI({ x: 0, y: 0 })
    }
};
class TextUI extends _UIComponent__WEBPACK_IMPORTED_MODULE_0__.UIComponent {
    constructor() {
        super(...arguments);
        this.content = "";
        this.fontSize = 20;
        this.color = "#000000";
        this.align = "LEFT";
        this.screenSpace = true;
        this.relativePosition = _math_Vector2__WEBPACK_IMPORTED_MODULE_3__.Vector2.zero;
    }
    initialize(values) {
        Object.assign(this, values);
    }
    RenderUI() {
        (0,_lib_colors__WEBPACK_IMPORTED_MODULE_1__.fill)(this.color);
        (0,_lib_text__WEBPACK_IMPORTED_MODULE_2__.textAlign)(this.align, "CENTER");
        (0,_lib_text__WEBPACK_IMPORTED_MODULE_2__.textSize)(this.fontSize);
        const x = this.transform.position.x + this.relativePosition.x;
        const y = this.transform.position.y + this.relativePosition.y;
        (0,_lib_text__WEBPACK_IMPORTED_MODULE_2__.text)(this.content, x, y);
    }
}


/***/ },

/***/ "./src/engine/core/ECS/main/Behavior.ts"
/*!**********************************************!*\
  !*** ./src/engine/core/ECS/main/Behavior.ts ***!
  \**********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

/***/ "./src/engine/helpers/TimeManager.ts"
/*!*******************************************!*\
  !*** ./src/engine/helpers/TimeManager.ts ***!
  \*******************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
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

"use strict";
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
function color(r, g, b, a = 255) {
    // If user passed a CSS string, just return it
    if (typeof r === "string")
        return r;
    if (g === undefined && b === undefined) {
        g = r;
        b = r;
    }
    if (b === undefined) {
        b = r;
    }
    r = (0,_math__WEBPACK_IMPORTED_MODULE_1__.constrain)(r, 0, 255);
    g = (0,_math__WEBPACK_IMPORTED_MODULE_1__.constrain)(g, 0, 255);
    b = (0,_math__WEBPACK_IMPORTED_MODULE_1__.constrain)(b, 0, 255);
    a = (0,_math__WEBPACK_IMPORTED_MODULE_1__.constrain)(a, 0, 255);
    return `rgba(${r}, ${g}, ${b}, ${a / 255})`;
}
function fill(r, g, b, a) {
    ctx.fillStyle = color(r, g, b, a);
}
function noFill() {
    ctx.fillStyle = "rgba(0,0,0,0)";
}
function stroke(r, g, b, a) {
    ctx.strokeStyle = color(r, g, b, a);
}
function noStroke() {
    ctx.strokeStyle = "rgba(0,0,0,0)";
}
function strokeWeight(w) {
    ctx.lineWidth = w;
}
function background(r, g, b, a) {
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    fill(r, g, b, a);
    ctx.fillRect(0, 0, _helpers_CanvasManager__WEBPACK_IMPORTED_MODULE_0__.CanvasManager.width, _helpers_CanvasManager__WEBPACK_IMPORTED_MODULE_0__.CanvasManager.height);
    ctx.restore();
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

"use strict";
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

"use strict";
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

"use strict";
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

/***/ "./src/engine/lib/text.ts"
/*!********************************!*\
  !*** ./src/engine/lib/text.ts ***!
  \********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   outlinedText: () => (/* binding */ outlinedText),
/* harmony export */   text: () => (/* binding */ text),
/* harmony export */   textAlign: () => (/* binding */ textAlign),
/* harmony export */   textFont: () => (/* binding */ textFont),
/* harmony export */   textSize: () => (/* binding */ textSize),
/* harmony export */   textStyle: () => (/* binding */ textStyle),
/* harmony export */   textWeight: () => (/* binding */ textWeight)
/* harmony export */ });
/* harmony import */ var _pjsSettings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pjsSettings */ "./src/engine/lib/pjsSettings.ts");
/* harmony import */ var _colors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./colors */ "./src/engine/lib/colors.ts");
/* harmony import */ var _trigonometry__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./trigonometry */ "./src/engine/lib/trigonometry.ts");
/* harmony import */ var _helpers_CanvasManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../helpers/CanvasManager */ "./src/engine/helpers/CanvasManager.ts");




const ctx = _helpers_CanvasManager__WEBPACK_IMPORTED_MODULE_3__.CanvasManager.getCtx();
function textFont(font) {
    _pjsSettings__WEBPACK_IMPORTED_MODULE_0__.pjsSettings.globalFont = font;
    updateText();
}
function textSize(size) {
    _pjsSettings__WEBPACK_IMPORTED_MODULE_0__.pjsSettings.globalSize = size;
    updateText();
}
function textWeight(weight) {
    if (!["lighter", "normal", "bold", "bolder"].includes(weight)) {
        console.error("Invalid textWeight:", weight);
    }
    _pjsSettings__WEBPACK_IMPORTED_MODULE_0__.pjsSettings.globalWeight = weight;
    updateText();
}
function textStyle(style) {
    _pjsSettings__WEBPACK_IMPORTED_MODULE_0__.pjsSettings.globalStyle = style;
    updateText();
}
function updateText() {
    ctx.font = `${_pjsSettings__WEBPACK_IMPORTED_MODULE_0__.pjsSettings.globalStyle} ${_pjsSettings__WEBPACK_IMPORTED_MODULE_0__.pjsSettings.globalWeight} ${_pjsSettings__WEBPACK_IMPORTED_MODULE_0__.pjsSettings.globalSize}px ${_pjsSettings__WEBPACK_IMPORTED_MODULE_0__.pjsSettings.globalFont}`;
}
function textAlign(ALIGN, YALIGN = "BASELINE") {
    const h = ALIGN === "LEFT" ? "start"
        : ALIGN === "CENTER" ? "center"
            : "end";
    const v = YALIGN === "BASELINE" ? "alphabetic"
        : YALIGN === "CENTER" ? "middle"
            : "bottom";
    ctx.textAlign = h;
    ctx.textBaseline = v;
}
function text(message, x, y) {
    ctx.fillText(message, x, y);
}
function outlinedText(message, x, y, weight, main, outline, inc = 10) {
    (0,_colors__WEBPACK_IMPORTED_MODULE_1__.fill)(outline);
    for (let i = 0; i < 360; i += inc) {
        text(message, x + (0,_trigonometry__WEBPACK_IMPORTED_MODULE_2__.sin)(i) * weight, y + (0,_trigonometry__WEBPACK_IMPORTED_MODULE_2__.cos)(i) * weight);
    }
    (0,_colors__WEBPACK_IMPORTED_MODULE_1__.fill)(main);
    text(message, x, y);
}



/***/ },

/***/ "./src/engine/lib/trigonometry.ts"
/*!****************************************!*\
  !*** ./src/engine/lib/trigonometry.ts ***!
  \****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   acos: () => (/* binding */ acos),
/* harmony export */   asin: () => (/* binding */ asin),
/* harmony export */   atan: () => (/* binding */ atan),
/* harmony export */   atan2: () => (/* binding */ atan2),
/* harmony export */   cos: () => (/* binding */ cos),
/* harmony export */   degrees: () => (/* binding */ degrees),
/* harmony export */   radians: () => (/* binding */ radians),
/* harmony export */   sin: () => (/* binding */ sin),
/* harmony export */   tan: () => (/* binding */ tan)
/* harmony export */ });
function radians(angle) {
    return angle * Math.PI / 180;
}
function degrees(angle) {
    return angle * 180 / Math.PI;
}
function sin(degrees) {
    return Math.sin(radians(degrees));
}
function cos(degrees) {
    return Math.cos(radians(degrees));
}
function tan(degrees) {
    return Math.tan(radians(degrees));
}
function asin(value) {
    return degrees(Math.asin(value));
}
function acos(value) {
    return degrees(Math.acos(value));
}
function atan(value) {
    return degrees(Math.atan(value));
}
function atan2(y, x) {
    return degrees(Math.atan2(y, x));
}



/***/ },

/***/ "./src/engine/tools/Shape Editor/ContextMenu.ts"
/*!******************************************************!*\
  !*** ./src/engine/tools/Shape Editor/ContextMenu.ts ***!
  \******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ContextMenu: () => (/* binding */ ContextMenu)
/* harmony export */ });
class ContextMenu {
    constructor(menu) {
        this.menu = menu;
    }
    show(x, y, layerId, selectionCount, isGroup) {
        this.menu.style.display = "block";
        this.menu.style.left = x + "px";
        this.menu.style.top = y + "px";
        this.menu.dataset.layerId = layerId;
        // --- Enable/disable menu items based on selection ---
        const items = this.menu.querySelectorAll("[data-action]");
        items.forEach(item => {
            const el = item;
            const action = el.dataset.action;
            // Default: enabled
            el.classList.remove("disabled");
            // Disable "group" unless 2+ layers selected
            if (action === "group" && selectionCount < 2) {
                el.classList.add("disabled");
            }
            // Disable "ungroup" unless exactly 1 selected AND it's a group
            if (action === "ungroup") {
                if (selectionCount !== 1 || !isGroup) {
                    el.classList.add("disabled");
                }
            }
        });
    }
    hide() {
        this.menu.style.display = "none";
    }
    onAction(handler) {
        this.menu.addEventListener("click", e => {
            e.stopPropagation();
            const target = e.target;
            const action = target.dataset.action;
            if (!action)
                return;
            // Prevent clicking disabled items
            if (target.classList.contains("disabled"))
                return;
            const layerId = this.menu.dataset.layerId;
            handler(action, layerId);
            this.hide();
        });
        document.addEventListener("click", () => this.hide());
    }
}


/***/ },

/***/ "./src/engine/tools/Shape Editor/EditorCanvasManager.ts"
/*!**************************************************************!*\
  !*** ./src/engine/tools/Shape Editor/EditorCanvasManager.ts ***!
  \**************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EditorCanvasManager: () => (/* binding */ EditorCanvasManager)
/* harmony export */ });
class EditorCanvasManager {
    constructor(canvas) {
        this.canvas = canvas;
        this.isMouseDown = false;
        this.ctx = canvas.getContext("2d");
        requestAnimationFrame(() => this.resize());
        window.addEventListener("resize", () => this.resize());
    }
    resize() {
        const rect = this.canvas.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0)
            return;
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
    }
    getMousePos(e) {
        const rect = this.canvas.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    }
    onClick(handler) {
        this.canvas.addEventListener("click", e => {
            e.preventDefault();
            handler(this.getMousePos(e), e);
        });
    }
    onRightClick(handler) {
        this.canvas.addEventListener("contextmenu", e => {
            e.preventDefault();
            handler(this.getMousePos(e));
        });
    }
    onMouseDown(handler) {
        this.canvas.addEventListener("mousedown", e => {
            e.preventDefault();
            this.isMouseDown = true;
            handler(this.getMousePos(e));
        });
    }
    onMouseMove(handler) {
        this.canvas.addEventListener("mousemove", e => {
            e.preventDefault();
            handler(this.getMousePos(e));
        });
    }
    onMouseUp(handler) {
        window.addEventListener("mouseup", e => {
            e.preventDefault();
            this.isMouseDown = false;
            handler();
        });
    }
}


/***/ },

/***/ "./src/engine/tools/Shape Editor/Exporter.ts"
/*!***************************************************!*\
  !*** ./src/engine/tools/Shape Editor/Exporter.ts ***!
  \***************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Exporter: () => (/* binding */ Exporter)
/* harmony export */ });
/* harmony import */ var _Layers_Layer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Layers/Layer */ "./src/engine/tools/Shape Editor/Layers/Layer.ts");

class Exporter {
    constructor(output, button, layers) {
        this.output = output;
        this.button = button;
        this.layers = layers;
    }
    init() {
        this.button.addEventListener("click", () => {
            const code = this.exportCode();
            this.output.textContent = code;
        });
    }
    exportCode() {
        return this.layers
            .filter(l => l instanceof _Layers_Layer__WEBPACK_IMPORTED_MODULE_0__.Layer)
            .map(l => l.shape.toCode())
            .join("\n");
    }
}


/***/ },

/***/ "./src/engine/tools/Shape Editor/HierarchyPanel.ts"
/*!*********************************************************!*\
  !*** ./src/engine/tools/Shape Editor/HierarchyPanel.ts ***!
  \*********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HierarchyPanel: () => (/* binding */ HierarchyPanel)
/* harmony export */ });
/* harmony import */ var _Layers_GroupLayer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Layers/GroupLayer */ "./src/engine/tools/Shape Editor/Layers/GroupLayer.ts");

class HierarchyPanel {
    constructor(container) {
        this.container = container;
        this._layers = [];
        this._selected = [];
    }
    render(layers, selected, onSelect, onMove, onContext) {
        this._layers = layers;
        this._selected = selected;
        this._onSelect = onSelect;
        this._onMove = onMove;
        this._onContext = onContext;
        this.container.innerHTML = "<h2>Layers</h2>";
        layers.forEach(layer => {
            this.renderNode(layer, 0);
        });
    }
    renderNode(node, depth) {
        const item = document.createElement("div");
        item.className = "layerItem";
        item.style.marginLeft = `${depth * 20}px`;
        // Collapse arrow for groups
        if (node.isGroup()) {
            const group = node;
            if (group.collapsed === undefined)
                group.collapsed = false;
            const arrow = document.createElement("span");
            arrow.textContent = group.collapsed ? "▶" : "▼";
            arrow.style.cursor = "pointer";
            arrow.style.marginRight = "4px";
            arrow.onclick = e => {
                e.stopPropagation();
                group.collapsed = !group.collapsed;
                this.renderRoot();
            };
            item.appendChild(arrow);
        }
        else {
            const spacer = document.createElement("span");
            spacer.textContent = "• ";
            spacer.style.opacity = "0";
            spacer.style.marginRight = "4px";
            item.appendChild(spacer);
        }
        // Label
        const label = document.createElement("span");
        label.textContent = node.name;
        item.appendChild(label);
        // Highlight selected
        if (this._selected.includes(node))
            item.classList.add("selected");
        // Click to select
        item.onclick = (e) => {
            const shift = e.shiftKey;
            this._onSelect(node, shift);
        };
        // Right-click (now passes selection info)
        item.oncontextmenu = e => {
            e.preventDefault();
            this._onContext(e.clientX, e.clientY, node, this._selected.length, node instanceof _Layers_GroupLayer__WEBPACK_IMPORTED_MODULE_0__.GroupLayer);
        };
        // Drag-and-drop
        item.draggable = true;
        item.ondragstart = e => {
            // If dragging a selected layer, drag ALL selected layers
            const ids = this._selected.includes(node)
                ? this._selected.map(l => l.id)
                : [node.id];
            e.dataTransfer.setData("layerIds", JSON.stringify(ids));
        };
        item.ondragover = e => e.preventDefault();
        item.ondrop = e => {
            e.preventDefault();
            const ids = JSON.parse(e.dataTransfer.getData("layerIds"));
            // Move each dragged layer above the drop target
            ids.forEach(id => {
                this._onMove(id, node.id);
            });
        };
        this.container.appendChild(item);
        // Render children if expanded
        if (node.isGroup() && !node.collapsed) {
            node.children.forEach(child => this.renderNode(child, depth + 1));
        }
    }
    renderRoot() {
        this.render(this._layers, this._selected, this._onSelect, this._onMove, this._onContext);
    }
}


/***/ },

/***/ "./src/engine/tools/Shape Editor/InspectorPanel.ts"
/*!*********************************************************!*\
  !*** ./src/engine/tools/Shape Editor/InspectorPanel.ts ***!
  \*********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   InspectorPanel: () => (/* binding */ InspectorPanel)
/* harmony export */ });
class InspectorPanel {
    constructor(container) {
        this.container = container;
    }
    render(layers) {
        this.container.innerHTML = "<h2>Inspector</h2>";
        if (layers.length === 0) {
            return;
        }
        // MULTI-SELECT
        if (layers.length > 1) {
            const info = document.createElement("div");
            info.textContent = `${layers.length} layers selected`;
            this.container.appendChild(info);
            return;
        }
        // SINGLE LAYER
        const layer = layers[0];
        // Layer name
        const nameLabel = document.createElement("label");
        nameLabel.textContent = "Name:";
        this.container.appendChild(nameLabel);
        const nameInput = document.createElement("input");
        nameInput.value = layer.name;
        nameInput.oninput = () => (layer.name = nameInput.value);
        this.container.appendChild(nameInput);
        this.container.appendChild(document.createElement("br"));
        this.container.appendChild(document.createElement("br"));
        // If it's a group, show group inspector
        if (layer.isGroup()) {
            this.renderGroupInspector(layer);
            return;
        }
        // Otherwise: render shape params
        const shape = layer.shape;
        if (!shape.params || Object.keys(shape.params).length === 0) {
            const info = document.createElement("div");
            info.textContent = "This shape has no editable parameters.";
            this.container.appendChild(info);
            return;
        }
        Object.entries(shape.params).forEach(([name, ui]) => {
            const label = document.createElement("label");
            label.textContent = name;
            const element = ui.render((val) => (ui.value = val));
            this.container.appendChild(label);
            this.container.appendChild(element);
            this.container.appendChild(document.createElement("br"));
        });
    }
    renderGroupInspector(group) {
        const info = document.createElement("div");
        info.textContent = `Group contains ${group.children.length} layers`;
        this.container.appendChild(info);
    }
}


/***/ },

/***/ "./src/engine/tools/Shape Editor/Layers/BaseLayer.ts"
/*!***********************************************************!*\
  !*** ./src/engine/tools/Shape Editor/Layers/BaseLayer.ts ***!
  \***********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BaseLayer: () => (/* binding */ BaseLayer)
/* harmony export */ });
class BaseLayer {
    constructor(name) {
        this.visible = true;
        this.locked = false;
        this.parent = null;
        this.id = crypto.randomUUID();
        this.name = name;
    }
}


/***/ },

/***/ "./src/engine/tools/Shape Editor/Layers/GroupLayer.ts"
/*!************************************************************!*\
  !*** ./src/engine/tools/Shape Editor/Layers/GroupLayer.ts ***!
  \************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GroupLayer: () => (/* binding */ GroupLayer)
/* harmony export */ });
/* harmony import */ var _BaseLayer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseLayer */ "./src/engine/tools/Shape Editor/Layers/BaseLayer.ts");

class GroupLayer extends _BaseLayer__WEBPACK_IMPORTED_MODULE_0__.BaseLayer {
    constructor(name = "Group") {
        super(name);
        this.children = [];
        this.collapsed = false;
    }
    isGroup() { return true; }
    add(child) {
        child.parent = this;
        this.children.push(child);
    }
    remove(child) {
        const i = this.children.indexOf(child);
        if (i !== -1) {
            this.children.splice(i, 1);
            child.parent = null;
        }
    }
    getBounds() {
        if (this.children.length === 0) {
            return { left: 0, top: 0, right: 0, bottom: 0 };
        }
        let left = Infinity, top = Infinity, right = -Infinity, bottom = -Infinity;
        for (const child of this.children) {
            const b = child.getBounds();
            left = Math.min(left, b.left);
            top = Math.min(top, b.top);
            right = Math.max(right, b.right);
            bottom = Math.max(bottom, b.bottom);
        }
        return { left, top, right, bottom };
    }
    // ⭐ FIXED: store each child's original bounds
    freezeLocalGeometry() {
        return this.children.map(child => ({
            child,
            frozen: child.freezeLocalGeometry(),
            childBounds: child.getBounds() // ← original bounds snapshot
        }));
    }
    // ⭐ FIXED: use frozen childBounds instead of live getBounds()
    scaleFromBounds(oldB, newB, frozenLocal) {
        const sx = (newB.right - newB.left) / (oldB.right - oldB.left);
        const sy = (newB.bottom - newB.top) / (oldB.bottom - oldB.top);
        frozenLocal.forEach((entry) => {
            const child = entry.child;
            const frozen = entry.frozen;
            const childOld = entry.childBounds; // ← use frozen bounds
            const newChild = {
                left: newB.left + (childOld.left - oldB.left) * sx,
                top: newB.top + (childOld.top - oldB.top) * sy,
                right: newB.left + (childOld.right - oldB.left) * sx,
                bottom: newB.top + (childOld.bottom - oldB.top) * sy
            };
            child.scaleFromBounds(childOld, newChild, frozen);
        });
    }
}


/***/ },

/***/ "./src/engine/tools/Shape Editor/Layers/Layer.ts"
/*!*******************************************************!*\
  !*** ./src/engine/tools/Shape Editor/Layers/Layer.ts ***!
  \*******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Layer: () => (/* binding */ Layer)
/* harmony export */ });
/* harmony import */ var _BaseLayer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseLayer */ "./src/engine/tools/Shape Editor/Layers/BaseLayer.ts");

class Layer extends _BaseLayer__WEBPACK_IMPORTED_MODULE_0__.BaseLayer {
    constructor(name, shape) {
        super(name);
        this.shape = shape;
    }
    isGroup() { return false; }
    getBounds() {
        return this.shape.getBounds();
    }
    freezeLocalGeometry() {
        return this.shape.freezeLocalGeometry();
    }
    scaleFromBounds(oldB, newB, frozenLocal) {
        this.shape.scaleFromBounds(oldB, newB, frozenLocal);
    }
}


/***/ },

/***/ "./src/engine/tools/Shape Editor/Layers/SelectionLayer.ts"
/*!****************************************************************!*\
  !*** ./src/engine/tools/Shape Editor/Layers/SelectionLayer.ts ***!
  \****************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SelectionLayer: () => (/* binding */ SelectionLayer)
/* harmony export */ });
/* harmony import */ var _GroupLayer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GroupLayer */ "./src/engine/tools/Shape Editor/Layers/GroupLayer.ts");

class SelectionLayer extends _GroupLayer__WEBPACK_IMPORTED_MODULE_0__.GroupLayer {
    constructor(layers) {
        super("Selection");
        // Mark as temporary so exporter / hierarchy ignore it
        this.isTemporarySelection = true;
        // DO NOT change parent of real layers.
        // DO NOT move layers into this group.
        // This is a TEMPORARY virtual group.
        this.children = layers; // safe because GroupLayer never mutates children transforms
    }
}


/***/ },

/***/ "./src/engine/tools/Shape Editor/RenderLoop.ts"
/*!*****************************************************!*\
  !*** ./src/engine/tools/Shape Editor/RenderLoop.ts ***!
  \*****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RenderLoop: () => (/* binding */ RenderLoop)
/* harmony export */ });
/* harmony import */ var _Layers_Layer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Layers/Layer */ "./src/engine/tools/Shape Editor/Layers/Layer.ts");

class RenderLoop {
    constructor(ctx, layers, selection, gizmo) {
        this.ctx = ctx;
        this.layers = layers;
        this.selection = selection;
        this.gizmo = gizmo;
    }
    start(gridSizeSlider) {
        let gridSize = Number(gridSizeSlider.value);
        gridSizeSlider.addEventListener("input", () => {
            gridSize = Number(gridSizeSlider.value);
            if (isNaN(gridSize) || gridSize <= 0)
                gridSize = 50;
            const valueDisplay = document.getElementById("valueDisplay");
            if (valueDisplay)
                valueDisplay.textContent = gridSize.toString();
        });
        const loop = () => {
            const { ctx } = this;
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            // Draw grid
            ctx.strokeStyle = "#59b2f2";
            ctx.lineWidth = 1;
            for (let x = 0; x < ctx.canvas.width; x += gridSize) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, ctx.canvas.height);
                ctx.stroke();
            }
            for (let y = 0; y < ctx.canvas.height; y += gridSize) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(ctx.canvas.width, y);
                ctx.stroke();
            }
            // Draw layers recursively
            this.layers.forEach(layer => this.drawNode(layer));
            // Draw gizmo on selected layer
            if (this.selection.selected) {
                this.gizmo.draw(ctx, this.selection.selected);
            }
            requestAnimationFrame(loop);
        };
        loop();
    }
    drawNode(node) {
        if (!node.visible)
            return;
        if (node instanceof _Layers_Layer__WEBPACK_IMPORTED_MODULE_0__.Layer) {
            // Leaf layer
            node.shape.render(this.ctx);
        }
        else if (node.isGroup()) {
            // Group layer
            const group = node;
            group.children.forEach(child => this.drawNode(child));
        }
    }
}


/***/ },

/***/ "./src/engine/tools/Shape Editor/SelectionManager.ts"
/*!***********************************************************!*\
  !*** ./src/engine/tools/Shape Editor/SelectionManager.ts ***!
  \***********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SelectionManager: () => (/* binding */ SelectionManager)
/* harmony export */ });
/* harmony import */ var _Layers_Layer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Layers/Layer */ "./src/engine/tools/Shape Editor/Layers/Layer.ts");
/* harmony import */ var _Layers_GroupLayer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Layers/GroupLayer */ "./src/engine/tools/Shape Editor/Layers/GroupLayer.ts");
/* harmony import */ var _Layers_SelectionLayer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Layers/SelectionLayer */ "./src/engine/tools/Shape Editor/Layers/SelectionLayer.ts");



class SelectionManager {
    constructor() {
        this.selectedLayers = [];
        this.selected = null; // single layer OR SelectionLayer
    }
    // Select exactly one layer (normal click)
    selectOne(layer) {
        this.selectedLayers = [layer];
        this.rebuildSelectionLayer();
    }
    // Select many layers at once (marquee, ctrl+A, etc.)
    selectMany(layers) {
        this.selectedLayers = [...layers];
        this.rebuildSelectionLayer();
    }
    // Toggle selection (shift-click)
    toggle(layer) {
        const i = this.selectedLayers.indexOf(layer);
        if (i === -1) {
            this.selectedLayers.push(layer);
        }
        else {
            this.selectedLayers.splice(i, 1);
        }
        this.rebuildSelectionLayer();
    }
    // Remove a single layer from selection
    remove(layer) {
        const i = this.selectedLayers.indexOf(layer);
        if (i !== -1) {
            this.selectedLayers.splice(i, 1);
            this.rebuildSelectionLayer();
        }
    }
    // Clear selection (click empty space)
    clear() {
        this.selectedLayers = [];
        this.selected = null;
    }
    // Build the "selected" object used by the gizmo
    rebuildSelectionLayer() {
        if (this.selectedLayers.length === 0) {
            this.selected = null;
        }
        else if (this.selectedLayers.length === 1) {
            this.selected = this.selectedLayers[0];
        }
        else {
            this.selected = new _Layers_SelectionLayer__WEBPACK_IMPORTED_MODULE_2__.SelectionLayer([...this.selectedLayers]);
        }
    }
    // Convenience helper: returns the shape if a leaf layer is selected
    get selectedShape() {
        return this.selected instanceof _Layers_Layer__WEBPACK_IMPORTED_MODULE_0__.Layer ? this.selected.shape : null;
    }
    // Optional helper: is the selected item a group?
    get isGroupSelected() {
        return this.selected instanceof _Layers_GroupLayer__WEBPACK_IMPORTED_MODULE_1__.GroupLayer;
    }
    // ⭐ NEW: is multi-select active?
    get hasMultiple() {
        return this.selectedLayers.length > 1;
    }
    // ⭐ NEW: exactly one selected AND it's a group
    get isSingleGroupSelected() {
        return (this.selectedLayers.length === 1 &&
            this.selectedLayers[0] instanceof _Layers_GroupLayer__WEBPACK_IMPORTED_MODULE_1__.GroupLayer);
    }
}


/***/ },

/***/ "./src/engine/tools/Shape Editor/ShapeFactory.ts"
/*!*******************************************************!*\
  !*** ./src/engine/tools/Shape Editor/ShapeFactory.ts ***!
  \*******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ShapeFactory: () => (/* binding */ ShapeFactory)
/* harmony export */ });
/* harmony import */ var _windows_ShapeEditorWindow__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../windows/ShapeEditorWindow */ "./src/engine/windows/ShapeEditorWindow.ts");
/* harmony import */ var _Layers_Layer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Layers/Layer */ "./src/engine/tools/Shape Editor/Layers/Layer.ts");


class ShapeFactory {
    create(type, x, y) {
        const BindingClass = _windows_ShapeEditorWindow__WEBPACK_IMPORTED_MODULE_0__.ShapeRegistry[type];
        const shape = new BindingClass().clone();
        // Give the shape a default name
        shape.name = `${type}`;
        // Initialize position if supported
        if (shape.params.x)
            shape.params.x.value = x;
        if (shape.params.y)
            shape.params.y.value = y;
        // Create a proper Layer instance (class-based)
        const layer = new _Layers_Layer__WEBPACK_IMPORTED_MODULE_1__.Layer(shape.name, shape);
        return layer;
    }
}


/***/ },

/***/ "./src/engine/tools/Shape Editor/ToolManager.ts"
/*!******************************************************!*\
  !*** ./src/engine/tools/Shape Editor/ToolManager.ts ***!
  \******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ToolManager: () => (/* binding */ ToolManager)
/* harmony export */ });
/* harmony import */ var _windows_ShapeEditorWindow__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../windows/ShapeEditorWindow */ "./src/engine/windows/ShapeEditorWindow.ts");

class ToolManager {
    constructor(toolbar) {
        this.toolbar = toolbar;
        this.currentTool = "select";
    }
    init() {
        // Add Select tool first
        const selectBtn = document.createElement("button");
        selectBtn.textContent = "Select";
        selectBtn.className = "menuSideBarItem active";
        selectBtn.onclick = () => this.setTool("select", selectBtn);
        this.toolbar.appendChild(selectBtn);
        // Add shape tools
        Object.values(_windows_ShapeEditorWindow__WEBPACK_IMPORTED_MODULE_0__.ShapeTypes).forEach(type => {
            const button = document.createElement("button");
            button.textContent = type;
            button.className = "menuSideBarItem";
            button.onclick = () => this.setTool(type, button);
            this.toolbar.appendChild(button);
        });
        // Optional: keyboard shortcuts
        this.initShortcuts();
    }
    setTool(tool, button) {
        var _a;
        this.currentTool = tool;
        this.updateUI(button);
        (_a = this.onToolChange) === null || _a === void 0 ? void 0 : _a.call(this, tool);
    }
    updateUI(activeButton) {
        this.toolbar.querySelectorAll("button")
            .forEach(b => b.classList.remove("active"));
        activeButton.classList.add("active");
    }
    initShortcuts() {
        window.addEventListener("keydown", e => {
            if (e.key === "v") {
                const btn = this.toolbar.querySelector("button:nth-child(1)");
                this.setTool("select", btn);
            }
            // Add more shortcuts if you want
        });
    }
}


/***/ },

/***/ "./src/engine/tools/Shape Editor/TransformGizmo.ts"
/*!*********************************************************!*\
  !*** ./src/engine/tools/Shape Editor/TransformGizmo.ts ***!
  \*********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TransformGizmo: () => (/* binding */ TransformGizmo)
/* harmony export */ });
class TransformGizmo {
    constructor() {
        this.dragging = false;
        this.dragMode = null;
        this.startMouse = { x: 0, y: 0 };
        this.startBounds = null;
        this.frozenLocal = null;
    }
    draw(ctx, layer) {
        const b = layer.getBounds();
        const x = b.left;
        const y = b.top;
        const width = b.right - b.left;
        const height = b.bottom - b.top;
        ctx.strokeStyle = "#4aa3ff";
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, width, height);
        const handleSize = 10;
        const handles = [
            { mode: "scale-left", x: x - handleSize / 2, y: y + height / 2 - handleSize / 2 },
            { mode: "scale-right", x: x + width - handleSize / 2, y: y + height / 2 - handleSize / 2 },
            { mode: "scale-top", x: x + width / 2 - handleSize / 2, y: y - handleSize / 2 },
            { mode: "scale-bottom", x: x + width / 2 - handleSize / 2, y: y + height - handleSize / 2 }
        ];
        ctx.fillStyle = "#4aa3ff";
        handles.forEach(h => ctx.fillRect(h.x, h.y, handleSize, handleSize));
    }
    onMouseDown(mouse, layer) {
        const b = layer.getBounds();
        const x = b.left;
        const y = b.top;
        const width = b.right - b.left;
        const height = b.bottom - b.top;
        const handleSize = 10;
        const handles = [
            { mode: "scale-left", x: x - handleSize / 2, y: y + height / 2 - handleSize / 2 },
            { mode: "scale-right", x: x + width - handleSize / 2, y: y + height / 2 - handleSize / 2 },
            { mode: "scale-top", x: x + width / 2 - handleSize / 2, y: y - handleSize / 2 },
            { mode: "scale-bottom", x: x + width / 2 - handleSize / 2, y: y + height - handleSize / 2 }
        ];
        for (const h of handles) {
            if (mouse.x >= h.x &&
                mouse.x <= h.x + handleSize &&
                mouse.y >= h.y &&
                mouse.y <= h.y + handleSize) {
                this.dragging = true;
                this.dragMode = h.mode;
                this.startMouse = Object.assign({}, mouse);
                this.startBounds = Object.assign({}, b);
                this.frozenLocal = layer.freezeLocalGeometry();
                return true;
            }
        }
        if (mouse.x >= x &&
            mouse.x <= x + width &&
            mouse.y >= y &&
            mouse.y <= y + height) {
            this.dragging = true;
            this.dragMode = "move";
            this.startMouse = Object.assign({}, mouse);
            this.startBounds = Object.assign({}, b);
            this.frozenLocal = layer.freezeLocalGeometry();
            return true;
        }
        return false;
    }
    onMouseMove(mouse, layer) {
        if (!this.dragging || !this.dragMode || !this.startBounds)
            return;
        const dx = mouse.x - this.startMouse.x;
        const dy = mouse.y - this.startMouse.y;
        const oldB = this.startBounds;
        const newB = Object.assign({}, oldB);
        if (this.dragMode === "move") {
            const w = oldB.right - oldB.left;
            const h = oldB.bottom - oldB.top;
            newB.left = oldB.left + dx;
            newB.right = newB.left + w;
            newB.top = oldB.top + dy;
            newB.bottom = newB.top + h;
            layer.scaleFromBounds(oldB, newB, this.frozenLocal);
            return;
        }
        if (this.dragMode === "scale-left")
            newB.left = oldB.left + dx;
        if (this.dragMode === "scale-right")
            newB.right = oldB.right + dx;
        if (this.dragMode === "scale-top")
            newB.top = oldB.top + dy;
        if (this.dragMode === "scale-bottom")
            newB.bottom = oldB.bottom + dy;
        layer.scaleFromBounds(oldB, newB, this.frozenLocal);
    }
    onMouseUp() {
        this.dragging = false;
        this.dragMode = null;
        this.startBounds = null;
        this.frozenLocal = null;
    }
}


/***/ },

/***/ "./src/engine/ui/UIBindings/ListUI.ts"
/*!********************************************!*\
  !*** ./src/engine/ui/UIBindings/ListUI.ts ***!
  \********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ListUI: () => (/* binding */ ListUI)
/* harmony export */ });
/* harmony import */ var _ParamUI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ParamUI */ "./src/engine/ui/UIBindings/ParamUI.ts");

class ListUI extends _ParamUI__WEBPACK_IMPORTED_MODULE_0__.ParamUI {
    constructor(defaultItems = []) {
        super(defaultItems);
    }
    // Subclasses override this to define how new items are created
    createDefaultItem() {
        if (this.value.length > 0) {
            return this.value[0].clone();
        }
        throw new Error("ListUI: No default item available. Override createDefaultItem().");
    }
    clone() {
        return new ListUI(this.value.map(item => item.clone()));
    }
    render(onChange) {
        const container = document.createElement("div");
        const list = document.createElement("div");
        container.appendChild(list);
        const addButton = document.createElement("button");
        addButton.textContent = "Add";
        container.appendChild(addButton);
        const renderList = () => {
            list.innerHTML = "";
            this.value.forEach((item, index) => {
                const itemUI = item.render(v => {
                    this.value[index] = item;
                    onChange(this.value);
                });
                const removeButton = document.createElement("button");
                removeButton.textContent = "X";
                removeButton.onclick = () => {
                    this.value.splice(index, 1);
                    renderList();
                    onChange(this.value);
                };
                const row = document.createElement("div");
                row.classList.add("paramInput");
                row.appendChild(itemUI);
                row.appendChild(removeButton);
                list.appendChild(row);
            });
        };
        addButton.onclick = () => {
            const newItem = this.createDefaultItem();
            this.value.push(newItem);
            renderList();
            onChange(this.value);
        };
        renderList();
        return container;
    }
    toCode() {
        const itemsCode = this.value.map(item => item.toCode()).join(", ");
        return `[${itemsCode}]`;
    }
}


/***/ },

/***/ "./src/engine/ui/UIBindings/ParamUI.ts"
/*!*********************************************!*\
  !*** ./src/engine/ui/UIBindings/ParamUI.ts ***!
  \*********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
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

/***/ "./src/engine/ui/UIBindings/ShapeUIBindings.ts"
/*!*****************************************************!*\
  !*** ./src/engine/ui/UIBindings/ShapeUIBindings.ts ***!
  \*****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ShapeUIBindings: () => (/* binding */ ShapeUIBindings)
/* harmony export */ });
class ShapeUIBindings {
    constructor() {
        this.name = this.constructor.name.replace("UIBindings", "");
    }
    clone() {
        const cloned = Object.create(this.constructor.prototype);
        const newParams = {};
        for (const key in this.params) {
            newParams[key] = this.params[key].clone();
        }
        cloned.params = newParams;
        return cloned;
    }
    freezeLocalGeometry() { }
}


/***/ },

/***/ "./src/engine/ui/UIBindings/ShapeUIBindings/EllipseUIBindings.ts"
/*!***********************************************************************!*\
  !*** ./src/engine/ui/UIBindings/ShapeUIBindings/EllipseUIBindings.ts ***!
  \***********************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EllipseUIBindings: () => (/* binding */ EllipseUIBindings)
/* harmony export */ });
/* harmony import */ var _TypeUIBindings_NumberUI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../TypeUIBindings/NumberUI */ "./src/engine/ui/UIBindings/TypeUIBindings/NumberUI.ts");
/* harmony import */ var _TypeUIBindings_ColorUI__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../TypeUIBindings/ColorUI */ "./src/engine/ui/UIBindings/TypeUIBindings/ColorUI.ts");
/* harmony import */ var _ShapeUIBindings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ShapeUIBindings */ "./src/engine/ui/UIBindings/ShapeUIBindings.ts");
/* harmony import */ var _helpers_ColorHelpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../helpers/ColorHelpers */ "./src/engine/helpers/ColorHelpers.ts");




class EllipseUIBindings extends _ShapeUIBindings__WEBPACK_IMPORTED_MODULE_2__.ShapeUIBindings {
    constructor() {
        super();
        this.params = {
            x: new _TypeUIBindings_NumberUI__WEBPACK_IMPORTED_MODULE_0__.NumberUI(0),
            y: new _TypeUIBindings_NumberUI__WEBPACK_IMPORTED_MODULE_0__.NumberUI(0),
            w: new _TypeUIBindings_NumberUI__WEBPACK_IMPORTED_MODULE_0__.NumberUI(100),
            h: new _TypeUIBindings_NumberUI__WEBPACK_IMPORTED_MODULE_0__.NumberUI(100),
            color: new _TypeUIBindings_ColorUI__WEBPACK_IMPORTED_MODULE_1__.ColorUI("#ff0000"),
            stroke: new _TypeUIBindings_ColorUI__WEBPACK_IMPORTED_MODULE_1__.ColorUI("#000000"),
            strokeWeight: new _TypeUIBindings_NumberUI__WEBPACK_IMPORTED_MODULE_0__.NumberUI(1)
        };
    }
    toCode() {
        const { x, y, w, h, color, stroke } = this.params;
        const c = _helpers_ColorHelpers__WEBPACK_IMPORTED_MODULE_3__.ColorHelpers.hexToRGB(color.value);
        const s = _helpers_ColorHelpers__WEBPACK_IMPORTED_MODULE_3__.ColorHelpers.hexToRGB(stroke.value);
        return `fill(${c.r}, ${c.g}, ${c.b}, ${Math.round(color.alpha * 255)});
stroke(${s.r}, ${s.g}, ${s.b}, ${Math.round(stroke.alpha * 255)});
ellipse(${x.value}, ${y.value}, ${w.value}, ${h.value});`;
    }
    render(ctx) {
        const { x, y, w, h, color, stroke, strokeWeight } = this.params;
        const fillRGB = _helpers_ColorHelpers__WEBPACK_IMPORTED_MODULE_3__.ColorHelpers.hexToRGB(color.value);
        ctx.fillStyle = `rgba(${fillRGB.r}, ${fillRGB.g}, ${fillRGB.b}, ${color.alpha})`;
        const strokeRGB = _helpers_ColorHelpers__WEBPACK_IMPORTED_MODULE_3__.ColorHelpers.hexToRGB(stroke.value);
        ctx.strokeStyle = `rgba(${strokeRGB.r}, ${strokeRGB.g}, ${strokeRGB.b}, ${stroke.alpha})`;
        ctx.lineWidth = strokeWeight.value;
        ctx.beginPath();
        ctx.ellipse(x.value, y.value, w.value / 2, h.value / 2, 0, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }
    hitTest(point) {
        const { x, y, w, h } = this.params;
        const rx = w.value / 2;
        const ry = h.value / 2;
        const dx = point.x - x.value;
        const dy = point.y - y.value;
        return (dx * dx) / (rx * rx) + (dy * dy) / (ry * ry) <= 1;
    }
    getBounds() {
        const { x, y, w, h } = this.params;
        return {
            left: x.value - w.value / 2,
            top: y.value - h.value / 2,
            right: x.value + w.value / 2,
            bottom: y.value + h.value / 2
        };
    }
    scaleFromBounds(oldB, newB) {
        const newWidth = newB.right - newB.left;
        const newHeight = newB.bottom - newB.top;
        const cx = newB.left + newWidth / 2;
        const cy = newB.top + newHeight / 2;
        this.params.x.value = cx;
        this.params.y.value = cy;
        this.params.w.value = newWidth;
        this.params.h.value = newHeight;
    }
}


/***/ },

/***/ "./src/engine/ui/UIBindings/ShapeUIBindings/PathUIBindings.ts"
/*!********************************************************************!*\
  !*** ./src/engine/ui/UIBindings/ShapeUIBindings/PathUIBindings.ts ***!
  \********************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PathUIBindings: () => (/* binding */ PathUIBindings)
/* harmony export */ });
/* harmony import */ var _ShapeUIBindings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ShapeUIBindings */ "./src/engine/ui/UIBindings/ShapeUIBindings.ts");
/* harmony import */ var _ListUI__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ListUI */ "./src/engine/ui/UIBindings/ListUI.ts");
/* harmony import */ var _TypeUIBindings_Vector2UI__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../TypeUIBindings/Vector2UI */ "./src/engine/ui/UIBindings/TypeUIBindings/Vector2UI.ts");
/* harmony import */ var _TypeUIBindings_NumberUI__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../TypeUIBindings/NumberUI */ "./src/engine/ui/UIBindings/TypeUIBindings/NumberUI.ts");
/* harmony import */ var _TypeUIBindings_ColorUI__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../TypeUIBindings/ColorUI */ "./src/engine/ui/UIBindings/TypeUIBindings/ColorUI.ts");
/* harmony import */ var _helpers_ColorHelpers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../helpers/ColorHelpers */ "./src/engine/helpers/ColorHelpers.ts");






class PathUIBindings extends _ShapeUIBindings__WEBPACK_IMPORTED_MODULE_0__.ShapeUIBindings {
    constructor() {
        super();
        this.params = {
            x: new _TypeUIBindings_NumberUI__WEBPACK_IMPORTED_MODULE_3__.NumberUI(0),
            y: new _TypeUIBindings_NumberUI__WEBPACK_IMPORTED_MODULE_3__.NumberUI(0),
            points: new _ListUI__WEBPACK_IMPORTED_MODULE_1__.ListUI([
                new _TypeUIBindings_Vector2UI__WEBPACK_IMPORTED_MODULE_2__.Vector2UI({ x: 0, y: 0 }),
                new _TypeUIBindings_Vector2UI__WEBPACK_IMPORTED_MODULE_2__.Vector2UI({ x: 100, y: 100 })
            ]),
            color: new _TypeUIBindings_ColorUI__WEBPACK_IMPORTED_MODULE_4__.ColorUI("#ff0000"),
            stroke: new _TypeUIBindings_ColorUI__WEBPACK_IMPORTED_MODULE_4__.ColorUI("#000000"),
            strokeWeight: new _TypeUIBindings_NumberUI__WEBPACK_IMPORTED_MODULE_3__.NumberUI(1)
        };
    }
    toCode() {
        const { points, color, stroke } = this.params;
        console.log(color.value);
        let code = `fill(${_helpers_ColorHelpers__WEBPACK_IMPORTED_MODULE_5__.ColorHelpers.hexToRGB(color.value).r}, ${_helpers_ColorHelpers__WEBPACK_IMPORTED_MODULE_5__.ColorHelpers.hexToRGB(color.value).g}, ${_helpers_ColorHelpers__WEBPACK_IMPORTED_MODULE_5__.ColorHelpers.hexToRGB(color.value).b}, ${Math.round(color.alpha * 255)});
stroke(${_helpers_ColorHelpers__WEBPACK_IMPORTED_MODULE_5__.ColorHelpers.hexToRGB(stroke.value).r}, ${_helpers_ColorHelpers__WEBPACK_IMPORTED_MODULE_5__.ColorHelpers.hexToRGB(stroke.value).g}, ${_helpers_ColorHelpers__WEBPACK_IMPORTED_MODULE_5__.ColorHelpers.hexToRGB(stroke.value).b}, ${Math.round(stroke.alpha * 255)});
beginShape();\n`;
        for (const p of points.value) {
            code += `   vertex(${p.value.x + this.params.x.value}, ${p.value.y + this.params.y.value});\n`;
        }
        code += "endShape();";
        return code;
    }
    render(ctx) {
        const { x, y, points, color, stroke, strokeWeight } = this.params;
        const pts = points.value;
        if (pts.length < 2)
            return;
        ctx.save();
        ctx.translate(x.value, y.value);
        ctx.beginPath();
        ctx.moveTo(pts[0].value.x, pts[0].value.y);
        for (let i = 1; i < pts.length; i++) {
            ctx.lineTo(pts[i].value.x, pts[i].value.y);
        }
        ctx.lineWidth = strokeWeight.value;
        const fillRGB = _helpers_ColorHelpers__WEBPACK_IMPORTED_MODULE_5__.ColorHelpers.hexToRGB(color.value);
        ctx.fillStyle = `rgba(${fillRGB.r}, ${fillRGB.g}, ${fillRGB.b}, ${color.alpha})`;
        const strokeRGB = _helpers_ColorHelpers__WEBPACK_IMPORTED_MODULE_5__.ColorHelpers.hexToRGB(stroke.value);
        ctx.strokeStyle = `rgba(${strokeRGB.r}, ${strokeRGB.g}, ${strokeRGB.b}, ${stroke.alpha})`;
        ctx.fill();
        ctx.stroke();
        ctx.restore();
    }
    hitTest(point) {
        // Convert local points to world space
        const pts = this.params.points.value.map(p => ({
            x: p.value.x + this.params.x.value,
            y: p.value.y + this.params.y.value
        }));
        // 1. Check stroke hit (distance to segments)
        const distToSegment = (p, a, b) => {
            const A = p.x - a.x;
            const B = p.y - a.y;
            const C = b.x - a.x;
            const D = b.y - a.y;
            const dot = A * C + B * D;
            const lenSq = C * C + D * D;
            let t = dot / lenSq;
            t = Math.max(0, Math.min(1, t));
            const projX = a.x + t * C;
            const projY = a.y + t * D;
            const dx = p.x - projX;
            const dy = p.y - projY;
            return Math.sqrt(dx * dx + dy * dy);
        };
        for (let i = 0; i < pts.length - 1; i++) {
            if (distToSegment(point, pts[i], pts[i + 1]) < 6) {
                return true;
            }
        }
        // 2. Check fill hit (point inside polygon)
        let inside = false;
        for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
            const xi = pts[i].x, yi = pts[i].y;
            const xj = pts[j].x, yj = pts[j].y;
            const intersect = ((yi > point.y) !== (yj > point.y)) &&
                (point.x < (xj - xi) * (point.y - yi) / (yj - yi) + xi);
            if (intersect)
                inside = !inside;
        }
        return inside;
    }
    getBounds() {
        const pts = this.params.points.value;
        if (pts.length === 0) {
            return { left: 0, top: 0, right: 0, bottom: 0 };
        }
        let left = Infinity, top = Infinity, right = -Infinity, bottom = -Infinity;
        for (const p of pts) {
            const px = p.value.x + this.params.x.value;
            const py = p.value.y + this.params.y.value;
            left = Math.min(left, px);
            top = Math.min(top, py);
            right = Math.max(right, px);
            bottom = Math.max(bottom, py);
        }
        return { left, top, right, bottom };
    }
    freezeLocalGeometry() {
        return {
            offsetX: this.params.x.value,
            offsetY: this.params.y.value,
            points: this.params.points.value.map(p => ({ x: p.value.x, y: p.value.y }))
        };
    }
    scaleFromBounds(oldB, newB, frozen) {
        const sx = (newB.right - newB.left) / (oldB.right - oldB.left);
        const sy = (newB.bottom - newB.top) / (oldB.bottom - oldB.top);
        const { offsetX, offsetY, points } = frozen;
        this.params.points.value.forEach((p, i) => {
            const worldX = points[i].x + offsetX;
            const worldY = points[i].y + offsetY;
            const scaledX = newB.left + (worldX - oldB.left) * sx;
            const scaledY = newB.top + (worldY - oldB.top) * sy;
            p.value.x = scaledX - offsetX;
            p.value.y = scaledY - offsetY;
        });
    }
}


/***/ },

/***/ "./src/engine/ui/UIBindings/ShapeUIBindings/RectUIBindings.ts"
/*!********************************************************************!*\
  !*** ./src/engine/ui/UIBindings/ShapeUIBindings/RectUIBindings.ts ***!
  \********************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RectUIBindings: () => (/* binding */ RectUIBindings)
/* harmony export */ });
/* harmony import */ var _TypeUIBindings_NumberUI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../TypeUIBindings/NumberUI */ "./src/engine/ui/UIBindings/TypeUIBindings/NumberUI.ts");
/* harmony import */ var _TypeUIBindings_ColorUI__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../TypeUIBindings/ColorUI */ "./src/engine/ui/UIBindings/TypeUIBindings/ColorUI.ts");
/* harmony import */ var _ShapeUIBindings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ShapeUIBindings */ "./src/engine/ui/UIBindings/ShapeUIBindings.ts");
/* harmony import */ var _helpers_ColorHelpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../helpers/ColorHelpers */ "./src/engine/helpers/ColorHelpers.ts");




class RectUIBindings extends _ShapeUIBindings__WEBPACK_IMPORTED_MODULE_2__.ShapeUIBindings {
    constructor() {
        super();
        this.params = {
            x: new _TypeUIBindings_NumberUI__WEBPACK_IMPORTED_MODULE_0__.NumberUI(0),
            y: new _TypeUIBindings_NumberUI__WEBPACK_IMPORTED_MODULE_0__.NumberUI(0),
            w: new _TypeUIBindings_NumberUI__WEBPACK_IMPORTED_MODULE_0__.NumberUI(100),
            h: new _TypeUIBindings_NumberUI__WEBPACK_IMPORTED_MODULE_0__.NumberUI(100),
            radius: new _TypeUIBindings_NumberUI__WEBPACK_IMPORTED_MODULE_0__.NumberUI(0),
            color: new _TypeUIBindings_ColorUI__WEBPACK_IMPORTED_MODULE_1__.ColorUI("#ff0000"),
            stroke: new _TypeUIBindings_ColorUI__WEBPACK_IMPORTED_MODULE_1__.ColorUI("#000000"),
            strokeWeight: new _TypeUIBindings_NumberUI__WEBPACK_IMPORTED_MODULE_0__.NumberUI(1)
        };
    }
    toCode() {
        const { x, y, w, h, radius, color, stroke } = this.params;
        const c = _helpers_ColorHelpers__WEBPACK_IMPORTED_MODULE_3__.ColorHelpers.hexToRGB(color.value);
        const s = _helpers_ColorHelpers__WEBPACK_IMPORTED_MODULE_3__.ColorHelpers.hexToRGB(stroke.value);
        return `fill(${c.r}, ${c.g}, ${c.b}, ${Math.round(color.alpha * 255)});
stroke(${s.r}, ${s.g}, ${s.b}, ${Math.round(stroke.alpha * 255)});
rect(${x.value}, ${y.value}, ${w.value}, ${h.value}, ${radius.value});`;
    }
    render(ctx) {
        const { x, y, w, h, radius, color, stroke, strokeWeight } = this.params;
        const fillRGB = _helpers_ColorHelpers__WEBPACK_IMPORTED_MODULE_3__.ColorHelpers.hexToRGB(color.value);
        ctx.fillStyle = `rgba(${fillRGB.r}, ${fillRGB.g}, ${fillRGB.b}, ${color.alpha})`;
        const strokeRGB = _helpers_ColorHelpers__WEBPACK_IMPORTED_MODULE_3__.ColorHelpers.hexToRGB(stroke.value);
        ctx.strokeStyle = `rgba(${strokeRGB.r}, ${strokeRGB.g}, ${strokeRGB.b}, ${stroke.alpha})`;
        ctx.lineWidth = strokeWeight.value;
        ctx.beginPath();
        ctx.roundRect(x.value, y.value, w.value, h.value, radius.value);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }
    hitTest(point) {
        const { x, y, w, h } = this.params;
        return (point.x >= x.value &&
            point.x <= x.value + w.value &&
            point.y >= y.value &&
            point.y <= y.value + h.value);
    }
    getBounds() {
        const { x, y, w, h } = this.params;
        return {
            left: x.value,
            top: y.value,
            right: x.value + w.value,
            bottom: y.value + h.value
        };
    }
    scaleFromBounds(oldB, newB) {
        this.params.x.value = newB.left;
        this.params.y.value = newB.top;
        this.params.w.value = newB.right - newB.left;
        this.params.h.value = newB.bottom - newB.top;
    }
}


/***/ },

/***/ "./src/engine/ui/UIBindings/ShapeUIBindings/TriangleUIBindings.ts"
/*!************************************************************************!*\
  !*** ./src/engine/ui/UIBindings/ShapeUIBindings/TriangleUIBindings.ts ***!
  \************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TriangleUIBindings: () => (/* binding */ TriangleUIBindings)
/* harmony export */ });
/* harmony import */ var _TypeUIBindings_NumberUI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../TypeUIBindings/NumberUI */ "./src/engine/ui/UIBindings/TypeUIBindings/NumberUI.ts");
/* harmony import */ var _TypeUIBindings_ColorUI__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../TypeUIBindings/ColorUI */ "./src/engine/ui/UIBindings/TypeUIBindings/ColorUI.ts");
/* harmony import */ var _ShapeUIBindings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ShapeUIBindings */ "./src/engine/ui/UIBindings/ShapeUIBindings.ts");
/* harmony import */ var _helpers_ColorHelpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../helpers/ColorHelpers */ "./src/engine/helpers/ColorHelpers.ts");
/* harmony import */ var _TypeUIBindings_Vector2UI__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../TypeUIBindings/Vector2UI */ "./src/engine/ui/UIBindings/TypeUIBindings/Vector2UI.ts");





class TriangleUIBindings extends _ShapeUIBindings__WEBPACK_IMPORTED_MODULE_2__.ShapeUIBindings {
    constructor() {
        super();
        this.params = {
            x: new _TypeUIBindings_NumberUI__WEBPACK_IMPORTED_MODULE_0__.NumberUI(0),
            y: new _TypeUIBindings_NumberUI__WEBPACK_IMPORTED_MODULE_0__.NumberUI(0),
            point1: new _TypeUIBindings_Vector2UI__WEBPACK_IMPORTED_MODULE_4__.Vector2UI({ x: 0, y: 0 }),
            point2: new _TypeUIBindings_Vector2UI__WEBPACK_IMPORTED_MODULE_4__.Vector2UI({ x: 50, y: 100 }),
            point3: new _TypeUIBindings_Vector2UI__WEBPACK_IMPORTED_MODULE_4__.Vector2UI({ x: 100, y: 0 }),
            color: new _TypeUIBindings_ColorUI__WEBPACK_IMPORTED_MODULE_1__.ColorUI("#ff0000"),
            stroke: new _TypeUIBindings_ColorUI__WEBPACK_IMPORTED_MODULE_1__.ColorUI("#000000"),
            strokeWeight: new _TypeUIBindings_NumberUI__WEBPACK_IMPORTED_MODULE_0__.NumberUI(1)
        };
    }
    toCode() {
        const { x, y, color, stroke, point1, point2, point3 } = this.params;
        const c = _helpers_ColorHelpers__WEBPACK_IMPORTED_MODULE_3__.ColorHelpers.hexToRGB(color.value);
        const s = _helpers_ColorHelpers__WEBPACK_IMPORTED_MODULE_3__.ColorHelpers.hexToRGB(stroke.value);
        return `fill(${c.r}, ${c.g}, ${c.b}, ${Math.round(color.alpha * 255)});
stroke(${s.r}, ${s.g}, ${s.b}, ${Math.round(stroke.alpha * 255)});
triangle(${point1.value.x + x.value}, ${point1.value.y + y.value}, ${point2.value.x + x.value}, ${point2.value.y + y.value}, ${point3.value.x + x.value}, ${point3.value.y + y.value});
`.trim();
    }
    render(ctx) {
        const { x, y, point1, point2, point3, color, stroke, strokeWeight } = this.params;
        const fillRGB = _helpers_ColorHelpers__WEBPACK_IMPORTED_MODULE_3__.ColorHelpers.hexToRGB(color.value);
        ctx.fillStyle = `rgba(${fillRGB.r}, ${fillRGB.g}, ${fillRGB.b}, ${color.alpha})`;
        const strokeRGB = _helpers_ColorHelpers__WEBPACK_IMPORTED_MODULE_3__.ColorHelpers.hexToRGB(stroke.value);
        ctx.strokeStyle = `rgba(${strokeRGB.r}, ${strokeRGB.g}, ${strokeRGB.b}, ${stroke.alpha})`;
        ctx.lineWidth = strokeWeight.value;
        ctx.save();
        ctx.translate(x.value, y.value);
        ctx.beginPath();
        ctx.moveTo(point1.value.x, point1.value.y);
        ctx.lineTo(point2.value.x, point2.value.y);
        ctx.lineTo(point3.value.x, point3.value.y);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();
    }
    hitTest(point) {
        const { x, y, point1, point2, point3 } = this.params;
        const p = point;
        const a = { x: point1.value.x + x.value, y: point1.value.y + y.value };
        const b = { x: point2.value.x + x.value, y: point2.value.y + y.value };
        const c = { x: point3.value.x + x.value, y: point3.value.y + y.value };
        const area = (v1, v2, v3) => Math.abs((v1.x * (v2.y - v3.y) + v2.x * (v3.y - v1.y) + v3.x * (v1.y - v2.y)) / 2);
        const A = area(a, b, c);
        const A1 = area(p, b, c);
        const A2 = area(a, p, c);
        const A3 = area(a, b, p);
        return Math.abs(A - (A1 + A2 + A3)) < 0.1;
    }
    getBounds() {
        const { x, y, point1, point2, point3 } = this.params;
        const points = [
            { x: point1.value.x + x.value, y: point1.value.y + y.value },
            { x: point2.value.x + x.value, y: point2.value.y + y.value },
            { x: point3.value.x + x.value, y: point3.value.y + y.value }
        ];
        const left = Math.min(...points.map(p => p.x));
        const right = Math.max(...points.map(p => p.x));
        const top = Math.min(...points.map(p => p.y));
        const bottom = Math.max(...points.map(p => p.y));
        return { left, top, right, bottom };
    }
    freezeLocalGeometry() {
        return {
            offsetX: this.params.x.value,
            offsetY: this.params.y.value,
            points: [
                { x: this.params.point1.value.x, y: this.params.point1.value.y },
                { x: this.params.point2.value.x, y: this.params.point2.value.y },
                { x: this.params.point3.value.x, y: this.params.point3.value.y }
            ]
        };
    }
    scaleFromBounds(oldB, newB, frozen) {
        const sx = (newB.right - newB.left) / (oldB.right - oldB.left);
        const sy = (newB.bottom - newB.top) / (oldB.bottom - oldB.top);
        const { offsetX, offsetY, points } = frozen;
        const params = [this.params.point1, this.params.point2, this.params.point3];
        params.forEach((param, i) => {
            const worldX = points[i].x + offsetX;
            const worldY = points[i].y + offsetY;
            const scaledX = newB.left + (worldX - oldB.left) * sx;
            const scaledY = newB.top + (worldY - oldB.top) * sy;
            param.value.x = scaledX - offsetX;
            param.value.y = scaledY - offsetY;
        });
    }
}


/***/ },

/***/ "./src/engine/ui/UIBindings/TypeUIBindings/BooleanUI.ts"
/*!**************************************************************!*\
  !*** ./src/engine/ui/UIBindings/TypeUIBindings/BooleanUI.ts ***!
  \**************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BooleanUI: () => (/* binding */ BooleanUI)
/* harmony export */ });
/* harmony import */ var _ParamUI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ParamUI */ "./src/engine/ui/UIBindings/ParamUI.ts");

class BooleanUI extends _ParamUI__WEBPACK_IMPORTED_MODULE_0__.ParamUI {
    render(onChange) {
        const container = document.createElement("div");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = this.value;
        checkbox.classList.add("paramInput");
        checkbox.onchange = () => {
            this.value = checkbox.checked;
            onChange(this.value);
        };
        container.appendChild(checkbox);
        return container;
    }
    toCode() {
        return this.value ? "true" : "false";
    }
    clone() {
        return new BooleanUI(this.value);
    }
}


/***/ },

/***/ "./src/engine/ui/UIBindings/TypeUIBindings/ColorUI.ts"
/*!************************************************************!*\
  !*** ./src/engine/ui/UIBindings/TypeUIBindings/ColorUI.ts ***!
  \************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
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

/***/ "./src/engine/ui/UIBindings/TypeUIBindings/EnumUI.ts"
/*!***********************************************************!*\
  !*** ./src/engine/ui/UIBindings/TypeUIBindings/EnumUI.ts ***!
  \***********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EnumUI: () => (/* binding */ EnumUI)
/* harmony export */ });
/* harmony import */ var _ParamUI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ParamUI */ "./src/engine/ui/UIBindings/ParamUI.ts");

class EnumUI extends _ParamUI__WEBPACK_IMPORTED_MODULE_0__.ParamUI {
    constructor(options, defaultValue) {
        super(defaultValue);
        this.options = options;
    }
    render(onChange) {
        const container = document.createElement("div");
        const select = document.createElement("select");
        select.classList.add("paramInput");
        this.options.forEach(opt => {
            const option = document.createElement("option");
            option.value = String(opt);
            option.textContent = String(opt);
            if (opt === this.value) {
                option.selected = true;
            }
            select.appendChild(option);
        });
        select.onchange = () => {
            const selected = select.value;
            this.value = selected;
            onChange(selected);
        };
        container.appendChild(select);
        return container;
    }
    toCode() {
        return JSON.stringify(this.value);
    }
    clone() {
        return new EnumUI(this.options, this.value);
    }
}


/***/ },

/***/ "./src/engine/ui/UIBindings/TypeUIBindings/NumberUI.ts"
/*!*************************************************************!*\
  !*** ./src/engine/ui/UIBindings/TypeUIBindings/NumberUI.ts ***!
  \*************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
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

"use strict";
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

"use strict";
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

/***/ "./src/engine/windows/PrefabGeneratorWindow.ts"
/*!*****************************************************!*\
  !*** ./src/engine/windows/PrefabGeneratorWindow.ts ***!
  \*****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PrefabGeneratorWindow: () => (/* binding */ PrefabGeneratorWindow)
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
class PrefabGeneratorWindow {
    constructor(containerId, selectId, classNameId, generateBtnId, downloadBtnId, componentListId, outputId) {
        var _a;
        this.state = { className: "", components: [] };
        this.outputDirHandle = null;
        this.container = document.getElementById(containerId);
        this.select = document.getElementById(selectId);
        this.classNameInput = document.getElementById(classNameId);
        const generateBtn = document.getElementById(generateBtnId);
        const downloadBtn = document.getElementById(downloadBtnId);
        const componentList = document.getElementById(componentListId);
        const output = document.getElementById(outputId);
        // Class name input
        this.classNameInput.oninput = (e) => {
            this.state.className = e.target.value;
        };
        // Populate dropdown
        Object.keys(_config_ComponentRegistry__WEBPACK_IMPORTED_MODULE_0__.ComponentRegistry).forEach((name) => {
            const option = document.createElement("option");
            option.value = name;
            option.textContent = name;
            this.select.appendChild(option);
        });
        // Add component
        (_a = document.getElementById("addComponentButton")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => this.addComponent(componentList));
        // Generate code
        generateBtn.addEventListener("click", () => {
            const code = this.generatePrefabCode();
            output.textContent = code;
        });
        // Download file
        downloadBtn.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () {
            const code = this.generatePrefabCode();
            const filename = `${this.state.className || "Prefab"}.ts`;
            yield this.saveToDirectory(filename, code);
        }));
        // Choose output directory
        const chooseDirBtn = document.getElementById("chooseOutputDir");
        chooseDirBtn.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () {
            try {
                this.outputDirHandle = yield window.showDirectoryPicker();
            }
            catch (_a) { }
        }));
    }
    // ----------------------------
    // ADD COMPONENT
    // ----------------------------
    addComponent(container) {
        const type = this.select.value;
        const entry = _config_ComponentRegistry__WEBPACK_IMPORTED_MODULE_0__.ComponentRegistry[type];
        if (!entry)
            return;
        // SCRIPT COMPONENT (MonoBehavior)
        if (entry.type === "script") {
            this.state.components.push({
                type,
                definition: null,
                values: {}
            });
            this.renderComponents(container);
            return;
        }
        // DATA COMPONENT
        const definition = entry.def;
        const values = {};
        for (const key of Object.keys(definition.params)) {
            values[key] = definition.params[key].clone();
        }
        this.state.components.push({ type, definition, values });
        this.renderComponents(container);
    }
    // ----------------------------
    // RENDER COMPONENT UI
    // ----------------------------
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
            // SCRIPT COMPONENT
            if (!comp.definition) {
                const note = document.createElement("p");
                note.textContent = "(Script component — no parameters)";
                div.appendChild(note);
            }
            // DATA COMPONENT
            else {
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
    // ----------------------------
    // GENERATE PREFAB CODE
    // ----------------------------
    generatePrefabCode() {
        const imports = new Set();
        imports.add(this.buildImport("Prefab"));
        let body = "";
        // Collect imports
        this.state.components.forEach((comp) => {
            // Script component
            if (!comp.definition) {
                imports.add(this.buildImport(comp.type));
                return;
            }
            // Data component
            imports.add(this.buildImport(comp.type));
            Object.values(comp.values).forEach((ui) => {
                ui.getImports().forEach((symbol) => {
                    imports.add(this.buildImport(symbol));
                });
            });
        });
        // Build body
        this.state.components.forEach((comp, i) => {
            const varName = comp.type.toLowerCase() + i;
            // SCRIPT COMPONENT
            if (!comp.definition) {
                body += `        this.AddComponent(${comp.type});\n\n`;
                return;
            }
            // DATA COMPONENT
            body += `        const ${varName} = this.AddComponent(${comp.type});\n`;
            const paramObject = Object.entries(comp.definition.params)
                .map(([key]) => `            ${key}: ${comp.values[key].toCode()}`)
                .join(",\n");
            body += `        ${varName}.initialize({\n${paramObject}\n        });\n\n`;
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
    // ----------------------------
    // SAVE FILE
    // ----------------------------
    saveToDirectory(filename, content) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.outputDirHandle) {
                alert("Please choose an output directory first.");
                return;
            }
            const fileHandle = yield this.outputDirHandle.getFileHandle(filename, { create: true });
            const writable = yield fileHandle.createWritable();
            yield writable.write(content);
            yield writable.close();
        });
    }
    // ----------------------------
    // IMPORT BUILDER
    // ----------------------------
    buildImport(symbol, overridePath) {
        const absolutePath = overridePath !== null && overridePath !== void 0 ? overridePath : _config_ImportMap__WEBPACK_IMPORTED_MODULE_1__.ImportMap[symbol];
        if (!absolutePath) {
            throw new Error(`No import path found for symbol: ${symbol}`);
        }
        const finalPath = _helpers_PathHelpers__WEBPACK_IMPORTED_MODULE_2__.PathHelpers.isExternalPath(absolutePath)
            ? absolutePath
            : _helpers_PathHelpers__WEBPACK_IMPORTED_MODULE_2__.PathHelpers.getRelativeImportPath(prefabOutputPath, absolutePath);
        return `import { ${symbol} } from "${finalPath}";`;
    }
}


/***/ },

/***/ "./src/engine/windows/ProjectWindow.ts"
/*!*********************************************!*\
  !*** ./src/engine/windows/ProjectWindow.ts ***!
  \*********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ProjectWindow: () => (/* binding */ ProjectWindow)
/* harmony export */ });
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class ProjectWindow {
    constructor(containerId) {
        this.selected = null;
        // -----------------------------
        // ICON MAP
        // -----------------------------
        this.iconMap = {
            folder: "/engine/icons/folder.png",
            file: "/engine/icons/file.png",
            ts: "/engine/icons/script.png",
            jpg: "/engine/icons/image.png",
            png: "/engine/icons/image.png",
            prefab: "/engine/icons/prefab.png"
        };
        const el = document.getElementById(containerId);
        if (!el)
            throw new Error("ProjectWindow container not found");
        this.container = el;
        this.load();
    }
    load() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield fetch("/project-tree");
            const data = yield res.json();
            this.render(data);
        });
    }
    render(tree) {
        this.container.innerHTML = "";
        const rootLabel = document.createElement("div");
        rootLabel.classList.add("project-root");
        rootLabel.textContent = tree.root;
        this.container.appendChild(rootLabel);
        tree.children.forEach(child => {
            this.container.appendChild(this.createNode(child));
        });
    }
    createNode(node) {
        var _a, _b;
        const wrapper = document.createElement("div");
        wrapper.classList.add("project-node");
        // Label row
        const label = document.createElement("div");
        label.classList.add("project-label");
        // Icon
        const icon = document.createElement("img");
        icon.classList.add("icon");
        icon.src = this.getIconForNode(node);
        // Text
        const text = document.createElement("span");
        text.textContent = (_a = node.baseName) !== null && _a !== void 0 ? _a : node.name;
        label.appendChild(icon);
        label.appendChild(text);
        // Folder
        if (node.type === "folder") {
            wrapper.classList.add("folder");
            const childrenContainer = document.createElement("div");
            childrenContainer.classList.add("project-children", "collapsed");
            (_b = node.children) === null || _b === void 0 ? void 0 : _b.forEach(child => {
                childrenContainer.appendChild(this.createNode(child));
            });
            label.addEventListener("click", (e) => {
                e.stopPropagation();
                childrenContainer.classList.toggle("collapsed");
            });
            wrapper.appendChild(label);
            wrapper.appendChild(childrenContainer);
        }
        // File
        if (node.type === "file") {
            wrapper.classList.add("file");
            label.addEventListener("click", (e) => {
                e.stopPropagation();
                this.select(label);
                console.log("Selected file:", node.name);
            });
            wrapper.appendChild(label);
        }
        return wrapper;
    }
    select(el) {
        if (this.selected) {
            this.selected.classList.remove("selected");
        }
        this.selected = el;
        el.classList.add("selected");
    }
    // -----------------------------
    // ICON LOGIC
    // -----------------------------
    getIconForNode(node) {
        var _a;
        // Folder
        if (node.type === "folder") {
            return this.iconMap.folder;
        }
        // Prefab special case: *.prefab.ts
        if (node.extension === "ts" && ((_a = node.baseName) === null || _a === void 0 ? void 0 : _a.endsWith(".prefab"))) {
            return this.iconMap.prefab;
        }
        // Normal extension-based icons
        if (node.extension && this.iconMap[node.extension]) {
            return this.iconMap[node.extension];
        }
        // Fallback
        return this.iconMap.file;
    }
    refresh() {
        this.load();
    }
}


/***/ },

/***/ "./src/engine/windows/ShapeEditorWindow.ts"
/*!*************************************************!*\
  !*** ./src/engine/windows/ShapeEditorWindow.ts ***!
  \*************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ShapeEditorWindow: () => (/* binding */ ShapeEditorWindow),
/* harmony export */   ShapeRegistry: () => (/* binding */ ShapeRegistry),
/* harmony export */   ShapeTypes: () => (/* binding */ ShapeTypes)
/* harmony export */ });
/* harmony import */ var _ui_UIBindings_ShapeUIBindings_EllipseUIBindings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ui/UIBindings/ShapeUIBindings/EllipseUIBindings */ "./src/engine/ui/UIBindings/ShapeUIBindings/EllipseUIBindings.ts");
/* harmony import */ var _ui_UIBindings_ShapeUIBindings_RectUIBindings__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ui/UIBindings/ShapeUIBindings/RectUIBindings */ "./src/engine/ui/UIBindings/ShapeUIBindings/RectUIBindings.ts");
/* harmony import */ var _ui_UIBindings_ShapeUIBindings_TriangleUIBindings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ui/UIBindings/ShapeUIBindings/TriangleUIBindings */ "./src/engine/ui/UIBindings/ShapeUIBindings/TriangleUIBindings.ts");
/* harmony import */ var _ui_UIBindings_ShapeUIBindings_PathUIBindings__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../ui/UIBindings/ShapeUIBindings/PathUIBindings */ "./src/engine/ui/UIBindings/ShapeUIBindings/PathUIBindings.ts");
/* harmony import */ var _tools_Shape_Editor_Layers_Layer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../tools/Shape Editor/Layers/Layer */ "./src/engine/tools/Shape Editor/Layers/Layer.ts");
/* harmony import */ var _tools_Shape_Editor_Layers_GroupLayer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../tools/Shape Editor/Layers/GroupLayer */ "./src/engine/tools/Shape Editor/Layers/GroupLayer.ts");
/* harmony import */ var _tools_Shape_Editor_ToolManager__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../tools/Shape Editor/ToolManager */ "./src/engine/tools/Shape Editor/ToolManager.ts");
/* harmony import */ var _tools_Shape_Editor_EditorCanvasManager__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../tools/Shape Editor/EditorCanvasManager */ "./src/engine/tools/Shape Editor/EditorCanvasManager.ts");
/* harmony import */ var _tools_Shape_Editor_SelectionManager__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../tools/Shape Editor/SelectionManager */ "./src/engine/tools/Shape Editor/SelectionManager.ts");
/* harmony import */ var _tools_Shape_Editor_ShapeFactory__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../tools/Shape Editor/ShapeFactory */ "./src/engine/tools/Shape Editor/ShapeFactory.ts");
/* harmony import */ var _tools_Shape_Editor_HierarchyPanel__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../tools/Shape Editor/HierarchyPanel */ "./src/engine/tools/Shape Editor/HierarchyPanel.ts");
/* harmony import */ var _tools_Shape_Editor_InspectorPanel__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../tools/Shape Editor/InspectorPanel */ "./src/engine/tools/Shape Editor/InspectorPanel.ts");
/* harmony import */ var _tools_Shape_Editor_ContextMenu__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../tools/Shape Editor/ContextMenu */ "./src/engine/tools/Shape Editor/ContextMenu.ts");
/* harmony import */ var _tools_Shape_Editor_RenderLoop__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../tools/Shape Editor/RenderLoop */ "./src/engine/tools/Shape Editor/RenderLoop.ts");
/* harmony import */ var _tools_Shape_Editor_Exporter__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../tools/Shape Editor/Exporter */ "./src/engine/tools/Shape Editor/Exporter.ts");
/* harmony import */ var _tools_Shape_Editor_TransformGizmo__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../tools/Shape Editor/TransformGizmo */ "./src/engine/tools/Shape Editor/TransformGizmo.ts");
















var ShapeTypes;
(function (ShapeTypes) {
    ShapeTypes["Rectangle"] = "rectangle";
    ShapeTypes["Ellipse"] = "ellipse";
    ShapeTypes["Triangle"] = "triangle";
    ShapeTypes["Path"] = "path";
})(ShapeTypes || (ShapeTypes = {}));
const ShapeRegistry = {
    [ShapeTypes.Rectangle]: _ui_UIBindings_ShapeUIBindings_RectUIBindings__WEBPACK_IMPORTED_MODULE_1__.RectUIBindings,
    [ShapeTypes.Ellipse]: _ui_UIBindings_ShapeUIBindings_EllipseUIBindings__WEBPACK_IMPORTED_MODULE_0__.EllipseUIBindings,
    [ShapeTypes.Triangle]: _ui_UIBindings_ShapeUIBindings_TriangleUIBindings__WEBPACK_IMPORTED_MODULE_2__.TriangleUIBindings,
    [ShapeTypes.Path]: _ui_UIBindings_ShapeUIBindings_PathUIBindings__WEBPACK_IMPORTED_MODULE_3__.PathUIBindings
};
class ShapeEditorWindow {
    constructor(canvasId, toolbarId, inspectorId, hierarchyId, outputId, exportBtnId, contextMenuId) {
        this.layers = [];
        this.isDraggingGizmo = false;
        const canvas = document.getElementById(canvasId);
        const ctx = canvas.getContext("2d");
        this.canvasManager = new _tools_Shape_Editor_EditorCanvasManager__WEBPACK_IMPORTED_MODULE_7__.EditorCanvasManager(canvas);
        this.toolManager = new _tools_Shape_Editor_ToolManager__WEBPACK_IMPORTED_MODULE_6__.ToolManager(document.getElementById(toolbarId));
        this.selection = new _tools_Shape_Editor_SelectionManager__WEBPACK_IMPORTED_MODULE_8__.SelectionManager();
        this.factory = new _tools_Shape_Editor_ShapeFactory__WEBPACK_IMPORTED_MODULE_9__.ShapeFactory();
        this.hierarchy = new _tools_Shape_Editor_HierarchyPanel__WEBPACK_IMPORTED_MODULE_10__.HierarchyPanel(document.getElementById(hierarchyId));
        this.inspector = new _tools_Shape_Editor_InspectorPanel__WEBPACK_IMPORTED_MODULE_11__.InspectorPanel(document.getElementById(inspectorId));
        this.contextMenu = new _tools_Shape_Editor_ContextMenu__WEBPACK_IMPORTED_MODULE_12__.ContextMenu(document.getElementById(contextMenuId));
        this.exporter = new _tools_Shape_Editor_Exporter__WEBPACK_IMPORTED_MODULE_14__.Exporter(document.getElementById(outputId), document.getElementById(exportBtnId), this.layers);
        this.gizmo = new _tools_Shape_Editor_TransformGizmo__WEBPACK_IMPORTED_MODULE_15__.TransformGizmo();
        this.loop = new _tools_Shape_Editor_RenderLoop__WEBPACK_IMPORTED_MODULE_13__.RenderLoop(ctx, this.layers, this.selection, this.gizmo);
        this.init();
    }
    init() {
        this.toolManager.init();
        // Canvas click → create or select layers
        this.canvasManager.onClick((mouse, e) => {
            if (this.isDraggingGizmo) {
                this.isDraggingGizmo = false;
                return; // ← ignore click after drag
            }
            const tool = this.toolManager.currentTool;
            // CREATE NEW LAYER
            if (tool !== "select") {
                const layer = this.factory.create(tool, mouse.x, mouse.y);
                this.layers.push(layer);
                this.selection.selectOne(layer);
                this.refresh();
                this.toolManager.currentTool = "select";
                return;
            }
            // SELECT EXISTING LAYER
            const hit = this.findLayerAtPoint(mouse);
            if (hit) {
                if (e.shiftKey) {
                    this.selection.toggle(hit);
                }
                else {
                    this.selection.selectOne(hit);
                }
                this.refresh();
            }
            else {
                this.selection.clear();
                this.refresh();
            }
        });
        // Context menu actions
        this.contextMenu.onAction((action, layerId) => {
            const layer = this.findLayerById(layerId);
            if (!layer)
                return;
            // ⭐ NEW: multi-delete
            if (action === "delete") {
                if (this.selection.selectedLayers.length > 1) {
                    this.deleteSelected();
                }
                else {
                    this.deleteLayer(layer);
                    this.selection.clear();
                    this.refresh();
                }
            }
            // ⭐ NEW: rename (unchanged)
            if (action === "rename") {
                const newName = prompt("Rename:", layer.name);
                if (newName)
                    layer.name = newName;
            }
            // ⭐ NEW: group multiple
            if (action === "group") {
                this.groupSelected();
            }
            // ⭐ NEW: ungroup
            if (action === "ungroup") {
                this.ungroupSelected();
            }
            this.refresh();
        });
        this.exporter.init();
        this.loop.start(document.getElementById("gridSizeSlider"));
        // Gizmo events
        this.canvasManager.onMouseDown(mouse => {
            const shape = this.selection.selected;
            if (shape) {
                const used = this.gizmo.onMouseDown(mouse, shape);
                if (used) {
                    this.isDraggingGizmo = true;
                    return;
                }
            }
        });
        this.canvasManager.onMouseMove(mouse => {
            const shape = this.selection.selected;
            if (shape)
                this.gizmo.onMouseMove(mouse, shape);
        });
        this.canvasManager.onMouseUp(() => {
            this.gizmo.onMouseUp();
            //this.isDraggingGizmo = false;
        });
        this.refresh();
    }
    refresh() {
        this.hierarchy.render(this.layers, this.selection.selectedLayers, (layer, shift) => {
            if (shift)
                this.selection.toggle(layer);
            else
                this.selection.selectOne(layer);
            this.refresh();
        }, (draggedId, targetId) => {
            this.moveLayer(draggedId, targetId);
            this.refresh();
        }, (x, y, layer) => this.contextMenu.show(x, y, layer.id, this.selection.selectedLayers.length, layer instanceof _tools_Shape_Editor_Layers_GroupLayer__WEBPACK_IMPORTED_MODULE_5__.GroupLayer));
        this.inspector.render(this.selection.selectedLayers);
    }
    // --- Layer helpers -------------------------------------------------------
    findLayerAtPoint(mouse) {
        const flat = this.flattenLayers(this.layers);
        for (let i = flat.length - 1; i >= 0; i--) {
            const layer = flat[i];
            if (layer.shape.hitTest(mouse)) {
                return layer;
            }
        }
        return null;
    }
    flattenLayers(nodes) {
        const result = [];
        for (const node of nodes) {
            if (node instanceof _tools_Shape_Editor_Layers_Layer__WEBPACK_IMPORTED_MODULE_4__.Layer)
                result.push(node);
            else if (node.isGroup()) {
                result.push(...this.flattenLayers(node.children));
            }
        }
        return result;
    }
    findLayerById(id) {
        return this.findLayerByIdRecursive(id, this.layers);
    }
    findLayerByIdRecursive(id, nodes) {
        for (const node of nodes) {
            if (node.id === id)
                return node;
            if (node.isGroup()) {
                const found = this.findLayerByIdRecursive(id, node.children);
                if (found)
                    return found;
            }
        }
        return null;
    }
    deleteLayer(layer) {
        if (layer.parent && layer.parent instanceof _tools_Shape_Editor_Layers_GroupLayer__WEBPACK_IMPORTED_MODULE_5__.GroupLayer) {
            layer.parent.remove(layer);
        }
        else {
            const index = this.layers.indexOf(layer);
            if (index !== -1)
                this.layers.splice(index, 1);
        }
        if (this.selection.selectedLayers.includes(layer)) {
            this.selection.clear();
        }
    }
    moveLayer(draggedId, targetId) {
        var _a;
        const dragged = this.findLayerById(draggedId);
        const target = targetId ? this.findLayerById(targetId) : null;
        if (!dragged)
            return;
        // Remove dragged from its current parent
        this.deleteLayer(dragged);
        // If no target, insert at root
        if (!target) {
            this.layers.push(dragged);
            dragged.parent = null;
            return;
        }
        // Determine parent array
        const parentArray = target.parent instanceof _tools_Shape_Editor_Layers_GroupLayer__WEBPACK_IMPORTED_MODULE_5__.GroupLayer
            ? target.parent.children
            : this.layers;
        const index = parentArray.indexOf(target);
        parentArray.splice(index, 0, dragged);
        dragged.parent = (_a = target.parent) !== null && _a !== void 0 ? _a : null;
    }
    // ⭐ NEW: delete all selected layers
    deleteSelected() {
        for (const layer of [...this.selection.selectedLayers]) {
            this.deleteLayer(layer);
        }
        this.selection.clear();
        this.refresh();
    }
    // ⭐ NEW: group all selected layers
    groupSelected() {
        const layers = this.selection.selectedLayers;
        if (layers.length <= 1)
            return;
        const parent = layers[0].parent;
        const parentArray = parent instanceof _tools_Shape_Editor_Layers_GroupLayer__WEBPACK_IMPORTED_MODULE_5__.GroupLayer ? parent.children : this.layers;
        const index = parentArray.indexOf(layers[0]);
        const group = new _tools_Shape_Editor_Layers_GroupLayer__WEBPACK_IMPORTED_MODULE_5__.GroupLayer("Group");
        group.parent = parent !== null && parent !== void 0 ? parent : null;
        // Replace first selected layer with the group
        parentArray.splice(index, 1, group);
        // Move all selected layers into the group
        for (const layer of layers) {
            const i = parentArray.indexOf(layer);
            if (i !== -1)
                parentArray.splice(i, 1);
            group.add(layer);
        }
        this.selection.selectOne(group);
        this.refresh();
    }
    // ⭐ NEW: ungroup a selected group
    ungroupSelected() {
        if (!this.selection.isSingleGroupSelected)
            return;
        const group = this.selection.selectedLayers[0];
        const parent = group.parent;
        const parentArray = parent instanceof _tools_Shape_Editor_Layers_GroupLayer__WEBPACK_IMPORTED_MODULE_5__.GroupLayer ? parent.children : this.layers;
        let index = parentArray.indexOf(group);
        // Remove group
        parentArray.splice(index, 1);
        // Insert children in its place
        for (const child of [...group.children]) {
            group.remove(child);
            parentArray.splice(index++, 0, child);
            child.parent = parent !== null && parent !== void 0 ? parent : null;
        }
        this.selection.selectMany([...group.children]);
        this.refresh();
    }
}
// document.addEventListener("DOMContentLoaded", () => {
//     new ShapeEditor(
//         "shapeEditorCanvas",
//         "shapeTypeContainer",
//         "shapeInspector",
//         "shapeHierarchyPanel",
//         "shapeEditorExportOutput",
//         "exportButton",
//         "layerContextMenu"
//     );
// });


/***/ },

/***/ "./src/engine/windows/WindowManager.ts"
/*!*********************************************!*\
  !*** ./src/engine/windows/WindowManager.ts ***!
  \*********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WindowManager: () => (/* binding */ WindowManager)
/* harmony export */ });
class WindowManager {
    constructor() {
        this.activeWindow = null;
        this.resizingWindow = null;
        this.dragOffsetX = 0;
        this.dragOffsetY = 0;
        this.resizeStartX = 0;
        this.resizeStartY = 0;
        this.resizeStartWidth = 0;
        this.resizeStartHeight = 0;
        this.initDragging();
        this.initResizing();
        this.initTabs();
        requestAnimationFrame(() => this.resizeShapeEditorCanvas());
    }
    bringToFront(win) {
        const windows = Array.from(document.querySelectorAll(".editor-window"));
        const maxZ = windows.reduce((max, el) => {
            const z = parseInt(el.style.zIndex || "0", 10);
            return Math.max(max, z);
        }, 0);
        win.style.zIndex = String(maxZ + 1);
    }
    // -----------------------------
    // DRAGGING
    // -----------------------------
    initDragging() {
        document.querySelectorAll(".editor-window").forEach(win => {
            const handle = win.querySelector("[data-drag-handle]");
            if (!handle)
                return;
            handle.addEventListener("mousedown", e => {
                this.activeWindow = win;
                this.bringToFront(win);
                this.dragOffsetX = e.clientX - win.offsetLeft;
                this.dragOffsetY = e.clientY - win.offsetTop;
                document.body.style.userSelect = "none";
            });
        });
        document.addEventListener("mousemove", e => {
            if (this.activeWindow) {
                this.activeWindow.style.left = `${e.clientX - this.dragOffsetX}px`;
                this.activeWindow.style.top = `${e.clientY - this.dragOffsetY}px`;
            }
            if (this.resizingWindow) {
                const dx = e.clientX - this.resizeStartX;
                const dy = e.clientY - this.resizeStartY;
                this.resizingWindow.style.width = `${Math.max(200, this.resizeStartWidth + dx)}px`;
                this.resizingWindow.style.height = `${Math.max(120, this.resizeStartHeight + dy)}px`;
                if (this.resizingWindow.querySelector("#shapeEditorCanvas")) {
                    requestAnimationFrame(() => this.resizeShapeEditorCanvas());
                }
            }
        });
        document.addEventListener("mouseup", () => {
            this.activeWindow = null;
            this.resizingWindow = null;
            document.body.style.userSelect = "";
        });
    }
    // -----------------------------
    // RESIZING
    // -----------------------------
    initResizing() {
        document.querySelectorAll(".editor-window").forEach(win => {
            const handle = win.querySelector("[data-resize-handle]");
            if (!handle)
                return;
            handle.addEventListener("mousedown", e => {
                e.stopPropagation();
                this.resizingWindow = win;
                this.bringToFront(win);
                this.resizeStartX = e.clientX;
                this.resizeStartY = e.clientY;
                this.resizeStartWidth = win.offsetWidth;
                this.resizeStartHeight = win.offsetHeight;
                document.body.style.userSelect = "none";
            });
        });
    }
    // -----------------------------
    // TABS
    // -----------------------------
    initTabs() {
        document.querySelectorAll(".editor-window").forEach(win => {
            const tabBar = win.querySelector("[data-tab-bar]");
            if (!tabBar)
                return;
            const tabs = tabBar.querySelectorAll(".window-tab");
            const contents = win.querySelectorAll(".window-tab-content");
            tabs.forEach(tab => {
                tab.addEventListener("click", () => {
                    const targetId = tab.dataset.tabTarget;
                    if (!targetId)
                        return;
                    tabs.forEach(t => t.classList.remove("active"));
                    contents.forEach(c => c.classList.remove("active"));
                    tab.classList.add("active");
                    const targetContent = win.querySelector(`.window-tab-content[data-tab-id="${targetId}"]`);
                    if (targetContent) {
                        targetContent.classList.add("active");
                    }
                    if (targetId === "tab-shape-editor") {
                        requestAnimationFrame(() => this.resizeShapeEditorCanvas());
                    }
                });
            });
        });
    }
    // -----------------------------
    // CANVAS DPI FIX
    // -----------------------------
    resizeShapeEditorCanvas() {
        const canvas = document.getElementById("shapeEditorCanvas");
        if (!canvas)
            return;
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * window.devicePixelRatio;
        canvas.height = rect.height * window.devicePixelRatio;
        const ctx = canvas.getContext("2d");
        if (ctx) {
            ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
        }
    }
}


/***/ },

/***/ "./src/game/components/entities/CrateBehavior.ts"
/*!*******************************************************!*\
  !*** ./src/game/components/entities/CrateBehavior.ts ***!
  \*******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CrateBehavior: () => (/* binding */ CrateBehavior)
/* harmony export */ });
/* harmony import */ var _engine_core_ECS_components_ui_TextUI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../engine/core/ECS/components/ui/TextUI */ "./src/engine/core/ECS/components/ui/TextUI.ts");
/* harmony import */ var _engine_core_ECS_main_MonoBehavior__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../engine/core/ECS/main/MonoBehavior */ "./src/engine/core/ECS/main/MonoBehavior.ts");
/* harmony import */ var _engine_helpers_TimeManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../engine/helpers/TimeManager */ "./src/engine/helpers/TimeManager.ts");
/* harmony import */ var _helpers_MoneyFormatter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../helpers/MoneyFormatter */ "./src/game/helpers/MoneyFormatter.ts");
/* harmony import */ var _prefabs_CratePrefab__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../prefabs/CratePrefab */ "./src/game/prefabs/CratePrefab.ts");





class CrateBehavior extends _engine_core_ECS_main_MonoBehavior__WEBPACK_IMPORTED_MODULE_1__.MonoBehavior {
    constructor() {
        super(...arguments);
        this.money = 0;
        this.lvl = 1;
        this.hasUnloaded = false;
    }
    Awake() {
        this.moneyText = this.GetComponent(_engine_core_ECS_components_ui_TextUI__WEBPACK_IMPORTED_MODULE_0__.TextUI);
    }
    Update() {
        this.money += _engine_helpers_TimeManager__WEBPACK_IMPORTED_MODULE_2__.Time.deltaTime;
        this.moneyText.content = _helpers_MoneyFormatter__WEBPACK_IMPORTED_MODULE_3__.MoneyFormatter.abbreviate(Math.round(this.money));
    }
    add(amount) {
        if (amount > 0) {
            this.money += amount;
        }
    }
    toJSON() {
        return {
            lvl: this.lvl,
            money: this.money,
            hasUnloaded: this.hasUnloaded
        };
    }
    static fromJSON(data) {
        const crateGO = _prefabs_CratePrefab__WEBPACK_IMPORTED_MODULE_4__.CratePrefab.instantiate();
        const crateBehavior = crateGO.GetComponent(CrateBehavior);
        crateBehavior.lvl = data.lvl;
        crateBehavior.money = data.money;
        crateBehavior.hasUnloaded = data.hasUnloaded;
        return crateGO;
    }
}


/***/ },

/***/ "./src/game/components/entities/MinerBehavior.ts"
/*!*******************************************************!*\
  !*** ./src/game/components/entities/MinerBehavior.ts ***!
  \*******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MinerBehavior: () => (/* binding */ MinerBehavior)
/* harmony export */ });
/* harmony import */ var _engine_core_ECS_components_ui_ProgressBarUI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../engine/core/ECS/components/ui/ProgressBarUI */ "./src/engine/core/ECS/components/ui/ProgressBarUI.ts");
/* harmony import */ var _engine_core_ECS_main_MonoBehavior__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../engine/core/ECS/main/MonoBehavior */ "./src/engine/core/ECS/main/MonoBehavior.ts");
/* harmony import */ var _engine_helpers_TimeManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../engine/helpers/TimeManager */ "./src/engine/helpers/TimeManager.ts");
/* harmony import */ var _config_MinerStates__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../config/MinerStates */ "./src/game/config/MinerStates.ts");
/* harmony import */ var _prefabs_MinerPrefab__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../prefabs/MinerPrefab */ "./src/game/prefabs/MinerPrefab.ts");





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

/***/ "./src/game/components/entities/ShaftBehavior.ts"
/*!*******************************************************!*\
  !*** ./src/game/components/entities/ShaftBehavior.ts ***!
  \*******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ShaftBehavior: () => (/* binding */ ShaftBehavior)
/* harmony export */ });
/* harmony import */ var _engine_core_ECS_main_MonoBehavior__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../engine/core/ECS/main/MonoBehavior */ "./src/engine/core/ECS/main/MonoBehavior.ts");

class ShaftBehavior extends _engine_core_ECS_main_MonoBehavior__WEBPACK_IMPORTED_MODULE_0__.MonoBehavior {
}


/***/ },

/***/ "./src/game/config/MinerStates.ts"
/*!****************************************!*\
  !*** ./src/game/config/MinerStates.ts ***!
  \****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
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

/***/ "./src/game/helpers/MoneyFormatter.ts"
/*!********************************************!*\
  !*** ./src/game/helpers/MoneyFormatter.ts ***!
  \********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MoneyFormatter: () => (/* binding */ MoneyFormatter)
/* harmony export */ });
class MoneyFormatter {
    static tenthRoot(num) {
        const numStr = num.toString();
        if (numStr[1] === ".") {
            return parseInt(numStr.substring(numStr.indexOf("e") + 2));
        }
        else if (numStr[1] === "e") {
            return parseInt(numStr.substring(3));
        }
        else {
            return numStr.length - 1;
        }
    }
    static abbreviate(num, forceZeroes = false) {
        if (num < 1000) {
            return num.toString();
        }
        let numStr = num.toString();
        let numArr = numStr.split("");
        let numPow = numStr.length - 1;
        if (numArr[1] === ".") {
            numPow = parseInt(numStr.substring(numArr.indexOf("e") + 2));
            numArr.splice(1, 1);
        }
        if (numArr[1] === "e") {
            numPow = parseInt(numStr.substring(3));
            numArr = [numArr[0], "0", "0", "0"];
        }
        numStr = numArr.join("");
        let newNumStr = numStr.slice(0, numPow % 3 + 1) +
            "." +
            numStr.slice(numPow % 3 + 1);
        if (!forceZeroes) {
            let trimmed = newNumStr.substr(0, 5).split("");
            for (let i = trimmed.length - 1; i >= 0; i--) {
                if (trimmed[i] !== "0")
                    break;
                trimmed.splice(i, 1);
            }
            if (trimmed[trimmed.length - 1] === ".") {
                trimmed.pop();
            }
            newNumStr = trimmed.join("");
        }
        const suffixIndex = Math.floor(numPow / 3) - 1;
        return newNumStr.substr(0, 5) + MoneyFormatter.numberLetters[suffixIndex];
    }
}
MoneyFormatter.numberLetters = [
    "K", "B", "M", "T",
    "aa", "ab", "ac", "ad", "ae", "af", "ag", "ah", "ai", "aj", "ak"
];


/***/ },

/***/ "./src/game/prefabs/CratePrefab.ts"
/*!*****************************************!*\
  !*** ./src/game/prefabs/CratePrefab.ts ***!
  \*****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CratePrefab: () => (/* binding */ CratePrefab)
/* harmony export */ });
/* harmony import */ var _engine_core_ECS_components_SpriteRenderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../engine/core/ECS/components/SpriteRenderer */ "./src/engine/core/ECS/components/SpriteRenderer.ts");
/* harmony import */ var _engine_core_ECS_components_ui_TextUI__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../engine/core/ECS/components/ui/TextUI */ "./src/engine/core/ECS/components/ui/TextUI.ts");
/* harmony import */ var _components_entities_CrateBehavior__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/entities/CrateBehavior */ "./src/game/components/entities/CrateBehavior.ts");
/* harmony import */ var _engine_core_ECS_Prefab__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../engine/core/ECS/Prefab */ "./src/engine/core/ECS/Prefab.ts");




class CratePrefab extends _engine_core_ECS_Prefab__WEBPACK_IMPORTED_MODULE_3__.Prefab {
    constructor() {
        super();
        const spriteRenderer = this.AddComponent(_engine_core_ECS_components_SpriteRenderer__WEBPACK_IMPORTED_MODULE_0__.SpriteRenderer);
        spriteRenderer.initialize("crate", 70, 40);
        const moneyText = this.AddComponent(_engine_core_ECS_components_ui_TextUI__WEBPACK_IMPORTED_MODULE_1__.TextUI);
        //moneyText.initialize("0", 30, color(0, 0, 0), "CENTER", false, new Vector2(35, -10));
        this.AddComponent(_components_entities_CrateBehavior__WEBPACK_IMPORTED_MODULE_2__.CrateBehavior);
    }
}


/***/ },

/***/ "./src/game/prefabs/MinerPrefab.ts"
/*!*****************************************!*\
  !*** ./src/game/prefabs/MinerPrefab.ts ***!
  \*****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MinerPrefab: () => (/* binding */ MinerPrefab)
/* harmony export */ });
/* harmony import */ var _engine_core_ECS_components_SpriteRenderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../engine/core/ECS/components/SpriteRenderer */ "./src/engine/core/ECS/components/SpriteRenderer.ts");
/* harmony import */ var _engine_core_ECS_components_ui_ProgressBarUI__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../engine/core/ECS/components/ui/ProgressBarUI */ "./src/engine/core/ECS/components/ui/ProgressBarUI.ts");
/* harmony import */ var _engine_core_math_Vector2__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../engine/core/math/Vector2 */ "./src/engine/core/math/Vector2.ts");
/* harmony import */ var _engine_core_ECS_Prefab__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../engine/core/ECS/Prefab */ "./src/engine/core/ECS/Prefab.ts");
/* harmony import */ var _components_entities_MinerBehavior__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/entities/MinerBehavior */ "./src/game/components/entities/MinerBehavior.ts");





class MinerPrefab extends _engine_core_ECS_Prefab__WEBPACK_IMPORTED_MODULE_3__.Prefab {
    constructor() {
        super();
        const spriteRenderer = this.AddComponent(_engine_core_ECS_components_SpriteRenderer__WEBPACK_IMPORTED_MODULE_0__.SpriteRenderer);
        spriteRenderer.initialize("miner", 50, 75, new _engine_core_math_Vector2__WEBPACK_IMPORTED_MODULE_2__.Vector2(0, 0));
        const progressBar = this.AddComponent(_engine_core_ECS_components_ui_ProgressBarUI__WEBPACK_IMPORTED_MODULE_1__.ProgressBarUI);
        //progressBar.initialize(color(255, 214, 89), color(255), 0, 200 / 3, 15 / 2, new Vector2(-25 / 3, -25 / 2));
        this.AddComponent(_components_entities_MinerBehavior__WEBPACK_IMPORTED_MODULE_4__.MinerBehavior);
    }
}


/***/ },

/***/ "./src/engine/core/ECS/components sync recursive \\.ts$"
/*!****************************************************!*\
  !*** ./src/engine/core/ECS/components/ sync \.ts$ ***!
  \****************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var map = {
	"./Renderer.ts": "./src/engine/core/ECS/components/Renderer.ts",
	"./SpriteRenderer.ts": "./src/engine/core/ECS/components/SpriteRenderer.ts",
	"./Transform.ts": "./src/engine/core/ECS/components/Transform.ts",
	"./UIComponent.ts": "./src/engine/core/ECS/components/UIComponent.ts",
	"./physics/Collider2D.ts": "./src/engine/core/ECS/components/physics/Collider2D.ts",
	"./physics/RigidBody2D.ts": "./src/engine/core/ECS/components/physics/RigidBody2D.ts",
	"./ui/ProgressBarUI.ts": "./src/engine/core/ECS/components/ui/ProgressBarUI.ts",
	"./ui/TextUI.ts": "./src/engine/core/ECS/components/ui/TextUI.ts"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./src/engine/core/ECS/components sync recursive \\.ts$";

/***/ },

/***/ "./src/game/components sync recursive \\.ts$"
/*!*****************************************!*\
  !*** ./src/game/components/ sync \.ts$ ***!
  \*****************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var map = {
	"./entities/CrateBehavior.ts": "./src/game/components/entities/CrateBehavior.ts",
	"./entities/MinerBehavior.ts": "./src/game/components/entities/MinerBehavior.ts",
	"./entities/ShaftBehavior.ts": "./src/game/components/entities/ShaftBehavior.ts"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./src/game/components sync recursive \\.ts$";

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
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _engine_EditorBootstrapper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./engine/EditorBootstrapper */ "./src/engine/EditorBootstrapper.ts");

window.addEventListener("load", () => {
    console.log("Game + Editor initialized!");
    const editor = new _engine_EditorBootstrapper__WEBPACK_IMPORTED_MODULE_0__.EditorBootstrapper();
    editor.start();
    // Optional: load a scene
    // SceneManager.loadScene(new TestScene());
});

})();

/******/ })()
;
//# sourceMappingURL=engine.js.map