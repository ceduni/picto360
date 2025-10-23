import { ExportFormat, HotspotData, ExportOptions, ExportResult, FileToExport } from "@/utils/Types";
import { CustomFileExporter } from "@/pictoFileExtention/PictoFileFormat";


class ExportService {
    private readonly baseUrl: string;
    private readonly defaultOptions: Required<ExportOptions> = {
        fileName: "Untitled",
        folderName: "",
        includeMetadata: true,
    };

    constructor(baseUrl: string = import.meta.env.VITE_API_URL || 'http://localhost:5000') {
        this.baseUrl = baseUrl;
    }

    /**
     * Export files to Google Drive via backend API
     */
    async exportToGoogleDrive(
        imageBlob: Blob,
        annotations: HotspotData[],
        format: ExportFormat,
        options: ExportOptions = {}
    ): Promise<ExportResult> {
        const mergedOptions = { ...this.defaultOptions, ...options };

        try {
            const formData = await this.prepareFormDataForDrive(
                imageBlob,
                annotations,
                format,
                mergedOptions
            );

            const response = await this.sendToDrive(formData);
            return response;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
            console.error("Export to Google Drive failed:", error);
            throw new Error(`Export to Google Drive failed: ${errorMessage}`);
        }
    }

    // Export to Google Drive via backend
    async _exportToGoogleDrive(
        imageBlob: Blob,
        annotations: HotspotData[],
        format: ExportFormat | string,
        options: {
            fileName?: string;
            folderName?: string;
            includeMetadata?: boolean;
        } = {},
    ): Promise<unknown> {
        try {
            const formData = new FormData();
            formData.append("format", format);

            switch (format) {
                case "raw":
                    formData.append("file", new File([imageBlob], options.fileName || "Untitled",
                        { type: imageBlob.type || "image/jpeg" }));
                    formData.append('annotations', JSON.stringify(annotations));
                    formData.append('includeMetadata', String(options.includeMetadata ?? true));
                    break;
                case "picto":
                default:
                    const fileExporter = await CustomFileExporter.createPictoFile(imageBlob, annotations, { filename: options.fileName });
                    formData.append("file", fileExporter);
                    formData.append('includeMetadata', String(false));
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
                credentials: "include",
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


    /**
     * Export files to local disk
     */
    async exportToDisk(
        imageBlob: Blob,
        fileName: string,
        format: ExportFormat,
        annotations?: HotspotData[]
    ): Promise<void> {
        try {
            const files = await this.prepareFilesForDiskExport(
                imageBlob,
                fileName,
                format,
                annotations
            );

            if (this.isFileSystemAccessSupported()) {
                await this.exportWithFileSystemAPI(files);
            } else {
                await this.exportWithDownloadLinks(files);
            }

            console.log("✅ Export to disk completed");
        } catch (error) {
            if (this.isUserCancellation(error)) {
                console.log("Export cancelled by user");
                return;
            }

            console.error("Export to disk failed:", error);
            throw new Error(`Export to disk failed: ${error instanceof Error ? error.message : "Unknown error"}`);
        }
    }

    // Export to Disk
    async _exportFileToDisk(blob: Blob, fileName: string, format: string, annotations?: HotspotData[]) {
        // Check if File System Access API is available
        const canUseFileSystemAPI =
            "showSaveFilePicker" in window && typeof window.showSaveFilePicker === "function";

        const annotationsJSON = JSON.stringify(annotations, null, 2);
        const jsonBlob = new Blob([annotationsJSON], { type: "application/json" });

        let files: { name: string, blob: Blob }[] = [
            { name: fileName, blob },
            { name: fileName + "_annotations", blob: jsonBlob }
        ];
        if (canUseFileSystemAPI) {
            try {
                // Modern way: always open Save As dialog

                // Ask the user to select a folder
                const options = { mode: "readwrite" }
                const dirHandle = await (window as any).showDirectoryPicker(options);

                // change files to export according to the format choosed                                                      
                if (files && format === "picto") {
                    const fileExporter = await CustomFileExporter.createPictoFile(blob, annotations, { filename: fileName });
                    files = [{ name: fileName + ".picto", blob: fileExporter }]
                }

                for (const file of files) {
                    console.log(`✅ Exporting ... `);

                    if (file.blob.type === "application/json" && !annotations) {
                        continue;
                    }
                    await this.exportToDiskWithSave(dirHandle, file.blob, file.name);
                }
                console.log(`✅ Export completed `);
                // setBannerMessage({message:"Exporté avec succes vers le disk",type:"success"})            

                return;
            } catch (err: any) {
                if (err.name === "AbortError") {
                    return;
                }
                console.warn("Falling back... :", err);
            }
        }


        // change files to export according to the format choosed                                                      
        if (files && format === "picto") {
            const fileExporter = await CustomFileExporter.createPictoFile(blob, annotations, { filename: fileName });
            files = [{ name: fileName + ".picto", blob: fileExporter }]
        }

        // Fallback: <a download> method
        for (const file of files) {
            if (file.blob.type === "application/json" && !annotations) {
                continue;
            }
            await this.exportToDiskWithLink(file.blob, file.name);
            console.log(`✅ Saved ${file.name}`);
        }

    }


    // ========================= PRIVATE METHODS ==============================

    private async exportToDiskWithSave(dirHandle: any, file: Blob, fileName: string) {
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

    private async exportToDiskWithLink(file: Blob, fileName: string) {
        // Fallback: <a download> method
        const url = URL.createObjectURL(file);
        const fileLink = document.createElement("a");
        fileLink.href = url;
        fileLink.download = fileName;
        document.body.appendChild(fileLink);

        fileLink.click();

        document.body.removeChild(fileLink);
        URL.revokeObjectURL(url);
    }

    /**
     * Prepare FormData for Google Drive upload
     */
    private async prepareFormDataForDrive(
        imageBlob: Blob,
        annotations: HotspotData[],
        format: ExportFormat,
        options: Required<ExportOptions>
    ): Promise<FormData> {
        const formData = new FormData();
        formData.append("format", format);

        if (format === "raw") {
            this.appendRawFileData(formData, imageBlob, annotations, options);
        } else {
            await this.appendPictoFileData(formData, imageBlob, annotations, options);
        }

        if (options.fileName) {
            formData.append("fileName", options.fileName);
        }
        if (options.folderName) {
            formData.append("folderName", options.folderName);
        }

        return formData;
    }

    /**
     * Append raw file data to FormData
     */
    private appendRawFileData(
        formData: FormData,
        imageBlob: Blob,
        annotations: HotspotData[],
        options: Required<ExportOptions>
    ): void {
        const file = new File(
            [imageBlob],
            options.fileName,
            { type: imageBlob.type || "image/jpeg" }
        );

        formData.append("file", file);
        formData.append("annotations", JSON.stringify(annotations));
        formData.append("includeMetadata", String(options.includeMetadata));
    }

    /**
     * Append picto file data to FormData
     */
    private async appendPictoFileData(
        formData: FormData,
        imageBlob: Blob,
        annotations: HotspotData[],
        options: Required<ExportOptions>
    ): Promise<void> {
        const pictoFile = await CustomFileExporter.createPictoFile(
            imageBlob,
            annotations,
            { filename: options.fileName }
        );

        formData.append("file", pictoFile);
        formData.append("includeMetadata", "false");
    }

    /**
     * Send FormData to Google Drive API
     */
    private async sendToDrive(formData: FormData): Promise<ExportResult> {
        const response = await fetch(`${this.baseUrl}/api/drive/export`, {
            method: "POST",
            body: formData,
            credentials: "include",
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || "Export request failed");
        }

        return {
            success: true,
            ...result,
        };
    }

    /**
     * Prepare files for disk export based on format
     */
    private async prepareFilesForDiskExport(
        imageBlob: Blob,
        fileName: string,
        format: ExportFormat,
        annotations?: HotspotData[]
    ): Promise<FileToExport[]> {
        if (format === "picto") {
            return await this.preparePictoFiles(imageBlob, fileName, annotations);
        }

        return this.prepareRawFiles(imageBlob, fileName, annotations);
    }

    /**
     * Prepare picto format files
     */
    private async preparePictoFiles(
        imageBlob: Blob,
        fileName: string,
        annotations?: HotspotData[]
    ): Promise<FileToExport[]> {
        const pictoFile = await CustomFileExporter.createPictoFile(
            imageBlob,
            annotations,
            { filename: fileName }
        );

        return [
            {
                name: this.ensureExtension(fileName, ".picto"),
                blob: pictoFile,
            },
        ];
    }

    /**
     * Prepare raw format files (image + annotations JSON)
     */
    private prepareRawFiles(
        imageBlob: Blob,
        fileName: string,
        annotations?: HotspotData[]
    ): FileToExport[] {
        const files: FileToExport[] = [
            {
                name: fileName,
                blob: imageBlob,
            },
        ];

        if (annotations && annotations.length > 0) {
            const annotationsJSON = JSON.stringify(annotations, null, 2);
            const jsonBlob = new Blob([annotationsJSON], { type: "application/json" });

            files.push({
                name: `${fileName}_annotations.json`,
                blob: jsonBlob,
            });
        }

        return files;
    }

    /**
     * Export files using File System Access API
     */
    private async exportWithFileSystemAPI(files: FileToExport[]): Promise<void> {
        const dirHandle = await this.selectDirectory();

        for (const file of files) {
            await this.saveFileToDirectory(dirHandle, file);
        }
    }

    /**
     * Prompt user to select a directory
     */
    private async selectDirectory(): Promise<FileSystemDirectoryHandle> {
        try {
            return await (window as any).showDirectoryPicker({ mode: "readwrite" });
        } catch (error) {
            throw new Error("Failed to select directory");
        }
    }

    /**
     * Save a single file to selected directory
     */
    private async saveFileToDirectory(
        dirHandle: FileSystemDirectoryHandle,
        file: FileToExport
    ): Promise<void> {
        const fileName = this.ensureFileExtension(file.name, file.blob.type);
        const fileHandle = await dirHandle.getFileHandle(fileName, { create: true });
        const writable = await fileHandle.createWritable();

        await writable.write(file.blob);
        await writable.close();

        console.log(`✅ Saved ${fileName}`);
    }

    /**
     * Export files using download links (fallback method)
     */
    private async exportWithDownloadLinks(files: FileToExport[]): Promise<void> {
        for (const file of files) {
            this.downloadFile(file.blob, file.name);
            console.log(`✅ Downloaded ${file.name}`);
        }
    }

    /**
     * Trigger file download using anchor element
     */
    private downloadFile(blob: Blob, fileName: string): void {
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");

        link.href = url;
        link.download = fileName;
        link.style.display = "none";

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        URL.revokeObjectURL(url);
    }

    // ========================= UTILITY METHODS ==============================

    /**
     * Check if File System Access API is supported
     */
    private isFileSystemAccessSupported(): boolean {
        return (
            "showDirectoryPicker" in window &&
            typeof (window as any).showDirectoryPicker === "function"
        );
    }

    /**
     * Check if error is user cancellation
     */
    private isUserCancellation(error: unknown): boolean {
        return error instanceof Error && error.name === "AbortError";
    }

    /**
     * Ensure filename has the correct extension
     */
    private ensureExtension(fileName: string, extension: string): string {
        return fileName.endsWith(extension) ? fileName : `${fileName}${extension}`;
    }

    /**
     * Ensure filename has an extension based on MIME type
     */
    private ensureFileExtension(fileName: string, mimeType: string): string {
        if (fileName.includes(".")) {
            return fileName;
        }

        const extension = this.getExtensionFromMimeType(mimeType);
        return `${fileName}.${extension}`;
    }

    /**
     * Get file extension from MIME type
     */
    private getExtensionFromMimeType(mimeType: string): string {
        const extension = mimeType.split("/").pop();
        return extension || "bin";
    }
}


let exportServiceInstance: ExportService | null = null;

/**
 * Get singleton instance of ExportService
 */
export const getExportService = (): ExportService => {
    if (!exportServiceInstance) {
        exportServiceInstance = new ExportService();
    }

    return exportServiceInstance;
};


export default ExportService;