import { useQuery } from "@tanstack/react-query";
import { authApi } from "../api";

export const useCurrentUser = () => {
	const token = localStorage.getItem("accessToken");

	return useQuery({
		queryKey: ["auth", "me"],
		queryFn: async () => {
			const res = await authApi.getMe();
			return res.data;
		},
		enabled: !!token,
		retry: false,
	});
};