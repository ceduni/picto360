import React, { useState } from "react";
import Sidebar from "./Sidebar";
import DashboardHeader from "./DashboardHeader";
import ProfileDrawer from "../../ProfileDrawer";
import "./DashboardLayout.css";

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
  actions?: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, title, actions }) => {
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-layout-body">
        <DashboardHeader title={title} actions={actions} onOpenProfile={() => setProfileOpen(true)} />
        <main className="dashboard-layout-content">{children}</main>
      </div>
      {profileOpen && <ProfileDrawer open={profileOpen} onClose={() => setProfileOpen(false)} />}
    </div>
  );
};

export default React.memo(DashboardLayout);
