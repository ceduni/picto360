//TODO: Move the activity global logic here
import { v4 as uuidv4 } from "uuid";
import { ActivityFull, ActivityIstance, ParticipantData, TaskData, TeamInstance } from "./Types";
import type { UpdateDraftPayload } from "@/hooks/useActivityDraftApi";

export function activityToFormValues(activity: ActivityFull): ActivityIstance {
  const isSolo = activity.mode === "SOLO";

  const timedConstraint = activity.constraints?.find(
    c => c.constraint_type === "TIMED" && c.is_enabled
  );
  const durationSec = (timedConstraint?.constraint_value as any)?.durationSeconds ?? 0;
  const chrono = timedConstraint
    ? { isEnabled: true, minutes: Math.floor(durationSec / 60), seconds: durationSec % 60 }
    : { isEnabled: false, minutes: 0, seconds: 0 };

  const participantsList = isSolo
    ? (activity.teams[0]?.participantsList ?? []).map(p => ({ id: p._id, name: p.name }))
    : [];

  const teamsList: TeamInstance[] = isSolo
    ? []
    : activity.teams.map(t => ({
        id: t._id,
        name: t.teamName,
        participantsNumber: t.participantsList.length,
        supervised: !!t.supervisorId,
        participantsNames: t.participantsList.map(p => ({ id: p._id, name: p.name })),
        supervisor_id: t.supervisorId,
      }));

  return {
    id: activity._id,
    title: activity.title,
    description: activity.description ?? "",
    tags: activity.tags ?? [],
    tasks: (activity.tasks ?? []).map(t => ({ id: t._id, title: t.title })),
    type: isSolo ? "solo" : "group",
    authoriseEdit: activity.authoriseEdit ?? false,
    chrono,
    participantsList,
    teamsList,
    tagInput: "",
    taskInput: "",
  };
}

export function buildDraftPayload(formValues: ActivityIstance): UpdateDraftPayload {
    const mode = formValues.type === "solo" ? "SOLO" : "COLLABORATIVE";

    const tasks = formValues.tasks.map(t => ({ title: t.title, level: "EASY" as const }));

    const constraints = formValues.chrono.isEnabled
        ? [{ constraint_type: "TIMED", constraint_value: { durationSeconds: formValues.chrono.minutes * 60 + formValues.chrono.seconds }, is_enabled: true }]
        : [];

    const teamsList = formValues.type === "solo"
        ? [{ name: "Team_Default", participants: formValues.participantsList.map(p => ({ id: p.id, name: p.name })), supervised: false }]
        : formValues.teamsList.map(t => ({
            name: t.name,
            participants: t.participantsNames.map(p => ({ id: p.id, name: p.name })),
            supervised: t.supervised,
            ...(t.supervised ? { supervisor_id: t.supervisor_id } : {}),
        }));

    return { title: formValues.title, description: formValues.description, mode, tags: formValues.tags, tasks, authoriseEdit: formValues.authoriseEdit, constraints, teamsList };
}
import { useFeedbackBanner } from "@/hooks/useFeedbackbanner";

//Activity details change 
export const handleChange = (formValues:ActivityIstance,e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    return {...formValues, [e.target.name]: e.target.value };
}

// Team management
export const handleAddTeamsToActivity = (formValues:ActivityIstance,newCount: number) =>{
        // can't delete from empty array
        if(formValues.teamsList.length <= 0 && newCount <= 0) return formValues;
        
        const prev = formValues.teamsList;
        let newEntries : TeamInstance[] = [] ;

        if (newCount > 0) {
            newEntries = [...prev,...Array.from({ length: newCount },
                                            (_, i) => ({
                                                id: uuidv4(),
                                                name:`Groupe ${prev.length + i + 1}`,
                                                participantsNumber:0,
                                                supervised:false,
                                                participantsNames:[],
                                            })
                )]
        }else{
            // Trim the array
            if(prev.length>0) {
               newEntries =  prev.slice(0, prev.length+newCount)
            }
        }
        return {...formValues,teamsList:newEntries}
}

export const handleDeleteTeamFromActivity = (formValues:ActivityIstance,indexToremove:number) =>{
    if (formValues.teamsList.length <= 0 || !formValues.teamsList.at(indexToremove) ) return formValues;
    return {...formValues,teamsList : formValues.teamsList.filter(
                                                                             (_,index) => index!=indexToremove )}
}

export const handleTeamNameChange = (formValues:ActivityIstance,index:number,newName:string)=>{
    const update = [...formValues.teamsList]
    update[index].name = newName; 

    return {...formValues,teamsList : update};
}


// Tags management
export const handleAddTag = (formValues:ActivityIstance) =>{
        if (formValues.tagInput.trim() !== '' && !formValues.tags.includes(formValues.tagInput.trim())) {
            return {
                ...formValues,
                tags: [...formValues.tags, formValues.tagInput.trim()],
                tagInput: ''
            };
        }
        return formValues;
}


export const handleRemoveTag = (formValues:ActivityIstance,tagToRemove: string) => {
    return {
    ...formValues,
    tags: formValues.tags.filter(tag => tag !== tagToRemove)
    };
};


// Activity Participants logic

    // Add newCout participants to the activity
