/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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

/***/ "./src/engine/tools/Shape Editor/ContextMenu.ts"
/*!******************************************************!*\
  !*** ./src/engine/tools/Shape Editor/ContextMenu.ts ***!
  \******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

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

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ShapeFactory: () => (/* binding */ ShapeFactory)
/* harmony export */ });
/* harmony import */ var _ShapeEditor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ShapeEditor */ "./src/engine/tools/ShapeEditor.ts");
/* harmony import */ var _Layers_Layer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Layers/Layer */ "./src/engine/tools/Shape Editor/Layers/Layer.ts");


class ShapeFactory {
    create(type, x, y) {
        const BindingClass = _ShapeEditor__WEBPACK_IMPORTED_MODULE_0__.ShapeRegistry[type];
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

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ToolManager: () => (/* binding */ ToolManager)
/* harmony export */ });
/* harmony import */ var _ShapeEditor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ShapeEditor */ "./src/engine/tools/ShapeEditor.ts");

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
        Object.values(_ShapeEditor__WEBPACK_IMPORTED_MODULE_0__.ShapeTypes).forEach(type => {
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

/***/ "./src/engine/tools/ShapeEditor.ts"
/*!*****************************************!*\
  !*** ./src/engine/tools/ShapeEditor.ts ***!
  \*****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ShapeEditor: () => (/* binding */ ShapeEditor),
/* harmony export */   ShapeRegistry: () => (/* binding */ ShapeRegistry),
/* harmony export */   ShapeTypes: () => (/* binding */ ShapeTypes)
/* harmony export */ });
/* harmony import */ var _ui_UIBindings_ShapeUIBindings_EllipseUIBindings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ui/UIBindings/ShapeUIBindings/EllipseUIBindings */ "./src/engine/ui/UIBindings/ShapeUIBindings/EllipseUIBindings.ts");
/* harmony import */ var _ui_UIBindings_ShapeUIBindings_RectUIBindings__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ui/UIBindings/ShapeUIBindings/RectUIBindings */ "./src/engine/ui/UIBindings/ShapeUIBindings/RectUIBindings.ts");
/* harmony import */ var _ui_UIBindings_ShapeUIBindings_TriangleUIBindings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ui/UIBindings/ShapeUIBindings/TriangleUIBindings */ "./src/engine/ui/UIBindings/ShapeUIBindings/TriangleUIBindings.ts");
/* harmony import */ var _ui_UIBindings_ShapeUIBindings_PathUIBindings__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../ui/UIBindings/ShapeUIBindings/PathUIBindings */ "./src/engine/ui/UIBindings/ShapeUIBindings/PathUIBindings.ts");
/* harmony import */ var _Shape_Editor_Layers_Layer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Shape Editor/Layers/Layer */ "./src/engine/tools/Shape Editor/Layers/Layer.ts");
/* harmony import */ var _Shape_Editor_Layers_GroupLayer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Shape Editor/Layers/GroupLayer */ "./src/engine/tools/Shape Editor/Layers/GroupLayer.ts");
/* harmony import */ var _Shape_Editor_ToolManager__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Shape Editor/ToolManager */ "./src/engine/tools/Shape Editor/ToolManager.ts");
/* harmony import */ var _Shape_Editor_EditorCanvasManager__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Shape Editor/EditorCanvasManager */ "./src/engine/tools/Shape Editor/EditorCanvasManager.ts");
/* harmony import */ var _Shape_Editor_SelectionManager__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Shape Editor/SelectionManager */ "./src/engine/tools/Shape Editor/SelectionManager.ts");
/* harmony import */ var _Shape_Editor_ShapeFactory__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Shape Editor/ShapeFactory */ "./src/engine/tools/Shape Editor/ShapeFactory.ts");
/* harmony import */ var _Shape_Editor_HierarchyPanel__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Shape Editor/HierarchyPanel */ "./src/engine/tools/Shape Editor/HierarchyPanel.ts");
/* harmony import */ var _Shape_Editor_InspectorPanel__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./Shape Editor/InspectorPanel */ "./src/engine/tools/Shape Editor/InspectorPanel.ts");
/* harmony import */ var _Shape_Editor_ContextMenu__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./Shape Editor/ContextMenu */ "./src/engine/tools/Shape Editor/ContextMenu.ts");
/* harmony import */ var _Shape_Editor_RenderLoop__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./Shape Editor/RenderLoop */ "./src/engine/tools/Shape Editor/RenderLoop.ts");
/* harmony import */ var _Shape_Editor_Exporter__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./Shape Editor/Exporter */ "./src/engine/tools/Shape Editor/Exporter.ts");
/* harmony import */ var _Shape_Editor_TransformGizmo__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./Shape Editor/TransformGizmo */ "./src/engine/tools/Shape Editor/TransformGizmo.ts");
















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
class ShapeEditor {
    constructor(canvasId, toolbarId, inspectorId, hierarchyId, outputId, exportBtnId, contextMenuId) {
        this.layers = [];
        this.isDraggingGizmo = false;
        const canvas = document.getElementById(canvasId);
        const ctx = canvas.getContext("2d");
        this.canvasManager = new _Shape_Editor_EditorCanvasManager__WEBPACK_IMPORTED_MODULE_7__.EditorCanvasManager(canvas);
        this.toolManager = new _Shape_Editor_ToolManager__WEBPACK_IMPORTED_MODULE_6__.ToolManager(document.getElementById(toolbarId));
        this.selection = new _Shape_Editor_SelectionManager__WEBPACK_IMPORTED_MODULE_8__.SelectionManager();
        this.factory = new _Shape_Editor_ShapeFactory__WEBPACK_IMPORTED_MODULE_9__.ShapeFactory();
        this.hierarchy = new _Shape_Editor_HierarchyPanel__WEBPACK_IMPORTED_MODULE_10__.HierarchyPanel(document.getElementById(hierarchyId));
        this.inspector = new _Shape_Editor_InspectorPanel__WEBPACK_IMPORTED_MODULE_11__.InspectorPanel(document.getElementById(inspectorId));
        this.contextMenu = new _Shape_Editor_ContextMenu__WEBPACK_IMPORTED_MODULE_12__.ContextMenu(document.getElementById(contextMenuId));
        this.exporter = new _Shape_Editor_Exporter__WEBPACK_IMPORTED_MODULE_14__.Exporter(document.getElementById(outputId), document.getElementById(exportBtnId), this.layers);
        this.gizmo = new _Shape_Editor_TransformGizmo__WEBPACK_IMPORTED_MODULE_15__.TransformGizmo();
        this.loop = new _Shape_Editor_RenderLoop__WEBPACK_IMPORTED_MODULE_13__.RenderLoop(ctx, this.layers, this.selection, this.gizmo);
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
        }, (x, y, layer) => this.contextMenu.show(x, y, layer.id, this.selection.selectedLayers.length, layer instanceof _Shape_Editor_Layers_GroupLayer__WEBPACK_IMPORTED_MODULE_5__.GroupLayer));
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
            if (node instanceof _Shape_Editor_Layers_Layer__WEBPACK_IMPORTED_MODULE_4__.Layer)
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
        if (layer.parent && layer.parent instanceof _Shape_Editor_Layers_GroupLayer__WEBPACK_IMPORTED_MODULE_5__.GroupLayer) {
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
        const parentArray = target.parent instanceof _Shape_Editor_Layers_GroupLayer__WEBPACK_IMPORTED_MODULE_5__.GroupLayer
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
        const parentArray = parent instanceof _Shape_Editor_Layers_GroupLayer__WEBPACK_IMPORTED_MODULE_5__.GroupLayer ? parent.children : this.layers;
        const index = parentArray.indexOf(layers[0]);
        const group = new _Shape_Editor_Layers_GroupLayer__WEBPACK_IMPORTED_MODULE_5__.GroupLayer("Group");
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
        const parentArray = parent instanceof _Shape_Editor_Layers_GroupLayer__WEBPACK_IMPORTED_MODULE_5__.GroupLayer ? parent.children : this.layers;
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
document.addEventListener("DOMContentLoaded", () => {
    new ShapeEditor("shapeEditorCanvas", "shapeTypeContainer", "shapeInspector", "shapeHierarchyPanel", "shapeEditorExportOutput", "exportButton", "layerContextMenu");
});


/***/ },

/***/ "./src/engine/ui/UIBindings/ListUI.ts"
/*!********************************************!*\
  !*** ./src/engine/ui/UIBindings/ListUI.ts ***!
  \********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/engine/tools/ShapeEditor.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=shapeEditor.js.map