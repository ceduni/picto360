import "@css/SettingsPopupWindow.css";
import "@css/ExportProgressPopupWindow.css";

import React from "react";
import { MdCheckCircle, MdClose, MdCloudUpload, MdErrorOutline, MdFolder } from "react-icons/md";
import { ExportProgressState } from "@/utils/Types";

interface ExportProgressPopupWindowProps {
  progressState: ExportProgressState;
  onClose: () => void;
}

function getPhaseIcon(phase: ExportProgressState["phase"]) {
  switch (phase) {
    case "folder_created":
      return <MdFolder className="export-progress-modal__status-icon" />;
    case "uploading":
    case "finalizing":
    case "preparing":
      return <MdCloudUpload className="export-progress-modal__status-icon" />;
    case "success":
      return <MdCheckCircle className="export-progress-modal__status-icon export-progress-modal__status-icon--success" />;
    case "failure":
      return <MdErrorOutline className="export-progress-modal__status-icon export-progress-modal__status-icon--failure" />;
    case "idle":
    default:
      return <MdCloudUpload className="export-progress-modal__status-icon" />;
  }
}

const ExportProgressPopupWindow: React.FC<ExportProgressPopupWindowProps> = ({
  progressState,
  onClose,
}) => {
  if (!progressState.isOpen) {
    return null;
  }

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget && !progressState.isActive) {
      onClose();
    }
  };

  return (
    <div
      className="settings-modal-backdrop settings-modal-backdrop--open export-progress-modal-backdrop"
      onClick={handleBackdropClick}
    >
      <div className="settings-modal settings-modal--open export-progress-modal">
        <div className="settings-modal__header">
          <div className="export-progress-modal__title-block">
            <h2 className="settings-modal__title">{progressState.title}</h2>
            <p className="export-progress-modal__subtitle">
              {progressState.isActive ? "Export in progress" : "Export status"}
            </p>
          </div>

          <button
            className="settings-modal__close-button"
            onClick={onClose}
            aria-label="Close export progress"
            disabled={progressState.isActive}
          >
            <MdClose />
          </button>
        </div>

        <div className="settings-modal__content export-progress-modal__content">
          <div className="export-progress-modal__status-row">
            {getPhaseIcon(progressState.phase)}
            <div className="export-progress-modal__status-copy">
              <p className="export-progress-modal__detail">{progressState.detail}</p>
              {progressState.fileName && (
                <p className="export-progress-modal__meta">
                  File: <strong>{progressState.fileName}</strong>
                </p>
              )}
              {progressState.folderName && (
                <p className="export-progress-modal__meta">
                  Folder: <strong>{progressState.folderName}</strong>
                </p>
              )}
            </div>
          </div>

          <div className="export-progress-modal__progress-block">
            <div
              className="export-progress-modal__progress-bar"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={progressState.progressPercent ?? 0}
            >
              <div
                className="export-progress-modal__progress-fill"
                style={{ width: `${progressState.progressPercent ?? 0}%` }}
              />
            </div>
            <span className="export-progress-modal__progress-label">
              {progressState.progressPercent !== null
                ? `${Math.round(progressState.progressPercent)}%`
                : "Waiting for upload..."}
            </span>
          </div>

          {progressState.error && (
            <div className="export-progress-modal__error">
              {progressState.error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(ExportProgressPopupWindow);
