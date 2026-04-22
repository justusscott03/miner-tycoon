declare const require: any;

import { ComponentDefinition } from "./main/Component";
import { MonoBehavior } from "./main/MonoBehavior";
import { ImportMap } from "../../config/ImportMap";

export interface ComponentRegistryEntry {
    type: "data" | "script";
    name: string;
    def?: ComponentDefinition<any>;
    ctor?: any;
    importPath: string;
}

export const ComponentRegistry: Record<string, ComponentRegistryEntry> = {};

export function autoScanComponents() {
    const contexts = [
        require.context("../../core/ECS/components", true, /\.ts$/),
        require.context("../../../game/components", true, /\.ts$/)
    ];

    for (const context of contexts) {
        context.keys().forEach((key: string) => {
            const module = context(key);

            // Webpack gives us the actual file path here
            const resolvedPath = context.resolve(key);

            for (const exportName in module) {
                const value = module[exportName];

                // -----------------------------
                // DATA COMPONENT (ComponentDefinition)
                // -----------------------------
                if (
                    value &&
                    typeof value === "object" &&
                    "params" in value
                ) {
                    const name = exportName.replace("Def", "");

                    // Remove extension from resolvedPath
                    const cleanedPath = resolvedPath.replace(/\.(ts|js)$/, "");

                    ComponentRegistry[name] = {
                        type: "data",
                        name,
                        def: value,
                        importPath: cleanedPath
                    };

                    ImportMap[name] = cleanedPath;

                    continue;
                }

                // -----------------------------
                // SCRIPT COMPONENT (MonoBehavior)
                // -----------------------------
                if (
                    typeof value === "function" &&
                    value.prototype instanceof MonoBehavior
                ) {
                    const cleanedPath = resolvedPath.replace(/\.(ts|js)$/, "");

                    ComponentRegistry[exportName] = {
                        type: "script",
                        name: exportName,
                        ctor: value,
                        importPath: cleanedPath
                    };

                    ImportMap[exportName] = cleanedPath;
                }
            }
        });
    }

    return ComponentRegistry;
}
