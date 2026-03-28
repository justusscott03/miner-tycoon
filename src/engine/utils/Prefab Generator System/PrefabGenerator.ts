import { ComponentRegistry } from "../../config/ComponentRegistry.js";
import { ImportMap } from "../../config/ImportMap.js";
import { ComponentDefinition } from "../../core/ECS/main/Component.js";
import { PathHelpers } from "../../helpers/PathHelpers.js";
import { ParamUI } from "./ParamUI.js";

const prefabOutputPath = "src/game/prefabs/";

// ----------------------------
// TYPES
// ----------------------------

type ComponentInstance = {
    type: string;
    definition: ComponentDefinition<any>;
    values: Record<string, ParamUI<any>>;
};

type PrefabState = {
    className: string;
    components: ComponentInstance[];
};

// ----------------------------
// PREFAB GENERATOR CLASS
// ----------------------------

export class PrefabGenerator {
    state: PrefabState = { className: "", components: [] };
    container: HTMLElement;
    select: HTMLSelectElement;
    classNameInput: HTMLInputElement;

    constructor(
        containerId: string,
        selectId: string,
        classNameId: string,
        generateBtnId: string,
        downloadBtnId: string,
        componentListId: string,
        outputId: string
    ) {
        // DOM elements
        this.container = document.getElementById(containerId)!;
        this.select = document.getElementById(selectId) as HTMLSelectElement;
        if (!this.select) throw new Error("componentSelect element missing!");
        this.classNameInput = document.getElementById(classNameId) as HTMLInputElement;

        const generateBtn = document.getElementById(generateBtnId)!;
        const downloadBtn = document.getElementById(downloadBtnId)!;
        const componentList = document.getElementById(componentListId)!;
        const output = document.getElementById(outputId) as HTMLPreElement;

        // Initialize class name input
        this.classNameInput.oninput = (e) => {
            this.state.className = (e.target as HTMLInputElement).value;
        };

        // Populate component select
        Object.keys(ComponentRegistry).forEach((name) => {
            const option = document.createElement("option");
            option.value = name;
            option.textContent = name;
            this.select.appendChild(option);
        });

        // Add component button
        document.getElementById("addComponentButton")?.addEventListener("click", () => this.addComponent(componentList));

        // Generate code button
        generateBtn.addEventListener("click", () => {
            const code = this.generatePrefabCode();
            output.textContent = code;
        });

        // Download prefab file
        downloadBtn.addEventListener("click", () => {
            const code = this.generatePrefabCode();
            this.downloadFile(`${this.state.className || "Prefab"}.ts`, code);
        });
    }

    addComponent(container: HTMLElement) {
        const type = this.select.value;
        const definition = ComponentRegistry[type];
        if (!definition) return;

        // Initialize values from UI defaults
        const values: Record<string, ParamUI<any>> = {};
        for (const [key, ui] of Object.entries(definition.params)) {
            values[key] = ui.clone(); // 🔥 THIS FIXES EVERYTHING
        }

        this.state.components.push({ type, definition, values });
        this.renderComponents(container);
    }

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

            // Render each param UI
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

    generatePrefabCode(): string {
        const imports = new Set<string>();
        imports.add(this.buildImport("Prefab"));

        let body = "";

        // First pass: collect imports
        this.state.components.forEach((comp) => {
            imports.add(this.buildImport(comp.type, comp.definition.import));

            Object.values(comp.values).forEach(ui => {
                ui.getImports().forEach(symbol => {
                    imports.add(this.buildImport(symbol));
                });
            });
        });

        // Second pass: build body
        this.state.components.forEach((comp, i) => {
            const varName = comp.type.toLowerCase() + i;

            body += `        const ${varName} = this.AddComponent(${comp.type});\n`;

            const paramValues = Object.keys(comp.definition.params)
                .map(key => comp.values[key].toCode())
                .join(", ");

            body += `        ${varName}.initialize(${paramValues});\n\n`;
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

    downloadFile(filename: string, content: string) {
        const blob = new Blob([content], { type: "text/typescript" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        a.click();

        URL.revokeObjectURL(url);
    }

    private buildImport(symbol: string, overridePath?: string): string {
        const absolutePath = overridePath ?? ImportMap[symbol];

        if (!absolutePath) {
            console.error("ImportMap:", ImportMap);
            throw new Error(`No import path found for symbol: ${symbol}`);
        }

        const finalPath = PathHelpers.isExternalPath(absolutePath)
            ? absolutePath
            : PathHelpers.getRelativeImportPath(prefabOutputPath, absolutePath);

        return `import { ${symbol} } from "${finalPath}";`;
    }
}

// ----------------------------
// USAGE
// ----------------------------

document.addEventListener("DOMContentLoaded", () => {
    new PrefabGenerator(
        "prefabContainer",
        "componentSelect",
        "className",
        "generateButton",
        "downloadButton",
        "componentList",
        "output"
    );
});