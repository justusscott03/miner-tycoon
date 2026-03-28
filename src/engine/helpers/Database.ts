export class Database<T extends { id: string }> {
    private name: string;
    private version: number;
    private db: IDBDatabase | null = null;

    constructor(name: string, version: number = 1) {
        this.name = name;
        this.version = version;
    }

    // -------------------------
    // OPEN DATABASE
    // -------------------------
    private open(): Promise<IDBDatabase> {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.name, this.version);

            request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
                const db = (event.target as IDBOpenDBRequest).result;
                if (!db.objectStoreNames.contains("worlds")) {
                    db.createObjectStore("worlds", { keyPath: "id" });
                }
            };

            request.onsuccess = () => resolve(request.result);
            request.onerror = (e) => reject(request.error);
        });
    }

    // -------------------------
    // GET TRANSACTION & STORE
    // -------------------------
    private async getStore(mode: IDBTransactionMode = "readonly"): Promise<{ tx: IDBTransaction; store: IDBObjectStore }> {
        if (!this.db) {
            this.db = await this.open();
        }
        const tx = this.db.transaction("worlds", mode);
        const store = tx.objectStore("worlds");
        return { tx, store };
    }

    // -------------------------
    // LOAD DATA
    // -------------------------
    async load(id?: string): Promise<T | T[] | null> {
        const { store } = await this.getStore("readonly");

        if (id) {
            // request for a single item
            const request: IDBRequest<T | undefined> = store.get(id);
            return new Promise((resolve, reject) => {
                request.onsuccess = () => resolve(request.result ?? null);
                request.onerror = () => reject(request.error);
            });
        } else {
            // request for all items
            const request: IDBRequest<T[]> = store.getAll();
            return new Promise((resolve, reject) => {
                request.onsuccess = () => resolve(request.result ?? []);
                request.onerror = () => reject(request.error);
            });
        }
    }

    // -------------------------
    // SAVE DATA
    // -------------------------
    async save(data: T): Promise<T> {
        const { store } = await this.getStore("readwrite");

        return new Promise((resolve, reject) => {
            const request = store.put(data);

            request.onsuccess = () => resolve(data);
            request.onerror = () => reject(request.error);
        });
    }

    // -------------------------
    // DELETE DATA
    // -------------------------
    async delete(id: string): Promise<void> {
        const { store } = await this.getStore("readwrite");

        return new Promise((resolve, reject) => {
            const request = store.delete(id);

            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }
}