import React from "react";
import "./css/ActivitiesListPage.css"


interface ActivityCardProps  {
    activityData:{
        title:string,
        creationdate:string,
        totalParticipants : number,
        groupCount?:number,
        ownership?:string,
        status?:string,
    };
}

const ActivityCard : React.FC<ActivityCardProps> = ({activityData}) =>{

    return(
        <div className="activity-card">
            <div className="activity-card-text-fields">
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