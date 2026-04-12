export class ContextMenu {
    constructor(menu) {
        this.menu = menu;
    }
    show(x, y, layerId) {
        this.menu.style.display = "block";
        this.menu.style.left = x + "px";
        this.menu.style.top = y + "px";
        this.menu.dataset.layerId = layerId;
    }
    hide() {
        this.menu.style.display = "none";
    }
    onAction(handler) {
        // Prevent clicks inside the menu from closing it
        this.menu.addEventListener("click", e => {
            e.stopPropagation();
            const target = e.target;
            const action = target.dataset.action;
            if (!action)
                return;
            const layerId = this.menu.dataset.layerId;
            handler(action, layerId);
            this.hide();
        });
        // Clicking anywhere else closes the menu
        document.addEventListener("click", () => this.hide());
    }
}
