import React from "react";
import { UserIcon, UsersIcon, MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { ActivityIstance } from "@/utils/Types";
import ParticipantCard from "../DashboardPages/layout/ParticipantCard";
import TeamCard from "../DashboardPages/layout/TeamCard";
import {
    addNewParticipants,
    handleAddTeamsToActivity,
    handleDeleteTeamFromActivity,
    handleTeamNameChange,
    handleParticipantNameChange,
    handleDeleteParticipant,
} from "@/utils/ActivityCreactionUtils";

interface Props {
    formValues: ActivityIstance;
    setFormValues: React.Dispatch<React.SetStateAction<ActivityIstance>>;
    teamsTotalParticipantsCount: number;
    openTeamDrawer: (teamIdx?: number) => void;
}

const ParticipantsColumn: React.FC<Props> = ({
    formValues, setFormValues, teamsTotalParticipantsCount, openTeamDrawer,
}) => {
    const changeParticipantName = (idx: string, name: string) =>
        setFormValues({ ...formValues, participantsList: handleParticipantNameChange(formValues.participantsList, idx, name) });

    const deleteParticipant = (id: string) =>
        setFormValues({ ...formValues, participantsList: handleDeleteParticipant(formValues.participantsList, id) });

    const deleteTeam = (index: number) =>
        setFormValues(handleDeleteTeamFromActivity(formValues, index));

    const changeTeamName = (index: number, name: string) =>
        setFormValues(handleTeamNameChange(formValues, index, name));

    const setTypeSolo = () => {
        if (formValues.type === "group") setFormValues({ ...formValues, type: "solo" });
    };

    const setTypeGroup = () => {
        if (formValues.type === "solo") setFormValues({ ...formValues, type: "group" });
    };

    const isSolo = formValues.type === "solo";

    return (
        <div className="main-middle">
            <div className="card-title-group">
                <h3 className="main-left_title">Participants</h3>
                <p className="card-subtitle">Ajoutez les participants/équipes de votre activité.</p>
            </div>

            {/* Mode selector */}
            <div className="section-card">
                <p className="t-label">Mode d'activité</p>
                <div className="activity_type_toggle">
                    <button className={`mode-option${isSolo ? " mode-option--active" : ""}`} onClick={setTypeSolo}>
                        <UserIcon width={14} height={14} />
                        <span>Individuelle</span>
                    </button>
                    <button className={`mode-option${!isSolo ? " mode-option--active" : ""}`} onClick={setTypeGroup}>
                        <UsersIcon width={14} height={14} />
                        <span>Équipes</span>
                    </button>
                </div>
            </div>

            {/* Stats board */}
            <div className="participant_numbers_board">
                <div className="numbers_board_container">
                    <div className="board_icon"><UserIcon width={20} height={20} /></div>
                    <div className="board_text">
                        <p className="board_mini_title">Participants</p>
                        <h2>{isSolo ? formValues.participantsList.length : teamsTotalParticipantsCount}</h2>
                    </div>
                </div>
                {!isSolo && <div className="numbers_board_separator" />}
                {!isSolo && (
                    <div className="numbers_board_container">
                        <div className="board_icon"><UsersIcon width={20} height={20} /></div>
                        <div className="board_text">
                            <p className="board_mini_title">Equipes</p>
                            <h2>{formValues.teamsList.length}</h2>
                        </div>
                    </div>
                )}
            </div>

            {/* List */}
            <div className={isSolo ? "list_container" : "list_container list_container-team"}>
                {isSolo ? (
                    <div className="list_parent_container">
                        <h3 className="list_title">Liste des participants</h3>
                        {formValues.participantsList.length === 0 ? (
                            <p className="error_board">Pas de participants</p>
                        ) : (
                            <div className="list_group">
                                {formValues.participantsList.map((p) => (
                                    <ParticipantCard
                                        key={p.id}
                                        id={p.id}
                                        participantName={p.name}
                                        handleParticipantNameChange={changeParticipantName}
                                        handleDeleteParticipant={deleteParticipant}
                                    />
                                ))}
                            </div>
                        )}
                        <div className="stepper-row">
                            <button className="stepper-btn stepper-btn--minus" onClick={() => {
                                const last = formValues.participantsList.at(-1);
                                if (last) deleteParticipant(last.id);
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
                ) : (
                    <div className="list_parent_container">
                        <div className="list_title-container">
                            <h3 className="list_title">Liste des équipes</h3>
                            {formValues.teamsList.length > 0 && (
                                <button className="list_manage-link" onClick={() => openTeamDrawer()}>
                                    Gérer
                                </button>
                            )}
                        </div>
                        {formValues.teamsList.length === 0 ? (
                            <p className="error_board">Pas d'équipes</p>
                        ) : (
                            <div className="list_parent_container_inner">
                                <div className="teams_list">
                                    {formValues.teamsList.map((teamData, index) => (
                                        <TeamCard
                                            key={teamData.id}
                                            index={index}
                                            teamData={teamData}
                                            supervised={teamData.supervised}
                                            onEdit={() => openTeamDrawer(index)}
                                            handleDeleteTeam={deleteTeam}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                        <div className="stepper-row">
                            <button className="stepper-btn stepper-btn--minus" onClick={() => {
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
                )}
            </div>
        </div>
    );
};

export default React.memo(ParticipantsColumn);
