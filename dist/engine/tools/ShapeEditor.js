import { EllipseUIBindings } from "../ui/UIBindings/ShapeUIBindings/EllipseUIBindings.js";
import { RectUIBindings } from "../ui/UIBindings/ShapeUIBindings/RectUIBindings.js";
import { TriangleUIBindings } from "../ui/UIBindings/ShapeUIBindings/TriangleUIBindings.js";
import { PathUIBindings } from "../ui/UIBindings/ShapeUIBindings/PathUIBindings.js";
import { Layer } from "./Shape Editor/Layers/Layer.js";
import { GroupLayer } from "./Shape Editor/Layers/GroupLayer.js";
import { ToolManager } from "./Shape Editor/ToolManager.js";
import { EditorCanvasManager } from "./Shape Editor/EditorCanvasManager.js";
import { SelectionManager } from "./Shape Editor/SelectionManager.js";
import { ShapeFactory } from "./Shape Editor/ShapeFactory.js";
import { HierarchyPanel } from "./Shape Editor/HierarchyPanel.js";
import { InspectorPanel } from "./Shape Editor/InspectorPanel.js";
import { ContextMenu } from "./Shape Editor/ContextMenu.js";
import { RenderLoop } from "./Shape Editor/RenderLoop.js";
import { Exporter } from "./Shape Editor/Exporter.js";
import { TransformGizmo } from "./Shape Editor/TransformGizmo.js";
export var ShapeTypes;
(function (ShapeTypes) {
    ShapeTypes["Rectangle"] = "rectangle";
    ShapeTypes["Ellipse"] = "ellipse";
    ShapeTypes["Triangle"] = "triangle";
    ShapeTypes["Path"] = "path";
})(ShapeTypes || (ShapeTypes = {}));
export const ShapeRegistry = {
    [ShapeTypes.Rectangle]: RectUIBindings,
    [ShapeTypes.Ellipse]: EllipseUIBindings,
    [ShapeTypes.Triangle]: TriangleUIBindings,
    [ShapeTypes.Path]: PathUIBindings
};
export class ShapeEditor {
    constructor(canvasId, toolbarId, inspectorId, hierarchyId, outputId, exportBtnId, contextMenuId) {
        this.layers = [];
        this.isDraggingGizmo = false;
        const canvas = document.getElementById(canvasId);
        const ctx = canvas.getContext("2d");
        this.canvasManager = new EditorCanvasManager(canvas);
        this.toolManager = new ToolManager(document.getElementById(toolbarId));
        this.selection = new SelectionManager();
        this.factory = new ShapeFactory();
        this.hierarchy = new HierarchyPanel(document.getElementById(hierarchyId));
        this.inspector = new InspectorPanel(document.getElementById(inspectorId));
        this.contextMenu = new ContextMenu(document.getElementById(contextMenuId));
        this.exporter = new Exporter(document.getElementById(outputId), document.getElementById(exportBtnId), this.layers);
        this.gizmo = new TransformGizmo(canvas);
        this.loop = new RenderLoop(ctx, this.layers, this.selection, this.gizmo);
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
            if (action === "delete") {
                this.deleteLayer(layer);
            }
            if (action === "rename") {
                const newName = prompt("Rename:", layer.name);
                if (newName)
                    layer.name = newName;
            }
            if (action === "group") {
                this.groupLayer(layer);
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
        }, (x, y, layer) => this.contextMenu.show(x, y, layer.id));
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
            if (node instanceof Layer)
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
        if (layer.parent && layer.parent instanceof GroupLayer) {
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
        const parentArray = target.parent instanceof GroupLayer
            ? target.parent.children
            : this.layers;
        const index = parentArray.indexOf(target);
        parentArray.splice(index, 0, dragged);
        dragged.parent = (_a = target.parent) !== null && _a !== void 0 ? _a : null;
    }
    groupLayer(layer) {
        const parent = layer.parent;
        const group = new GroupLayer("Group");
        group.parent = parent !== null && parent !== void 0 ? parent : null;
        const parentArray = parent instanceof GroupLayer ? parent.children : this.layers;
        const index = parentArray.indexOf(layer);
        parentArray.splice(index, 1, group);
        for (const child of this.selection.selectedLayers) {
            group.add(child);
        }
        this.selection.selectOne(group);
    }
}
document.addEventListener("DOMContentLoaded", () => {
    new ShapeEditor("shapeEditorCanvas", "shapeTypeContainer", "shapeInspector", "shapeHierarchyPanel", "shapeEditorExportOutput", "exportButton", "layerContextMenu");
});
