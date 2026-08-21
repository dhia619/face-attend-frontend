import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { authApi } from "../api";
import { useAuth } from "../AuthContext";

export const useLogout = () => {
    const navigate = useNavigate();
    const { clearSession } = useAuth();

    return useMutation({
        mutationFn: authApi.logout,
        onSuccess: () => {
            clearSession();
            navigate("/login");
        },
        onError: () => {
            clearSession();
            navigate("/login");
        },
    });
};