async function createDatabase () {
    return new Promise((resolve, reject) => {
        const request = window.indexedDB.open("KhanMinerDB", 1);

        request.onupgradeneeded = function (event) {
            const db = event.target.result;
            if (!db.objectStoreNames.contains("worlds")) {
                db.createObjectStore("worlds", { keyPath: "id" });
            }
        };

        request.onsuccess = function () {
            resolve(request.result);
        };

        request.onerror = function (e) {
            reject(e);
        };
    });
}

// Helper to get the object store and transaction
async function getStore (mode = "readonly") {
    const db = await createDatabase();
    const tx = db.transaction("worlds", mode);
    const store = tx.objectStore("worlds");
    return { db, store };
}

async function loadFromDB (id) {
    const { db, store } = await getStore("readonly");
    return new Promise((resolve) => {
        const req = id ? store.get(id) : store.getAll();
        req.onsuccess = function () {
            resolve(req.result);
            db.close();
        };
        req.onerror = function () {
            resolve(null);
            db.close();
        };
    });
}

async function saveToDB (id, data) {
    const { db, store } = await getStore("readwrite");
    return new Promise((resolve, reject) => {
        const req = store.put({ id: id, data: data });
        req.onsuccess = function () {
            resolve(req.result);
            db.close();
        };
        req.onerror = function (e) {
            reject(e);
            db.close();
        };
    });
}

async function deleteFromDB (id) {
    const { db, store } = await getStore("readwrite");
    return new Promise((resolve, reject) => {
        const req = store.delete(id);
        req.onsuccess = function () {
            resolve(req.result);
            db.close();
        };
        req.onerror = function (e) {
            reject(e);
            db.close();
        };
    });
}

export { createDatabase, loadFromDB, saveToDB, deleteFromDB };
