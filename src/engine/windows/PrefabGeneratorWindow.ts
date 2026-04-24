import { ComponentRegistry } from "../config/ComponentRegistry";
import { ImportMap } from "../config/ImportMap";
import { ComponentDefinition } from "../core/ECS/main/Component";
import { PathHelpers } from "../helpers/PathHelpers";
import { ParamUI } from "../ui/UIBindings/ParamUI";

const prefabOutputPath = "src/game/prefabs/";

// ----------------------------
// TYPES
// ----------------------------

type ComponentInstance = {
    type: string;
    definition: ComponentDefinition<any> | null; // null = script component
    values: Record<string, ParamUI<any>>;
};

type PrefabState = {
    className: string;
    components: ComponentInstance[];
};

// ----------------------------
// PREFAB GENERATOR CLASS
// ----------------------------

export class PrefabGeneratorWindow {
    state: PrefabState = { className: "", components: [] };
    container: HTMLElement;
    select: HTMLSelectElement;
    classNameInput: HTMLInputElement;

    outputDirHandle: FileSystemDirectoryHandle | null = null;

    constructor(
        containerId: string,
        selectId: string,
        classNameId: string,
        generateBtnId: string,
        downloadBtnId: string,
        componentListId: string,
        outputId: string
    ) {
        this.container = document.getElementById(containerId)!;
        this.select = document.getElementById(selectId) as HTMLSelectElement;
        this.classNameInput = document.getElementById(classNameId) as HTMLInputElement;

        const generateBtn = document.getElementById(generateBtnId)!;
        const downloadBtn = document.getElementById(downloadBtnId)!;
        const componentList = document.getElementById(componentListId)!;
        const output = document.getElementById(outputId) as HTMLPreElement;

        // Class name input
        this.classNameInput.oninput = (e) => {
            this.state.className = (e.target as HTMLInputElement).value;
        };

        // Populate dropdown
        Object.keys(ComponentRegistry).forEach((name) => {
            const option = document.createElement("option");
            option.value = name;
            option.textContent = name;
            this.select.appendChild(option);
        });

        // Add component
        document.getElementById("addComponentButton")?.addEventListener("click", () =>
            this.addComponent(componentList)
        );

        // Generate code
        generateBtn.addEventListener("click", () => {
            const code = this.generatePrefabCode();
            output.textContent = code;
        });

        // Download file
        downloadBtn.addEventListener("click", async () => {
            const code = this.generatePrefabCode();
            const filename = `${this.state.className || "Prefab"}.ts`;
            await this.saveToDirectory(filename, code);
        });

        // Choose output directory
        const chooseDirBtn = document.getElementById("chooseOutputDir")!;
        chooseDirBtn.addEventListener("click", async () => {
            try {
                this.outputDirHandle = await (window as any).showDirectoryPicker();
            } catch {}
        });
    }

    // ----------------------------
    // ADD COMPONENT
    // ----------------------------

    addComponent(container: HTMLElement) {
        const type = this.select.value;
        const entry = ComponentRegistry[type];
        if (!entry) return;

        // SCRIPT COMPONENT (MonoBehavior)
        if (entry.type === "script") {
            this.state.components.push({
                type,
                definition: null,
                values: {}
            });
            this.renderComponents(container);
            return;
        }

        // DATA COMPONENT
        const definition = entry.def!;
        const values: Record<string, ParamUI<any>> = {};

        for (const key of Object.keys(definition.params)) {
            values[key] = definition.params[key].clone();
        }

        this.state.components.push({ type, definition, values });
        this.renderComponents(container);
    }

    // ----------------------------
    // RENDER COMPONENT UI
    // ----------------------------

    renderComponents(container: HTMLElement) {
        container.innerHTML = "";

        this.state.components.forEach((comp, index) => {
            const div = document.createElement("div");
            div.style.border = "1px solid #ccc";
            div.style.padding = "10px";
            div.style.marginBottom = "10px";

            const title = document.createElement("h4");
            title.textContent = comp.type;
            div.appendChild(title);

            // SCRIPT COMPONENT
            if (!comp.definition) {
                const note = document.createElement("p");
                note.textContent = "(Script component — no parameters)";
                div.appendChild(note);
            }

            // DATA COMPONENT
            else {
                for (const [paramName, uiInstance] of Object.entries(comp.values)) {
                    const label = document.createElement("label");
                    label.textContent = paramName;

                    const element = uiInstance.render((val: any) => {
                        uiInstance.value = val;
                    });

                    div.appendChild(label);
                    div.appendChild(element);
                    div.appendChild(document.createElement("br"));
                }
            }

            const removeBtn = document.createElement("button");
            removeBtn.textContent = "Remove";
            removeBtn.onclick = () => {
                this.state.components.splice(index, 1);
                this.renderComponents(container);
            };
            div.appendChild(removeBtn);

            container.appendChild(div);
        });
    }

    // ----------------------------
    // GENERATE PREFAB CODE
    // ----------------------------

    generatePrefabCode(): string {
        const imports = new Set<string>();
        imports.add(this.buildImport("Prefab"));

        let body = "";

        // Collect imports
        this.state.components.forEach((comp) => {
            // Script component
            if (!comp.definition) {
                imports.add(this.buildImport(comp.type));
                return;
            }

            // Data component
            imports.add(this.buildImport(comp.type));

            Object.values(comp.values).forEach((ui) => {
                ui.getImports().forEach((symbol) => {
                    imports.add(this.buildImport(symbol));
                });
            });
        });

        // Build body
        this.state.components.forEach((comp, i) => {
            const varName = comp.type.toLowerCase() + i;

            // SCRIPT COMPONENT
            if (!comp.definition) {
                body += `        this.AddComponent(${comp.type});\n\n`;
                return;
            }

            // DATA COMPONENT
            body += `        const ${varName} = this.AddComponent(${comp.type});\n`;

            const paramObject = Object.entries(comp.definition.params)
                .map(([key]) => `            ${key}: ${comp.values[key].toCode()}`)
                .join(",\n");

            body += `        ${varName}.initialize({\n${paramObject}\n        });\n\n`;
        });

        return `${[...imports].join("\n")}

export class ${this.state.className || "NewPrefab"} extends Prefab {
    constructor() {
        super();

${body}
    }
}
`;
    }

    // ----------------------------
    // SAVE FILE
    // ----------------------------

    async saveToDirectory(filename: string, content: string) {
        if (!this.outputDirHandle) {
            alert("Please choose an output directory first.");
            return;
        }

        const fileHandle = await this.outputDirHandle.getFileHandle(filename, { create: true });
        const writable = await fileHandle.createWritable();
        await writable.write(content);
        await writable.close();
    }

    // ----------------------------
    // IMPORT BUILDER
    // ----------------------------

    private buildImport(symbol: string, overridePath?: string): string {
        const absolutePath = overridePath ?? ImportMap[symbol];

        if (!absolutePath) {
            throw new Error(`No import path found for symbol: ${symbol}`);
        }

        const finalPath = PathHelpers.isExternalPath(absolutePath)
            ? absolutePath
            : PathHelpers.getRelativeImportPath(prefabOutputPath, absolutePath);

        return `import { ${symbol} } from "${finalPath}";`;
    }
}
