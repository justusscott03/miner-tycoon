import { ShapeTypes } from "../ShapeEditor.js";

export class ToolManager {
    currentTool: ShapeTypes | null = null;

    constructor(private toolbar: HTMLElement) {}

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
