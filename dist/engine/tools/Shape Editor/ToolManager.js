import { ShapeTypes } from "../ShapeEditor.js";
export class ToolManager {
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
        Object.values(ShapeTypes).forEach(type => {
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
