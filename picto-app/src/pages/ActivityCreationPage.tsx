import React, { useEffect, useRef, useState } from "react";
import { BookmarkSquareIcon, PaperAirplaneIcon } from "@heroicons/react/24/solid";
import "./css/ActivityCreationPage.css";
import { useNavigate, useBlocker } from "react-router-dom";
import DashboardLayout from "./DashboardPages/layout/DashboardLayout";
import AddParticipantsPopup from "./AddParticipantsPopup";
import ConfirmationPopup from "./PagesUiComponents/ConfirmationPopup";
import ErrorBanner from "../components/FeedbackBanner";
import { useCreateActivity } from "@/hooks/useActivityCreation";
import { validateActivityValues, handleTeamNameChange } from "@/utils/ActivityCreactionUtils";
import { ActivityIstance, MessageBannerRef, TeamInstance } from "@/utils/Types";
import ActivityDetailsCard from "./ActivityCreation/ActivityDetailsCard";
import ActivityOptionsCard from "./ActivityCreation/ActivityOptionsCard";
import ParticipantsColumn from "./ActivityCreation/ParticipantsColumn";
import TasksColumn from "./ActivityCreation/TasksColumn";
import { useActivityDraft } from "@/contexts/ActivityDraftContext";

const ActivityCreationPage: React.FC = () => {
    const [formValues, setFormValues] = useState<ActivityIstance>({
        id: '',
        title: '',
        tags: [],
        description: '',
        tagInput: '',
        tasks: [],
        taskInput: '',
        type: "solo",
        authoriseEdit: false,
        chrono: { isEnabled: false, minutes: 0, seconds: 0 },
        participantsList: [],
        teamsList: [],
        supervised_teams: false,
    });

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [teamsTotalParticipantsCount, setTeamsTotalParticipantsCount] = useState(0);
    const [selectedTeam, setSelectedTeam] = useState<{ indx: number; teamData: TeamInstance }>();
    const [confirmationMessage, setConfirmationMessage] = useState<{ title: string; details?: string } | null>(null);
    const [isDirty, setIsDirty] = useState(false);
    const actionButtonUsed = useRef(false);
    const savedAsDraft = useRef(false);

    const { createActivity, activityId } = useCreateActivity();
    const navigate = useNavigate();
    const bannerRef = useRef<MessageBannerRef>(null);
    const createActivityButtonRef = useRef<HTMLButtonElement>(null);
    const { startDraft, updateDraftTitle, clearDraft } = useActivityDraft();

    const blocker = useBlocker(
        ({ currentLocation, nextLocation }) =>
            isDirty && !actionButtonUsed.current && currentLocation.pathname !== nextLocation.pathname
    );

    useEffect(() => {
        startDraft();
        return () => { if (!savedAsDraft.current) clearDraft(); };
    }, []);

    useEffect(() => {
        let count = 0;
        formValues.teamsList.forEach((team) => { count += team.participantsNames.length; });
        setTeamsTotalParticipantsCount(count);
    }, [formValues.teamsList]);

    useEffect(() => {
        const valid = validateActivityValues(formValues).state;
        if (createActivityButtonRef.current) {
            createActivityButtonRef.current.style.opacity = valid ? "1" : "0.5";
        }
    }, [formValues]);

    useEffect(() => {
        updateDraftTitle(formValues.title);
    }, [formValues.title]);

    const handleSetFormValues = (updater: React.SetStateAction<ActivityIstance>) => {
        setIsDirty(true);
        setFormValues(updater);
    };

    const validateForm = async () => {
        const check = validateActivityValues(formValues);
        if (check.state) {
            actionButtonUsed.current = true;
            clearDraft();
            createActivity(formValues);
            setIsPopupOpen(true);
            setConfirmationMessage({ title: "Félicitations !!!", details: "Votre activité a été créée avec succès" });
        } else {
            bannerRef.current?.trigger(check.message, "failure");
        }
    };

    const handleCancel = () => {
        actionButtonUsed.current = true;
        clearDraft();
        navigate("/dashboard");
    };

    const handleSaveDraft = () => {
        actionButtonUsed.current = true;
        clearDraft();
        navigate("/dashboard");
    };

    const onCloseParticipantsPopup = () => {
        setIsPopupOpen(false);
        setSelectedTeam(undefined);
    };

    return (
        <DashboardLayout title="Création d'activité">
            <div className="activity_creation_content">
                <ErrorBanner ref={bannerRef} />

                <div className="activity-page-header">
                    <button type="button" className="cancel-creation_button" onClick={handleCancel}>
                        Annuler
                    </button>
                    <button type="button" className="draft-creation_button" onClick={handleSaveDraft}>
                        <BookmarkSquareIcon width={15} height={15} />
                        Brouillon
                    </button>
                    <button
                        type="button"
                        className="create-activity-button"
                        name="create_activity-button"
                        onClick={validateForm}
                        ref={createActivityButtonRef}
                    >
                        <PaperAirplaneIcon width={15} height={15} />
                        <>Publier</>
                    </button>
                </div>

                <div className="activity_creation-main_content">
                    <div className="main-left-col">
                        <ActivityDetailsCard formValues={formValues} setFormValues={handleSetFormValues} />
                        <ActivityOptionsCard formValues={formValues} setFormValues={handleSetFormValues} />
                    </div>

                    <ParticipantsColumn
                        formValues={formValues}
                        setFormValues={handleSetFormValues}
                        teamsTotalParticipantsCount={teamsTotalParticipantsCount}
                        setIsPopupOpen={setIsPopupOpen}
                        setSelectedTeam={setSelectedTeam}
                    />

                    <TasksColumn formValues={formValues} setFormValues={handleSetFormValues} />
                </div>
            </div>

            {isPopupOpen && selectedTeam != undefined && (
                <AddParticipantsPopup
                    teamIdx={selectedTeam.indx}
                    teamList={formValues.teamsList}
                    setFormValues={setFormValues}
                    onClose={onCloseParticipantsPopup}
                    handleTeamNameChange={(index, newName) =>
                        setFormValues(handleTeamNameChange(formValues, index, newName))
                    }
                />
            )}
            {isPopupOpen && confirmationMessage && (
                <ConfirmationPopup
                    message={confirmationMessage}
                    type="confirm"
                    handleConfirm={() => navigate(`/dashboard/activity-editor/${activityId}`)}
                />
            )}
            {blocker.state === "blocked" && (
                <ConfirmationPopup
                    message={{
                        title: "Quitter sans sauvegarder ?",
                        details: "Vous avez des modifications non sauvegardées.",
                    }}
                    type="confirm-cancel"
                    confirmLabel="Sauvegarder en brouillon"
                    cancelLabel="Quitter"
                    handleConfirm={() => {
                        savedAsDraft.current = true;
                        actionButtonUsed.current = true;
                        blocker.proceed();
                    }}
                    handleCancel={() => {
                        actionButtonUsed.current = true;
                        blocker.proceed();
                    }}
                />
            )}
        </DashboardLayout>
    );
};

export default React.memo(ActivityCreationPage);
