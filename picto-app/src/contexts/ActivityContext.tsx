import { createContext, useCallback, useContext, useEffect, useState, ReactNode } from "react";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "@/authContext/authContext";
import { FetchedActivity } from "@/utils/Types";

interface DraftActivity {
  id: string;
  backendId: string | null;
  title: string;
}

interface ActivityContextType {
  userActivities: FetchedActivity[] | null;
  loading: boolean;
  error: string | null;
  refresh: () => void;
  currentDraft: DraftActivity | null;
  startDraft: () => void;
  updateDraftTitle: (title: string) => void;
  clearDraft: () => void;
}

const ActivityContext = createContext<ActivityContextType | undefined>(undefined);

export function useActivity() {
  const ctx = useContext(ActivityContext);
  if (!ctx) throw new Error("useActivity must be used within ActivityProvider");
  return ctx;
}

export function ActivityProvider({ children }: { children: ReactNode }) {
  const { currentUser } = useAuth();

  const [currentDraft, setCurrentDraft] = useState<DraftActivity | null>(null);

  const [userActivities, setUserActivities] = useState<FetchedActivity[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tick, setTick] = useState(0);

  const refresh = useCallback(() => setTick(n => n + 1), []);

  // backendId is never set in the current create flow, so this is always null.
  // Kept as a dep so the filter re-runs if the field is ever populated in future.
  const currentDraftBackendId = currentDraft?.backendId ?? null;

  useEffect(() => {
    if (!currentUser) return;
    let cancelled = false;
    setLoading(true);

    const fetchActivities = async () => {
      try {
        const token = await currentUser.getIdToken();
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/activities`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data: FetchedActivity[] = await res.json();
        if (!cancelled) {
          // Hide empty drafts (no description, no participants) that aren't currently being edited
          const visible = data.filter(a =>
            !(a.status === "DRAFT" &&
              a._id !== currentDraftBackendId &&
              !a.description &&
              a.totalParticipants === 0)
          );
          setUserActivities(visible);
          setError(null);
        }
      } catch (err: any) {
        if (!cancelled) setError(err.message ?? "Failed to fetch activities");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchActivities();
    return () => { cancelled = true; };
  }, [currentUser, tick, currentDraftBackendId]);

  const startDraft = () =>
    setCurrentDraft({ id: `draft-${uuidv4()}`, backendId: null, title: "Nouvelle activité" });

  const updateDraftTitle = (title: string) =>
    setCurrentDraft(prev => prev ? { ...prev, title: title || "Nouvelle activité" } : prev);

  const clearDraft = () => setCurrentDraft(null);

  return (
    <ActivityContext.Provider value={{
      userActivities, loading, error, refresh,
      currentDraft, startDraft, updateDraftTitle, clearDraft,
    }}>
      {children}
    </ActivityContext.Provider>
  );
}
