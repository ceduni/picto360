import { HotspotData } from "@/utils/Types";

const DB = "viewer-db";
const VIEWER_STORE = "viewerItems";
const VER = 2; // bump version since schema changed

function open(): Promise<IDBDatabase> {
  return new Promise((res, rej) => {
    const req = indexedDB.open(DB, VER);

    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(VIEWER_STORE)) {
        // keyPath is id, so we can store by viewerId directly
        db.createObjectStore(VIEWER_STORE, { keyPath: "id" });
      }
    };

    req.onsuccess = () => res(req.result);
    req.onerror = () => rej(req.error);
  });
}

interface ViewerItem {
  id: string;
  name?:string;
  blob: Blob;
  annotations?: HotspotData[];
  compressedBlob?:Blob;
}

// ---------------- PUT ----------------
export async function putViewerItem(
  id: string,
  name?:string,
  blob?: Blob,
  annotations?: HotspotData[],
  compressedBlob?:Blob,
) {
  const db = await open();
  await new Promise<void>((res, rej) => {
    const tx = db.transaction(VIEWER_STORE, "readwrite");
    const store = tx.objectStore(VIEWER_STORE);

    const getReq = store.get(id);

    getReq.onsuccess = () => {
      const existing = (getReq.result as ViewerItem) || null;

      // 🚨 If no existing record and no blob provided → fail
      if (!existing && !blob) {
        rej(new Error("Blob is required when creating a new record"));
        return;
      }

      const updated: ViewerItem = {
        id,
        name: name ?? existing?.name ?? "Untitled",
        blob: blob ?? existing!.blob,   // guaranteed safe if existing or blob provided
        compressedBlob: compressedBlob ?? existing?.compressedBlob ?? blob ?? existing!.blob ,
        annotations: annotations ?? existing?.annotations ?? [],
      };

      const putReq = store.put(updated);
      putReq.onsuccess = () => res();
      putReq.onerror = () => rej(putReq.error);
    };

    tx.onerror = () => rej(tx.error);
    getReq.onerror = () => rej(getReq.error);
  
  });

}


// ---------------- GET ----------------
export async function getViewerItem(
  id: string
): Promise<ViewerItem | undefined> {
  const db = await open();
  return await new Promise((res, rej) => {
    const tx = db.transaction(VIEWER_STORE, "readonly");
    const r = tx.objectStore(VIEWER_STORE).get(id);

    r.onsuccess = () => {
      res(r.result as ViewerItem | undefined);
    };
    r.onerror = () => rej(r.error);
  });
}


// Convenience helpers
export async function getBlob(id: string): Promise<Blob | undefined> {
  const item = await getViewerItem(id);
  return item?.blob;
}

export async function getCompressedBlob(id: string): Promise<Blob | undefined> {
  const item = await getViewerItem(id);
  return item?.blob; //TODO change to compressed
}

export async function getAnnotations(id: string): Promise<HotspotData[] | undefined> {
  const item = await getViewerItem(id);
  return item?.annotations;
}


//---------------IMAGE COMPRESSION--------------------//

export async function compressBeforeUpload(file: File) {

  try {
    const formData = new FormData();
    formData.append("file", new File([file], file.name || "Untitled", 
                                { type: file.type || "image/jpeg" }));

    const compressedFile = await fetch("http://localhost:5000/api/compress-image",{
      method:"POST",
      body:formData,
    });

    const result = await compressedFile.blob()
    console.log("Image compressed :", result);
    
    return result;
  } catch (error) {
    console.error("Compression failed:", error);
  }
}