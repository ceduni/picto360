import "./index.css";
import "./App.css";
import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Navigate, Outlet, RouterProvider } from "react-router-dom";
import { BannerProvider } from "./contexts/BannerContext";
import { AuthProvider, useAuth } from "./authContext/authContext";
import { ActivityDraftProvider } from "./contexts/ActivityDraftContext";
import HomePage from "./pages/HomePage";
import VisualisationPage from "./pages/VisualisationPage";
import StudioPage from "./pages/DashboardPages/StudioPage";

const RequireAuth: React.FC = () => {
    const { userLoggedIn } = useAuth();
    return userLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};

const adminRouteObjects = (() => {
    if (!__ENABLE_ADMIN__) return [];

    const LoginPage           = lazy(() => import("./pages/LoginPage"));
    const ActivityCreationPage = lazy(() => import("./pages/ActivityCreationPage"));
    const EditActivityPage    = lazy(() => import("./pages/DashboardPages/EditActivityPage"));
    const ActivitiesListPage  = lazy(() => import("./pages/DashboardPages/ActivitiesListPage"));
    const DashboardPage       = lazy(() => import("./pages/DashboardPages/DashboardPage"));

    return [
        {
            path: "/login",
            element: <Suspense fallback={null}><LoginPage /></Suspense>,
        },
        {
            element: <RequireAuth />,
            children: [
                { path: "/dashboard",                    element: <Suspense fallback={null}><DashboardPage /></Suspense> },
                { path: "/dashboard/studio",             element: <StudioPage /> },
                { path: "/dashboard/your-activities",    element: <Suspense fallback={null}><ActivitiesListPage /></Suspense> },
                { path: "/dashboard/activity-editor/:id",element: <Suspense fallback={null}><EditActivityPage /></Suspense> },
                { path: "/dashboard/activity-creation",  element: <Suspense fallback={null}><ActivityCreationPage /></Suspense> },
            ],
        },
    ];
})();

const router = createBrowserRouter([
    { path: "/",              element: <HomePage /> },
    { path: "/view/:viewerId", element: <VisualisationPage /> },
    ...adminRouteObjects,
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <BannerProvider>
            <AuthProvider>
                <ActivityDraftProvider>
                    <RouterProvider router={router} />
                </ActivityDraftProvider>
            </AuthProvider>
        </BannerProvider>
    </React.StrictMode>
);
