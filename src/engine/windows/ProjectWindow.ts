export interface ProjectNode {
    type: "folder" | "file";
    name: string;
    extension?: string;
    baseName?: string;
    children?: ProjectNode[];
}

export class ProjectWindow {
    private container: HTMLElement;
    private selected: HTMLElement | null = null;

    constructor(containerId: string) {
        const el = document.getElementById(containerId);
        if (!el) throw new Error("ProjectWindow container not found");
        this.container = el;

        this.load();
    }

    async load() {
        const res = await fetch("/project-tree");
        const data = await res.json();
        console.log(data);
        this.render(data);
    }

    render(tree: { root: string; children: ProjectNode[] }) {
        this.container.innerHTML = "";

        const rootLabel = document.createElement("div");
        rootLabel.classList.add("project-root");
        rootLabel.textContent = tree.root;
        this.container.appendChild(rootLabel);

        tree.children.forEach(child => {
            this.container.appendChild(this.createNode(child));
        });
    }

    private createNode(node: ProjectNode): HTMLElement {
        const wrapper = document.createElement("div");
        wrapper.classList.add("project-node");

        // Label row
        const label = document.createElement("div");
        label.classList.add("project-label");

        // Icon + name
        const icon = document.createElement("span");
        icon.classList.add("icon");

        const text = document.createElement("span");
        text.textContent = node.baseName ?? node.name;

        label.appendChild(icon);
        label.appendChild(text);

        // Folder
        if (node.type === "folder") {
            wrapper.classList.add("folder");
            icon.textContent = "📁";

            const childrenContainer = document.createElement("div");
            childrenContainer.classList.add("project-children", "collapsed");

            // Recursively add children
            node.children?.forEach(child => {
                childrenContainer.appendChild(this.createNode(child));
            });

            // Expand/collapse
            label.addEventListener("click", (e) => {
                e.stopPropagation();
                childrenContainer.classList.toggle("collapsed");
            });

            wrapper.appendChild(label);
            wrapper.appendChild(childrenContainer);
        }

        // File
        if (node.type === "file") {
            wrapper.classList.add("file");
            icon.textContent = this.getFileIcon(node.extension);

            label.addEventListener("click", (e) => {
                e.stopPropagation();
                this.select(label);
                console.log("Selected file:", node.name);
            });

            wrapper.appendChild(label);
        }

        return wrapper;
    }

    private select(el: HTMLElement) {
        if (this.selected) {
            this.selected.classList.remove("selected");
        }
        this.selected = el;
        el.classList.add("selected");
    }

    private getFileIcon(ext?: string): string {
        switch (ext) {
            case "json": return "📝";
            case "png":
            case "jpg":
            case "jpeg": return "🖼️";
            case "ts":
            case "js": return "📄";
            default: return "📄";
        }
    }

    public refresh() {
        this.load();
    }
}
