export class PathHelpers {
    static getRelativeImportPath(fromFolder: string, toPath: string): string {
        const fromParts = fromFolder.split("/").filter(Boolean);
        const toParts = toPath.split("/").filter(Boolean);

        // Remove common prefix
        while (fromParts.length && toParts.length && fromParts[0] === toParts[0]) {
            fromParts.shift();
            toParts.shift();
        }

        // Go up for each remaining folder in fromParts
        const ups = fromParts.map(() => "..");
        return [...ups, ...toParts].join("/");
    }

    static isExternalPath(path: string): boolean {
        return /^[a-z]+:\/\//i.test(path) || path.startsWith("//");
    }
}