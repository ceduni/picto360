import React, { useState } from "react";
import { ActivityIstance } from "@/utils/Types";
import ImageUploader from "@/components/ImageUploader";
import { useAuth } from "@/authContext/authContext";
import { useActivityDraftApi } from "@/hooks/useActivityDraftApi";
import { useFeedbackBanner } from "@/hooks/useFeedbackbanner";
import { uploadImageFile, attachPlaygroundImage } from "@/utils/ImageUploadUtils";
import ActivityPlaygroundEditor from "./ActivityPlaygroundEditor";

interface Props {
    formValues: ActivityIstance;
    setFormValues: React.Dispatch<React.SetStateAction<ActivityIstance>>;
}

const ImageUploadCard: React.FC<Props> = ({ formValues, setFormValues }) => {
    const [isUploading, setIsUploading] = useState(false);
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const { currentUser } = useAuth();
    const { createDraft } = useActivityDraftApi();
    const { setBannerMessage } = useFeedbackBanner();

    const handleImageUpload = async (file: File) => {
        if (!currentUser) {
            setBannerMessage({ message: "Vous devez être connecté pour ajouter une image", type: "failure" });
            return;
        }

        setIsUploading(true);
        try {
            const token = await currentUser.getIdToken();

            // The playground image upload is saved immediately (not buffered
            // until "Brouillon"/"Publier"), so if this is a brand new
            // activity with no server draft yet, create one now.
            let activityId = formValues.id;
            if (!activityId) {
                activityId = await createDraft(formValues.title.trim() || "Nouvelle activité");
            }

            const image = await uploadImageFile(file, token);
            const activity = await attachPlaygroundImage(activityId, image._id, token);

            setFormValues((prev) => ({
                ...prev,
                id: activityId,
                playgroundProjectId: activity.playground?._id,
                playgroundImageUrl: activity.playground?.images?.[0]?.url,
            }));
            setBannerMessage({ message: "Image ajoutée avec succès", type: "success" });
        } catch (error) {
            console.error("Failed to upload playground image:", error);
            setBannerMessage({ message: "Erreur lors de l'ajout de l'image", type: "failure" });
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="main-card">
            <div className="card-title-group">
                <h3 className="main-left_title">Image</h3>
                <p className="card-subtitle">Ajoutez une image pour le déroulement de l'activité.</p>
            </div>

            <div className="list_container">
                {formValues.playgroundImageUrl ? (
                    <div className="playground-image-preview">
                        <img src={formValues.playgroundImageUrl} alt="Aperçu de l'activité" />
                        <div className="playground-image-preview__actions">
                            {formValues.playgroundProjectId && (
                                <button
                                    type="button"
                                    className="playground-image-preview__edit"
                                    onClick={() => setIsEditorOpen(true)}
                                >
                                    Modifier les points d'intérêt
                                </button>
                            )}
                            <button
                                type="button"
                                className="playground-image-preview__replace"
                                onClick={() => setFormValues((prev) => ({ ...prev, playgroundImageUrl: undefined }))}
                                disabled={isUploading}
                            >
                                Remplacer l'image
                            </button>
                        </div>
                    </div>
                ) : (
                    <ImageUploader onImageUpload={handleImageUpload} />
                )}
            </div>

            {isEditorOpen && formValues.playgroundProjectId && (
                <ActivityPlaygroundEditor
                    projectId={formValues.playgroundProjectId}
                    onClose={() => setIsEditorOpen(false)}
                />
            )}
        </div>
    );
};

export default React.memo(ImageUploadCard);
