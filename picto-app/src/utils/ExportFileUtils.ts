import { HotspotData } from "@/components/HotspotManager";
import { CustomFileExporter } from "@/pictoFileExtention/PictoFileFormat";
 
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
    async exportFileToDisk(blob: Blob, fileName: string, format:string ,annotations?:HotspotData[]) {
        // Check if File System Access API is available
        const canUseFileSystemAPI =
            "showSaveFilePicker" in window && typeof window.showSaveFilePicker === "function";

        const annotationsJSON = JSON.stringify(annotations,null,2);
        const jsonBlob = new Blob([annotationsJSON], { type: "application/json" });

        let files : {name:string,blob:Blob}[]  = [
                                                    {name:fileName,blob},
                                                    {name:fileName+"_annotations",blob:jsonBlob}
                                                ]          
        if(files && format==="picto"){
            const fileExporter =await  CustomFileExporter.createPictoFile (blob,annotations,{filename:fileName});
            files = [{name:fileName+".picto",blob:fileExporter}]
        }
      

        if (canUseFileSystemAPI) {
            try {
            // Modern way: always open Save As dialog

            // Ask the user to select a folder
            const dirHandle = await (window as any).showDirectoryPicker();

            for (const file of files) {
                if( file.blob.type==="application/json" && !annotations){
                      continue;
                }
                await this.exportToDiskWithSave(dirHandle,file.blob,file.name);
            }
            console.log(`✅ Export completed `);

            return;
            } catch (err) {
                console.warn("Falling back... :", err);
            }
        }

        // Fallback: <a download> method
        for (const file of files) {
            if( file.blob.type==="application/json" && !annotations){
                continue;
            }
            await this.exportToDiskWithLink(file.blob,file.name);
            console.log(`✅ Saved ${file.name}`);
        }  

    }



    private async exportToDiskWithSave (dirHandle:any,file:Blob,fileName:string){
        try {
            // Modern way: always open Save As dialog
            const newName = fileName.includes(".") ? fileName
            : fileName + "." + (file.type.split("/")[1] || "bin");
            // Create (or overwrite) each file in the folder
            const fileHandle = await dirHandle.getFileHandle(newName, { create: true });
            const writable = await fileHandle.createWritable();
            
            await writable.write(file);
            await writable.close();
            console.log(`✅ Saved ${newName}`);
        } catch (err) {
            throw new Error(`"File System API save canceled or failed:", ${err}`)
        }        
    }

    private async exportToDiskWithLink (file:Blob,fileName:string){

        // Fallback: <a download> method
        const url = URL.createObjectURL(file);        
        const fileLink =  document.createElement("a");   
        fileLink.href = url;   
        fileLink.download = fileName;
        document.body.appendChild(fileLink);

        fileLink.click();

        document.body.removeChild(fileLink);
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