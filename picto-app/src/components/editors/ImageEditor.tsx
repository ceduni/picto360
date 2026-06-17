import "../css/EditionPannel.css";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { EditorRef, HotspotData } from "../../utils/Types";
import SegmentedControl, { SegmentOption } from "@ui/SegmentedControl";
import { MdAdd, MdLaptopChromebook, MdLink } from "react-icons/md";
import { isValidImageUrl } from "@/utils/FormInputvalidators";
import { useBanner } from "@/hooks/useBanner";

interface EditorProps {
    hotspot: HotspotData;
    onSave: (changes: Partial<HotspotData>) => void;
}

const ImageEditor = forwardRef<EditorRef, EditorProps>(({ hotspot, onSave }, ref) => {
    const [url_text, setURL] = useState(hotspot.url_text || "");
    const [content, setContent] = useState(hotspot.content || "");
    const [imageType, setImageType] = useState(hotspot.assetSource === "local" ? "disk" : "url");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const previewUrlRef = useRef<string | null>(null);
    const { setBannerMessage } = useBanner();

    const annotationOptions: SegmentOption[] = [
        { value: "url", label: "Lien", icon: <MdLink /> },
        { value: "disk", label: "Disque", icon: <MdLaptopChromebook /> },
    ];

    const handleSubmit = (e?: React.FormEvent) => {
        e?.preventDefault();

        if (imageType === "url" && (!isValidImageUrl(content) || content === "")) {
            setBannerMessage("L'URL saisie n'est pas valide ou ne mène pas vers une image.", "failure");
            return;
        }

        if (imageType === "disk") {
            if (!selectedFile && !hotspot.assetId && !content) {
                setBannerMessage("Veuillez choisir une image locale.", "failure");
                return;
            }

            onSave({
                url_text,
                content,
                assetSource: "local",
                pendingAsset: selectedFile ? {
                    blob: selectedFile,
                    fileName: selectedFile.name,
                    mimeType: selectedFile.type,
                    kind: "image",
                } : undefined,
            });
            return;
        }

        onSave({
            url_text,
            content,
            assetId: undefined,
            assetSource: undefined,
            fileName: undefined,
            mimeType: undefined,
            pendingAsset: undefined,
        });
    };

    useEffect(() => {
        setURL(hotspot.url_text || "");
        setContent(hotspot.content || "");
        setImageType(hotspot.assetSource === "local" ? "disk" : "url");
        setSelectedFile(null);
    }, [hotspot.id, hotspot.url_text, hotspot.content, hotspot.assetSource]);

    useEffect(() => {
        return () => {
            if (previewUrlRef.current) {
                URL.revokeObjectURL(previewUrlRef.current);
            }
        };
    }, []);

    useImperativeHandle(ref, () => ({
        submit: handleSubmit,
    }));

    const imageTypeLabel = imageType === "url" ? "Lien (URL)" : "Disque (Fichier)";

    return (
        <form onSubmit={handleSubmit} className="annotation_edition_pannel">
            <div className="video_preview_container">
                {content !== "" ? (
                    <div>
                        <img title="image_placeholder" src={content} className="video_player" />
                    </div>
                ) : (
                    <div className="video-placeholder">
                        <p className="bare placeholder_message">
                            Aucune image n'a encore été ajoutée
                        </p>
                    </div>
                )}
            </div>
            <SegmentedControl
                id="video-type-selector"
                value={imageType}
                onChange={setImageType}
                options={annotationOptions}
                variant="icon"
            />
            <div className="video_upload_container">
                <h4 className="title">{imageTypeLabel}</h4>
                {imageType === "url" ? (
                    <input
                        type="url"
                        className="text-field"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Lien vers l'image..."
                    />
                ) : (
                    <label className="file_upload_label">
                        <input
                            className="file_upload_input"
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (!file) {
                                    return;
                                }

                                if (previewUrlRef.current) {
                                    URL.revokeObjectURL(previewUrlRef.current);
                                }

                                const previewUrl = URL.createObjectURL(file);
                                previewUrlRef.current = previewUrl;
                                setSelectedFile(file);
                                setContent(previewUrl);
                            }}
                        />
                        <MdAdd className="file_upload_icon" />
                        <span>Choisir une image</span>
                    </label>
                )}
            </div>
        </form>
    );
});

export default ImageEditor;
