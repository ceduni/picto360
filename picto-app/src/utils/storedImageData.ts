import { HotspotData } from "@/components/HotspotManager";

const DB = "viewer-db", ANNOTATIONS_STORE = "annotations", IMAGES_STORE = "images"; const VER = 1;

function open(): Promise<IDBDatabase> {
  return new Promise((res, rej) => {
    const req = indexedDB.open(DB, VER);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(IMAGES_STORE)) {
        db.createObjectStore(IMAGES_STORE);
      }
      if (!db.objectStoreNames.contains(ANNOTATIONS_STORE)) {
        db.createObjectStore(ANNOTATIONS_STORE);
      }
    };
    req.onsuccess = () => res(req.result);
    req.onerror = () => rej(req.error);
  });
}

export async function putBlob(id: string, blob: Blob) {
  const db = await open();
  await new Promise<void>((res, rej) => {
    const tx = db.transaction(IMAGES_STORE, "readwrite");
    tx.objectStore(IMAGES_STORE).put(blob, id);
    tx.oncomplete = () => res();
    tx.onerror = () => rej(tx.error);
  });
}

export async function getBlob(id: string): Promise<Blob|undefined> {
  const db = await open();
  return await new Promise((res, rej) => {
    const tx = db.transaction(IMAGES_STORE, "readonly");
    const r = tx.objectStore(IMAGES_STORE).get(id);
    r.onsuccess = () => res(r.result as Blob|undefined);
    r.onerror = () => rej(r.error);
  });
}

export async function putAnnotations(id: string, annotations: HotspotData[]) {
  const db = await open();
  await new Promise<void>((res, rej) => {
    const tx = db.transaction(ANNOTATIONS_STORE, "readwrite");
    tx.objectStore(ANNOTATIONS_STORE).put(JSON.stringify(annotations), id);
    tx.oncomplete = () => res();
    tx.onerror = () => rej(tx.error);
  });
}

export async function getAnnotations(id: string): Promise<HotspotData[]|undefined> {
  const db = await open();
  return await new Promise((res, rej) => {
    const tx = db.transaction(ANNOTATIONS_STORE, "readonly");
    const r = tx.objectStore(ANNOTATIONS_STORE).get(id);
    r.onsuccess = () => {
      if (!r.result) return res(undefined);

      try {
        // ✅ Parse back into HotspotData[]
        const parsed = JSON.parse(r.result as string) as HotspotData[];
        res(parsed);
      } catch (e) {
        console.error("Failed to parse annotations", e);
        res(undefined);
      }
    };    
    r.onerror = () => rej(r.error);
  });
}