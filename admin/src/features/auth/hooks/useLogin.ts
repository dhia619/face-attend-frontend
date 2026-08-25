import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";

import { authApi } from "../api";
import { useAuth } from "../AuthContext";

export const useLogin = () => {

    const navigate = useNavigate();
    const { setSession } = useAuth();

    return useMutation({
        mutationFn: authApi.login,
        onSuccess: (res) => {
			setSession(res.data.access_token, res.data.refresh_token);
            navigate("/dashboard");
        },
        onError: (error) => {
			console.error("Login mutation failed:", error);
		},
    });
};