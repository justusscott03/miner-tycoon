export class ContextMenu {
    constructor(menu) {
        this.menu = menu;
    }
    show(x, y, index) {
        this.menu.style.display = "block";
        this.menu.style.left = x + "px";
        this.menu.style.top = y + "px";
        this.menu.dataset.index = index.toString();
    }
    hide() {
        this.menu.style.display = "none";
    }
    onAction(handler) {
        this.menu.addEventListener("click", e => {
            const target = e.target;
            const action = target.dataset.action;
            const index = Number(this.menu.dataset.index);
            handler(action, index);
            this.hide();
        });
        document.addEventListener("click", () => this.hide());
    }
}
