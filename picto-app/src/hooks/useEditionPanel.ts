import { useState, useCallback } from "react";

type PanelState = "creating" | "editing";

interface EditionPanelState {
    isOpen: boolean;
    state: PanelState;
}

interface UseEditionPanelReturn {
    panelState: EditionPanelState | null;
    openPanel: (state: PanelState) => void;
    closePanel: () => void;
    isOpen: boolean;
    currentState: PanelState | undefined;
}

export const useEditionPanel = (): UseEditionPanelReturn => {
    const [panelState, setPanelState] = useState<EditionPanelState | null>(null);

    const openPanel = useCallback((state: PanelState): void => {
        setPanelState({ isOpen: true, state });
    }, []);

    const closePanel = useCallback((): void => {
        setPanelState(null);
    }, []);

    return {
        panelState,
        openPanel,
        closePanel,
        isOpen: panelState?.isOpen ?? false,
        currentState: panelState?.state,
    };
};