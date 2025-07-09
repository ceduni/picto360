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


const TextEditor = forwardRef<EditorRef,EditorProps> (({ hotspot, onSave },ref) => {
  const [content, setContent] = useState(hotspot.content || "");

    const handleSubmit = () => {
        onSave({ content });
    };

    useEffect(() =>{
        setContent(hotspot.content ||"")
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
                Text:
            </p>
            <textarea
                value={content}
                onChange={(e) =>
                    setContent(e.target.value)
                }
                className="dialog_field"
                placeholder="Tapez le contenu de votre annotation ..."
            />
        </label>


        {/* Example: URL field
        {formState.type === "hyperlink" && (
            <>
            <label>URL:</label>
            <input
                type="url"
                value={formState.URL || ""}
                onChange={(e) =>
                setFormState({ ...formState, URL: e.target.value })
                }
            />
            </>
        )} */}
    </form>
  );
}
);

export default TextEditor;