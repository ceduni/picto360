import React, { lazy, Suspense } from "react";
import "./App.css";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import VisualisationPage from "./pages/VisualisationPage";
import { AuthProvider, useAuth } from "./authContext/authContext";
import StudioPage from "./pages/DashboardPages/StudioPage";

// Redirects unauthenticated users to /login; renders child routes otherwise.
// Safe to call here because AuthProvider blocks rendering until auth is resolved.
const RequireAuth: React.FC = () => {
    const { userLoggedIn } = useAuth();
    return userLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};

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
        const DashboardPage = lazy(() => import('./pages/DashboardPages/DashboardPage'));

        adminRoutes = [
            <Route key="login" path="/login" element={<LoginPage />} />,
            <Route key="protected" element={<RequireAuth />}>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/dashboard/studio" element={<StudioPage />} />
                <Route path="/dashboard/profile" element={<ProfilePage />} />
                <Route path="/dashboard/your-activities" element={<ActivitiesListPage />} />
                <Route path="/dashboard/activity-editor/:id" element={<EditActivityPage />} />
                <Route path="/dashboard/activity-creation" element={<ActivityCreationPage />} />
            </Route>,
        ];
    }

    return (
        <div className="app">
            <AuthProvider>
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
