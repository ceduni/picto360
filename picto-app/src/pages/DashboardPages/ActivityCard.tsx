import React from "react";
import "./css/ActivitiesListPage.css"


interface ActivityCardProps  {
    activityData:{
        id:any;
        title:string,
        creationdate:string,
        totalParticipants : number,
        groupCount?:number,
        ownership?:string,
        status?:string,
    };
    handleGotoActivity:(activityId:string) => void ;
}

const ActivityCard : React.FC<ActivityCardProps> = ({activityData,handleGotoActivity}) =>{

    return(
        <div className="activity-card">
            <div className="activity-card-text-fields activities-list-content-values"
                onClick={()=>handleGotoActivity(activityData.id)}>
                <p className="activity-card-title">{activityData.title}</p>
                <p className="activity-card-subtitle">{(activityData.creationdate.split("T")[0])}</p>
                <p className="activity-card-subtitle">{activityData.totalParticipants} Participant (s)</p>
                <p className="activity-card-subtitle">{activityData.ownership}</p>
            </div>

            <div className="activity-card-close-button">
                <p>Fermer</p>
            </div>
        </div>
    )
}

export default React.memo(ActivityCard);