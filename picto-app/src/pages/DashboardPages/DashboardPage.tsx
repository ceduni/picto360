import React from "react";
import DashboardLayout from "./layout/DashboardLayout";

const DashboardPage: React.FC = () => {
  return (
    <DashboardLayout title="Dashboard">
      {/* Dashboard content goes here */}
      <p>This is the dashboard</p>
    </DashboardLayout>
  );
};

export default React.memo(DashboardPage);
