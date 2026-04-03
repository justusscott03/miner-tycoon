import { ParamUI } from "./ParamUI.js";
export class ListUI extends ParamUI {
    constructor(defaultItems = []) {
        super(defaultItems);
    }
    // Subclasses override this to define how new items are created
    createDefaultItem() {
        if (this.value.length > 0) {
            return this.value[0].clone();
        }
        throw new Error("ListUI: No default item available. Override createDefaultItem().");
    }
    clone() {
        return new ListUI(this.value.map(item => item.clone()));
    }
    render(onChange) {
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
    toCode() {
        const itemsCode = this.value.map(item => item.toCode()).join(", ");
        return `[${itemsCode}]`;
    }
}
