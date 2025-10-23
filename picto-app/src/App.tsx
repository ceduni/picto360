import React, { lazy, Suspense } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import VisualisationPage from "./pages/VisualisationPage";
import { AuthProvider } from "./authContext/authContext";


const App = () => {
    // Build routes in a block that only exists when admin is enabled.
    // When __ENABLE_ADMIN__ is false, the whole block is compiled out.
    let adminRoutes: React.ReactElement[] = [];

    if (__ENABLE_ADMIN__) {
        const LoginPage = lazy(() => import('./pages/LoginPage'));
        const ProfilePage = lazy(() => import('./pages/ProfilePage'));
        const ActivityCreationPage = lazy(() => import('./pages/ActivityCreationPage'));
        const EditActivityPage = lazy(() => import('./pages/DashboardPages/EditActivityPage'));
        const ActivitiesListPage = lazy(() => import('./pages/DashboardPages/ActivitiesListPage'));

        adminRoutes = [
            <Route key="login" path="/login" element={<LoginPage />} />,
            <Route key="profile" path="/profile" element={<ProfilePage />} />,
            <Route key="create" path="/activity_creation" element={<ActivityCreationPage />} />,
            <Route key="editor" path="/dashboard/activity-editor/:id" element={<EditActivityPage />} />,
            <Route key="list" path="/dashboard/your-activities" element={<ActivitiesListPage />} />,
        ];
    }

    return (
        <div className="app">
            <AuthProvider >
                {/* Suspense for the lazy-loaded elements (admin specific pages) */}
                <Suspense fallback={null}>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/view/:viewerId" element={<VisualisationPage />} />
                        {adminRoutes}
                    </Routes>
                </Suspense>
            </AuthProvider>
        </div>
    );
};

export default React.memo(App);
