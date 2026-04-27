import { WindowManager } from "./windows/WindowManager";
import { ShapeEditorWindow } from "./windows/ShapeEditorWindow";
import { PrefabGeneratorWindow } from "./windows/PrefabGeneratorWindow";
import { ProjectWindow } from "./windows/ProjectWindow";
import { ConsoleWindow } from "./windows/ConsoleWindow";
import { Debug } from "./diagnostics/Debug";

export class EditorBootstrapper {
    private windowManager!: WindowManager;

    constructor() {}

    public start() {
        this.windowManager = new WindowManager();

        // Initialize editor tools
        new ShapeEditorWindow(
            "shapeEditorCanvas",
            "shapeTypeContainer",
            "shapeInspector",
            "shapeHierarchyPanel",
            "shapeEditorExportOutput",
            "exportButton",
            "layerContextMenu"
        );
        new PrefabGeneratorWindow(
            "prefabContainer",
            "componentSelect",
            "className",
            "generateButton",
            "downloadButton",
            "componentList",
            "output"
        );
        new ProjectWindow("projectTree");
        new ConsoleWindow("consoleOutput");

        Debug.log("Editor initialized");
    }
}
