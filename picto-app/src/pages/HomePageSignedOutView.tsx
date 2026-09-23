import "./css/HomePage.css";
import ImageUploader from "@/components/ImageUploader";
import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { putViewerItem, compressBeforeUpload } from "@/utils/storedImageData";
import { CustomFileExporter } from "@/pictoFileExtention/PictoFileFormat";
import { useFeedbackBanner } from "@/hooks/useFeedbackbanner";
import ErrorBanner from "@/components/FeedbackBanner";
import AuthCard from "./AuthCard";
import { ViewfinderCircleIcon, UserIcon } from "@heroicons/react/24/outline";

type View = "editor" | "auth";

interface HomeSignedOutViewProps {
    view?: View;
}

const HomePageSignedOutView = ({ view: initialView = "editor" }: HomeSignedOutViewProps = {}) => {
    const { setBannerMessage, bannerRef } = useFeedbackBanner();
    const navigate = useNavigate();
    const [view, setView] = useState<View>(initialView);

    const handleImageUpload = useCallback(async (newImageSrc: File): Promise<boolean> => {
        if (!ImageUploader) return false;

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
                        extractedFile.mediaBlob,
                        extractedFile.annotations,
                        undefined,
                        extractedFile.assets,
                        extractedFile.mediaBlob.type,
                    );
                    setBannerMessage({ message: "Fichier chargé avec succès", type: "success" });
                } catch (error) {
                    setBannerMessage({ message: "Error on picto file", type: "failure" });
                    console.error("Error on picto file", error);
                }
                break;
            case "mp4":
            case "m4v":
            case "MP4":
            case "webm":
            case "WEBM":
            case "mov":
            case "MOV":
                await putViewerItem(viewerId, undefined, newImageSrc, undefined, undefined, undefined,
                    newImageSrc.type || "video/mp4");
                setBannerMessage({ message: "Vidéo chargée avec succès", type: "success" });
                break;
            case "jpg":
            case "JPG":
            case "JPEG":
            case "jpeg":
            case "png":
                await putViewerItem(viewerId, undefined, newImageSrc, undefined, undefined, undefined,
                    newImageSrc.type || "image/jpeg");
                setBannerMessage({ message: "Image chargé avec succès", type: "success" });
                break;
            default:
                setBannerMessage({ message: "Format de fichier Invalide", type: "failure" });
                return false;
        }

        await navigate(`/view/${viewerId}`);

        if (filetype != "picto" && newImageSrc.type.startsWith("image") && newImageSrc.size >= 10000000) {
            const compressed_image = await compressBeforeUpload(newImageSrc);
            if (compressed_image?.type.includes("image"))
                await putViewerItem(viewerId, undefined, undefined, undefined, compressed_image);
        }

        return true;
    }, [navigate, setBannerMessage]);

    return (
        <div className="home-page">
            <div className="panorama-background"></div>

            <ErrorBanner ref={bannerRef} />

            <div className="home-page__container">
                <header className="home-page__header">
                    <img className="image-uploader__logo" src="/images/logo_picto360.png" alt="Logo de Picto 360" />
                    <p className="home-page__intro-text">
                        Annotez librement vos images 360 avec <br />
                        du texte, des liens, des images et des vidéos.
                    </p>
                </header>

                <section className="home-page__content">
                    {/* View selector */}
                    <div className="editor-view-tabs">
                        <button
                            className={`editor-view-tab${view === "editor" ? " editor-view-tab--active" : ""}`}
                            onClick={() => setView("editor")}
                        >
                            <ViewfinderCircleIcon width={15} height={15} />
                            Éditeur
                        </button>
                         {__ENABLE_ADMIN__ && (
                            <button
                                className={`editor-view-tab${view === "auth" ? " editor-view-tab--active" : ""}`}
                                onClick={() => setView("auth")}
                            >
                                <UserIcon width={15} height={15} />
                                Se connecter
                            </button>
                        )}
                    </div>

                    {view === "editor" ? (
                        <ImageUploader onImageUpload={handleImageUpload} />
                    ) : (
                        <AuthCard />
                    )}
                </section>
            </div>

            <footer className="app-footer">
                <p>Projet mené en collaboration avec <strong>École en réseau</strong>.</p>
                <p>&copy; {new Date().getFullYear()} Picto 360. Tous droits réservés.</p>
            </footer>
        </div>
    );
};

export default React.memo(HomePageSignedOutView);
