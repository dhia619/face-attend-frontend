import { useMutation } from '@tanstack/react-query';
import { authApi } from '../api';
import { useNavigate } from 'react-router';

export const useLogin = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: authApi.login,
        onSuccess: (res) => {
            localStorage.setItem('access_token', res.data.access_token);
            localStorage.setItem('refresh_token', res.data.refresh_token)
            navigate('/dashboard');
        },
        onError: (error) => {
			console.error("Login mutation failed:", error);
		},
    });
};