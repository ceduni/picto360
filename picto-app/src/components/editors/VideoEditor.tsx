import "../css/EditionPannel.css";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { EditorRef, HotspotData } from "../../utils/Types";
import ReactPlayer from "react-player";
import SegmentedControl, { SegmentOption } from "@ui/SegmentedControl";
import { MdAdd, MdLaptopChromebook, MdLink } from "react-icons/md";
import { isValidVideoUrl, isValidYouTubeUrl } from "@/utils/FormInputvalidators";
import { useBanner } from "@/hooks/useBanner";

interface EditorProps {
    hotspot: HotspotData;
    onSave: (changes: Partial<HotspotData>) => void;
}

const VideoEditor = forwardRef<EditorRef, EditorProps>(({ hotspot, onSave }, ref) => {
    const [url_text, setURL] = useState(hotspot.url_text || "");
    const [content, setContent] = useState(hotspot.content || "");
    const [videoType, setVideoType] = useState(hotspot.assetSource === "local" ? "disk" : "url");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const previewUrlRef = useRef<string | null>(null);
    const { setBannerMessage } = useBanner();

    const annotationOptions: SegmentOption[] = [
        { value: "url", label: "Lien", icon: <MdLink /> },
        { value: "disk", label: "Disque", icon: <MdLaptopChromebook /> },
    ];

    useEffect(() => {
        setURL(hotspot.url_text || "");
        setContent(hotspot.content || "");
        setVideoType(hotspot.assetSource === "local" ? "disk" : "url");
        setSelectedFile(null);
    }, [hotspot.id, hotspot.url_text, hotspot.content, hotspot.assetSource]);

    useEffect(() => {
        return () => {
            if (previewUrlRef.current) {
                URL.revokeObjectURL(previewUrlRef.current);
            }
        };
    }, []);

    const handleSubmit = (e?: React.FormEvent) => {
        e?.preventDefault();

        if (
            videoType === "url" &&
            ((!isValidVideoUrl(content) && !isValidYouTubeUrl(content)) || content === "")
        ) {
            setBannerMessage("L'URL saisie n'est pas valide ou ne mène pas vers une vidéo.", "failure");
            return;
        }

        if (videoType === "disk") {
            if (!selectedFile && !hotspot.assetId && !content) {
                setBannerMessage("Veuillez choisir une vidéo locale.", "failure");
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
                    kind: "video",
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

    useImperativeHandle(ref, () => ({
        submit: handleSubmit,
    }));

    const videoTypeLabel = videoType === "url" ? "Lien (URL)" : "Disque (Fichier)";

    return (
        <form onSubmit={handleSubmit} className="annotation_edition_pannel annotation_edition_pannel--video">
            <div className="video_preview_container">
                {content !== "" ? (
                    <div>
                        <ReactPlayer src={content} controls={true} className="video_player" />
                    </div>
                ) : (
                    <div className="video-placeholder">
                        <p className="bare placeholder_message">
                            Aucune vidéo n'a encore été ajoutée
                        </p>
                    </div>
                )}
            </div>

            <SegmentedControl
                id="video-type-selector"
                value={videoType}
                onChange={setVideoType}
                options={annotationOptions}
                variant="icon"
            />
            <div className="video_upload_container">
                <h4 className="title">{videoTypeLabel}</h4>
                {videoType === "url" ? (
                    <input
                        type="url"
                        className="text-field"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="https://www.youtube.com/watch?v=vA..."
                    />
                ) : (
                    <label className="file_upload_label">
                        <input
                            className="file_upload_input"
                            type="file"
                            accept="video/*"
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
                        <span>Choisir une vidéo</span>
                    </label>
                )}
            </div>
        </form>
    );
});

export default VideoEditor;
