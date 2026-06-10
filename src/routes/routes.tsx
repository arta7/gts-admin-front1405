import { createBrowserRouter, createRoutesFromElements, Outlet, Route, RouterProvider, Routes } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext';
import { DashboardHome } from '../pages'
import { DashboardLayout } from '../pages/dashboard/Dashboard'
import Page404 from '../pages/NotFoundPage';
import baseUrl from '../utils/Util';

export const Router = () => {
  const { menus } = useAuth()
  const router = createBrowserRouter(
    [
      {
        element: <Layout />,
        children: [
          {
            path: `${baseUrl}`,
            element: (
              <DashboardLayout />
            ),
            children: [{ index: true, element: <DashboardHome /> }, ...menus],
          }
        ],
        errorElement:<Page404/>
      }
    ]
  );
  return <RouterProvider router={router} />;
}

export function Layout() {
  return <>
    <Outlet />
  </>
}
