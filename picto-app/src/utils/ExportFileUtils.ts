import { ExportFormat, HotspotData } from "@/utils/Types";
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
        format:ExportFormat|string,
        options: {
            fileName?: string;
            folderName?: string;
            includeMetadata?: boolean;
        } = {},
    ): Promise<unknown> {
        try {
        const formData = new FormData();
        formData.append("format", format );

        switch(format){
            case "raw":
                formData.append("file", new File([imageBlob], options.fileName || "Untitled", 
                                { type: imageBlob.type || "image/jpeg" }));
                formData.append('annotations', JSON.stringify(annotations)); 
                formData.append('includeMetadata', String(options.includeMetadata ?? true));
                break;           
            case "picto":
            default:
                const fileExporter = await CustomFileExporter.createPictoFile (imageBlob,annotations,{filename:options.fileName});
                formData.append("file",fileExporter);
                formData.append('includeMetadata', String( false));
        }
        
        if (options.fileName) {
            formData.append('fileName', options.fileName);
        }
        if (options.folderName) {
            formData.append('folderName', options.folderName);
        }

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
                                                ];    
        if (canUseFileSystemAPI) {
            try {
            // Modern way: always open Save As dialog

            // Ask the user to select a folder
            const options = {mode:"readwrite"}
            const dirHandle = await (window as any).showDirectoryPicker(options);

            // change files to export according to the format choosed                                                      
            if(files && format==="picto"){
                const fileExporter = await CustomFileExporter.createPictoFile (blob,annotations,{filename:fileName});
                files = [{name:fileName+".picto",blob:fileExporter}]
            }            

            for (const file of files) {
                console.log(`✅ Exporting ... `);

                if( file.blob.type==="application/json" && !annotations){
                      continue;
                }
                await this.exportToDiskWithSave(dirHandle,file.blob,file.name);
            }
            console.log(`✅ Export completed `);
            // setBannerMessage({message:"Exporté avec succes vers le disk",type:"success"})            

            return;
            } catch (err:any) {
                if (err.name === "AbortError") {
                    return;
                }
                console.warn("Falling back... :", err);
            }
        }


        // change files to export according to the format choosed                                                      
        if(files && format==="picto"){
            const fileExporter = await CustomFileExporter.createPictoFile (blob,annotations,{filename:fileName});
            files = [{name:fileName+".picto",blob:fileExporter}]
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
            : fileName + "." + (file.type.split("/").pop() || "bin");
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