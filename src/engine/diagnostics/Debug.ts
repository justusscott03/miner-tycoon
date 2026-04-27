// Debug.ts
export type DebugMessageType = "log" | "warn" | "error";

export interface DebugMessage {
    type: DebugMessageType;
    text: string;
    timestamp: Date;
}

export class Debug {
    private static listeners: ((msg: DebugMessage) => void)[] = [];

    static onMessage(listener: (msg: DebugMessage) => void) {
        this.listeners.push(listener);
    }

    private static emit(type: DebugMessageType, text: string) {
        const msg: DebugMessage = {
            type,
            text,
            timestamp: new Date()
        };

        for (const listener of this.listeners) {
            listener(msg);
        }

        // Optional: still log to browser console
        if (type === "log") console.log(text);
        if (type === "warn") console.warn(text);
        if (type === "error") console.error(text);
    }

    static log(text: string) {
        this.emit("log", text);
    }

    static warn(text: string) {
        this.emit("warn", text);
    }

    static error(text: string) {
        this.emit("error", text);
    }
}
