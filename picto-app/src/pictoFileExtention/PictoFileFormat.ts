import { HotspotData } from "@/components/HotspotManager";
import JSZip from 'jszip';

type imageFormat = "picto"  ; // add supported format here

interface MergedFileMetadata {
  version: string;
  format: imageFormat ;     
  created: string;
  imageInfo: {
    filename: string;
    format: string;
    size: number;
    dimensions?: { width: number; height: number };
  };
  annotationCount: number;
  creator: string;
}

// ===========================
// APPROACH : ZIP-BASED FORMAT (.picto)
// Recommended for compatibility and flexibility
// ===========================

export class CustomFileExporter {

  private static readonly EXTENSION = '.picto'; // ← Change this to anything you want!
  private static readonly MIME_TYPE = 'application/picto';

  /**
   * Create custom 360 file (ZIP containing image + JSON metadata)
   * Structure:
   * - image.jpg (the 360° image)
   * - metadata.json (annotations + file info)
   * - manifest.json (file structure info)
   */
  static async createPictoFile(
    imageBlob: Blob,
    annotations?: HotspotData[],
    options: {
      filename?: string;
      imageFormat?: 'jpg' | 'png';
      compression?: number; // 0-9
      creator?: string;
      customExtension?: string; // ← New option to override extension
      customMimeType?: string;  // ← New option to override MIME type
    } = {}
  ): Promise<Blob> {
    const {
      filename = 'annotated_picto_file',
      imageFormat = 'jpg',
      compression = 6,
      creator = 'MyPictoApp',
      customExtension = this.EXTENSION,
      customMimeType = this.MIME_TYPE
    } = options;

    const zip = new JSZip();
    
    // Add the image file
    const imageFilename = `image.${imageFormat}`;
    zip.file(imageFilename, imageBlob);

    // Create metadata
    const metadata: MergedFileMetadata = {
      version: '1.0',
      format: customExtension.replace('.','') as imageFormat, 
      created: new Date().toISOString(),
      imageInfo: {
        filename: imageFilename,
        format: imageFormat,
        size: imageBlob.size
      },
      annotationCount: annotations?.length || 0,
      creator
    };

    // Add metadata file
    zip.file('metadata.json', JSON.stringify(metadata, null, 2));

    // Add annotations file
    const annotationData = {
      version: '1.0',
      annotations: annotations,
      statistics: {
        total: annotations?.length || 0,
        types: [...new Set(annotations?.map(a => a.type))],
        // createdRange: {
        //   earliest: annotations.length > 0 ? annotations.reduce((min, a) => a.t < min ? a.timestamp : min, annotations[0].timestamp) : null,
        //   latest: annotations.length > 0 ? annotations.reduce((max, a) => a.timestamp > max ? a.timestamp : max, annotations[0].timestamp) : null
        // }
      }
    };
    zip.file('annotations.json', JSON.stringify(annotationData, null, 2));

    // Add manifest (describes file structure)
    const manifest = {
      fileType: 'Annotated Picto 360 Image',
      extension: customExtension,
      version: '1.0',
      creator: creator,
      files: [
        { name: imageFilename, type: 'image', description: '360° panoramic image' },
        { name: 'metadata.json', type: 'metadata', description: 'File metadata and information' },
        { name: 'annotations.json', type: 'annotations', description: 'Annotation data' },
        { name: 'manifest.json', type: 'manifest', description: 'File structure description' }
      ]
    };
    zip.file('manifest.json', JSON.stringify(manifest, null, 2));

    // Generate the ZIP file with custom MIME type
    const zipBlob = await zip.generateAsync({
      type: 'blob',
      compression: 'DEFLATE',
      compressionOptions: { level: compression },
      mimeType: customMimeType
    });

    return zipBlob;
  }

  /**
   * Extract contents from custom 360 file
   */
  static async extractCustomFile(customBlob: Blob): Promise<{
    imageBlob: Blob;
    annotations: HotspotData[];
    metadata: MergedFileMetadata;
    manifest: any;
  }> {
    const zip = await JSZip.loadAsync(customBlob);

    // Read manifest to understand file structure
    const manifestFile = zip.file('manifest.json');
    if (!manifestFile) {
      throw new Error('Invalid custom 360 file: missing manifest');
    }
    const manifest = JSON.parse(await manifestFile.async('string'));

    // Read metadata
    const metadataFile = zip.file('metadata.json');
    if (!metadataFile) {
      throw new Error('Invalid custom 360 file: missing metadata');
    }
    const metadata = JSON.parse(await metadataFile.async('string'));

    // Read annotations
    const annotationsFile = zip.file('annotations.json');
    if (!annotationsFile) {
      throw new Error('Invalid custom 360 file: missing annotations');
    }
    const annotationData = JSON.parse(await annotationsFile.async('string'));

    // Read image
    const imageFile = zip.file(metadata.imageInfo.filename);
    if (!imageFile) {
      throw new Error('Invalid custom 360 file: missing image');
    }
    const imageBlob = await imageFile.async('blob');

    return {
      imageBlob,
      annotations: annotationData.annotations,
      metadata,
      manifest
    };
  }
}