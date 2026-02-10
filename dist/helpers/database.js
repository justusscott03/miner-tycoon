var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class Database {
    constructor(name, version = 1) {
        this.db = null;
        this.name = name;
        this.version = version;
    }
    open() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.name, this.version);
            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                if (!db.objectStoreNames.contains("worlds")) {
                    db.createObjectStore("worlds", { keyPath: "id" });
                }
            };
            request.onsuccess = () => resolve(request.result);
            request.onerror = (e) => reject(e);
        });
    }
    getStore() {
        return __awaiter(this, arguments, void 0, function* (mode = "readonly") {
            if (!this.db) {
                this.db = yield this.open();
            }
            const tx = this.db.transaction("worlds", mode);
            const store = tx.objectStore("worlds");
            return { tx, store };
        });
    }
    load(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { store } = yield this.getStore("readonly");
            return new Promise((resolve) => {
                const req = id ? store.get(id) : store.getAll();
                req.onsuccess = () => resolve(req.result);
                req.onerror = () => resolve(null);
            });
        });
    }
    save(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { store } = yield this.getStore("readwrite");
            return new Promise((resolve, reject) => {
                const req = store.put({ id, data });
                req.onsuccess = () => resolve(req.result);
                req.onerror = (e) => reject(e);
            });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { store } = yield this.getStore("readwrite");
            return new Promise((resolve, reject) => {
                const req = store.delete(id);
                req.onsuccess = () => resolve(req.result);
                req.onerror = (e) => reject(e);
            });
        });
    }
}
