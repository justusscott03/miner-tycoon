import { BaseLayer, Bounds } from "./BaseLayer.js";

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

    getBounds(): Bounds {
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

    // ⭐ FIXED: store each child's original bounds
    freezeLocalGeometry() {
        return this.children.map(child => ({
            child,
            frozen: child.freezeLocalGeometry(),
            childBounds: child.getBounds() // ← original bounds snapshot
        }));
    }

    // ⭐ FIXED: use frozen childBounds instead of live getBounds()
    scaleFromBounds(oldB: Bounds, newB: Bounds, frozenLocal: any) {
        const sx = (newB.right - newB.left) / (oldB.right - oldB.left);
        const sy = (newB.bottom - newB.top) / (oldB.bottom - oldB.top);

        frozenLocal.forEach((entry: { child: BaseLayer; frozen: any; childBounds: Bounds }) => {
            const child = entry.child;
            const frozen = entry.frozen;
            const childOld = entry.childBounds; // ← use frozen bounds

            const newChild: Bounds = {
                left:   newB.left + (childOld.left   - oldB.left) * sx,
                top:    newB.top  + (childOld.top    - oldB.top)  * sy,
                right:  newB.left + (childOld.right  - oldB.left) * sx,
                bottom: newB.top  + (childOld.bottom - oldB.top)  * sy
            };

            child.scaleFromBounds(childOld, newChild, frozen);
        });
    }
}
