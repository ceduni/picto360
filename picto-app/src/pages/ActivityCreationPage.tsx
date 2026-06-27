import React, {  useEffect, useRef, useState } from "react"
import {
    PencilIcon,
    PlusIcon,
    MinusIcon,
    Bars3Icon,
    TrashIcon,
    UsersIcon,
    ClipboardDocumentListIcon,
    InformationCircleIcon,
    XMarkIcon,
    UserIcon,
    ClockIcon,
} from "@heroicons/react/24/outline";
import {
    BookmarkSquareIcon,
    PaperAirplaneIcon
} from "@heroicons/react/24/solid";


import  { Tooltip } from "react-tooltip"

import Switch, { SwitchProps } from "@mui/material/Switch";
import "./css/ActivityCreationPage.css"
import { useNavigate } from "react-router-dom";
import AddParticipantsPopup from "./AddParticipantsPopup";
import ParticipantCard from "./PagesUiComponents/ParticipantCard";
import DashboardLayout from "./DashboardPages/layout/DashboardLayout";
import TeamCard from "./PagesUiComponents/TeamCard";

import {
  DndContext,
  closestCenter,
  DragEndEvent
} from "@dnd-kit/core";
import { 
    useSortable ,
    SortableContext,
    arrayMove,
    verticalListSortingStrategy} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {  
    addNewParticipants, 
    handleAddTag, 
    handleAddTeamsToActivity, 
    handleChange, 
    handleDeleteTeamFromActivity, 
    handleTeamNameChange, 

    handleParticipantNameChange,
    handleDeleteParticipant,
    handleRemoveTag,
    handleRemoveTask,
    handleAddTask,
    validateActivityValues,} from "@/utils/ActivityCreactionUtils";
import ErrorBanner from "../components/FeedbackBanner";

import  {  MessageBannerRef,ActivityIstance,TeamInstance,TaskData } from "../utils/Types";
import ConfirmationPopup from "./PagesUiComponents/ConfirmationPopup";
import { useCreateActivity } from "@/hooks/useActivityCreation";
import { styled } from "@mui/material/styles";
import { FormControlLabel } from "@mui/material";

const IOSSwitch = styled((props: SwitchProps) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
    width: 32,
    height: 18,
    padding: 0,
    '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 2,
        transitionDuration: '300ms',
        '&.Mui-checked': {
            transform: 'translateX(14px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                backgroundColor: '#1c73fa',
                opacity: 1,
                border: 0,
                ...theme.applyStyles('dark', { backgroundColor: '#1c73fa' }),
            },
            '&.Mui-disabled + .MuiSwitch-track': { opacity: 0.5 },
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': { color: '#33cf4d', border: '6px solid #fff' },
        '&.Mui-disabled .MuiSwitch-thumb': {
            color: theme.palette.grey[100],
            ...theme.applyStyles('dark', { color: theme.palette.grey[600] }),
        },
        '&.Mui-disabled + .MuiSwitch-track': {
            opacity: 0.7,
            ...theme.applyStyles('dark', { opacity: 0.3 }),
        },
    },
    '& .MuiSwitch-thumb': { boxSizing: 'border-box', width: 14, height: 14 },
    '& .MuiSwitch-track': {
        borderRadius: 18 / 2,
        backgroundColor: '#E9E9EA',
        opacity: 1,
        transition: theme.transitions.create(['background-color'], { duration: 500 }),
        ...theme.applyStyles('dark', { backgroundColor: '#39393D' }),
    },
}));




