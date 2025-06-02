import DashboardHomePage from "../pages/dashboard/dashboard-home-page";
import DashboardLayout from "../pages/dashboard/dashboard-layout";
import DashboardSettingsPage from "../pages/dashboard/dashboard-settings-page";
import ProtectedRoute from "../utils/protected-route";

export const PrivateRoutes = [
    {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: '', // or 'home'
        element: <DashboardHomePage/>
      },
      {
        path: 'settings',
        element: <DashboardSettingsPage />
      }
    ]
  }
];