import { createBrowserRouter, Navigate } from "react-router";

import PublicLayout from "../Layouts/PublicLayout/PublicLayout";
import PrivateLayout from "../Layouts/PrivateLayout/PrivateLayout";
import LoginPage from "../pages/Login/LoginPage";
import DashboardPage from "../pages/Dashboard/DashboardPage";
import PageNotFound from "../pages/NotFound/PageNotFound";
import UsersListPage from "../features/users/pages/UsersListPage";
import CreateUserPage from "../features/users/pages/CreateUserPage";
import EditUserPage from "../features/users/pages/EditUserPage";
import CreateRolePage from "../features/rbac/pages/CreateRolePage";
import EditRolePage from "../features/rbac/pages/EditRolePage";
import RolesListPage from "../features/rbac/pages/RolesListPage";

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
			{ path: "users", Component: UsersListPage },
			{ path: "users/new", Component: CreateUserPage },
			{ path: "users/:id/edit", Component: EditUserPage },
			{ path: "roles", Component: RolesListPage },
			{ path: "roles/new", Component: CreateRolePage },
			{ path: "roles/:id/edit", Component: EditRolePage },
		],
	},
	
	{
		path: "*",
		Component: PageNotFound,
	},
]);