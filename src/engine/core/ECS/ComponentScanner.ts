// src/engine/config/AutoComponentRegistry.ts

import { ComponentDefinition } from "./main/Component";

type AnyComponentDefinition = ComponentDefinition<any>;

// export function autoScanComponents(): Record<string, AnyComponentDefinition> {
//     const registry: Record<string, AnyComponentDefinition> = {};

//     // Webpack magic: import all .ts files in components folder
//     const context = require.context(
//         "./components",
//         true,
//         /\.ts$/
//     );

//     context.keys().forEach((key: string) => {
//         const module = context(key);

//         for (const exportName in module) {
//             const value = module[exportName];

//             // Detect ComponentDefinition objects
//             if (value && typeof value === "object" && "params" in value && "import" in value) {
//                 const name = exportName.replace("Def", "");
//                 registry[name] = value;
//             }
//         }
//     });

//     return registry;
// }
