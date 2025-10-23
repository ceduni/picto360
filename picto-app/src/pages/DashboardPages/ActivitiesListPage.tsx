import React from "react"
import NavigationBar from "./NavigationBar"
import UseAnimations from "react-useanimations";
import loading2 from 'react-useanimations/lib/loading2';
import ActivityCard from "./ActivityCard"
import { useFetchActivities } from "@/hooks/useGetUserActivities";
import { useNavigate } from "react-router-dom";



const ActivitiesListPage :React.FC = ()=>{
    const { userActivities, loading , getActivitiesError} =  useFetchActivities();

    const navigate = useNavigate();
    
    const goToActivity = (activityId: string) => {
        navigate(`/dashboard/activity-editor/${activityId}`);
    };

    return(
        <div className="dashboard_page">
            <NavigationBar selected="activities"/>
            <div className="activities-list-content-container">
                {
                    loading ?
                    <div className="activities-list-content-loading">
                        <UseAnimations animation ={loading2} size={100} fillColor="#364A9D"/>
                        <p>Chargement de vos activités</p>
                    </div>
                    :
                    <div className="activities-list-content">
                        <div className="activities-list-content-top">
                            <p>Toutes vos activités</p>
                        </div>
                        <div className="activities-list-content-main">
                            
                            <div className="activity-card">
                                <div className="activities-list-content-values activities-list-content-header">
                                    <p >Titre</p>
                                    <p >Créé le</p>
                                    <p >Participants</p>
                                    <p >ownership</p>
                                </div>
                                <div className="space-evener"/>
                            </div>
                            {
                                (getActivitiesError === null && userActivities) ?
                                    userActivities.map((activity)=>{
                                        const activityToDisplay = {
                                            id:activity._id,
                                            title:activity.title,
                                            creationdate: activity.createdAt,
                                            totalParticipants:activity.totalParticipants,
                                            ownership:activity.ownership
                                        }
                                        return <ActivityCard key={activity._id} activityData={activityToDisplay} handleGotoActivity = {goToActivity}/>
                                    })
                                :
                                <p>Aucune acitivités trouvées</p>
                            }
                            {/* <p>Vous êtes sur la page d'activités</p> */}
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default React.memo(ActivitiesListPage)