import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { EditorRef, HotspotData } from "../../utils/Types";
import "../css/EditionPannel.css"
import { isValidUrl } from "@/utils/FormInputvalidators";
import { useBanner } from "@/hooks/useBanner";


interface EditorProps {
    hotspot: HotspotData;
    onSave: (changes: Partial<HotspotData>) => void;
}


const HyperlinkEditor = forwardRef<EditorRef, EditorProps>(({ hotspot, onSave }, ref) => {
    const [url_text, setURL] = useState(hotspot.url_text || "");
    const [content, setContent] = useState(hotspot.content || "");
    const { setBannerMessage } = useBanner();

    const handleSubmit = (e?: React.FormEvent) => {
        e?.preventDefault();

        if (!isValidUrl(url_text)) {
            setBannerMessage("L'URL saisie n'est pas valide.", "failure");
            return;
        }
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


    return (
        <form
            onSubmit={handleSubmit}
            className="annotation_edition_pannel"
        >
            <label className="edition_pannel_field_title">
                <span className="label">URL</span>
                <input className="text-field" type="url" value={url_text}
                    onChange={(e) => setURL(e.target.value) }
                    placeholder="Lien URL..."
                />
            </label>

            <label className="edition_pannel_field_title">
                <span className="label">Texte à afficher</span>
                <input className="text-field" type="text" value={content}
                    onChange={(e) => setContent(e.target.value) }
                    placeholder="Texte à afficher..."
                />
            </label>

        </form>
    );
}
);

export default HyperlinkEditor;