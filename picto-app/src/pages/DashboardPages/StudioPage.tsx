import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ImageUploader from "@/components/ImageUploader";
import DashboardLayout from "./layout/DashboardLayout";
import { putViewerItem, compressBeforeUpload } from "@/utils/storedImageData";
import { CustomFileExporter } from "@/pictoFileExtention/PictoFileFormat";
import { useFeedbackBanner } from "@/hooks/useFeedbackbanner";
import ErrorBanner from "@/components/FeedbackBanner";
import "./css/StudioPage.css";

const StudioPage = () => {
    const { setBannerMessage, bannerRef } = useFeedbackBanner();
    const navigate = useNavigate();

    const handleImageUpload = useCallback(async (newImageSrc: File): Promise<boolean> => {
        const viewerId = crypto.randomUUID();
        const filetype = newImageSrc.name.split(".").pop();
        const fileName = newImageSrc.name.split(".")[0];

        switch (filetype) {
            case "picto":
                try {
                    const extractedFile = await CustomFileExporter.extractCustomFile(newImageSrc);
                    await putViewerItem(
                        viewerId,
                        fileName,
                        extractedFile.imageBlob,
                        extractedFile.annotations,
                        undefined,
                        extractedFile.assets,
                    );
                    setBannerMessage({ message: "Fichier chargé avec succès", type: "success" });
                } catch (error) {
                    setBannerMessage({ message: "Erreur lors du chargement du fichier", type: "failure" });
                    console.error("Error on picto file", error);
                }
                break;
            case "jpg":
            case "JPG":
            case "JPEG":
            case "jpeg":
            case "png":
                await putViewerItem(viewerId, undefined, newImageSrc, undefined);
                setBannerMessage({ message: "Image chargée avec succès", type: "success" });
                break;
            default:
                setBannerMessage({ message: "Format de fichier invalide", type: "failure" });
                return false;
        }

        await navigate(`/view/${viewerId}`);

        if (filetype !== "picto" && newImageSrc.size >= 10_000_000) {
            const compressed = await compressBeforeUpload(newImageSrc);
            if (compressed?.type.includes("image"))
                await putViewerItem(viewerId, undefined, undefined, undefined, compressed);
        }

        return true;
    }, [navigate, setBannerMessage]);

    return (
        <DashboardLayout title="Studio">
            <ErrorBanner ref={bannerRef} />
            <div className="studio-page">
                <ImageUploader onImageUpload={handleImageUpload} />
            </div>
        </DashboardLayout>
    );
};

export default React.memo(StudioPage);
