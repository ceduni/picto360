import "../css/EditionPannel.css"
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { EditorRef, HotspotData } from "../../utils/Types";


interface EditorProps {
    hotspot: HotspotData;
    onSave: (changes: Partial<HotspotData>) => void;
}

const TextEditor = forwardRef<EditorRef, EditorProps>(({ hotspot, onSave }, ref) => {
    const [content, setContent] = useState(hotspot.content || "");

    const handleSubmit = (e?: React.FormEvent) => {
        e?.preventDefault();
        onSave({ content });
    };

    useEffect(() => {
        setContent(hotspot.content || "")
    }
        , [hotspot.id])

    useImperativeHandle(ref, () => ({
        submit: handleSubmit
    }));


    return (
        <form onSubmit={handleSubmit} className="annotation_edition_pannel" >
            <textarea value={content} onChange={(e) => setContent(e.target.value)}
                className="dialog_field"
                placeholder="Tapez le contenu de votre annotation..."
            />
        </form>
    );
}
);

export default TextEditor;