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
import EmployeesListPage from "../features/employees/pages/EmployeesListPage";
import CreateEmployeePage from "../features/employees/pages/CreateEmployeePage";
import EditEmployeePage from "../features/employees/pages/EditEmployeePage";
import UpdateEmployeeFacePage from "../features/employees/pages/UpdateEmployeeFacePage";
import DepartmentsListPage from "../features/departments/pages/DepartmentsListPage";
import CreateDepartmentPage from "../features/departments/pages/CreateDepartmentsPage";
import EditDepartmentPage from "../features/departments/pages/EditDepartmentPage";
import DevicesListPage from "../features/devices/pages/DevicesListPage";
import CreateDevicePage from "../features/devices/pages/CreateDevicePage";
import EditDevicePage from "../features/devices/pages/EditDevicePage";

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
			{ path: "employees", Component: EmployeesListPage },
			{ path: "employees/new", Component: CreateEmployeePage },
			{ path: "employees/:id/edit", Component: EditEmployeePage },
			{ path: "employees/:id/face-image", Component: UpdateEmployeeFacePage },
			{ path: "departments", Component: DepartmentsListPage },
			{ path: "departments/new", Component: CreateDepartmentPage },
			{ path: "departments/:id/edit", Component: EditDepartmentPage },
			{ path: "devices", Component: DevicesListPage },
			{ path: "devices/new", Component: CreateDevicePage },
			{ path: "devices/:id/edit", Component: EditDevicePage },

		],
	},
	
	{
		path: "*",
		Component: PageNotFound,
	},
]);