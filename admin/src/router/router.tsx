import { createBrowserRouter, Navigate } from "react-router";

import PublicLayout from "../Layouts/PublicLayout/PublicLayout";
import PrivateLayout from "../Layouts/PrivateLayout/PrivateLayout";
import LoginPage from "../pages/Login/LoginPage";
import DashboardPage from "../pages/Dashboard/DashboardPage";
import PageNotFound from "../pages/NotFound/PageNotFound";

export const router = createBrowserRouter([
	
	{
		Component: PublicLayout,
		children: [
			{
				index: true,
				element: <Navigate to="/login" replace />,
			},
			{
				path: "login",
				Component: LoginPage,
			},
		],
	},
	
	{
		Component: PrivateLayout,
		children: [
			{ index: true, element: <Navigate to="dashboard" replace /> },
			{ path: "dashboard", Component: DashboardPage },
		],
	},
	
	{
		path: "*",
		Component: PageNotFound,
	},
]);