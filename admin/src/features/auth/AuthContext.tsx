import { createContext, useContext, type ReactNode } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useCurrentUser } from './hooks/useCurrentUser';
import type { User } from './types';

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
	const { data: user, isLoading } = useCurrentUser();

	const setSession = (accessToken: string, refreshToken: string) => {
		localStorage.setItem('accessToken', accessToken);
		localStorage.setItem('refreshToken', refreshToken);
		queryClient.invalidateQueries({ queryKey: ['auth', 'me'] });
	};

	const clearSession = () => {
		localStorage.removeItem('accessToken');
		localStorage.removeItem('refreshToken');
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