export const addNewParticipants = (formValues:ActivityIstance,newCount: number) => {
    if(formValues.participantsList.length<=0 && newCount<= 0) return formValues;

    const previouList = formValues.participantsList;
    let newParticipantsList :ParticipantData[] 
    
        if (newCount > previouList.length) {
        // Add empty strings to fill
        const newEntries : ParticipantData[] = Array.from({ length: newCount - previouList.length },
                                        (_, i) => {
                                            const id =uuidv4();
                                            return {id, name:`Participant ${previouList.length + i + 1}`}}
            );
           newParticipantsList = [...previouList, ...newEntries] ;
        } else {
        // Trim the array
            if(formValues.participantsList.length>0) 
                newParticipantsList= previouList.slice(0, newCount);
            newParticipantsList= previouList
        }

    return {...formValues, participantCount: newCount,participantsList:newParticipantsList};
    
};

export const handleDeleteParticipant = (participants:ParticipantData[],toRemove:string) => {
    if(participants.length <= 0) return participants;

    const newParticipantsList = (participants.filter((participant) => participant.id !== toRemove));

    return newParticipantsList;
}

export const handleParticipantNameChange = (participants:ParticipantData[] , id: string, newName: string) => {
        const updated = [...participants];
        for(let i=0;i<participants.length;i++){
            if(participants[i].id===id){
                updated[i].name = newName;
            }
        }

    return updated;
};

//Tasks Logic 
const validTaskInput = (tasks:TaskData[] , input:string) => { 
    if(input.trim() === "" ) return false;

    // don't add the same task
    for(let indx=0 ;indx<tasks.length;indx++){
        if(tasks.at(indx)?.title===input.trim()){
            return false;
        }
    }
    return true;
}

export const handleAddTask = (formValues:ActivityIstance) => {
    const currentTime = Date.now();
    const id = formValues.tasks.length.toString() +currentTime;

    if (validTaskInput(formValues.tasks,formValues.taskInput)) {
        return{
            ...formValues,
            tasks: [...formValues.tasks, { id:id , title:formValues.taskInput.trim()}],
            taskInput: ''
        };
    }
    return formValues;
};

export const handleRemoveTask = (formValues:ActivityIstance,taskToRemove: string) => {
    const newTasks = formValues.tasks.filter(task => task.title !== taskToRemove);
    return {...formValues,tasks: newTasks};
};   


// error handlind to display to user
export const validateActivityValues = (formValues:ActivityIstance) =>{
        const titleVallue = formValues.title;
        const tags = formValues.tags;
        const description = formValues.description;
        const tasks = formValues.tasks
        const type = formValues.type;
        const participantsList = formValues.participantsList;
        const teamsList = formValues.teamsList;
        const chrono = formValues.chrono;

        let errorMessage = "";

        if(!tasks || tasks.length===0){
            errorMessage = "Erreure: Les taches ne sont pas définies : Veuillez rentrer les tâches";
        }
        if(!type){
            errorMessage = "Erreure: Type d'activité invalid"
        }else{
            if(type==="solo"){
                if (participantsList.length<=0){
                    errorMessage = "Erreure: Vous devez rentrer au moins un participant";
                }
            }else if (type==="group"){
                if(teamsList.length<=0){
                    errorMessage = "Erreure: Vous devez rentrer au moins une équipe";
                }
                teamsList.forEach((team) => {
                    if (team.supervised) {
                        if (!team.supervisor_id || team.supervisor_id === "") {
                            errorMessage = "Erreure: Vous devez ajouter le superviseur de l'équipe : " + team.name;
                        }
                    } else {
                        if (!team.participantsNames || team.participantsNames.length === 0) {
                            errorMessage = "Erreure: Vous devez ajouter les participants de l'équipe : " + team.name;
                        }
                    }
                });

            }
        }

        if(chrono.isEnabled){
            if(chrono.minutes===0 && chrono.seconds===0){
                errorMessage = "Erreure: Vous devez rentrer un chronomètre supérieur à 00:00"
            }
        }
        
        if(!tags ){
            errorMessage = "Erreure: Tags invalides"
        }

        if(!description || description===""){
            errorMessage = "Erreure: Description de l'activité invalide: une description est nécessaire."
        }        

        if(!titleVallue || titleVallue===""){
            errorMessage = "Erreure: Titre de l'activité invalid: Le titre est obligatoire.";
        }                

        if(errorMessage!="") return {state:false,message:errorMessage}
        return {state:true,message:""}
}


const createNewTeamParticipants = (toCreate:number,team:TeamInstance) =>{
    const oldParticipantsList = team.participantsNames;
    if (toCreate > 0) {
    const newEntries :ParticipantData[] = Array.from({ length: toCreate },
                                    (_, i) => {
                                        const id =uuidv4();
                                        return {id, name:`Participant ${oldParticipantsList.length + i + 1}`}
                                        }
                                    
        );
        return [...oldParticipantsList, ...newEntries];
    } else {
        if(oldParticipantsList.length>0) 
            return oldParticipantsList.slice(0, toCreate)
        return oldParticipantsList
    }
}

export const handleAddParticipToTeam = (toAdd:number,team:TeamInstance) => {
    const {setBannerMessage} = useFeedbackBanner();

        if (!team ) {
            setBannerMessage({message:"Erreur d'ajout des participants, Réessayez",type:"failure"});
            return 
        };
        const newTeam = team;

        if (team.participantsNames.length <= 0 && toAdd <= 0) {
            setBannerMessage({message:"Erreur d'ajout des participants, Réessayez",type:"failure"});
            return 
        };

        newTeam.participantsNames = createNewTeamParticipants(toAdd,newTeam);
        
        return newTeam;
    }

