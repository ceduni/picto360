import { ActivityIstance } from "@/utils/ActivityCreactionUtils";
import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import "./css/EditActivityPage.css"
import { LuPencilLine } from "react-icons/lu";
import { useGetActivityById } from "@/hooks/useGetUserActivities";


interface EditActivityPageProps {
    setFormValues?:(values: React.SetStateAction<ActivityIstance>) => void;
}

const EditActivityPage :React.FC<EditActivityPageProps> = ()=>{
    const [newActivityDetails,setNewActivityDetails] = useState();

    const navigate = useNavigate();

    const { id } = useParams();
    
    if(!id || id === null || id === "null" || id === undefined || id === "undefined") return (
        <div className="dashboard_page">
            <NavigationBar selected="edit"/>
            <div className="edit-activvity-main-content">
                
                <div className="edit-activvity-main-content_top">
                    <div className="close-button">
                        <p>Fermer</p>
                    </div>
                </div>
                <p>
                    Vous devez sélectionner une activité à éditer 
                    <a onClick={()=>navigate("/dashboard/your-activities")}>ici</a>
                </p>
           </div>
        </div>
    )

    const { activity, activityLoading, activityError } =  useGetActivityById(id);

    //handle saving activity id to localStorage
    localStorage.setItem("lastActivityId", id);

    return(
        <div className="dashboard_page">
            <NavigationBar selected="edit"/>
            {
                (!activity) ?  <p className="edit-activity-content-container">{activityError}</p>
                :
                
            <div className="edit-activity-content-container">
                
                <div className="edit-activity-main-content_top">
                    <div className="actitivity-title">
                        <p> {activity.title}</p>
                        <LuPencilLine size={22}/>
                    </div>
                    <div className="close-button">
                        <p>Fermer</p>
                    </div>
                </div>
                <div className="edit-activity-main-content">
                    
                </div>
                <p>Vous êtes bien sur la page d'édition</p>
           </div>
            }
        </div>
    )
}

export default React.memo(EditActivityPage);