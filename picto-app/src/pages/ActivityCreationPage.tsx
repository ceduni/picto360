import React, { useCallback, useEffect, useRef, useState } from "react"
import { MdDescription,MdModeEditOutline  } from "react-icons/md";
import { FaEdit , FaPlus} from "react-icons/fa";
import { RxDragHandleDots2, RxPerson ,RxLapTimer} from "react-icons/rx";
import { HiTrash } from "react-icons/hi2";
import { IoMdPricetag  } from "react-icons/io";
import { GoPeople } from "react-icons/go";
import { FaAngleLeft } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

import Switch from "react-switch";
import "./css/ActivityCreationPage.css"
import { useNavigate } from "react-router-dom";
import AddParticipantsPopup from "./AddParticipantsPopup";
import GotoProfile from "@/components/GotoProfile";
import ParticipantCard from "./PageUiComponents/ParticipantCard";
import TeamCard from "./PageUiComponents/TeamCard";

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
import { ActivityIstance, 
    TeamsData,
    addNewParticipants, 
    handleAddTag, 
    handleAddTeamsToActivity, 
    handleChange, 
    handleDeleteTeamFromActivity, 
    handleTeamNameChange, 
    TeamInstance, 
    TaskData,
    handleParticipantNameChange,
    handleDeleteParticipant,
    handleRemoveTag,
    handleRemoveTask,
    handleAddTask,
    validateActivityValues} from "@/utils/ActivityCreactionUtils";
import ErrorBanner, {  ErrorBannerRef } from "./ErrorBanner";


interface ActivityCreationPageProps  {

}


const ActivityCreationPage : React.FC<ActivityCreationPageProps> = () => {
    const [isPopupOpen,setIsPopupOpen] = useState(false);
    const [chronoState,setChronoState] = useState({isEnabled:false,minutes:0,seconds:0})
    const [enteredValue,setEnteredValue] = useState(0);
    const [teamsTotalParticipantsCount,setTeamsTotalParticipantsCount] = useState(0);
    const [selectedTeam,setSelectedTeam] = useState<{indx:number,teamData:TeamInstance}>()

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
        participantsList:[],
        teamsList:[],
        supervised_teams:false,
    });

    useEffect(()=>{
        let newCount = 0
        formValues.teamsList.map((team)=>{
            newCount += team.participantsNames.length;
        })
        setTeamsTotalParticipantsCount(newCount)

    },[formValues.teamsList])


    const bannerRef = useRef<ErrorBannerRef>(null);
    // for error checking
    const validateForm = () =>{
        const check = validateActivityValues(formValues);
        bannerRef.current?.trigger(check.message);
        // setErrorState({displayed:!check.state , message:check.message});
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
        setChronoState({...chronoState, isEnabled:nextChecked});
    };

    const onChangeChronoTime = (e:React.ChangeEvent<HTMLInputElement>) =>{
        const value = e.target.value;

        if(value === "") {
            setChronoState({...chronoState,[e.target.name]:0})
        }else{
            if ( e.target.name && Number(value)>=60) {
                setChronoState({...chronoState,minutes:chronoState.minutes+1,seconds:Number(value) -60})
            }else {
                setChronoState({...chronoState,[e.target.name]:Number(value)});
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

    const onClosePopup = () => {
        setIsPopupOpen(false);
    }
    
    const onOpenPopup = () => {
        setIsPopupOpen(true);
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

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/activities", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("✅ Activity created:", data);
        alert("Activity created successfully!");
      } else {
        console.error("❌ Failed to create activity:", data);
        alert("Something went wrong.");
      }
    } catch (err) {
      console.error("🚨 Error sending request:", err);
      alert("Network error.");
    }
  };

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
{/* 
                {
                    errorState.displayed &&
                    <div className={`error_banner ${errorState.displayed ? "visible" : ""}`}>
                        <LuTriangleAlert size={22}/>
                        <p>{errorState.message}</p>
                        <LuX size={22} onClick={()=>setErrorState({...errorState,displayed:false})} style={{cursor:"pointer"}}/>
                    </div>
                } */}
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
                                                <Switch onChange={(e)=>handleCheckedAddChrono(e)} checked={chronoState.isEnabled} />
                                            </label>
                                            {
                                                chronoState.isEnabled && 
                                                <div className="add_clock-field">
                                                    <p>min:</p>

                                                    <input  type="number"
                                                            name="minutes" 
                                                            value={chronoState.minutes}
                                                            min={0}
                                                            max={60}
                                                            onChange={(e) => onChangeChronoTime(e)}
                                                            className="chrono_field"/>
                                                    <p>sec:</p>

                                                    <input  type="number" 
                                                            name="seconds" 
                                                            value={chronoState.seconds}
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

                        <div className="list_container">
                            {
                                formValues.type === "solo" ? 
                                <div className="list_parent_container">
                                    {
                                        formValues.participantsList.length <= 0 ?
                                        <p className="error_board">Pas de participants</p>
                                        :
                                        <div  className="list_parent_container_inner">
                                            <h3 className="list_title">Liste des participants</h3>

                                            <div className="list_group">
                                                {   formValues.participantsList.map((participant,index) => (
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
                                    <div className="participants_bottom_buttons">
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
                                </div>
                                :
                                <div  className="list_parent_container">
                                    {
                                        formValues.teamsList.length <= 0 ?
                                        <p className="error_board">Pas d'équipes</p>
                                        :
                                        <div  className="list_parent_container_inner">
                                            <h3 className="list_title">Liste des équipes</h3>
                                            <div className="teams_list">
                                                {
                                                    formValues.teamsList.map((teamData,index) => (
                                                        <TeamCard   index={index} 
                                                                    key={teamData.id}
                                                                    teamData={teamData} 
                                                                    handleTeamNameChange={changeTeamName} 
                                                                    setSelectedTeam={setSelectedTeam} 
                                                                    setIsPaticipantsPopupOpen={setIsPopupOpen} 
                                                                    handleDeleteTeam={deleteTeam} />
                                                    ))
                                                }
                                            </div>
                                        </div>
                                        
                                    }
                                    <div className="teams_bottom_buttons">
                                        {
                                            formValues.teamsList.length != 0  && 
                                            <div className="supervised_teams-toggle">
                                                <label className="toggle_supervised">
                                                    <Switch onChange={(e)=>{
                                                                            setFormValues({...formValues,supervised_teams:e});
                                                                            formValues.teamsList.map((teamData)=>{
                                                                                teamData.supervised = e;
                                                                            })
                                                                        }} 
                                                            checked={formValues.supervised_teams} 
                                                            onColor="#364a9d"  
                                                            />
                                                </label>
                                                <p>Équipes supervisées ?</p>
                                            </div>
                                        }

                                        <div className="add_team_field">
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
                                    </div>
                                </div>
                            }

                        </div>


                    </div>

                    <div className="main-right">
                        <div className="participant_numbers_board">
                                <div className="numbers_board_container">
                                    <div className="board_icon">
                                        <RxPerson size={20}/>
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
                                    <FaCheck size={18}/>
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
                                        onClose={onClosePopup} 
                                         />
            }
        </div>
    )
}

export default React.memo (ActivityCreationPage)