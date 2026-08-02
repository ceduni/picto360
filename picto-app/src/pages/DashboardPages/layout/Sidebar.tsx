import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import {
  Squares2X2Icon,
  BoltIcon,
  UsersIcon,
  ViewfinderCircleIcon,
  Cog6ToothIcon,
  QuestionMarkCircleIcon,
  PlusIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { useActivity } from "@/contexts/ActivityContext";
import "./Sidebar.css";

const ACTIVITY_COLORS = [
  "#7c5cbf", "#4e9af1", "#f4a023", "#3dbf7c", "#e05c7f",
  "#5bc8d4", "#a07cde", "#f16a4e", "#7db854", "#c45cbf",
];

const MAIN_ITEMS = [
  { key: "studio",      label: "Studio",     Icon: ViewfinderCircleIcon, path: "/dashboard/studio" },
  { key: "dashboard",   label: "Dashboard",  Icon: Squares2X2Icon,  path: "/dashboard" },
  { key: "activities",  label: "Activités",  Icon: BoltIcon,        path: "/dashboard/your-activities" },
  { key: "groups",      label: "Groupes",    Icon: UsersIcon,       path: "#" },
] as const;

const BOTTOM_ITEMS = [
  { key: "settings", label: "Paramètres", Icon: Cog6ToothIcon,          path: "#" },
  { key: "help",     label: "Aide",       Icon: QuestionMarkCircleIcon, path: "#" },
] as const;

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { userActivities, currentDraft } = useActivity();
  const [isOpen, setIsOpen] = useState(true);

  const isActive = (path: string) =>
    path === "/" || path === "/dashboard"
      ? pathname === path
      : pathname.startsWith(path);

  // All server activities except ARCHIVED
  const serverActivities = (userActivities ?? []).filter(
    a => a.status !== "ARCHIVED"
  );

  return (
    <aside className={`sidebar${isOpen ? "" : " sidebar--collapsed"}`}>
      <button
        className="sidebar-toggle"
        onClick={() => setIsOpen(o => !o)}
        aria-label={isOpen ? "Réduire la barre" : "Ouvrir la barre"}
      >
        {isOpen ? <ChevronLeftIcon width={14} height={14} /> : <ChevronRightIcon width={14} height={14} />}
      </button>

      <div className="sidebar-logo" onClick={() => navigate("/dashboard/studio")}>
        <img src="/images/logo_picto360.png" alt="Picto360" className="sidebar-logo-img" />
        {isOpen && <span className="sidebar-logo-name">Picto360</span>}
      </div>

      <nav className="sidebar-nav">
        {MAIN_ITEMS.map(({ key, label, Icon, path }) => (
          <div
            key={key}
            className={`sidebar-item${isActive(path) ? " sidebar-item--active" : ""}`}
            onClick={() => navigate(path)}
          >
            <Icon width={18} height={18} />
            <span>{label}</span>
          </div>
        ))}
      </nav>

      {isOpen &&
      <div className="sidebar-section-list">
        <div className="sidebar-section">
          <div className="sidebar-section__header">
            <span className="sidebar-section__title">Activités</span>
            <button
              className="sidebar-section__add"
              onClick={() => navigate("/dashboard/activity-creation")}
              aria-label="Nouvelle activité"
            >
              <PlusIcon width={14} height={14} />
            </button>
          </div>

          <div className="sidebar-section__list">
            {/* In-progress draft (shows immediately while backend creates it, then tracks by backendId) */}
            {currentDraft && (
              <div
                className={`sidebar-activity${pathname === "/dashboard/activity-creation" ? " sidebar-activity--active" : ""}`}
                onClick={() => navigate("/dashboard/activity-creation")}
              >
                <span className="sidebar-activity__dot sidebar-activity__dot--draft" />
                <span className="sidebar-activity__name sidebar-activity__name--draft">
                  {currentDraft.title}
                </span>
              </div>
            )}

            {serverActivities.length === 0 && !currentDraft && (
              <p className="sidebar-section__empty">Aucune activité</p>
            )}

            {serverActivities.slice(0, 8).map((activity, i) => {
              const isDraft = activity.status === "DRAFT";
              return (
                <div
                  key={activity._id}
                  className={`sidebar-activity${pathname === `/dashboard/activity-editor/${activity._id}` ? " sidebar-activity--active" : ""}`}
                  onClick={() => navigate(`/dashboard/activity-editor/${activity._id}`)}
                >
                  {isDraft
                    ? <span className="sidebar-activity__dot sidebar-activity__dot--draft" />
                    : <span className="sidebar-activity__dot" style={{ background: ACTIVITY_COLORS[i % ACTIVITY_COLORS.length] }} />
                  }
                  <span className={`sidebar-activity__name${isDraft ? " sidebar-activity__name--draft" : ""}`}>
                    {activity.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      }

      <div className="sidebar-bottom">
        {BOTTOM_ITEMS.map(({ key, label, Icon, path }) => (
          <div
            key={key}
            className={`sidebar-item${isActive(path) ? " sidebar-item--active" : ""}`}
            onClick={() => navigate(path)}
          >
            <Icon width={18} height={18} />
            <span>{label}</span>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default React.memo(Sidebar);