const ActivityCreationPage : React.FC = () => {
    const [isPopupOpen,setIsPopupOpen] = useState(false);
    const [teamsTotalParticipantsCount,setTeamsTotalParticipantsCount] = useState(0);
    const [selectedTeam,setSelectedTeam] = useState<{indx:number,teamData:TeamInstance}>();
    const [confirmationMessage,setConfirmationMessage] = useState<{title:string,details?:string}|null>(null);

    const { createActivity, activityId} = useCreateActivity();

    const [formValues,setFormValues] = useState<ActivityIstance>({
        id:'',
        title:'',
        tags:[],
        description:'',
        tagInput:'',
        tasks:[],
        taskInput:'',
        type:"solo",
        authoriseEdit:false,
        chrono:{isEnabled:false,minutes:0,seconds:0},
        participantsList:[],
        teamsList:[],
        supervised_teams:false,
    });

    // Update the total number of participants
    useEffect(()=>{
        let newCount = 0
        formValues.teamsList.map((team)=>{
            newCount += team.participantsNames.length;
        })
        setTeamsTotalParticipantsCount(newCount)

    },[formValues.teamsList])


    const bannerRef = useRef<MessageBannerRef>(null);

    // for error checking
    const validateForm = async function() {

        const check = validateActivityValues(formValues);
        if(check.state){

            createActivity(formValues);
            setIsPopupOpen(true);
            setConfirmationMessage({title:"Félicitations !!!",details:"Votre activité a été créée avec succès"});

        }else{
            bannerRef.current?.trigger(check.message,"failure");
        }
    }

    const handleAllerClick =()=>{
        navigate(`/dashboard/activity-editor/${activityId}`);
    }

    const createActivityButtonRef = useRef<HTMLButtonElement>(null);
    useEffect (()=>{
        const check = validateActivityValues(formValues).state;
        if(check){
            if(createActivityButtonRef.current){
                createActivityButtonRef.current.style.opacity = "1";
            }
        }else{
            if(createActivityButtonRef.current){
                createActivityButtonRef.current.style.opacity = "0.5";
            }            
        }

    },[formValues])


    const navigate = useNavigate();
    

    // Logique pour le chronomètre
    const handleCheckedAddChrono = (nextChecked:boolean) => {
        const newChrono = {...formValues.chrono,isEnabled:nextChecked};
        setFormValues({...formValues, chrono:newChrono});
    };

    const onChangeChronoTime = (e:React.ChangeEvent<HTMLInputElement>) =>{
        const value = e.target.value;

        if(value === "") {
            const newChrono = {...formValues.chrono,[e.target.name]:0};            
            setFormValues({...formValues,chrono:newChrono});
        }else{
            if ( e.target.name && Number(value)>=60) {
                const newMinutes = formValues.chrono.minutes + Math.floor(Number(value)/60);
                const newChrono = {...formValues.chrono,minutes: newMinutes,seconds:Number(value) % 60};            
                setFormValues({...formValues,chrono:newChrono});
            }else {
                const newChrono = {...formValues.chrono,[e.target.name]:Number(value) };            
                setFormValues({...formValues,chrono:newChrono});
            }
        }
    }

    // Drag and drop for tasks
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (active.id !== over?.id) {
            const oldIndex = formValues.tasks.findIndex((t) => t.id === active.id);
            const newIndex = formValues.tasks.findIndex((t) => t.id === over?.id);

            setFormValues({...formValues,tasks:arrayMove(formValues.tasks,oldIndex,newIndex)});
        }
    };

    // Create a new task item
    function TaskItem({ task }: { task: TaskData }) {
        const {
            attributes,
            listeners,
            setNodeRef,
            transform,
            transition,
            isDragging,
        } = useSortable({ id: task.id });

        const style = {
            transform: CSS.Transform.toString(transform),
            transition,
            opacity: isDragging ? 0.8 : 1,
        };

        return (
            <div ref={setNodeRef} style={style}
            className="task_card"
            >

            <Bars3Icon width={18} height={18} {...listeners} {...attributes} className="drag-handle" />
            <div className="task-chip">
                <span>
                    {task.title}
                </span>
                <div className="delete_task" onClick={()=>setFormValues(handleRemoveTask(formValues,task.title))}>
                    <TrashIcon width={18} height={18} />
                </div>                                            
            </div>
            </div>
        );
    }

    // props handlers for paricipant card 
    const changeParticipantName = (idx:string,toAdd:string) =>{
        setFormValues({...formValues,participantsList:handleParticipantNameChange(formValues.participantsList,idx,toAdd)})
    }
    const deleteParticipantFromActivity = (toDelete:string) =>{
        setFormValues({...formValues,participantsList:handleDeleteParticipant(formValues.participantsList,toDelete)});
    }

    // Remove a participants at the specified index in the list
    const changeTeamName = (index:number,newName:string) => {
        setFormValues(handleTeamNameChange(formValues,index,newName))        
    }

    const deleteTeam = (toRemove:number) => {
        setFormValues(handleDeleteTeamFromActivity(formValues,toRemove))
    }

    const onCloseParticipantsPopup = () => {
        setIsPopupOpen(false);
        setSelectedTeam(undefined);
    }

    // Activity type("individuelle" || "equipe")
    const handleActivityTypeToSolo = () =>{
        if(formValues.type=="group") {
            setFormValues({...formValues,type:"solo"})
        }
    }

    const handleActivityTypeToGroup = () =>{
        if(formValues.type=="solo") {
            setFormValues({...formValues,type:"group"})
        }
    }



    return (
        <DashboardLayout title="Création d'activité" >
            <div className="activity_creation_content">

                <ErrorBanner ref={bannerRef} />

                <div className="activity-page-header">
                    <button type="button" className="cancel-creation_button" onClick={()=>navigate("/dashboard")}>
                        Annuler
                    </button>
                    <button type="button" className="draft-creation_button">
                        <BookmarkSquareIcon width={15} height={15} />
                        Brouillon
                    </button>
                    <button type="button"
                            className="create-activity-button"
                            name="create_activity-button"
                            onClick={validateForm}
                            ref={createActivityButtonRef}>
                        <PaperAirplaneIcon width={15} height={15} />
                        <>Publier</>
                    </button>
                </div>

                <div className="activity_creation-main_content">

                    {/* Left column — two stacked cards */}
                    <div className="main-left-col">

                        <div className="main-left">
                            <div className="card-title-group">
                                <h3 className="main-left_title">Détails de l'activité</h3>
                                <p className="card-subtitle">Renseignez les informations générales de votre activité</p>
                            </div>

                            <div className="main-left-fields">
                                <div className="section-card">
                                    <div className="section-header">
                                        <p className="section-header-title">Titre</p>
                                    </div>
                                    <input  type="text"
                                            name="title"
                                            value={formValues.title}
                                            onChange={(e)=>setFormValues(handleChange(formValues,e))}
                                            maxLength={50}
                                            placeholder="Titre de votre activité..."
                                            className="text_field-title"/>
                                </div>

                                <div className="section-card">
                                    <div className="section-header">
                                        <p className="section-header-title">Tags</p>
                                    </div>
                                    <input  type="text"
                                            name="tagInput"
                                            value={formValues.tagInput}
                                            onChange={(e)=>setFormValues(handleChange(formValues,e))}
                                            onKeyDown={(e)=>e.key==='Enter' && (e.preventDefault(),
                                                                                setFormValues(handleAddTag(formValues))
                                                                                )}
                                            maxLength={30}
                                            placeholder="Maths, Science, etc ..."
                                            className="text_field-tag"/>
                                    <div className="tag-chips_group">
                                        {formValues.tags.map(tag => (
                                            <div className="tag-chip" key={tag}>
                                                <span>{tag}</span>
                                                <div className="tag-chip_delete" onClick={() => setFormValues(handleRemoveTag(formValues,tag))}>
                                                    <XMarkIcon width={14} height={14} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="section-card">
                                    <div className="section-header">
                                        <p className="section-header-title">Description</p>
                                    </div>
                                    <textarea   title="description"
                                                name="description"
                                                value={formValues.description}
                                                onChange={(e)=>setFormValues(handleChange(formValues,e))}
                                                className="text_field-descript"
                                                placeholder="Décrivez votre activité ..."/>
                                </div>
                            </div>
                        </div>

                        {/* Options card */}
                        <div className="options-card">
                            <div className="card-title-group">
                                <h3 className="main-left_title">Options</h3>
                                <p className="card-subtitle">Paramètres supplémentaires pour l'activité</p>
                            </div>
                            <div className="options-row-list">

                                <div className="option-section">
                                    <div className="option-row">
                                        <FormControlLabel
                                            control={
                                                <IOSSwitch
                                                    onChange={(_, checked) => setFormValues({...formValues, authoriseEdit: checked})}
                                                    checked={formValues.authoriseEdit}
                                                />
                                            }
                                            label=""
                                            
                                        />                                        
                                        <div className="option-row__text">
                                            <span className="option-row__label-title">Autoriser l'édition</span>
                                            <span className="option-row__label-desc">Les participants peuvent modifier leurs réponses</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="option-section">
                                    <div className="option-row" >
                                        <FormControlLabel
                                            control={
                                                <IOSSwitch
                                                    onChange={(_, checked) => handleCheckedAddChrono(checked)}
                                                    checked={formValues.chrono.isEnabled}
                                                />
                                            }
                                            label=""
                                        />                                        
                                        <div className="option-row__text">
                                            <span className="option-row__label-title">Chronomètre</span>
                                            <span className="option-row__label-desc">Définir une durée limite pour l'activité</span>
                                        </div>
                                    </div>
                                    {formValues.chrono.isEnabled &&
                                        <div className="add_clock-field">
                                            <ClockIcon width={15} height={15} className="chrono-icon" />
                                            <div className="chrono-inputs">
                                                <div className="chrono-field-group">
                                                    <input type="number" name="minutes"
                                                           value={formValues.chrono.minutes}
                                                           min={0} max={60}
                                                           onChange={(e) => onChangeChronoTime(e)}
                                                           className="chrono_field"
                                                           placeholder="00" />
                                                    <span className="chrono-label">min</span>
                                                </div>
                                                <span className="chrono-separator">:</span>
                                                <div className="chrono-field-group">
                                                    <input type="number" name="seconds"
                                                           value={formValues.chrono.seconds}
                                                           min={0} max={60}
                                                           onChange={(e) => onChangeChronoTime(e)}
                                                           className="chrono_field"
                                                           placeholder="00" />
                                                    <span className="chrono-label">sec</span>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </div>

                            </div>
                        </div>

                    </div>

                    <div className="main-middle">
                        <div className="card-title-group">
                            <h3 className="main-left_title">Participants</h3>
                            <p className="card-subtitle">Ajoutez les participants/équipes de votre activité.</p>
                        </div>                        
                        <div className="section-card">
                            <p className="t-label">Mode d'activité</p>
                            <div className="activity_type_toggle">
                                <button
                                    className={`mode-option${formValues.type === "solo" ? " mode-option--active" : ""}`}
                                    onClick={handleActivityTypeToSolo}
                                >
                                    <UserIcon width={14} height={14} />
                                    <span>Individuelle</span>
                                </button>
                                <button
                                    className={`mode-option${formValues.type === "group" ? " mode-option--active" : ""}`}
                                    onClick={handleActivityTypeToGroup}
                                >
                                    <UsersIcon width={14} height={14} />
                                    <span>Équipes</span>
                                </button>
                            </div>
                        </div>

                        <div className="participant_numbers_board">
                            <div className="numbers_board_container">
                                <div className="board_icon">
                                    <UserIcon width={20} height={20} />
                                </div>
                                <div className="board_text">
                                        <p className="board_mini_title">Participants</p> 
                                        <h2>{formValues.type==="solo"? formValues.participantsList.length : teamsTotalParticipantsCount} </h2> 
                                </div>
                            </div>
                            {
                                formValues.type === "group" && 
                                <div className="numbers_board_separator"/>
                            }
                            {
                                formValues.type === "group" && 
                            <div className="numbers_board_container">
                                <div className="board_icon">
                                    <UsersIcon width={20} height={20} />
                                </div>
                                <div className="board_text">
                                        <p className="board_mini_title">Equipes</p>  
                                        <h2>{formValues.type==="group"? formValues.teamsList.length : "0"}</h2>
                                </div>
                            </div>  
                            }
                        </div>
                        {
                            formValues.type === "group" && 
                            <div className="supervised_teams-toggle">
                                    <IOSSwitch
                                        onChange={(_, checked) => setFormValues({...formValues, supervised_teams: checked})}
                                        checked={formValues.supervised_teams}
                                    />
                                <p className="option-row__label">Équipes supervisées ?</p>
                            </div>
                        }                    

                        <div className ={(formValues.type === "solo") ? "list_container" : " list_container list_container-team"}>
                          
                            {
                                formValues.type === "solo" ? 
                                <div className="list_parent_container">
                                    <h3 className="list_title">Liste des participants</h3>

                                    {formValues.participantsList.length <= 0 ?
                                        <p className="error_board">Pas de participants</p>
                                        :
                                        <div className="list_group">
                                            {formValues.participantsList.map((participant) => (
                                                <ParticipantCard id={participant.id}
                                                                 key={participant.id}
                                                                 participantName={participant.name}
                                                                 handleParticipantNameChange={changeParticipantName}
                                                                 handleDeleteParticipant={deleteParticipantFromActivity} />
                                            ))}
                                        </div>
                                    }

                                    <div className="stepper-row">
                                        <button className="stepper-btn stepper-btn--minus"
                                                onClick={() => {
                                                    const last = formValues.participantsList.at(-1);
                                                    if (last) deleteParticipantFromActivity(last.id);
                                                }}>
                                            <MinusIcon width={14} height={14} />
                                        </button>
                                        <span className="stepper-count">{formValues.participantsList.length}</span>
                                        <button className="stepper-btn stepper-btn--plus"
                                                onClick={() => setFormValues(addNewParticipants(formValues, formValues.participantsList.length + 1))}>
                                            <PlusIcon width={14} height={14} />
                                        </button>
                                    </div>
                                </div>
                                :
                                <div className="list_parent_container">
                                    <h3 className="list_title">Liste des équipes</h3>

                                    {formValues.teamsList.length <= 0 ?
                                        <p className="error_board">Pas d'équipes</p>
                                        :
                                        <div className="list_parent_container_inner">
                                            <div className="teams_list">
                                                {formValues.teamsList.map((teamData, index) => (
                                                    <TeamCard index={index}
                                                              key={teamData.id}
                                                              teamData={teamData}
                                                              supervised={formValues.supervised_teams}
                                                              setSelectedTeam={setSelectedTeam}
                                                              setIsPaticipantsPopupOpen={setIsPopupOpen}
                                                              handleDeleteTeam={deleteTeam} />
                                                ))}
                                            </div>
                                        </div>
                                    }

                                    <div className="stepper-row">
                                        <button className="stepper-btn stepper-btn--minus"
                                                onClick={() => {
                                                    if (formValues.teamsList.length > 0) deleteTeam(formValues.teamsList.length - 1);
                                                }}>
                                            <MinusIcon width={14} height={14} />
                                        </button>
                                        <span className="stepper-count">{formValues.teamsList.length}</span>
                                        <button className="stepper-btn stepper-btn--plus"
                                                onClick={() => setFormValues(handleAddTeamsToActivity(formValues, 1))}>
                                            <PlusIcon width={14} height={14} />
                                        </button>
                                    </div>
                                </div>
                            }

                        </div>


                    </div>

                    <div className="main-right">
                        <div className="card-title-group">
                            <h3 className="main-left_title">Tâches</h3>
                            <p className="card-subtitle">Ajoutez des taches à compléter par les participants.</p>
                        </div>                        
                        <div className="participant_numbers_board">
                                <div className="numbers_board_container">
                                    <div className="board_icon">
                                        <ClipboardDocumentListIcon width={22} height={22} />
                                    </div>
                                    <div className="board_text">
                                          <p className="board_mini_title">Tâches</p> 
                                          <h2>{formValues.tasks.length}</h2> 
                                    </div>
                                </div>
                        </div>

                        <div className="section-card">
                            <div className="add-task_field">
                                <input 
                                    type="text"
                                    name="taskInput"
                                    value={formValues.taskInput}
                                    onChange={(e)=>setFormValues(handleChange(formValues,e))} 
                                    onKeyDown={(e)=>e.key==='Enter' && (e.preventDefault(),setFormValues(handleAddTask(formValues)))}
                                    placeholder="Ajouter une description de tâche..." 
                                    className="text_field-task"/>
                                <div className="add_button" onClick={()=>setFormValues(handleAddTask(formValues))}>
                                    <PlusIcon width={15} height={15} />
                                </div>
                            </div>
                        </div>
                        <div className="list_container">
                            {   formValues.tasks.length <= 0 ?
                                    <p className="error_board">Pas de Tâches</p>
                                    :
                                <div className="list_parent_container">
                                    <h3 className="list_title">
                                        Tâches à effectuer
                                    </h3>
                                    
                                    <div className="tool-tip-tasks"
                                        data-tooltip-id="task-tooltip"
                                        data-tooltip-content="Vous pouvez re-ordonner vos tache avec un drag"
                                    >
                                        <InformationCircleIcon className="tool-tip_content" width={18} height={18} />
                                        <Tooltip id="task-tooltip"/>

                                    </div>

                                    
                                    <div className="list_group">
                                        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                                            <SortableContext 
                                            items={formValues.tasks.map((task)=> task.id)}
                                            strategy={verticalListSortingStrategy}
                                            >
                                                {formValues.tasks.map((task) => (
                                                    <TaskItem key={task.id} task={task} />
                                                ))}
                                            </SortableContext>
                                        </DndContext>
                                    </div>

                            </div>
                            }
                        </div>

                    </div>

                </div>
            </div>
            {
                isPopupOpen && selectedTeam!=undefined &&
                <AddParticipantsPopup   teamIdx={selectedTeam.indx}
                                        teamList={formValues.teamsList}
                                        setFormValues={setFormValues}
                                        onClose={onCloseParticipantsPopup}
                                        handleTeamNameChange={changeTeamName}
                                         />
            }
            {
                isPopupOpen && confirmationMessage &&
                <ConfirmationPopup message={confirmationMessage} type="confirm" handleConfirm={handleAllerClick}/>
            }
        </DashboardLayout>
    )
}

export default React.memo (ActivityCreationPage)