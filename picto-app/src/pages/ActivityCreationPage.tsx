import GotoProfile from "@/components/GotoProfile";
import React, { useState } from "react"
import { MdDescription,MdModeEditOutline  } from "react-icons/md";
import { FaEdit , FaGripLines, FaMinus, FaPlus} from "react-icons/fa";
import { RxPerson } from "react-icons/rx";
import { HiTrash } from "react-icons/hi2";

import { IoMdPricetag ,IoIosArrowForward } from "react-icons/io";
import { GoTasklist , GoPeople } from "react-icons/go";
import {  IoReorderTwoOutline, IoRemoveCircle  } from "react-icons/io5";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { FaAngleLeft } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa6";
import Switch from "react-switch";
import "./css/ActivityCreationPage.css"
import { useNavigate } from "react-router-dom";
import AddParticipantsPopup from "./AddParticipantsPopup";



interface ActivityCreationPageProps  {

}

type ActivityData = {
    id:string,
    title:string,
    tags:string[],
    description:string,
    tasks:string[],
    type:string,
    authoriseEdit:boolean;
    participantCount:number
}

interface ActivityIstance extends ActivityData{
    tagInput:string,
    taskInput:string,
}

const ActivityCreationPage : React.FC<ActivityCreationPageProps> = () => {
    const [isPopupOpen,setIsPopupOpen] = useState(false);
    const [checked, setChecked] = useState(false);
    const [participantsList,setParticipantsList] = useState<string[]>([]);
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
    });

    const [participantsEnteredValue,setParticipantsEnteredValue] = useState(formValues.participantCount);


    const navigate = useNavigate();

    const handleChecked = (nextChecked:boolean) => {
        setChecked(nextChecked);
    };

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

    const handleNameChange = (index: number, newName: string) => {
        setParticipantsList((prev) => {
            const updated = [...prev];
            updated[index] = newName;
            return updated;
        });
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

    const handleAddTask = () => {
        if (formValues.taskInput.trim() !== '' && !formValues.tasks.includes(formValues.taskInput.trim())) {
        setFormValues({
            ...formValues,
            tasks: [...formValues.tasks, formValues.taskInput.trim()],
            taskInput: ''
        });
        }
    };

    const handleRemoveTask = (taskToRemove: string) => {
        setFormValues({
        ...formValues,
        tasks: formValues.tasks.filter(task => task !== taskToRemove)
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
                    <GotoProfile/>
                </div>

                <div className="section_gap"/>

                <div className="activity_creation-main_content">

                    <div className="main-left">

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
                                <p>Tag</p>
                            </div>
                                <input  type="text" 
                                        name="tagInput"
                                        value={formValues.tagInput}
                                        onChange={handleChange}
                                        onKeyDown={(e)=>e.key==='Enter' && (e.preventDefault(),handleAddTag())}
                                        maxLength={30} 
                                        placeholder="Maths , Science ..." 
                                        className="text_field-tag"/>
                            <div className="tag-chips_group">
                                {formValues.tags.map(tag => (
                                <span key={tag} className="tag-chip" onClick={() => handleRemoveTag(tag)}>
                                    {tag} ✕
                                </span>
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
                                        placeholder="Décrivez votre activité"/>

                        </div>                        

                        <div className="section-card">
                            <div className="section-header">
                                <MdModeEditOutline />
                                <p>Autoriser l'edition</p>
                            </div>
                                <label className="toggle_authorise">
                                    <Switch onChange={handleChecked} checked={checked} />
                                </label>
                        </div>
                    </div>

                    <div className="main-middle">
                        <div className="activity_type_toggle">
                                <div 
                                    className={formValues.type === "solo" ? "activity_toggle-button_selected" : "activity_toggle-button"} 
                                    onClick={handleActivityTypeToSolo}>
                                    <p>Activité individuelle</p>
                                </div>
                                <div 
                                    className={formValues.type === "group" ? "activity_toggle-button_selected" : "activity_toggle-button"}
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
                                          <h2>{formValues.participantCount}</h2> 
                                    </div>
                                </div>
                                
                                <div className="numbers_board_separator"/>

                                <div className="numbers_board_container">
                                    <div className="board_icon">
                                        <GoPeople size={20} />
                                    </div>
                                    <div className="board_text">
                                          <p className="board_mini_title">Groupes</p>  
                                          <h2>0</h2>
                                    </div>
                                </div>  
                        </div>

                        <div className="participants_list-container">

                            {
                                formValues.participantCount <= 0 ?
                                <p className="error_board">Pas de participants</p>
                                :
                                <div className="participants_group">
                                    <div className="participants_group_top">

                                        <p >Nom</p>

                                        <div className="view_all-bitton">
                                            <p>Voir tout</p>
                                            <IoIosArrowForward />
                                        </div>
                                    </div>
                                    {
                                        (
                                        participantsList
                                    ).map((name,index) => (
                                            <div className="participant_card">
                                                <input key={index}
                                                    value = {name}
                                                    placeholder={name}
                                                    onChange={(e) => handleNameChange(index, e.target.value)}
                                                />
                                                <div className="delete_participant" onClick={()=>handleDeleteParticipant(index)}>
                                                    <HiTrash size={18}/>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            }
                            <div className="participants_bottom_buttons">
                                <div className="remove_particip" onClick={() =>{ 
                                                                    if(formValues.participantCount<=0) return;
                                                                    updateParticipantCount(formValues.participantCount - 1)}
                                                                }>
                                    <FaMinus />
                                </div>

                                <input  type="number" 
                                        value={participantsEnteredValue} 
                                        onChange={(e)=>setParticipantsEnteredValue(e.target.valueAsNumber)}
                                        onKeyDown={(e)=>e.key==='Enter' && (
                                                                e.preventDefault(),
                                                                updateParticipantCount(formValues.participantCount+participantsEnteredValue),
                                                                setParticipantsEnteredValue(0))}
                                        className="enter_number_particip"/>

                                <div className="add_particip" onClick={() => updateParticipantCount(formValues.participantCount + 1)}>
                                    <FaPlus />
                                </div>
                            </div>
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
                        {   formValues.participantCount <= 0 ?
                                <p className="error_board">Pas de participants</p>
                                :
                            <div className="task-chips_group">
                            <h3>
                                Tâches à effectuer
                            </h3>
                            <div className="task-chip-group">
                            {
                                formValues.tasks.map(task=> (
                                    <div key={task} className="task_card">
                                            <FaGripLines size={18} />

                                        <div className="task-chip">
                                            <p>
                                                {task}
                                            </p>
                                            <div className="delete_task" onClick={()=>handleRemoveTask(task)}>
                                                <HiTrash size={18}/>
                                            </div>                                            
                                        </div>


                                    </div>

                                ))
                            }
                            </div>

                        </div>
                        }


                    </div>

                </div>

                <div>
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