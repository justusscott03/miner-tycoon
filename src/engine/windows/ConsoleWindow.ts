import { Debug, DebugMessage } from "../diagnostics/Debug";

export class ConsoleWindow {
    private container: HTMLElement;

    constructor(containerId: string) {
        const el = document.getElementById(containerId);
        if (!el) throw new Error("ConsoleWindow container not found");
        this.container = el;

        Debug.onMessage(msg => this.addMessage(msg));
    }

    private addMessage(msg: DebugMessage) {
        const row = document.createElement("div");
        row.classList.add("console-row", msg.type);

        const time = msg.timestamp.toLocaleTimeString();
        row.innerHTML = `<span class="time">[${time}]</span> ${msg.text}`;

        this.container.appendChild(row);

        // Auto-scroll
        this.container.scrollTop = this.container.scrollHeight;
    }

    clear() {
        this.container.innerHTML = "";
    }
}
