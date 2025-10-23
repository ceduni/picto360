import "./css/HomePage.css";
import ImageUploader from "@/components/ImageUploader";
import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/authContext/authContext";
import GotoProfile from "@/components/GotoProfile";
import { putViewerItem, compressBeforeUpload } from "@/utils/storedImageData";
import { CustomFileExporter } from "@/pictoFileExtention/PictoFileFormat";
import { useFeedbackBanner } from "@/hooks/useFeedbackbanner";
import ErrorBanner from "@/components/FeedbackBanner";


const HomePage = () => {
    const { userLoggedIn } = useAuth();
    const { setBannerMessage, bannerRef } = useFeedbackBanner();
    const navigate = useNavigate();

    const handleImageUpload = useCallback(async (newImageSrc: File): Promise<boolean> => {
        if (!ImageUploader) return false;

        const viewerId = crypto.randomUUID();
        const filetype = newImageSrc.name.split(".").pop();
        const fileName = newImageSrc.name.split(".")[0];

        switch (filetype) {
            case "picto":
                try {
                    const extractedFile = await CustomFileExporter.extractCustomFile(newImageSrc);
                    await putViewerItem(viewerId, fileName, extractedFile.imageBlob, extractedFile.annotations);
                    setBannerMessage({ message: "Fichier chargé avec succès", type: "success" });
                } catch (error) {
                    setBannerMessage({ message: "Error on picto file", type: "failure" });
                    console.error("Error on picto file", error);
                }
                break;
            case "jpg":
            case "JPG":
            case "jpeg":
            case "png":
                await putViewerItem(viewerId, undefined, newImageSrc, undefined);
                setBannerMessage({ message: "Image chargé avec succès", type: "success" });
                break;
            default:
                setBannerMessage({ message: "Format de fichier Invalide", type: "failure" })
                return false
        }

        await navigate(`/view/${viewerId}`);

        if (filetype != "picto" && newImageSrc.size >= 10000000) {
            const compressed_image = await compressBeforeUpload(newImageSrc);
            if (compressed_image?.type.includes("image"))
                await putViewerItem(viewerId, undefined, undefined, undefined, compressed_image);
        }

        return true;
    }, [navigate, setBannerMessage]);

    const handleLogClick = useCallback(() => {
        navigate('/login');
    }, [navigate]);

    const onCreateActivityClick = () => {
        if (userLoggedIn) {
            handleCreateActivity();
        } else {
            handleLogClick();
        }
    };

    const handleCreateActivity = useCallback(() => {
        navigate('/activity_creation');
    }, [navigate]);

    return (
        <div className="home-page">
            {/* Animated 360° Panorama Background */}
            <div className="panorama-background"></div>

            <ErrorBanner ref={bannerRef} />

            <header className="home-page__header">
                <img className="image-uploader__logo" src="/images/logo_picto360.png" alt="Logo de Picto 360" />
                <p className="home-page__intro-text">
                    Annotez librement vos images 360 avec <br />
                    du texte, des liens, des images et des vidéos.
                </p>
                {__ENABLE_ADMIN__ && (
                    <div>
                        <GotoProfile displayType={userLoggedIn ? undefined : "name"} />
                        <div className="home-page__login_container">
                            {userLoggedIn ? (
                                <button type="button" className="home-page__btn-create-group">
                                    Créer un groupe
                                </button>
                            ) : (
                                <button type="button" className="home-page__btn-login" onClick={handleLogClick}>
                                    Se connecter
                                </button>
                            )}

                            <button type="button" className="home-page__btn-create-activity" onClick={onCreateActivityClick}>
                                Créer une activité
                            </button>
                        </div>
                    </div>
                )}
            </header>

            <section className="home-page__content">
                <ImageUploader onImageUpload={handleImageUpload} />
            </section>

            <footer className="app-footer">
                <p>Projet mené en collaboration avec <strong>École en réseau</strong>.</p>
                <p>&copy; 2025 Picto 360. Tous droits réservés.</p>
            </footer>
        </div>
    );
};

export default React.memo(HomePage);