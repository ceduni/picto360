import React, { useEffect, useRef, useState } from "react";
import { BookmarkSquareIcon, PaperAirplaneIcon } from "@heroicons/react/24/solid";
import "./css/ActivityCreationPage.css";
import { useNavigate, useBlocker, useParams, useLocation } from "react-router-dom";
import DashboardLayout from "./layout/DashboardLayout";
import EditTeamListDrawer from "../ActivityCreation/EditTeamListDrawer";
import ConfirmationPopup from "../PagesUiComponents/ConfirmationPopup";
import ErrorBanner from "../../components/FeedbackBanner";
import {
    validateActivityValues,
    buildDraftPayload,
    activityToFormValues,
} from "@/utils/ActivityCreactionUtils";
import { ActivityIstance, MessageBannerRef } from "@/utils/Types";
import ActivityDetailsCard from "../ActivityCreation/ActivityDetailsCard";
import ActivityOptionsCard from "../ActivityCreation/ActivityOptionsCard";
import ParticipantsColumn from "../ActivityCreation/ParticipantsColumn";
import TasksColumn from "../ActivityCreation/TasksColumn";
import { useActivity } from "@/contexts/ActivityContext";
import { useActivityDraftApi } from "@/hooks/useActivityDraftApi";
import { useFeedbackBanner } from "@/hooks/useFeedbackbanner";

const EMPTY_FORM: ActivityIstance = {
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
};

const hasContent = (fv: ActivityIstance) =>
    fv.title.trim() !== "" && (
    fv.description.trim() !== "" ||
    fv.tasks.length > 0 ||
    fv.tags.length > 0 ||
    fv.participantsList.length > 0 ||
    fv.teamsList.length > 0);

