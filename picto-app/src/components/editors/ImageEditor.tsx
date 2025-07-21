import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { HotspotData } from "../HotspotManager";
import { IoAddOutline } from "react-icons/io5";

import "../css/EditionPannel.css"


interface EditorProps {
  hotspot: HotspotData;
  onSave: (changes: Partial<HotspotData>) => void;
}

export interface EditorRef {
  submit: () => void;
}


const ImageEditor = forwardRef<EditorRef,EditorProps> (({ hotspot, onSave },ref) => {
  const [url_text, setURL] = useState(hotspot.url_text || "");
  const [content, setContent] = useState(hotspot.content || "");

    const handleSubmit = (e?:React.FormEvent) => {
        e?.preventDefault();
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

    const handleImageUpload = async () =>{
        const file = await new Promise<File | null>((resolve) => {
            const input = document.createElement("input");
            input.type = "file";
            input.accept = "image/*";
            input.onchange = (e) => resolve((e.target as HTMLInputElement).files?.[0] || null);
            input.click();
          });
        if(file){
            setContent(URL.createObjectURL(file));
        }
    }


  return (
    <form
        onSubmit={handleSubmit} 
        className="annotation_edition_pannel" >
        
        <label className="edition_pannel_field">
            <p className="edition_pannel_field_title">
                Texte de l'image:
            </p>
            <input
                type="text"
                value={url_text}
                onChange={(e) =>
                    setURL(e.target.value)
                }
                className="dialog_field"
                placeholder="Tapez le nouvel texte ici ..."
            />

            <p className="edition_pannel_field_title">
                Image:
            </p>
            <div className="image_preview_container">
                <img title={url_text} src={content} className="image_preview"/>
                
                <div className="add_image_button" onClick={handleImageUpload }>
                    <IoAddOutline
                        type="button"
                        className="add_image_icon"
                    />
                </div>
            </div>

        </label>


    </form>
  );
}
);

export default ImageEditor;