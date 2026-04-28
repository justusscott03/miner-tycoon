import { Debug } from "../diagnostics/Debug";

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

    private engineIconsDirectory: string = "/engine/icons"

    // -----------------------------
    // ICON MAP
    // -----------------------------
    private iconMap: Record<string, string> = {
        folder: `${this.engineIconsDirectory}/folder.png`,
        file: `${this.engineIconsDirectory}/file.png`,

        ts: `${this.engineIconsDirectory}/Icon_TypeScript_File.png`,
        jpg: `${this.engineIconsDirectory}/image.png`,
        png: `${this.engineIconsDirectory}/image.png`,

        wav: `${this.engineIconsDirectory}/Icon_AudioWAV_File.png`,
        mp3: `${this.engineIconsDirectory}/Icon_AudioMP3_File.png`,

        prefab: `${this.engineIconsDirectory}/prefab.png`
    };

    constructor(containerId: string) {
        const el = document.getElementById(containerId);
        if (!el) throw new Error("ProjectWindow container not found");
        this.container = el;

        this.load();
    }

    async load() {
        const res = await fetch("/project-tree");
        const data = await res.json();
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

        // Icon
        const icon = document.createElement("img");
        icon.classList.add("icon");
        icon.src = this.getIconForNode(node);

        // Text
        const text = document.createElement("span");
        text.textContent = node.baseName ?? node.name;

        label.appendChild(icon);
        label.appendChild(text);

        // Folder
        if (node.type === "folder") {
            wrapper.classList.add("folder");

            const childrenContainer = document.createElement("div");
            childrenContainer.classList.add("project-children", "collapsed");

            node.children?.forEach(child => {
                childrenContainer.appendChild(this.createNode(child));
            });

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

            label.addEventListener("click", (e) => {
                e.stopPropagation();
                this.select(label);
                Debug.log(`Selected file: ${node.name}`);
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

    // -----------------------------
    // ICON LOGIC
    // -----------------------------
    private getIconForNode(node: ProjectNode): string {
        // Folder
        if (node.type === "folder") {
            return this.iconMap.folder;
        }

        // Prefab special case: *.prefab.ts
        if (node.extension === "ts" && node.baseName?.endsWith(".prefab")) {
            return this.iconMap.prefab;
        }

        // Normal extension-based icons
        if (node.extension && this.iconMap[node.extension]) {
            return this.iconMap[node.extension];
        }

        // Fallback
        return this.iconMap.file;
    }

    public refresh() {
        this.load();
    }
}
