import { DeleteObjectCommand, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { readFile } from "node:fs/promises";
import { Upload } from "@aws-sdk/lib-storage";
import { S3 } from "./cloudflare.config";
import { createReadStream } from "fs";
import { env } from "@/config/env";


export async function singleUploadToR2(file: string,fileType: string, key: string) {
    const fileContent = await readFile(file);
    try {
        const response = await S3.send(
            new PutObjectCommand({
                Bucket: env.R2_MEDIA_BUCKET_NAME,
                Key: key,
                Body: fileContent,
                ContentType: fileType, // Set the content type based on the file extension
            }),
        );
        console.log(`Uploaded successfully. ETag: ${response.ETag}`);
    }catch (error) {
        console.error("Error uploading file:", error);
        throw error;
    }
}

export async function multipartUploadToR2(key: string, filePath: string) {
    // Implementation for multipart upload to R2
    try{
        const upload = new Upload({
            client: S3,
            params: {
                Bucket: env.R2_MEDIA_BUCKET_NAME,
                Key: key,
                Body: createReadStream(filePath),
            },
            // Upload parts in parallel (default: 4)
            leavePartsOnError: false,
        });

        upload.on("httpUploadProgress", (progress) => {
            console.log(`Uploaded ${progress.loaded ?? 0} bytes`);
        });

        const result = await upload.done();
        console.log(`Upload complete. ETag: ${result.ETag}`);
    }catch (error){
        console.error("Error during multipart upload:", error);
        throw error;
    }
}

export async function getR2UploadUrl(file_type:string, file_key:string) {
    // Implementation for getting R2 short lived upload URL
    const presignedUrl = await getSignedUrl(
        S3,
        new PutObjectCommand({
            Bucket: env.R2_MEDIA_BUCKET_NAME,
            Key: file_key,
            ContentType: file_type,
        }),
        { expiresIn: 3600 }, // Valid for 1 hour
    );

    console.log(presignedUrl);
    // Return presignedUrl to the client
}


export async function getFileFromR2(key: string) {
    // Implementation for getting a file from R2

    const response = await S3.send(
        new GetObjectCommand({
            Bucket: env.R2_MEDIA_BUCKET_NAME,
            Key: key,
        }),
    );

    // This will be a stream, you can pipe it to a file or process it as needed
    return response.Body;
}

export async function deleteFileFromR2(key: string) {
    // Implementation for deleting a file from R2
    await S3.send(
        new DeleteObjectCommand({
            Bucket: env.R2_MEDIA_BUCKET_NAME,
            Key: key,
        }),
    );
}


