import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { HotspotData } from "../HotspotManager";
import "../css/EditionPannel.css"


interface EditorProps {
  hotspot: HotspotData;
  onSave: (changes: Partial<HotspotData>) => void;
}

export interface EditorRef {
  submit: () => void;
}


const HyperlinkEditor = forwardRef<EditorRef,EditorProps> (({ hotspot, onSave },ref) => {
  const [url_text, setURL] = useState(hotspot.url_text || "");
  const [content, setContent] = useState(hotspot.content || "");

    const handleSubmit = () => {
        onSave({ url_text,content });
    };

    useEffect(() =>{
        setURL(hotspot.url_text ||"");
        setContent(hotspot.content || "");
    }
    ,[hotspot.id])

    useImperativeHandle(ref, () => ({
        submit: handleSubmit
    }));


  return (
    <form
        onSubmit={handleSubmit} 
        className="annotation_edition_pannel" >
        
        <label className="edition_pannel_field">
            <p className="edition_pannel_field_title">
                Texte à afficher:
            </p>
            <input
                type="text"
                value={content}
                onChange={(e) =>
                    setContent(e.target.value)
                }
                className="dialog_field"
                placeholder="Tapez le nouvel texte ici ..."
            />

            <p className="edition_pannel_field_title">
                Url:
            </p>
            <input
                type="url"
                value={url_text}
                onChange={(e) =>
                    setURL(e.target.value)
                }
                className="dialog_field"
                placeholder="Tapez le nouvel url ici ..."
            />
        </label>


    </form>
  );
}
);

export default HyperlinkEditor;