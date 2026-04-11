import { EllipseUIBindings } from "../ui/UIBindings/ShapeUIBindings/EllipseUIBindings.js";
import { RectUIBindings } from "../ui/UIBindings/ShapeUIBindings/RectUIBindings.js";
import { ShapeUIBindings } from "../ui/UIBindings/ShapeUIBindings.js";
import { TriangleUIBindings } from "../ui/UIBindings/ShapeUIBindings/TriangleUIBindings.js";
import { PathUIBindings } from "../ui/UIBindings/ShapeUIBindings/PathUIBindings.js";

import { ToolManager } from "./Shape Editor/ToolManager.js";
import { EditorCanvasManager } from "./Shape Editor/EditorCanvasManager.js";
import { SelectionManager } from "./Shape Editor/SelectionManager.js";
import { ShapeFactory } from "./Shape Editor/ShapeFactory.js";
import { HierarchyPanel } from "./Shape Editor/HierarchyPanel.js";
import { InspectorPanel } from "./Shape Editor/InspectorPanel.js";
import { ContextMenu } from "./Shape Editor/ContextMenu.js";
import { RenderLoop } from "./Shape Editor/RenderLoop.js";
import { Exporter } from "./Shape Editor/Exporter.js";
import { TransformGizmo } from "./TransformGizmo.js";

export enum ShapeTypes {
    Rectangle = "rectangle",
    Ellipse = "ellipse",
    Triangle = "triangle",
    Path = "path"
}

export const ShapeRegistry: { [key in ShapeTypes]: new () => ShapeUIBindings<any> } = {
    [ShapeTypes.Rectangle]: RectUIBindings,
    [ShapeTypes.Ellipse]: EllipseUIBindings,
    [ShapeTypes.Triangle]: TriangleUIBindings,
    [ShapeTypes.Path]: PathUIBindings
};

export class ShapeEditor {
    shapes: ShapeUIBindings<any>[] = [];

    toolManager: ToolManager;
    canvasManager: EditorCanvasManager;
    selection: SelectionManager;
    factory: ShapeFactory;

    hierarchy: HierarchyPanel;
    inspector: InspectorPanel;
    contextMenu: ContextMenu;
    exporter: Exporter;

    loop: RenderLoop;
    gizmo: TransformGizmo;

    constructor(
        canvasId: string,
        toolbarId: string,
        inspectorId: string,
        hierarchyId: string,
        outputId: string,
        exportBtnId: string,
        contextMenuId: string
    ) {
        // Canvas + context
        const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        const ctx = canvas.getContext("2d")!;

        // Core systems
        this.canvasManager = new EditorCanvasManager(canvas);
        this.toolManager = new ToolManager(document.getElementById(toolbarId)!);
        this.selection = new SelectionManager();
        this.factory = new ShapeFactory();

        // UI panels
        this.hierarchy = new HierarchyPanel(document.getElementById(hierarchyId)!);
        this.inspector = new InspectorPanel(document.getElementById(inspectorId)!);
        this.contextMenu = new ContextMenu(document.getElementById(contextMenuId)!);
        this.exporter = new Exporter(
            document.getElementById(outputId) as HTMLPreElement,
            document.getElementById(exportBtnId) as HTMLButtonElement,
            this.shapes
        );

        this.gizmo = new TransformGizmo(canvas);

        // Render loop
        this.loop = new RenderLoop(ctx, this.shapes, this.selection, this.gizmo);

        // Initialize everything
        this.init();
    }

    init() {
        this.toolManager.init();

        // Canvas click → create or select shapes
        this.canvasManager.onClick(mouse => {
            // Create new shape
            const tool = this.toolManager.currentTool;
            if (tool) {
                const shape = this.factory.create(tool, mouse.x, mouse.y);
                this.shapes.push(shape);
                this.selection.select(shape);
                this.refresh();
                this.toolManager.currentTool = null;
                return;
            }

            // Select existing shape
            const hit = this.shapes.find(s => s.hitTest(mouse));
            if (hit) {
                this.selection.select(hit);
                this.refresh();
            }
        });

        setTimeout(() => this.canvasManager.resize(), 0);

        // Context menu actions
        this.contextMenu.onAction((action, index) => {
            if (action === "delete") {
                this.shapes.splice(index, 1);
            }
            if (action === "rename") {
                const shape = this.shapes[index];
                const newName = prompt("Rename:", shape.name);
                if (newName) shape.name = newName;
            }
            this.refresh();
        });

        this.exporter.init();

        // Start render loop
        this.loop.start(document.getElementById("gridSizeSlider") as HTMLInputElement);

        this.canvasManager.onMouseDown((mouse) => {
            if (this.selection.selected) {
                const used = this.gizmo.onMouseDown(mouse, this.selection.selected);
                if (used) return;
            }
        });

        this.canvasManager.onMouseMove(mouse => {
            if (this.selection.selected) {
                this.gizmo.onMouseMove(mouse, this.selection.selected);
            }
        });

        this.canvasManager.onMouseUp(() => this.gizmo.onMouseUp());

        // Initial UI
        this.refresh();
    }

    refresh() {
        this.hierarchy.render(
            this.shapes,
            this.selection.selected,
            shape => {
                this.selection.select(shape);
                this.refresh();
            },
            (from, to) => {
                const item = this.shapes.splice(from, 1)[0];
                this.shapes.splice(to, 0, item);
                this.refresh();
            },
            (x, y, shape, index) => this.contextMenu.show(x, y, index)
        );

        this.inspector.render(this.selection.selected);
    }
}


document.addEventListener("DOMContentLoaded", () => {
    new ShapeEditor(
        "shapeEditorCanvas", 
        "shapeTypeContainer", 
        "shapeInspector", 
        "shapeHierarchyPanel", 
        "shapeEditorExportOutput", 
        "exportButton", 
        "layerContextMenu"
    );
});
