import { createContext, useContext, useState, type ReactNode } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useCurrentUser } from './hooks/useCurrentUser';
import type { User } from '../users/types';
import { setAccessToken } from '../../api/client';

interface AuthContextType {
	user: User | null;
	isLoading: boolean;
	isAuthenticated: boolean;
	setSession: (accessToken: string, refreshToken: string) => void;
	clearSession: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const queryClient = useQueryClient();
	const [accessToken, setAccessTokenState] = useState(() => localStorage.getItem('accessToken'));
	const { data: user, isLoading } = useCurrentUser(accessToken);
	const setSession = (accessToken: string, refreshToken: string) => {
		localStorage.setItem('accessToken', accessToken);
		localStorage.setItem('refreshToken', refreshToken);
		setAccessToken(accessToken);
		setAccessTokenState(accessToken);
		queryClient.invalidateQueries({ queryKey: ['auth', 'me'] });
	};

	const clearSession = () => {
		localStorage.removeItem('accessToken');
		localStorage.removeItem('refreshToken');
		setAccessToken(null);
		setAccessTokenState(null);
		queryClient.clear();
	};

	return (
		<AuthContext.Provider value={{ user: user ?? null, isLoading, isAuthenticated: !!user, setSession, clearSession }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const ctx = useContext(AuthContext);
	if (!ctx) throw new Error('useAuth must be used within AuthProvider');
	return ctx;
};