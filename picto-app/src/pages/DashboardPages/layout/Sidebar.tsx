import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

import {
  Squares2X2Icon,
  BoltIcon,
  UsersIcon,
  EyeIcon,
  Cog6ToothIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";
import "./Sidebar.css";

const MAIN_ITEMS = [
  { key: "dashboard",   label: "Dashboard",  Icon: Squares2X2Icon, path: "/dashboard" },
  { key: "activities",  label: "Activités",  Icon: BoltIcon,       path: "/dashboard/your-activities" },
  { key: "groups",      label: "Groupes",    Icon: UsersIcon,      path: "/dashboard/groupes" },
  { key: "viewer",      label: "Viewer",     Icon: EyeIcon,        path: "/" },
] as const;

const BOTTOM_ITEMS = [
  { key: "settings", label: "Paramètres", Icon: Cog6ToothIcon,          path: "/dashboard/settings" },
  { key: "help",     label: "Aide",       Icon: QuestionMarkCircleIcon, path: "/dashboard/help" },
] as const;

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isActive = (path: string) =>
    path === "/" || path === "/dashboard"
      ? pathname === path
      : pathname.startsWith(path);

  return (
    <aside className="sidebar">
      <div className="sidebar-logo" onClick={() => navigate("/")}>
        <img src="/images/logo_picto360.png" alt="Picto360" className="sidebar-logo-img" />
        <span className="sidebar-logo-name">Picto360</span>
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
