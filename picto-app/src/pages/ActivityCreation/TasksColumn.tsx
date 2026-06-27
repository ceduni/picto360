import React from "react";
import { PlusIcon, TrashIcon, ClipboardDocumentListIcon, InformationCircleIcon } from "@heroicons/react/24/outline";
import { RiDraggable } from "react-icons/ri";
import { Tooltip } from "react-tooltip";
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import { useSortable, SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ActivityIstance, TaskData } from "@/utils/Types";
import { handleChange, handleAddTask, handleRemoveTask } from "@/utils/ActivityCreactionUtils";

interface Props {
    formValues: ActivityIstance;
    setFormValues: React.Dispatch<React.SetStateAction<ActivityIstance>>;
}

function TaskItem({ task, onRemove }: { task: TaskData; onRemove: (title: string) => void }) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: task.id });

    return (
        <div ref={setNodeRef} style={{ transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.8 : 1 }} className="task_card">
            <RiDraggable {...listeners} {...attributes} className="drag-handle" size={20} />
            <div className="task-chip">
                <span>{task.title}</span>
                <div className="delete_task" onClick={() => onRemove(task.title)}>
                    <TrashIcon width={14} height={14} />
                </div>
            </div>
        </div>
    );
}

const TasksColumn: React.FC<Props> = ({ formValues, setFormValues }) => {
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (active.id !== over?.id) {
            const oldIndex = formValues.tasks.findIndex((t) => t.id === active.id);
            const newIndex = formValues.tasks.findIndex((t) => t.id === over?.id);
            setFormValues({ ...formValues, tasks: arrayMove(formValues.tasks, oldIndex, newIndex) });
        }
    };

    const removeTask = (title: string) => setFormValues(handleRemoveTask(formValues, title));

    return (
        <div className="main-right">
            <div className="card-title-group">
                <h3 className="main-left_title">Tâches</h3>
                <p className="card-subtitle">Ajoutez des taches à compléter par les participants.</p>
            </div>

            {/* Task count */}
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

            {/* Add task input */}
            <div className="section-card">
                <div className="add-task_field">
                    <input
                        type="text"
                        name="taskInput"
                        value={formValues.taskInput}
                        onChange={(e) => setFormValues(handleChange(formValues, e))}
                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), setFormValues(handleAddTask(formValues)))}
                        placeholder="Ajouter une description de tâche..."
                        className="text_field-task"
                    />
                    <div className="add_button" onClick={() => setFormValues(handleAddTask(formValues))}>
                        <PlusIcon width={15} height={15} />
                    </div>
                </div>
            </div>

            {/* Task list */}
            <div className="list_container">
                {formValues.tasks.length === 0 ? (
                    <p className="error_board">Pas de Tâches</p>
                ) : (
                    <div className="list_parent_container">
                        <div className="list_title-container">
                            <div className="tool-tip-tasks"
                                data-tooltip-id="task-tooltip"
                                data-tooltip-content="Vous pouvez re-ordonner vos tache avec un drag">
                                <InformationCircleIcon className="tool-tip_content" width={18} height={18} />
                                <Tooltip id="task-tooltip" />
                            </div>
                            <h3 className="list_title">Tâches à effectuer</h3>
                        </div>
                        <div className="list_group">
                            <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                                <SortableContext items={formValues.tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
                                    {formValues.tasks.map((task) => (
                                        <TaskItem key={task.id} task={task} onRemove={removeTask} />
                                    ))}
                                </SortableContext>
                            </DndContext>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default React.memo(TasksColumn);
