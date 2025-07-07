import React, { useEffect, useRef, useState } from "react"
import "./css/EditionPannel.css"
import { HotspotData } from "./HotspotManager"


interface EditionPannelProps {
    hotspot:HotspotData |  null;
    onSave: (hotspot:HotspotData) => void;
}

const EditionPannel : React.FC <EditionPannelProps> = ({hotspot,onSave}) => {

    const [formState, setFormState] = useState<HotspotData | null>(null);    

    useEffect(() => {
        setFormState(hotspot);
    }, [hotspot]);   

    if (!formState) return <p>No hotspot selected</p>;

    return (
        <div className="edition_pannel">
            <form
            onSubmit={(e) => {
                e.preventDefault();
                onSave(formState);
            }} className="annotation_edition_pannel" >
            <label className="edition_pannel_field">Contenu:
                <textarea
                    value={formState.content || ""}
                    onChange={(e) =>
                        setFormState({ ...formState, content: e.target.value })
                    }
                    className="dialog_field"
                    placeholder="Tapez le contenu de votre annotation ..."
                />
            </label>


            {/* Example: URL field */}
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
            )}

            <button type="submit">Save</button>
            </form>
        </div>

    );

}

export default React.memo(EditionPannel);