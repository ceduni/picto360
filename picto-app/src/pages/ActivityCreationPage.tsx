import GotoProfile from "@/components/GotoProfile";
import React, { useState } from "react"
import { MdDescription,MdModeEditOutline  } from "react-icons/md";
import { FaEdit , FaMinus, FaPlus} from "react-icons/fa";
import { RxDragHandleDots2, RxPerson ,RxLapTimer} from "react-icons/rx";
import { HiTrash } from "react-icons/hi2";
import { IoMdPricetag ,IoIosArrowForward } from "react-icons/io";
import { LuUserRoundPlus } from "react-icons/lu";

import { GoPeople, GoPersonAdd } from "react-icons/go";
import { FaAngleLeft } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa6";
import Switch from "react-switch";
import "./css/ActivityCreationPage.css"
import { useNavigate } from "react-router-dom";
import AddParticipantsPopup from "./AddParticipantsPopup";
import { IoClose } from "react-icons/io5";
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


interface ActivityCreationPageProps  {

}

type ActivityData = {
    id:string,
    title:string,
    tags:string[],
    description:string,
    tasks:TaskData[],
    type:string,
    authoriseEdit:boolean;
    participantCount:number;
    teamsList:TeamsData[]
}

interface ActivityIstance extends ActivityData{
    tagInput:string,
    taskInput:string,
    supervised_teams:boolean,
}

type TeamsData = {
    name:string;
    participantsNumber:number;
    supervised:boolean;
    participantsNames?:string[];
    supervisor_id? : string;
}

type TaskData = {
    id:string,
    title:string,
}

