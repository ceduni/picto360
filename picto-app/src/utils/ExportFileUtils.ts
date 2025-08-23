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
    async exportFileToDisk(blob: Blob, fileName: string,annotations?:HotspotData[] ) {
        // Check if File System Access API is available
        const canUseFileSystemAPI =
            "showSaveFilePicker" in window && typeof window.showSaveFilePicker === "function";

        const annotationsJSON = JSON.stringify(annotations,null,2);
        const jsonBlob = new Blob([annotationsJSON], { type: "application/json" });

        if (canUseFileSystemAPI) {
            try {
            // Modern way: always open Save As dialog

            // Ask the user to select a folder
            const dirHandle = await (window as any).showDirectoryPicker();

            const files = [
                    {name:fileName,blob},
                    {name:fileName+"_annotations",blob:jsonBlob}
                ]

            for (const file of files) {
                const fileName = file.name.includes(".") ? file.name
                : file.name + "." + (file.blob.type.split("/")[1] || "bin");
                // Create (or overwrite) each file in the folder
                const fileHandle = await dirHandle.getFileHandle(fileName, { create: true });
                const writable = await fileHandle.createWritable();
                if( file.blob.type==="application/json"){
                      annotations && await writable.write(file.blob);
                }else{
                    await writable.write(file.blob);
                }
                await writable.close();
                console.log(`✅ Saved ${file.name}`);
            }
            return;
            } catch (err) {
                console.warn("File System API save canceled or failed, falling back:", err);
            }
        }

        // Fallback: <a download> method
        const url = URL.createObjectURL(blob);
        const jsonUrl = URL.createObjectURL(jsonBlob);

        const imageLink =  document.createElement("a");
        const jsonLink =  document.createElement("a");

        imageLink.href = url;
        jsonLink.href = jsonUrl;

        imageLink.download = fileName;
        jsonLink.download = fileName+"_annotations";

        document.body.appendChild(imageLink);
        document.body.appendChild(jsonLink);

        annotations && jsonLink.click();
        imageLink.click();

        document.body.removeChild(jsonLink);
        document.body.removeChild(imageLink);
        
        URL.revokeObjectURL(jsonUrl);
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