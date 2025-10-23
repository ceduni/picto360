import "../css/EditionPannel.css"
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { EditorRef, HotspotData } from "../../utils/Types";
import SegmentedControl, { SegmentOption } from "@ui/SegmentedControl";
import { MdAdd, MdLaptopChromebook, MdLink, } from "react-icons/md";


interface EditorProps {
    hotspot: HotspotData;
    onSave: (changes: Partial<HotspotData>) => void;
}


const ImageEditor = forwardRef<EditorRef, EditorProps>(({ hotspot, onSave }, ref) => {
    const [url_text, setURL] = useState(hotspot.url_text || "");
    const [content, setContent] = useState(hotspot.content || "");
    const [imageType, setImageType] = useState("url");

    // Annotation type options with icons
    const annotationOptions: SegmentOption[] = [
        { value: "url", label: "Lien", icon: <MdLink /> },
        { value: "disk", label: "Disque", icon: <MdLaptopChromebook /> },
    ];


    const handleSubmit = (e?: React.FormEvent) => {
        e?.preventDefault();
        onSave({ url_text, content });
    };

    useEffect(() => {
        setURL(hotspot.url_text || "");
        setContent(hotspot.content || "");
    }
        , [hotspot.id])

    useImperativeHandle(ref, () => ({
        submit: handleSubmit
    }));

    const imageTypeLabel = imageType === "url" ? "Lien (URL)" : "Disque (Fichier)";

    return (
        <form onSubmit={handleSubmit} className="annotation_edition_pannel" >
            <div className="video_preview_container">
                {content != "" ?
                    <div>
                        <img src={content} className="video_player" />
                    </div>
                    :
                    <div className="video-placeholder">
                        <p className="bare placeholder_message">
                            Aucune image n'a encore été ajoutée
                        </p>
                    </div>
                }
            </div>
            <SegmentedControl id="video-type-selector"
                value={imageType}
                onChange={setImageType}
                options={annotationOptions}
                variant="icon"
            />
            <div className="video_upload_container">
                <h4 className="title">{imageTypeLabel}</h4>
                {imageType == "url" ?
                    <input type="url" className="text-field" value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Lien vers l'image..."
                    />
                    :
                    (
                        <label className="file_upload_label">
                            <input className="file_upload_input" type="file" accept="image/*"
                                onChange={async (e) => {
                                    const file = e.target.files?.[0];
                                    if (file) setContent(URL.createObjectURL(file));
                                }}
                            />
                            <MdAdd className="file_upload_icon" />
                            <span>Choisir une image</span>
                        </label>
                    )
                }
            </div>

        </form>
    );
}
);

export default ImageEditor;