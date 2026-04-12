import { BaseLayer } from "./BaseLayer.js";

export class GroupLayer extends BaseLayer {
    children: BaseLayer[] = [];
    collapsed = false;

    constructor(name = "Group") {
        super(name);
    }

    isGroup() { return true; }

    add(child: BaseLayer) {
        child.parent = this;
        this.children.push(child);
    }

    remove(child: BaseLayer) {
        const i = this.children.indexOf(child);
        if (i !== -1) {
            this.children.splice(i, 1);
            child.parent = null;
        }
    }

    getBounds() {
        if (this.children.length === 0) {
            return { left: 0, top: 0, right: 0, bottom: 0 };
        }

        let left = Infinity, top = Infinity, right = -Infinity, bottom = -Infinity;

        for (const child of this.children) {
            const b = child.getBounds();
            left = Math.min(left, b.left);
            top = Math.min(top, b.top);
            right = Math.max(right, b.right);
            bottom = Math.max(bottom, b.bottom);
        }

        return { left, top, right, bottom };
    }

}
