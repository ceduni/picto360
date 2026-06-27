import React from "react";
import { BellIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/authContext/authContext";
import "./DashboardHeader.css";

interface DashboardHeaderProps {
  title: string;
  actions?: React.ReactNode;
  onOpenProfile?: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ title, actions, onOpenProfile }) => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const initials = currentUser?.displayName
    ?.split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase() ?? "?";

  return (
    <header className="dash-header">
      <h1 className="dash-header-title">{title}</h1>

      {actions && <div className="dash-header-page-actions">{actions}</div>}

      <div className="dash-header-actions">
        <button className="dash-header-icon-btn" aria-label="Notifications">
          <BellIcon width={19} height={19} />
        </button>
        <button
          className="dash-header-icon-btn"
          aria-label="Paramètres"
          onClick={() => navigate("/dashboard/settings")}
        >
          <Cog6ToothIcon width={19} height={19} />
        </button>

        <div
          className="dash-header-avatar"
          onClick={() => onOpenProfile ? onOpenProfile() : navigate("/dashboard/profile")}
          title={currentUser?.displayName ?? "Profil"}
        >
          {currentUser?.photoURL ? (
            <img src={currentUser.photoURL} alt="avatar" />
          ) : (
            <span>{initials}</span>
          )}
        </div>
      </div>
    </header>
  );
};

export default React.memo(DashboardHeader);
