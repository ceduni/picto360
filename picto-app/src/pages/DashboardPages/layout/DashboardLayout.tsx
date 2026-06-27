import React from "react";
import Sidebar from "./Sidebar";
import DashboardHeader from "./DashboardHeader";
import "./DashboardLayout.css";

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, title }) => {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-layout-body">
        <DashboardHeader title={title} />
        <main className="dashboard-layout-content">{children}</main>
      </div>
    </div>
  );
};

export default React.memo(DashboardLayout);
