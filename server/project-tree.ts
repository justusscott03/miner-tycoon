import { Router } from "express";
import fs from "fs";
import path from "path";
console.log(">>> PROJECT TREE ROUTE LOADED <<<");

const router = Router();

interface ProjectNode {
    type: "folder" | "file";
    name: string;
    extension?: string;
    baseName?: string;
    children?: ProjectNode[];
}

function readFolder(folderPath: string): ProjectNode[] {
    const items = fs.readdirSync(folderPath, { withFileTypes: true });

    return items.map(item => {
        const fullPath = path.join(folderPath, item.name);

        if (item.isDirectory()) {
            return {
                type: "folder",
                name: item.name,
                children: readFolder(fullPath)
            };
        }

        const ext = path.extname(item.name).replace(".", "");
        return {
            type: "file",
            name: item.name,
            extension: ext,
            baseName: path.basename(item.name, path.extname(item.name))
        };
    });
}

router.get("/project-tree", (req, res) => {
    const rootPath = path.join(process.cwd(), "src/game");
    const tree = {
        root: "Game",
        children: readFolder(rootPath)
    };
    res.json(tree);
});

export default router;
