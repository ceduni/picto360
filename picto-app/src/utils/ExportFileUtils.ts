import { HotspotData } from "@/components/HotspotManager";
 
 class ExportService {
   private baseUrl: string;

  constructor(baseUrl: string = 'http://localhost:5000' ) {
    this.baseUrl = baseUrl;
  }

  // Export to Google Drive via backend
  async exportToGoogleDrive(
    imageBlob: Blob,
    annotations: HotspotData[],
    options: {
      imageName?: string;
      folderName?: string;
      includeMetadata?: boolean;
    } = {}
  ): Promise<any> {
    try {

      console.log("Blob:" , imageBlob)

      const formData = new FormData();
      formData.append("file", new File([imageBlob], options.imageName || "panorama.jpg", 
                      { type: imageBlob.type || "image/jpeg" }));
      formData.append('annotations', JSON.stringify(annotations));
      
      if (options.imageName) {
        formData.append('imageName', options.imageName);
      }
      if (options.folderName) {
        formData.append('folderName', options.folderName);
      }
      formData.append('includeMetadata', String(options.includeMetadata ?? true));

      console.log("Request Body: ", JSON.stringify(formData.get("file")));

      const response = await fetch(`${this.baseUrl}/api/drive/export`, {
        method: 'POST',
        body: formData,
        credentials:"include",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Export failed');
      }
      return result;

    } catch (error) {
      throw new Error(`Export failed: ${error}`);
    }
  }  



    // Export to Disk
    async exportFileToDisk(blob: Blob, fileName: string) {
        // Check if File System Access API is available
        const canUseFileSystemAPI =
            "showSaveFilePicker" in window && typeof window.showSaveFilePicker === "function";

        if (canUseFileSystemAPI) {
            try {
            // Modern way: always open Save As dialog
            const handle = await (window as any).showSaveFilePicker({
                suggestedName: fileName,
                types: [
                {
                    description: "Files",
                    accept: { [blob.type || "application/octet-stream"]: [`.${fileName.split(".").pop()}`] },
                },
                ],
            });

            const writable = await handle.createWritable();
            await writable.write(blob);
            await writable.close();
            return;
            } catch (err) {
                console.warn("File System API save canceled or failed, falling back:", err);
            }
        }

        // Fallback: <a download> method
        const url = URL.createObjectURL(blob);
        const a =  document.createElement("a");
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }


}

let googleDriveServ : ExportService | null;
export const getExportService = () =>{
  if(googleDriveServ === null || googleDriveServ === undefined){
    googleDriveServ = new ExportService();
  }
  return googleDriveServ;
}