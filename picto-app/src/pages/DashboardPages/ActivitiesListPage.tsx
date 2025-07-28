import React, { useCallback } from "react"
import NavigationBar from "./NavigationBar"
import UseAnimations from "react-useanimations";
import loading2 from 'react-useanimations/lib/loading2';
import ActivityCard from "./ActivityCard"
import { useFetchActivities } from "@/hooks/useGetUserActivities";


interface ActivitiesListProps {

}

const ActivitiesListPage :React.FC<ActivitiesListProps> = ()=>{
    const { userActivities, loading , getActivitiesError} =  useFetchActivities();


    const now :Date = new Date();
    const activityTestData = {
        title:"Jeff Activity",
        creationdate : now,
        participantsCount : 3,        
    }



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
                            {
                                (getActivitiesError!=null && userActivities) ?
                                    userActivities.map((activity)=>{
                                        const activityToDisplay = {
                                            title:activity.title,
                                            creationdate: activity.createdAt,
                                            totalParticipants:activity.totalParticipants,
                                            ownership:activity.ownership
                                        }
                                        return <ActivityCard activityData={activityToDisplay}/>
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