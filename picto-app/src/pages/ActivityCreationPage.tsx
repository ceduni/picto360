import React, {  useEffect, useRef, useState } from "react"
import { MdDescription,MdModeEditOutline  } from "react-icons/md";
import { FaEdit , FaPlus} from "react-icons/fa";
import { RxDragHandleDots2, RxPerson ,RxLapTimer} from "react-icons/rx";
import { HiTrash } from "react-icons/hi2";
import { IoMdPricetag  } from "react-icons/io";
import { GoPeople, GoTasklist } from "react-icons/go";
import { FaAngleLeft } from "react-icons/fa6";
import  { Tooltip } from "react-tooltip"
import { IoClose } from "react-icons/io5";

import Switch from "react-switch";
import "./css/ActivityCreationPage.css"
import { useNavigate } from "react-router-dom";
import AddParticipantsPopup from "./AddParticipantsPopup";
import GotoProfile from "@/components/GotoProfile";
import ParticipantCard from "./PagesUiComponents/ParticipantCard";
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
import { TiInfoLarge } from "react-icons/ti";




const ActivityCreationPage : React.FC = () => {
    const [isPopupOpen,setIsPopupOpen] = useState(false);
    // const [chronoState,setChronoState] = useState({isEnabled:false,minutes:0,seconds:0})
    const [enteredValue,setEnteredValue] = useState(0);
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

            <RxDragHandleDots2 size={18} {...listeners} {...attributes} className="drag-handle"/>
            <div className="task-chip">
                <span>
                    {task.title}
                </span>
                <div className="delete_task" onClick={()=>setFormValues(handleRemoveTask(formValues,task.title))}>
                    <HiTrash size={18}/>
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
        // setFormValues(handleDeleteParticipant(formValues,toDelete));
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

    // const onCloseConfirmationPopup = ()=>{
    //     setIsPopupOpen(false);
    //     setConfirmationMessage(null);
    // }


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
        <div className="activity_creation_background">
            <div className="activity_creation_content">

                <div className="activity_creation_top">
                    <div className="icon_route-back_container" >
                        <div className="icon_route-back" onClick={()=>navigate(-1)}>
                            <FaAngleLeft size={22} />
                        </div>
                    </div>
                    <div className="activity_cration_top-middle">
                        Création d'activité
                    </div>
                    <GotoProfile />
                </div>

                <ErrorBanner ref={bannerRef} />


                <div className="activity_creation-main_content">

                    <div className="main-left">

                        <h3 className="main-left_title">
                            Détails de l'activité 
                        </h3>

                        <div className="main-left-fields">
                            <div className="section-card">
                                <div className="section-header">
                                    <FaEdit />
                                    <p>Titre</p>
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
                                    <IoMdPricetag />
                                    <p>Tags</p>
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
                                <div className = "tag-chips_group">
                                    {formValues.tags.map(tag => (
                                        <div className="tag-chip">
                                            <span key={tag} >
                                                {tag}
                                            </span>
                                            <div className="tag-chip_delete" onClick={() => setFormValues(handleRemoveTag(formValues,tag))}>
                                                <IoClose size={20}/>                                            
                                            </div>
                                        </div>
                                    ))}

                                </div>

                            </div>

                            <div className="section-card">
                                    <div className="section-header">
                                        <MdDescription />
                                        <p>Description</p>
                                    </div>
                                <textarea   title="descrition" 
                                            name="description"
                                            value={formValues.description}
                                            onChange={(e)=>setFormValues(handleChange(formValues,e))}
                                            className="text_field-descript" 
                                            placeholder="Décrivez votre activité ... "/>

                            </div>                        
                            <div className="edition_and_chrono_container">
                                <div className="main-left_section-card">
                                    <div className="section-header">
                                        <MdModeEditOutline />
                                        <p>Autoriser l'edition</p>
                                    </div>
                                        <label className="toggle_authorise">
                                            <Switch onChange={(e)=>setFormValues({...formValues,authoriseEdit:e})} checked={formValues.authoriseEdit} />
                                        </label>
                                </div>
                                
                                <div className="main-left_section-card">
                                        <div className="section-header">
                                            <RxLapTimer/>
                                            <p>Chronomètre</p>
                                        </div>
                                        
                                        <div className="chrono-toggle_and_field">
                                            <label className="toggle_authorise">
                                                <Switch onChange={(e)=>handleCheckedAddChrono(e)} checked={formValues.chrono.isEnabled} />
                                            </label>
                                            {
                                                formValues.chrono.isEnabled && 
                                                <div className="add_clock-field">
                                                    <p>min:</p>

                                                    <input  type="number"
                                                            name="minutes" 
                                                            value={formValues.chrono.minutes}
                                                            min={0}
                                                            max={60}
                                                            onChange={(e) => onChangeChronoTime(e)}
                                                            className="chrono_field"/>
                                                    <p>sec:</p>

                                                    <input  type="number" 
                                                            name="seconds" 
                                                            value={formValues.chrono.seconds}
                                                            min={0}
                                                            max={60}
                                                            onChange={(e) => onChangeChronoTime(e)}
                                                            className="chrono_field"/>
                                                </div>  
                                            }

                                        </div>

                                </div>
                            </div>

                        </div>
                        
                    </div>

                    <div className="main-middle">
                        <div className="activity_type_toggle">
                                <div className={formValues.type === "solo" ? "activity_toggle-button_selected" : "activity_toggle-button"} 
                                    onClick={handleActivityTypeToSolo}>
                                    <p>Activité individuelle</p>
                                </div>

                                <div className={formValues.type === "group" ? "activity_toggle-button_selected" : "activity_toggle-button"}
                                    onClick={handleActivityTypeToGroup}>
                                    <p>Activité d'équipe</p>
                                </div>
                        </div>

                        <div className="participant_numbers_board">
                                <div className="numbers_board_container">
                                    <div className="board_icon">
                                        <RxPerson size={20}/>
                                    </div>
                                    <div className="board_text">
                                          <p className="board_mini_title">Participants</p> 
                                          <h2>{formValues.type==="solo"? formValues.participantsList.length : teamsTotalParticipantsCount} </h2> 
                                    </div>
                                </div>
                                
                                <div className="numbers_board_separator"/>

                                <div className="numbers_board_container">
                                    <div className="board_icon">
                                        <GoPeople size={20} />
                                    </div>
                                    <div className="board_text">
                                          <p className="board_mini_title">Groupes</p>  
                                          <h2>{formValues.type==="group"? formValues.teamsList.length : "0"}</h2>
                                    </div>
                                </div>  
                        </div>
                        {
                            formValues.type === "group" && 
                            <div className="supervised_teams-toggle">
                                    <Switch onChange={(e)=>{
                                                            setFormValues({...formValues,supervised_teams:e});
                                                        }} 
                                            checked={formValues.supervised_teams} 
                                            onColor="#364a9d"  
                                            className="toggle_supervised" />
                                <p>Équipes supervisées ?</p>
                            </div>
                        }                    

                        <div className ={(formValues.type === "solo") ? "list_container" : " list_container list_container-team"}>
                          
                            {
                                formValues.type === "solo" ? 
                                <div className="list_parent_container">

                                    <div className="add_to-list_field">
                                        {
                                            formValues.participantsList.length > 0 &&    
                                            <h3 className="list_title">Liste des participants</h3>

                                        }

                                        <input  type="number"
                                                name="entered_value" 
                                                value={enteredValue} 
                                                onChange={(e)=>setEnteredValue(e.target.valueAsNumber)}
                                                onKeyDown={(e)=>e.key==='Enter' && (
                                                                        e.preventDefault(),
                                                                        setFormValues(
                                                                                addNewParticipants(formValues,formValues.participantsList.length+enteredValue)
                                                                            ),
                                                                        setEnteredValue(0))}
                                                className="enter_number_field"/>

                                        <div className="add_one" onClick={() => {
                                                                            setFormValues(addNewParticipants(formValues,formValues.participantsList.length+1)),
                                                                            setEnteredValue(0)
                                                                        }}>
                                            <FaPlus size={14}/>
                                            <p>1</p>
                                        </div>
                                    </div>                                      
                                    {
                                        formValues.participantsList.length <= 0 ?
                                        <p className="error_board">Pas de participants</p>
                                        :
                                        <div  className="list_parent_container_inner">

                                            <div className="list_group">
                                                {   formValues.participantsList.map((participant) => (
                                                        <ParticipantCard id={participant.id} 
                                                                            key={participant.id}
                                                                            participantName={participant.name} 
                                                                            handleParticipantNameChange={changeParticipantName}
                                                                            handleDeleteParticipant={deleteParticipantFromActivity} />
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    }

                                </div>
                                :
                                <div  className="list_parent_container">
                                    <div className="add_to-list_field">
                                        {
                                            formValues.teamsList.length > 0 &&    
                                            <h3 className="list_title">Liste des équipes</h3>
                                        }

                                        <input  type="number"
                                                name="entered_value"
                                                value={enteredValue} 
                                                onChange={(e)=>setEnteredValue(e.target.valueAsNumber)}
                                                onKeyDown={(e)=>e.key==='Enter' && (
                                                                        e.preventDefault(),
                                                                        setFormValues(handleAddTeamsToActivity(formValues,enteredValue)),
                                                                        setEnteredValue(0))}
                                                className="enter_number_field"/>

                                        <div className="add_one" onClick={() =>setFormValues(handleAddTeamsToActivity(formValues,1))}>
                                            <FaPlus size={14}/>
                                            <p>1</p>
                                        </div>
                                    </div>                                    
                                    {
                                        formValues.teamsList.length <= 0 ?
                                        <p className="error_board">Pas d'équipes</p>
                                        :
                                        
                                        <div  className="list_parent_container_inner">

                                            <div className="teams_list">
                                                {
                                                    formValues.teamsList.map((teamData,index) => (
                                                        <TeamCard   index={index} 
                                                                    key={teamData.id}
                                                                    teamData={teamData} 
                                                                    supervised = {formValues.supervised_teams}
                                                                    
                                                                    setSelectedTeam={setSelectedTeam} 
                                                                    setIsPaticipantsPopupOpen={setIsPopupOpen} 
                                                                    handleDeleteTeam={deleteTeam} />
                                                    ))
                                                }
                                            </div>
                                        </div>
                                        
                                    }
                                </div>
                            }

                        </div>


                    </div>

                    <div className="main-right">
                        <div className="participant_numbers_board">
                                <div className="numbers_board_container">
                                    <div className="board_icon">
                                        <GoTasklist size={22}/>
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
                                    <FaPlus size={15} />
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
                                        <TiInfoLarge className="tool-tip_content"/>
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

                <div className="activity_creation_bottom">
                    <button type="button" 
                            className="cancel-creation_button" 
                            onClick={()=>navigate("/")}>Annuler</button>
                    <button type="button" 
                            className="create-activity-button" 
                            name="create_activity-button"
                            onClick={validateForm}
                            ref={createActivityButtonRef}
                           >Create</button>
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
        </div>
    )
}

export default React.memo (ActivityCreationPage)