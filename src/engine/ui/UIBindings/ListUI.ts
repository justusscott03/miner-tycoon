import { ParamUI } from "./ParamUI";

export class ListUI<T extends ParamUI<any>> extends ParamUI<T[]> {
    constructor(defaultItems: T[] = []) {
        super(defaultItems);
    }

    // Subclasses override this to define how new items are created
    createDefaultItem(): T {
        if (this.value.length > 0) {
            return this.value[0].clone() as T;
        }
        throw new Error("ListUI: No default item available. Override createDefaultItem().");
    }

    clone(): ListUI<T> {
        return new ListUI(this.value.map(item => item.clone() as T));
    }

    render(onChange: (v: T[]) => void): HTMLElement {
        const container = document.createElement("div");

        const list = document.createElement("div");
        container.appendChild(list);

        const addButton = document.createElement("button");
        addButton.textContent = "Add";
        container.appendChild(addButton);

        const renderList = () => {
            list.innerHTML = "";
            this.value.forEach((item, index) => {
                const itemUI = item.render(v => {
                    this.value[index] = item;
                    onChange(this.value);
                });

                const removeButton = document.createElement("button");
                removeButton.textContent = "X";
                removeButton.onclick = () => {
                    this.value.splice(index, 1);
                    renderList();
                    onChange(this.value);
                };

                const row = document.createElement("div");
                row.classList.add("paramInput");
                row.appendChild(itemUI);
                row.appendChild(removeButton);
                list.appendChild(row);
            });
        };

        addButton.onclick = () => {
            const newItem = this.createDefaultItem();
            this.value.push(newItem);
            renderList();
            onChange(this.value);
        };

        renderList();
        return container;
    }

    toCode(): string {
        const itemsCode = this.value.map(item => item.toCode()).join(", ");
        return `[${itemsCode}]`;
    }
}
