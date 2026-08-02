import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ActivityIstance } from "@/utils/Types";
import { handleChange, handleAddTag, handleRemoveTag } from "@/utils/ActivityCreactionUtils";

interface Props {
    formValues: ActivityIstance;
    setFormValues: React.Dispatch<React.SetStateAction<ActivityIstance>>;
}

const ActivityDetailsCard: React.FC<Props> = ({ formValues, setFormValues }) => {
    return (
        <div className="main-left">
            <div className="card-title-group">
                <h3 className="main-left_title">Détails de l'activité</h3>
                <p className="card-subtitle">Renseignez les informations générales de votre activité</p>
            </div>

            <div className="main-left-fields">
                <div className="section-card">
                    <p className="section-header-title">Titre</p>
                    <input
                        type="text"
                        name="title"
                        value={formValues.title}
                        onChange={(e) => setFormValues(handleChange(formValues, e))}
                        maxLength={50}
                        placeholder="Titre de votre activité..."
                        className="text_field-title"
                    />
                </div>

                <div className="section-card">
                    <p className="section-header-title">Tags</p>
                    <input
                        type="text"
                        name="tagInput"
                        value={formValues.tagInput}
                        onChange={(e) => setFormValues(handleChange(formValues, e))}
                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), setFormValues(handleAddTag(formValues)))}
                        maxLength={30}
                        placeholder="Maths, Science, etc ..."
                        className="text_field-tag"
                    />
                    <div className="tag-chips_group">
                        {formValues.tags.map(tag => (
                            <div className="tag-chip" key={tag}>
                                <span>{tag}</span>
                                <div className="tag-chip_delete" onClick={() => setFormValues(handleRemoveTag(formValues, tag))}>
                                    <XMarkIcon width={14} height={14} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="section-card">
                    <p className="section-header-title">Description</p>
                    <textarea
                        title="description"
                        name="description"
                        value={formValues.description}
                        onChange={(e) => setFormValues(handleChange(formValues, e))}
                        className="text_field-descript"
                        placeholder="Décrivez votre activité ..."
                    />
                </div>
            </div>
        </div>
    );
};

export default React.memo(ActivityDetailsCard);
