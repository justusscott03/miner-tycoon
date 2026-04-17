import { ShapeTypes } from "../ShapeEditor";

export type ToolType = "select" | ShapeTypes;

export class ToolManager {
    currentTool: ToolType = "select";
    onToolChange?: (tool: ToolType) => void;

    constructor(private toolbar: HTMLElement) {}

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

    private setTool(tool: ToolType, button: HTMLButtonElement) {
        this.currentTool = tool;
        this.updateUI(button);
        this.onToolChange?.(tool);
    }

    private updateUI(activeButton: HTMLButtonElement) {
        this.toolbar.querySelectorAll("button")
            .forEach(b => b.classList.remove("active"));

        activeButton.classList.add("active");
    }

    private initShortcuts() {
        window.addEventListener("keydown", e => {
            if (e.key === "v") {
                const btn = this.toolbar.querySelector("button:nth-child(1)") as HTMLButtonElement;
                this.setTool("select", btn);
            }
            // Add more shortcuts if you want
        });
    }
}
