import { ShapeTypes } from "../ShapeEditor.js";
export class ToolManager {
    constructor(toolbar) {
        this.toolbar = toolbar;
        this.currentTool = null;
    }
    init() {
        Object.values(ShapeTypes).forEach(type => {
            const button = document.createElement("button");
            button.textContent = type;
            button.className = "menuSideBarItem";
            button.onclick = () => {
                // Update internal state
                this.currentTool = type;
                // Update UI
                this.toolbar.querySelectorAll("button")
                    .forEach(b => b.classList.remove("active"));
                button.classList.add("active");
            };
            this.toolbar.appendChild(button);
        });
    }
}
