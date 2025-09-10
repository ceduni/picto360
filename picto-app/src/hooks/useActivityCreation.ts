import { useAuth } from "@/authContext/authContext";
import { ActivityIstance } from "@/utils/Types";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useFeedbackBanner } from "./useFeedbackbanner";

export function useCreateActivity () {

    const {userLoggedIn,currentUser} = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [activityId,setActivityId] = useState("");
    const {setBannerMessage} = useFeedbackBanner()

    const createActivity = async (formValues:ActivityIstance) => {
        if (!currentUser || ! userLoggedIn) {
            setError("Not Authetificated");
            return;
        };

        setLoading(true);
        setError(null);

        try {

            const token = await currentUser.getIdToken();

            const createdTeamList = [] ;

            if(formValues.type==="solo" ){
                // create one team with the participants an the creator as supervisor
                const participantsToTeam = {
                    id:uuidv4(),
                    name: "Team_Default",
                    supervised:false,
                    participantsNames: formValues.participantsList,
                    supervisor_id:currentUser.uid,
                } 
                createdTeamList.push(participantsToTeam );
            }else{
                if(formValues.supervised_teams){
                    // TODO : Add supervisors is obligatory when supervised teams
                    formValues.teamsList.map((team)=>{
                        if (!team.supervisor_id) team.supervisor_id = currentUser.uid ;
                        createdTeamList.push(team);
                    })
                }else{
                    formValues.teamsList.map((team)=>{
                        team.supervisor_id = currentUser.uid;
                        createdTeamList.push(team);
                    })
                }
            }
            
            const newActivity = {
                id: uuidv4(),
                title: formValues.title,
                description: formValues.description,
                type: formValues.type,
                tasks: formValues.tasks.map((task)=>task.title),
                authoriseEdit: formValues.authoriseEdit,
                tags: formValues.tags,
                teamsList: createdTeamList
            };

            const response = await fetch("http://localhost:5000/activities", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(newActivity),
            });

            // const data = await response.json(); // 
            // console.log(data);
            if (!response.ok) {
                const error = await response.json();
                setError(error.message);
                console.error("Failed to create activity:", error);
                return;
            } else {
                const created = await response.json();
                setActivityId(created._id);
                setBannerMessage({message:"Activité créée avec succès",type:"success"})
                // console.log("Activity created successfully:", created);
            }
        } catch (err:any) {
                setBannerMessage({message:"Erreur lors de la créaction d'activité",type:"failure"})

                // setError(err);
                // console.error("Something went wrong", err);
        } finally {
                setLoading (false);
        }
    }
    return { createActivity, loading, error ,activityId};
};