export class ContextMenu {
    constructor(private menu: HTMLElement) {}

    show(x: number, y: number, index: number) {
        this.menu.style.display = "block";
        this.menu.style.left = x + "px";
        this.menu.style.top = y + "px";
        this.menu.dataset.index = index.toString();
    }

    hide() {
        this.menu.style.display = "none";
    }

    onAction(handler: (action: string, index: number) => void) {
        this.menu.addEventListener("click", e => {
            const target = e.target as HTMLElement;
            const action = target.dataset.action!;
            const index = Number(this.menu.dataset.index);
            handler(action, index);
            this.hide();
        });

        document.addEventListener("click", () => this.hide());
    }
}
