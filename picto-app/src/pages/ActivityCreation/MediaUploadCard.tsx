import React, { useState } from "react";
import { ActivityIstance } from "@/utils/Types";
import ImageUploader from "@/components/ImageUploader";
import { useAuth } from "@/authContext/authContext";
import { useActivityDraftApi } from "@/hooks/useActivityDraftApi";
import { useFeedbackBanner } from "@/hooks/useFeedbackbanner";
import { attachPlaygroundMedia, ensureActivityPlayground, isVideoMedia, uploadMedia } from "@/utils/MediaUploadUtils";
import ActivityPlaygroundEditor from "./ActivityPlaygroundEditor";
import SecureMediaView from "@/components/SecureMediaView";

interface Props {
    formValues: ActivityIstance;
    setFormValues: React.Dispatch<React.SetStateAction<ActivityIstance>>;
}

const MediaUploadCard: React.FC<Props> = ({ formValues, setFormValues }) => {
    // null when idle, 0..1 while a file is being uploaded
    const [uploadProgress, setUploadProgress] = useState<number | null>(null);
    const [isReplacing, setIsReplacing] = useState(false);
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const { currentUser } = useAuth();
    const { createDraft } = useActivityDraftApi();
    const { setBannerMessage } = useFeedbackBanner();

    const mainMedias = formValues.playground?.main_medias ?? [];
    const mainMedia = mainMedias[0];
    const isUploading = uploadProgress !== null;

    const handleMediaUpload = async (file: File) => {
        if (!currentUser) {
            setBannerMessage({ message: "Vous devez être connecté pour ajouter un fichier", type: "failure" });
            return;
        }

        setUploadProgress(0);
        try {
            const token = await currentUser.getIdToken();

            // The playground media upload is saved immediately (not buffered
            // until "Brouillon"/"Publier"), so if this is a brand new
            // activity with no server draft yet, create one now.
            let activityId = formValues.id;
            if (!activityId) {
                activityId = await createDraft(formValues.title.trim() || "Nouvelle activité");
            }

            const playground = formValues.playground ?? await ensureActivityPlayground(activityId, token);
            const media = await uploadMedia(file, playground._id, token, { onProgress: setUploadProgress });
            const activity = await attachPlaygroundMedia(activityId, media._id, token, mainMedias.length > 0);

            setFormValues((prev) => ({
                ...prev,
                id: activityId,
                playground: activity.playground,
            }));
            setIsReplacing(false);
            setBannerMessage({ message: "Fichier ajouté avec succès", type: "success" });
        } catch (error) {
            console.error("Failed to upload playground media:", error);
            const message = error instanceof Error ? error.message : "";
            setBannerMessage({ message: `Erreur lors de l'ajout du fichier. ${message}`, type: "failure" });
        } finally {
            setUploadProgress(null);
        }
    };

    const renderUploader = () => isUploading ? (
        <div className="playground-upload-progress" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(uploadProgress * 100)}>
            <div className="playground-upload-progress__bar" style={{ width: `${uploadProgress * 100}%` }} />
            <span className="playground-upload-progress__label">Téléversement… {Math.round(uploadProgress * 100)}%</span>
        </div>
    ) : (
        <ImageUploader
            onImageUpload={handleMediaUpload}
            accept="image/*,video/*"
            prompt={<><b>Selectionnez une image ou une vidéo 360°</b><br /> ou glissez la simplement ici</>}
        />
    );

    return (
        <div className="main-card">
            <div className="card-title-group">
                <h3 className="main-left_title">Image ou vidéo</h3>
                <p className="card-subtitle">Ajoutez une image ou une vidéo pour le déroulement de l'activité.</p>
            </div>

            <div className="list_container">
                {mainMedia && !isReplacing ? (
                    <div className="playground-image-preview">
                        <SecureMediaView key={mainMedia._id} media={mainMedia} />
                        <div className="playground-image-preview__actions">
                            {isVideoMedia(mainMedia) ? (
                                <span className="playground-image-preview__hint">
                                    Les points d'intérêt sur vidéo 360° arrivent bientôt.
                                </span>
                            ) : (
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
                                onClick={() => setIsReplacing(true)}
                            >
                                Remplacer le fichier
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="playground-image-preview">
                        {renderUploader()}
                        {isReplacing && !isUploading && (
                            <div className="playground-image-preview__actions">
                                <button
                                    type="button"
                                    className="playground-image-preview__replace"
                                    onClick={() => setIsReplacing(false)}
                                >
                                    Annuler
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {isEditorOpen && formValues.playground && (
                <ActivityPlaygroundEditor
                    projectId={formValues.playground._id}
                    onClose={() => setIsEditorOpen(false)}
                />
            )}
        </div>
    );
};

export default React.memo(MediaUploadCard);
