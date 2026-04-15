import "../css/EditionPannel.css"
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { EditorRef, HotspotData } from "../../utils/Types";


interface EditorProps {
    hotspot: HotspotData;
    onSave: (changes: Partial<HotspotData>) => void;
}

const LABEL_MAX_LENGTH = 20;

const TextEditor = forwardRef<EditorRef, EditorProps>(({ hotspot, onSave }, ref) => {
    const isLabel = hotspot.type === "label";
    const getInitialContent = () =>
        isLabel ? (hotspot.content || "").slice(0, LABEL_MAX_LENGTH) : (hotspot.content || "");

    const [content, setContent] = useState(getInitialContent());

    const handleSubmit = (e?: React.FormEvent) => {
        e?.preventDefault();
        onSave({ content: isLabel ? content.slice(0, LABEL_MAX_LENGTH) : content });
    };

    useEffect(() => {
        setContent(getInitialContent())
    }
        , [hotspot.id, hotspot.type])

    useImperativeHandle(ref, () => ({
        submit: handleSubmit
    }));


    return (
        <form onSubmit={handleSubmit} className="annotation_edition_pannel" >
            {isLabel ? (
                <label className="edition_pannel_field_title">
                    <span className="label">Étiquette</span>
                    <input
                        type="text"
                        value={content}
                        maxLength={LABEL_MAX_LENGTH}
                        onChange={(e) => setContent(e.target.value.slice(0, LABEL_MAX_LENGTH))}
                        className="text-field"
                        placeholder="Tapez votre étiquette..."
                    />
                    <span className="edition_pannel_field_helper">
                        {content.length}/{LABEL_MAX_LENGTH} caractères
                    </span>
                </label>
            ) : (
                <textarea value={content} onChange={(e) => setContent(e.target.value)}
                    className="dialog_field"
                    placeholder="Tapez le contenu de votre annotation..."
                />
            )}
        </form>
    );
}
);

export default TextEditor;
