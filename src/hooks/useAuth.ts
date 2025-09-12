import { useEffect, useState } from 'react';

export function useAuth() {
	const [token, setToken] = useState<string | null>(null);

	useEffect(() => {
		const savedToken = localStorage.getItem('token');
		if (savedToken) setToken(savedToken);
	}, []);

	const login = (newToken: string) => {
		localStorage.setItem('token', newToken);
		setToken(newToken);
	};

	const logout = () => {
		localStorage.removeItem('token');
		setToken(null);
	};

	return { token, login, logout, isLoggedIn: !!token };
}
