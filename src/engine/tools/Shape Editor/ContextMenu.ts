export class ContextMenu {
    constructor(private menu: HTMLElement) {}

    show(x: number, y: number, layerId: string) {
        this.menu.style.display = "block";
        this.menu.style.left = x + "px";
        this.menu.style.top = y + "px";
        this.menu.dataset.layerId = layerId;
    }

    hide() {
        this.menu.style.display = "none";
    }

    onAction(handler: (action: string, layerId: string) => void) {
        // Prevent clicks inside the menu from closing it
        this.menu.addEventListener("click", e => {
            e.stopPropagation();

            const target = e.target as HTMLElement;
            const action = target.dataset.action;
            if (!action) return;

            const layerId = this.menu.dataset.layerId!;
            handler(action, layerId);
            this.hide();
        });

        // Clicking anywhere else closes the menu
        document.addEventListener("click", () => this.hide());
    }
}
