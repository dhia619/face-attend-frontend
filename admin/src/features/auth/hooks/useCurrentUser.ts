import { useQuery } from "@tanstack/react-query";
import { authApi } from "../api";

export const useCurrentUser = (accessToken: string | null) => {

	return useQuery({
		queryKey: ["auth", "me"],
		queryFn: async () => {
			const res = await authApi.getMe();
			return res.data;
		},
		enabled: !!accessToken,
		retry: false,
	});
};