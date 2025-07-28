import { ActivityIstance } from "@/utils/ActivityCreactionUtils";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import "./css/EditActivityPage.css"
import { LuPencilLine } from "react-icons/lu";


interface EditActivityPageProps {
    setFormValues?:(values: React.SetStateAction<ActivityIstance>) => void;
}

const EditActivityPage :React.FC<EditActivityPageProps> = ()=>{
    const [newActivityDetails,setNewActivityDetails] = useState();

    // retrieve data from localStorage
    // const data = JSON.parse(localStorage.getItem("lastActivityData") || "{}");
    const location = useLocation();
    const activityData = location.state?.data;

    return(
        <div className="dashboard_page">
            <NavigationBar selected="edit"/>
            {
                (!activityData) ?  <p className="edit-activvity-main-content">Pas d'activité sélectionnée</p>
                :
            <div className="edit-activvity-main-content">
                
                <div className="edit-activvity-main-content_top">
                    <div className="actitivity-title">
                        <p> {activityData.title}</p>
                        <LuPencilLine size={22}/>
                    </div>
                    <div className="close-button">
                        <p>Fermer</p>
                    </div>
                </div>
                <p>Vous êtes bien sur la page d'édition</p>
           </div>
            }
        </div>
    )
}

export default React.memo(EditActivityPage);