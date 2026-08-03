import React from "react";
import { ClockIcon } from "@heroicons/react/24/outline";
import { FormControlLabel } from "@mui/material";
import { ActivityIstance } from "@/utils/Types";
import IOSSwitch from "../../components/IOSSwitch";

interface Props {
    formValues: ActivityIstance;
    setFormValues: React.Dispatch<React.SetStateAction<ActivityIstance>>;
}

const ActivityOptionsCard: React.FC<Props> = ({ formValues, setFormValues }) => {
    const handleCheckedAddChrono = (enabled: boolean) => {
        setFormValues({ ...formValues, chrono: { ...formValues.chrono, isEnabled: enabled } });
    };

    const onChangeChronoTime = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value === "") {
            setFormValues({ ...formValues, chrono: { ...formValues.chrono, [e.target.name]: 0 } });
        } else if (e.target.name && Number(value) >= 60) {
            const newMinutes = formValues.chrono.minutes + Math.floor(Number(value) / 60);
            setFormValues({ ...formValues, chrono: { ...formValues.chrono, minutes: newMinutes, seconds: Number(value) % 60 } });
        } else {
            setFormValues({ ...formValues, chrono: { ...formValues.chrono, [e.target.name]: Number(value) } });
        }
    };

    return (
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
                                    onChange={(_, checked) => setFormValues({ ...formValues, authoriseEdit: checked })}
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
                    <div className="option-row">
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
                    {formValues.chrono.isEnabled && (
                        <div className="chrono-picker">
                            <ClockIcon width={17} height={17} className="chrono-icon" />
                            <div className="chrono-box">
                                <input
                                    type="number"
                                    name="minutes"
                                    value={formValues.chrono.minutes}
                                    min={0}
                                    max={99}
                                    onChange={onChangeChronoTime}
                                    className="chrono-box__input"
                                />
                                <span className="chrono-box__unit">min</span>
                            </div>
                            <span className="chrono-colon">:</span>
                            <div className="chrono-box">
                                <input
                                    type="number"
                                    name="seconds"
                                    value={formValues.chrono.seconds}
                                    min={0}
                                    max={59}
                                    onChange={onChangeChronoTime}
                                    className="chrono-box__input"
                                />
                                <span className="chrono-box__unit">sec</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default React.memo(ActivityOptionsCard);
