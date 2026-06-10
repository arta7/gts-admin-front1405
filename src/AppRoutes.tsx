// AppRoutes.jsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SystemsPage, { systemsLoader } from './pages/adminDashboard/SystemsPage';
import SubSystemsPage, { subsystemsLoader } from './pages/adminDashboard/SubSystemsPage';
import ComponentsPage, { componentsLoader } from './pages/adminDashboard/ComponentsPage';

import ComponentsExcelUploadPage  from './pages/adminDashboard/ComponentsExcelUploadPage';
import AiPageGenerator  from './pages/adminDashboard/AiPageGenerator';

import FieldsPage, { fieldsLoader } from './pages/adminDashboard/FieldsPage';
import ComponentFieldsPage, { componentFieldsLoader } from './pages/adminDashboard/ComponentFieldsPage';
import ComponentDesignerPage from './pages/adminDashboard/RuntimePage';
import AppLayout from './AppLayout';

import DashboardPage from './DashboardPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />
      },
      {
        path: 'systems',
        element: <SystemsPage />,
        loader: systemsLoader
      },
      {
        path: 'subsystems',
        element: <SubSystemsPage />,
        loader: subsystemsLoader
      },
      {
        path: 'components',
        element: <ComponentsPage />,
        loader: componentsLoader
      },
      {
        path: 'fields',
        element: <FieldsPage />,
        loader: fieldsLoader
      },
      {
        path: 'component-fields',
        element: <ComponentFieldsPage />,
        loader: componentFieldsLoader
      },
      {
        path: 'component-designer',
        element: <ComponentDesignerPage />
        // loader: componentFieldsLoader
      },
      {
        path: '/AiPageGenerator',
        element: <AiPageGenerator />
        // اگر نیاز به loader دارید:
        // loader: componentsLoader
      }
    ]
  }
]);

export default function AppRoutes() {
  return <RouterProvider router={router} />;
}