const ActivityCreationPage : React.FC<ActivityCreationPageProps> = () => {
    const [isPopupOpen,setIsPopupOpen] = useState(false);
    const [chronoState,setChronoState] = useState({isEnabled:false,minutes:0,seconds:0})
    const [participantsList,setParticipantsList] = useState<string[]>([]);
    const [enteredValue,setEnteredValue] = useState(0);
    const [teamDetails,setTeamDetails] = useState<TeamsData | null>(null);

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
        participantCount:0,
        teamsList:[],
        supervised_teams:false,
    });


    const navigate = useNavigate();

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

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (active.id !== over?.id) {
            const oldIndex = formValues.tasks.findIndex((t) => t.id === active.id);
            const newIndex = formValues.tasks.findIndex((t) => t.id === over?.id);

            // const updated = [...formValues.tasks];
            // const [moved] = updated.splice(oldIndex, 1);
            // updated.splice(newIndex, 0, moved);
            setFormValues({...formValues,tasks:arrayMove(formValues.tasks,oldIndex,newIndex)});
        }
    };

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
                <div className="delete_task" onClick={()=>handleRemoveTask(task.title)}>
                    <HiTrash size={18}/>
                </div>                                            
            </div>
            </div>
        );
    }

      // Update fields
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const newValues = {...formValues, [e.target.name]: e.target.value };
        setFormValues(newValues);
    };

    const updateParticipantCount = (newCount: number) => {
        if(formValues.participantCount<=0 && newCount<= 0) return;
        setFormValues({...formValues,participantCount: newCount});
        
        setParticipantsList((prev) => {
            if (newCount > prev.length) {
            // Add empty strings to fill
            const newEntries = Array.from({ length: newCount - prev.length },
                                            (_, i) => `Participant ${prev.length + i + 1}`
                );
                return [...prev, ...newEntries];
            } else {
            // Trim the array
                if(formValues.participantCount>0) 
                    return prev.slice(0, newCount)
                return prev
            }
        });
    };

    const handleDeleteParticipant = (toRemove:number) => {
        if(formValues.participantCount <= 0) return;

        setFormValues({...formValues,participantCount: formValues.participantCount-1 });
        setParticipantsList((prev) =>{
            return (prev.filter((_, index) => index !== toRemove))
        } )
    }

    const handleParticipantNameChange = (index: number, newName: string) => {
        setParticipantsList((prev) => {
            const updated = [...prev];
            updated[index] = newName;
            return updated;
        });
    };

    const handleTeamNameChange = (index:number,newName:string) => {
        const update = [...formValues.teamsList]
        update[index].name = newName; 
        setFormValues({...formValues,teamsList : update})        
    }

    const handleDeleteTeam = (toRemove:number) => {
        if (formValues.teamsList.length <= 0 || !formValues.teamsList.at(toRemove) ) return;

        setFormValues({...formValues,teamsList : formValues.teamsList.filter(
                                                                         (_,index) => index!=toRemove )})
    }

    const handleAddTeams = (newCount: number) => {
        // can't delete from empty array
        if(formValues.teamsList.length <= 0 && newCount <= 0) return;
        
        const prev = formValues.teamsList;
        let newEntries : TeamsData[] = [] ;

        if (newCount > 0) {
            newEntries = [...prev,...Array.from({ length: newCount },
                                            (_, i) => ({
                                                name:`Groupe ${prev.length + i + 1}`,
                                                participantsNumber:0,
                                                supervised:false})
                )]
        }else{
            // Trim the array
            if(prev.length>0) {
               newEntries =  prev.slice(0, prev.length+newCount)
            }
        }
        setFormValues({...formValues,teamsList:newEntries})

    };

    const handleAddTag = () => {
        if (formValues.tagInput.trim() !== '' && !formValues.tags.includes(formValues.tagInput.trim())) {
        setFormValues({
            ...formValues,
            tags: [...formValues.tags, formValues.tagInput.trim()],
            tagInput: ''
        });
        }
    };

    const handleRemoveTag = (tagToRemove: string) => {
        setFormValues({
        ...formValues,
        tags: formValues.tags.filter(tag => tag !== tagToRemove)
        });
    };

    const onClosePopup = () => {
        setIsPopupOpen(false);
    }
    
    const onOpenPopup = () => {
        setIsPopupOpen(true);
    }

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

    const validTaskInput = (input:string) => { 
        if(input.trim() == "" ) return false;
        formValues.tasks.map((value)=>{
            if(value.title === input.trim()){
                return false;
            }
        })
        return true;
    }

    const handleAddTask = () => {
        const id = formValues.tasks.length.toString();
        if (!validTaskInput(formValues.tagInput)) {
        setFormValues({
            ...formValues,
            tasks: [...formValues.tasks, { id:id , title:formValues.taskInput.trim()}],
            taskInput: ''
        });
        }
    };

    const handleRemoveTask = (taskToRemove: string) => {
        setFormValues({
        ...formValues,
        tasks: formValues.tasks.filter(task => task.title !== taskToRemove)
        });
    };   
    
    const onSubmitNumberParticip = (participNumber:number) => {
        setFormValues({...formValues,participantCount:participNumber});
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
                    <div className="icon_route-back_container">
                        <div className="icon_route-back">
                            <FaAngleLeft size={22} />
                        </div>
                    </div>
                    <div className="activity_cration_top-middle">
                        Création d'activité
                    </div>
                    <GotoProfile />
                </div>


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
                                        onChange={handleChange}
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
                                            onChange={handleChange}
                                            onKeyDown={(e)=>e.key==='Enter' && (e.preventDefault(),handleAddTag())}
                                            maxLength={30} 
                                            placeholder="Maths, Science, etc ..." 
                                            className="text_field-tag"/>
                                <div className = "tag-chips_group">
                                    {formValues.tags.map(tag => (
                                        <div className="tag-chip">
                                            <span key={tag} >
                                                {tag}
                                            </span>
                                            <div className="tag-chip_delete" onClick={() => handleRemoveTag(tag)}>
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
                                            onChange={handleChange}
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
                                          <h2>{formValues.type==="solo"? formValues.participantCount : "0"} </h2> 
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
                                        formValues.participantCount <= 0 ?
                                        <p className="error_board">Pas de participants</p>
                                        :
                                        <div  className="list_parent_container_inner">
                                            <h3 className="list_title">Liste des participants</h3>

                                            <div className="list_group">
                                                <div className="group_top">
                                                    <p >Nom</p>
                                                </div>
                                                {   participantsList.map((name,index) => (
                                                        <div className="participant_card">
                                                            <input key={index}
                                                                name="particip_card_name"
                                                                value = {name}
                                                                placeholder={name}
                                                                onChange={(e) => handleParticipantNameChange(index, e.target.value)}
                                                                autoFocus
                                                            />
                                                            <div className="delete_participant" onClick={()=>handleDeleteParticipant(index)}>
                                                                <HiTrash size={18}/>
                                                            </div>
                                                        </div>
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
                                                                        updateParticipantCount(formValues.participantCount+enteredValue),
                                                                        setEnteredValue(0))}
                                                className="enter_number_field"/>

                                        <div className="add_one" onClick={() => updateParticipantCount(formValues.participantCount + 1)}>
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
                                                        <div className="team_card">
                                                            <input key={index}
                                                                name="team_card_name"
                                                                value = {teamData.name}
                                                                placeholder={teamData.name}
                                                                onChange={(e) => handleTeamNameChange(index, e.target.value)}
                                                                className="team_card_input"
                                                                autoFocus
                                                            />
                                                            <div className="team_participants-number-field">
                                                                <h2>{teamData.participantsNumber}</h2>
                                                                <p className="team_participants">Participants</p>
                                                            </div>
                                                            <div className="team-card_bottom">
                                                                <div className="team_add-supervisor">
                                                                    {
                                                                        formValues.supervised_teams && 
                                                                        <div className="add-participants_to_group-button">
                                                                            <LuUserRoundPlus strokeWidth={2}/>
                                                                        </div>
                                                                    }
                                                                </div>
                                                                <span className="delete_team" onClick={()=>handleDeleteTeam(index)}>
                                                                    <HiTrash size={18} />
                                                                </span>
                                                            </div>

                                                        </div>
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
                                                    <Switch onChange={(e)=>setFormValues({...formValues,supervised_teams:e})} 
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
                                                                            handleAddTeams(enteredValue),
                                                                            setEnteredValue(0))}
                                                    className="enter_number_field"/>

                                            <div className="add_one" onClick={() => handleAddTeams(1)}>
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
                                    onChange={handleChange} 
                                    onKeyDown={(e)=>e.key==='Enter' && (e.preventDefault(),handleAddTask())}
                                    placeholder="Ajouter une description de tâche..." 
                                    className="text_field-task"/>
                                <div className="add_button" onClick={handleAddTask}>
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
                            className="add_participants_button" 
                            onClick={onOpenPopup}>Ajouter des participants</button>
                </div>
            </div>
            {
                isPopupOpen && 
                <AddParticipantsPopup onClose={onClosePopup} onSubmit={onSubmitNumberParticip}/>
            }
        </div>
    )
}

export default React.memo (ActivityCreationPage)