const ActivityCreationPage: React.FC = () => {
    const { id } = useParams<{ id?: string }>();
    const isEditMode = !!id;
    const { key: locationKey } = useLocation();

    const [formValues, setFormValues] = useState<ActivityIstance>(EMPTY_FORM);
    const [isLoadingActivity, setIsLoadingActivity] = useState(isEditMode);
    const [teamsTotalParticipantsCount, setTeamsTotalParticipantsCount] = useState(0);
    const [isTeamDrawerOpen, setIsTeamDrawerOpen] = useState(false);
    const [initialTeamIdx, setInitialTeamIdx] = useState<number | undefined>();
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
    const [confirmationMessage, setConfirmationMessage] = useState<{ title: string; details?: string } | null>(null);
    const [isDirty, setIsDirty] = useState(false);
    const actionButtonUsed = useRef(false);
    const publishedActivityId = useRef<string | null>(null);

    const navigate = useNavigate();
    const bannerRef = useRef<MessageBannerRef>(null);
    const createActivityButtonRef = useRef<HTMLButtonElement>(null);

    const { startDraft, updateDraftTitle, clearDraft, refresh } = useActivity();
    const { createDraft, updateDraft, publishDraft, fetchActivity } = useActivityDraftApi();
    const { setBannerMessage } = useFeedbackBanner();

    const blocker = useBlocker(
        ({ currentLocation, nextLocation }) =>
            isDirty && !actionButtonUsed.current && currentLocation.pathname !== nextLocation.pathname
    );

    // Edit mode: fetch and pre-populate
    useEffect(() => {
        if (!isEditMode) return;
        let cancelled = false;

        fetchActivity(id!).then(activity => {
            if (!cancelled) setFormValues(activityToFormValues(activity));
        }).catch(() => {
            if (!cancelled) bannerRef.current?.trigger("Erreur de chargement de l'activité", "failure");
        }).finally(() => {
            if (!cancelled) setIsLoadingActivity(false);
        });

        return () => { cancelled = true; };
    }, [id]);

    // Create mode: re-init on every navigation to this page (location.key changes each time)
    useEffect(() => {
        if (isEditMode) return;
        startDraft();
        setFormValues(EMPTY_FORM);
        setIsDirty(false);
        actionButtonUsed.current = false;
        return () => { clearDraft(); };
    }, [locationKey]);

    useEffect(() => {
        let count = 0;
        formValues.teamsList.forEach(team => { count += team.participantsNames.length; });
        setTeamsTotalParticipantsCount(count);
    }, [formValues.teamsList]);

    useEffect(() => {
        const valid = validateActivityValues(formValues).state;
        if (createActivityButtonRef.current) {
            createActivityButtonRef.current.style.opacity = valid ? "1" : "0.5";
        }
    }, [formValues]);

    useEffect(() => {
        if (!isEditMode) updateDraftTitle(formValues.title);
    }, [formValues.title]);

    const handleSetFormValues = (updater: React.SetStateAction<ActivityIstance>) => {
        setIsDirty(true);
        setFormValues(updater);
    };

    const openTeamDrawer = (teamIdx?: number) => {
        setInitialTeamIdx(teamIdx);
        setIsTeamDrawerOpen(true);
    };

    const closeTeamDrawer = () => {
        setIsTeamDrawerOpen(false);
        setInitialTeamIdx(undefined);
    };

    // Persist form data to backend
    const saveDraftToBackend = async (): Promise<string> => {
        if (isEditMode) {
            await updateDraft(id!, buildDraftPayload(formValues));
            return id!;
        }
        const draftId = await createDraft(formValues.title.trim() || "Nouvelle activité");
        await updateDraft(draftId, buildDraftPayload(formValues));
        return draftId;
    };

    const handleCancel = () => {
        actionButtonUsed.current = true;
        navigate("/dashboard");
    };

    const handleSaveDraft = async () => {
        actionButtonUsed.current = true;

        if (!isEditMode && !hasContent(formValues)) {
            navigate("/dashboard");
            return;
        }

        try {
            await saveDraftToBackend();
            if (!isEditMode) clearDraft();
            refresh();
            setBannerMessage({ message: "Activité sauvegardée", type: "success" });
        } catch {
            setBannerMessage({ message: "Erreur lors de la sauvegarde", type: "failure" });
        }
        navigate("/dashboard");
    };

    const handlePublish = async () => {
        const check = validateActivityValues(formValues);
        if (!check.state) {
            bannerRef.current?.trigger(check.message, "failure");
            return;
        }

        actionButtonUsed.current = true;
        try {
            const activityId = await saveDraftToBackend();
            await publishDraft(activityId);
            if (!isEditMode) clearDraft();
            refresh();
            publishedActivityId.current = activityId;
            setConfirmationMessage({ title: "Félicitations !!!", details: "Votre activité a été créée avec succès" });
            setIsConfirmationOpen(true);
        } catch {
            setBannerMessage({ message: "Erreur lors de la publication", type: "failure" });
        }
    };

    return (
        <DashboardLayout title={isEditMode ? "Édition d'activité" : "Création d'activité"}>
            <div className="activity_creation_content">
                <ErrorBanner ref={bannerRef} />

                <div className="activity-page-header">
                    <button type="button" className="cancel-creation_button" onClick={handleCancel}>
                        Annuler
                    </button>
                    <button
                        type="button"
                        className="draft-creation_button"
                        onClick={handleSaveDraft}
                        disabled={isLoadingActivity}
                    >
                        <BookmarkSquareIcon width={15} height={15} />
                        {isEditMode ? "Enregistrer" : "Brouillon"}
                    </button>
                    <button
                        type="button"
                        className="create-activity-button"
                        name="create_activity-button"
                        onClick={handlePublish}
                        ref={createActivityButtonRef}
                        disabled={isLoadingActivity}
                    >
                        <PaperAirplaneIcon width={15} height={15} />
                        <>Publier</>
                    </button>
                </div>

                {isLoadingActivity ? (
                    <div className="activity-creation-loading">
                        <p>Chargement de l'activité…</p>
                    </div>
                ) : (
                    <div className="activity_creation-main_content">
                        <div className="main-left-col">
                            <ActivityDetailsCard formValues={formValues} setFormValues={handleSetFormValues} />
                            <ActivityOptionsCard formValues={formValues} setFormValues={handleSetFormValues} />
                        </div>

                        <ParticipantsColumn
                            formValues={formValues}
                            setFormValues={handleSetFormValues}
                            teamsTotalParticipantsCount={teamsTotalParticipantsCount}
                            openTeamDrawer={openTeamDrawer}
                        />

                        <TasksColumn formValues={formValues} setFormValues={handleSetFormValues} />
                    </div>
                )}
            </div>

            {isTeamDrawerOpen && (
                <EditTeamListDrawer
                    open={isTeamDrawerOpen}
                    onClose={closeTeamDrawer}
                    formValues={formValues}
                    setFormValues={handleSetFormValues}
                    initialTeamIdx={initialTeamIdx}
                />
            )}

            {isConfirmationOpen && confirmationMessage && (
                <ConfirmationPopup
                    message={confirmationMessage}
                    type="confirm"
                    handleConfirm={() => navigate(`/dashboard/activity-editor/${publishedActivityId.current}`)}
                />
            )}

            {blocker.state === "blocked" && (
                <ConfirmationPopup
                    message={{
                        title: "Quitter sans sauvegarder ?",
                        details: "Vous avez des modifications non sauvegardées.",
                    }}
                    type="confirm-cancel"
                    confirmLabel={isEditMode ? "Enregistrer les modifications" : "Sauvegarder en brouillon"}
                    cancelLabel="Quitter"
                    handleConfirm={async () => {
                        actionButtonUsed.current = true;
                        if (!isEditMode && !hasContent(formValues)) {
                            blocker.proceed();
                            return;
                        }
                        try {
                            await saveDraftToBackend();
                            if (!isEditMode) clearDraft();
                            refresh();
                        } catch { /* best-effort */ }
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
