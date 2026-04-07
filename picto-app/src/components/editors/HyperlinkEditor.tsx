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
    const [url, setURL] = useState(hotspot.url_text || ""); // link to open
    const [content, setContent] = useState(hotspot.content || ""); // text to display (if empty, url will be displayed)
    const { setBannerMessage } = useBanner();

    const handleSubmit = (e?: React.FormEvent) => {
        e?.preventDefault();

        if (!isValidUrl(url)) {
            setBannerMessage("L'URL saisie n'est pas valide.", "failure");
            return;
        }

        const text_to_view = content.trim() ==="" ? url : content;
        onSave({ url_text: url, content:text_to_view });
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
                <input className="text-field" type="url" value={url}
                    onChange={(e) => setURL(e.target.value) }
                    placeholder="Lien URL..."
                />
            </label>

            <label className="edition_pannel_field_title">
                <span className="label">Texte à afficher</span>
                <input className="text-field" type="text" value={content}
                    onChange={(e) => setContent(e.target.value.trim()) }
                    placeholder="Texte à afficher..."
                />
            </label>

        </form>
    );
}
);

export default HyperlinkEditor;