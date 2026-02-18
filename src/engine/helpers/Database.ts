export class Database {
    private name: string;
    private version: number;
    private db: IDBDatabase | null = null;

    constructor(name: string, version: number = 1) {
        this.name = name;
        this.version = version;
    }

    private open(): Promise<IDBDatabase> {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.name, this.version);

            request.onupgradeneeded = (event: any) => {
                const db = event.target.result;
                if (!db.objectStoreNames.contains("worlds")) {
                    db.createObjectStore("worlds", { keyPath: "id" });
                }
            };

            request.onsuccess = () => resolve(request.result);
            request.onerror = (e) => reject(e);
        });
    }

    private async getStore(mode: IDBTransactionMode = "readonly") {
        if (!this.db) {
            this.db = await this.open();
        }
        const tx = this.db.transaction("worlds", mode);
        const store = tx.objectStore("worlds");
        return { tx, store };
    }

    async load(id?: string): Promise<any> {
        const { store } = await this.getStore("readonly");

        return new Promise((resolve) => {
            const req = id ? store.get(id) : store.getAll();

            req.onsuccess = () => resolve(req.result);
            req.onerror = () => resolve(null);
        });
    }

    async save(id: string, data: any): Promise<any> {
        const { store } = await this.getStore("readwrite");

        return new Promise((resolve, reject) => {
            const req = store.put({ id, data });

            req.onsuccess = () => resolve(req.result);
            req.onerror = (e) => reject(e);
        });
    }

    async delete(id: string): Promise<any> {
        const { store } = await this.getStore("readwrite");

        return new Promise((resolve, reject) => {
            const req = store.delete(id);

            req.onsuccess = () => resolve(req.result);
            req.onerror = (e) => reject(e);
        });
    }
}
