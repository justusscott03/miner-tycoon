import { autoScanComponents, ComponentRegistry as InternalRegistry } from "../core/ECS/ComponentScanner";

autoScanComponents();

export const ComponentRegistry = InternalRegistry;
