export class ContextMenu {
    constructor(private menu: HTMLElement) {}

    show(
        x: number,
        y: number,
        layerId: string,
        selectionCount: number,
        isGroup: boolean
    ) {
        this.menu.style.display = "block";
        this.menu.style.left = x + "px";
        this.menu.style.top = y + "px";
        this.menu.dataset.layerId = layerId;

        // --- Enable/disable menu items based on selection ---
        const items = this.menu.querySelectorAll("[data-action]");

        items.forEach(item => {
            const el = item as HTMLElement;
            const action = el.dataset.action;

            // Default: enabled
            el.classList.remove("disabled");

            // Disable "group" unless 2+ layers selected
            if (action === "group" && selectionCount < 2) {
                el.classList.add("disabled");
            }

            // Disable "ungroup" unless exactly 1 selected AND it's a group
            if (action === "ungroup") {
                if (selectionCount !== 1 || !isGroup) {
                    el.classList.add("disabled");
                }
            }
        });
    }

    hide() {
        this.menu.style.display = "none";
    }

    onAction(handler: (action: string, layerId: string) => void) {
        this.menu.addEventListener("click", e => {
            e.stopPropagation();

            const target = e.target as HTMLElement;
            const action = target.dataset.action;
            if (!action) return;

            // Prevent clicking disabled items
            if (target.classList.contains("disabled")) return;

            const layerId = this.menu.dataset.layerId!;
            handler(action, layerId);
            this.hide();
        });

        document.addEventListener("click", () => this.hide());
    }
}
