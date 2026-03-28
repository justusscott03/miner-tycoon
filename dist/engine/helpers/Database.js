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
    // -------------------------
    // OPEN DATABASE
    // -------------------------
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
            request.onerror = (e) => reject(request.error);
        });
    }
    // -------------------------
    // GET TRANSACTION & STORE
    // -------------------------
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
    // -------------------------
    // LOAD DATA
    // -------------------------
    load(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { store } = yield this.getStore("readonly");
            if (id) {
                // request for a single item
                const request = store.get(id);
                return new Promise((resolve, reject) => {
                    request.onsuccess = () => { var _a; return resolve((_a = request.result) !== null && _a !== void 0 ? _a : null); };
                    request.onerror = () => reject(request.error);
                });
            }
            else {
                // request for all items
                const request = store.getAll();
                return new Promise((resolve, reject) => {
                    request.onsuccess = () => { var _a; return resolve((_a = request.result) !== null && _a !== void 0 ? _a : []); };
                    request.onerror = () => reject(request.error);
                });
            }
        });
    }
    // -------------------------
    // SAVE DATA
    // -------------------------
    save(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { store } = yield this.getStore("readwrite");
            return new Promise((resolve, reject) => {
                const request = store.put(data);
                request.onsuccess = () => resolve(data);
                request.onerror = () => reject(request.error);
            });
        });
    }
    // -------------------------
    // DELETE DATA
    // -------------------------
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { store } = yield this.getStore("readwrite");
            return new Promise((resolve, reject) => {
                const request = store.delete(id);
                request.onsuccess = () => resolve();
                request.onerror = () => reject(request.error);
            });
        });
    }
}
