export class WindowManager {
    private activeWindow: HTMLElement | null = null;
    private resizingWindow: HTMLElement | null = null;

    private dragOffsetX = 0;
    private dragOffsetY = 0;

    private resizeStartX = 0;
    private resizeStartY = 0;
    private resizeStartWidth = 0;
    private resizeStartHeight = 0;

    constructor() {
        this.initDragging();
        this.initResizing();
        this.initTabs();
        requestAnimationFrame(() => this.resizeShapeEditorCanvas());
    }

    private bringToFront(win: HTMLElement) {
        const windows = Array.from(document.querySelectorAll<HTMLElement>(".editor-window"));
        const maxZ = windows.reduce((max, el) => {
            const z = parseInt(el.style.zIndex || "0", 10);
            return Math.max(max, z);
        }, 0);

        win.style.zIndex = String(maxZ + 1);
    }

    // -----------------------------
    // DRAGGING
    // -----------------------------
    private initDragging() {
        document.querySelectorAll<HTMLElement>(".editor-window").forEach(win => {
            const handle = win.querySelector<HTMLElement>("[data-drag-handle]");
            if (!handle) return;

            handle.addEventListener("mousedown", e => {
                this.activeWindow = win;
                this.bringToFront(win);

                this.dragOffsetX = e.clientX - win.offsetLeft;
                this.dragOffsetY = e.clientY - win.offsetTop;

                document.body.style.userSelect = "none";
            });
        });

        document.addEventListener("mousemove", e => {
            if (this.activeWindow) {
                this.activeWindow.style.left = `${e.clientX - this.dragOffsetX}px`;
                this.activeWindow.style.top = `${e.clientY - this.dragOffsetY}px`;
            }

            if (this.resizingWindow) {
                const dx = e.clientX - this.resizeStartX;
                const dy = e.clientY - this.resizeStartY;

                this.resizingWindow.style.width = `${Math.max(200, this.resizeStartWidth + dx)}px`;
                this.resizingWindow.style.height = `${Math.max(120, this.resizeStartHeight + dy)}px`;

                if (this.resizingWindow.querySelector("#shapeEditorCanvas")) {
                    requestAnimationFrame(() => this.resizeShapeEditorCanvas());
                }
            }
        });

        document.addEventListener("mouseup", () => {
            this.activeWindow = null;
            this.resizingWindow = null;
            document.body.style.userSelect = "";
        });
    }

    // -----------------------------
    // RESIZING
    // -----------------------------
    private initResizing() {
        document.querySelectorAll<HTMLElement>(".editor-window").forEach(win => {
            const handle = win.querySelector<HTMLElement>("[data-resize-handle]");
            if (!handle) return;

            handle.addEventListener("mousedown", e => {
                e.stopPropagation();

                this.resizingWindow = win;
                this.bringToFront(win);

                this.resizeStartX = e.clientX;
                this.resizeStartY = e.clientY;
                this.resizeStartWidth = win.offsetWidth;
                this.resizeStartHeight = win.offsetHeight;

                document.body.style.userSelect = "none";
            });
        });
    }

    // -----------------------------
    // TABS
    // -----------------------------
    private initTabs() {
        document.querySelectorAll<HTMLElement>(".editor-window").forEach(win => {
            const tabBar = win.querySelector<HTMLElement>("[data-tab-bar]");
            if (!tabBar) return;

            const tabs = tabBar.querySelectorAll<HTMLButtonElement>(".window-tab");
            const contents = win.querySelectorAll<HTMLElement>(".window-tab-content");

            tabs.forEach(tab => {
                tab.addEventListener("click", () => {
                    const targetId = tab.dataset.tabTarget;
                    if (!targetId) return;

                    tabs.forEach(t => t.classList.remove("active"));
                    contents.forEach(c => c.classList.remove("active"));

                    tab.classList.add("active");

                    const targetContent = win.querySelector<HTMLElement>(
                        `.window-tab-content[data-tab-id="${targetId}"]`
                    );
                    if (targetContent) {
                        targetContent.classList.add("active");
                    }

                    if (targetId === "tab-shape-editor") {
                        requestAnimationFrame(() => this.resizeShapeEditorCanvas());
                    }
                });
            });
        });
    }

    // -----------------------------
    // CANVAS DPI FIX
    // -----------------------------
    private resizeShapeEditorCanvas() {
        const canvas = document.getElementById("shapeEditorCanvas") as HTMLCanvasElement | null;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();

        canvas.width = rect.width * window.devicePixelRatio;
        canvas.height = rect.height * window.devicePixelRatio;

        const ctx = canvas.getContext("2d");
        if (ctx) {
            ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
        }
    }
}
