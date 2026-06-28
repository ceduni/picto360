import { createContext, useContext, useState, ReactNode } from "react";
import { v4 as uuidv4 } from "uuid";

interface DraftActivity {
  id: string;
  title: string;
}

interface ActivityDraftContextType {
  currentDraft: DraftActivity | null;
  startDraft: () => void;
  updateDraftTitle: (title: string) => void;
  clearDraft: () => void;
}

const ActivityDraftContext = createContext<ActivityDraftContextType | undefined>(undefined);

export function useActivityDraft() {
  const context = useContext(ActivityDraftContext);
  if (!context) throw new Error("useActivityDraft must be used within ActivityDraftProvider");
  return context;
}

export function ActivityDraftProvider({ children }: { children: ReactNode }) {
  const [currentDraft, setCurrentDraft] = useState<DraftActivity | null>(null);

  const startDraft = () => {
    setCurrentDraft(prev => prev ?? { id: `draft-${uuidv4()}`, title: "Nouvelle activité" });
  };

  const updateDraftTitle = (title: string) => {
    setCurrentDraft(prev => (prev ? { ...prev, title: title || "Nouvelle activité" } : prev));
  };

  const clearDraft = () => setCurrentDraft(null);

  return (
    <ActivityDraftContext.Provider value={{ currentDraft, startDraft, updateDraftTitle, clearDraft }}>
      {children}
    </ActivityDraftContext.Provider>
  );
}