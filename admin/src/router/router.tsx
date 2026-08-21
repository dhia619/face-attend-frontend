import { createBrowserRouter } from "react-router";

import PublicLayout from "../Layouts/PublicLayout/PublicLayout";
import PrivateLayout from "../Layouts/PrivateLayout/PrivateLayout";
import LoginPage from "../pages/Login/LoginPage";

export const router = createBrowserRouter([
	{
		Component: PublicLayout,

		children: [
			{
				path: "login",
				Component: LoginPage,
			},
		],
	},

	{
		Component: PrivateLayout,

		children: [
			{
				path: "dashboard",
				
			},
		]
	}
]);