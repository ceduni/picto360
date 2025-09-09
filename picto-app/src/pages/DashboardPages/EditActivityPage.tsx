import { ActivityIstance, ParticipantData, TaskData, TeamInstance } from "@/utils/Types";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import "./css/EditActivityPage.css"
import { LuPencilLine } from "react-icons/lu";
import { useGetActivityById } from "@/hooks/useGetUserActivities";
import ParticipantCard from "../PagesUiComponents/ParticipantCard";
import { v4 as uuid4 } from "uuid";


interface EditActivityPageProps {
    setFormValues?:(values: React.SetStateAction<ActivityIstance>) => void;
}

const EditActivityPage :React.FC<EditActivityPageProps> = ()=>{
    const [newActivityDetails,setNewActivityDetails] = useState<ActivityIstance>();
    const [errorMessage,setErrorMessage] = useState<string|null>(null);

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
    const { activity,activityLoading, activityError } = useGetActivityById(id);

    useEffect(()=>{
        const activityTasks :TaskData[] = activity.tasks.map((task:string)=>{
            const id = uuid4()
            return {
                id,
                name:task,
            }
        });
        // const activityTeams :TeamInstance[] = activity.teams.map((team:any)=>{
        //     return {
        //         id:team._id,
        //         name:team.teamName,
        //         participantsNumber:team.participantsList.length;
        //         participantsNames:ParticipantData[] ;
        //         supervisor_id? : string;                
        //     }
        // });         

        // const newActivity : ActivityIstance = {
        //     id:activity._id,
        //     title:activity.title,
        //     tags:activity.tags,
        //     description:activity.description,
        //     tasks:activityTasks,
        //     type:activity.type,
        //     authoriseEdit:activity.authoriseEdit,
        //     participantsList:ParticipantData[],
        //     teamsList:TeamInstance[]            
        // }; 
        setNewActivityDetails(activity);
        setErrorMessage(activityError);
    },[activityLoading])

    //remember recent activity opened
    localStorage.setItem("lastActivityId", id);

    return(
        <div className="dashboard_page">
            <NavigationBar selected="edit"/>
            {
            (!newActivityDetails) ?  
            
            <p className="edit-activity-content-container">{errorMessage}</p>
            :    
            <div className="edit-activity-content-container">
                
                <div className="edit-activity-main-content_top">
                    <div className="actitivity-title">
                        <p> {newActivityDetails.title}</p>
                        <LuPencilLine size={22}/>
                    </div>
                    <div className="close-button">
                        <p>Fermer</p>
                    </div>
                </div>
                <div className="edit-activity-main-content">
                    
                    <div className="edit-activity-main-left">
                        <p>Tag</p>
                        <div className="edit-activity-section">
                            <p>Description</p>
                            <textarea className="edit-activity-input_field" value={newActivityDetails.description}/>
                        </div>
                        <div className="edit-activity-section">
                            <p>Tâches à effectuer</p>
                            {newActivityDetails.tasks.map((task)=>{
                                return <p>{task.title}</p>
                            })}
                        </div>                        
                    </div>

                    <div className="edit-activity-main-right">
                        {/* {newActivityDetails.type=="solo"&&
                        newActivityDetails.teamsList.map((team)=>{return <p>{team.name}</p>})
                        } */}
                    </div>
                </div>
                <p>Vous êtes bien sur la page d'édition</p>
           </div>
            }
        </div>
    )
}

export default React.memo(EditActivityPage);