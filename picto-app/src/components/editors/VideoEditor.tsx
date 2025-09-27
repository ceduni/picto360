import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { EditorRef, HotspotData } from "../../utils/Types";
import { IoAddOutline } from "react-icons/io5";
import ReactPlayer from "react-player";

import "../css/EditionPannel.css"


interface EditorProps {
  hotspot: HotspotData;
  onSave: (changes: Partial<HotspotData>) => void;
}


const VideoEditor = forwardRef<EditorRef,EditorProps> (({ hotspot, onSave },ref) => {
  const [url_text, setURL] = useState(hotspot.url_text || "");
  const [content, setContent] = useState(hotspot.content || "");
  const [videoType,setVideoType] = useState("url");

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

    const handleVideoUpload = async () =>{
        const file = await new Promise<File | null>((resolve) => {
            const input = document.createElement("input");
            input.type = "file";
            input.accept = "video/*";
            input.onchange = (e) => resolve((e.target as HTMLInputElement).files?.[0] || null);
            input.click();
          });
        if(file){
            setContent(URL.createObjectURL(file));
        }
    }

    const handleChangeVideoTypeToUrl = () =>{
        if(videoType==="disk"){
            setVideoType("url");
            return;
        }
    }

    const handleChangeVideoTypeToDisk = () =>{
        if(videoType==="url"){
            setVideoType("disk")
            return;
        }
    }


  return (
    <form
        onSubmit={handleSubmit} 
        className="annotation_edition_pannel" >
        
        {/* <label className="edition_pannel_field">
            <p className="edition_pannel_field_title">
                Texte à afficher:
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
        </label> */}
        
            <div>
                {content != ""? 
                    <div>
                        <p className="edition_pannel_field_title">Prévisualisation:</p>
                        <ReactPlayer src = {content} controls={true} className="video_player" />
                    </div>

                :
                <p className="error_message">
                    Pas de vidéo Entrée
                </p> }
            </div>

            <div className="edition_pannel_logic">
                <p className="edition_pannel_field_title">
                    Ajouter une nouvelle video
                </p>
                <div className="big_toggle_switch">
                    <div className={videoType === "url" ? "toggle_button_selected" : "toggle_button"} onClick={handleChangeVideoTypeToUrl}>
                        <p>Lien</p>
                    </div>
                    <div className={videoType === "disk" ? "toggle_button_selected" : "toggle_button"} onClick={handleChangeVideoTypeToDisk}>
                        <p>Disque</p>
                    </div>
                </div>

                <div className="video_upload_container">  
                    {videoType == "url" ?
                            <input
                                type="text"
                                value={content}
                                onChange={(e) =>
                                    setContent(e.target.value)
                                }
                                className="dialog_field"
                                placeholder="Tapez le nouvel url ici ..."
                            />
                        :
                        <div className="add_image_button" onClick={handleVideoUpload}>
                            <IoAddOutline
                                type="button"
                                className="add_image_icon"
                            />
                        </div>
                    }              

                </div>
            </div>


    </form>
  );
}
);

export default VideoEditor;