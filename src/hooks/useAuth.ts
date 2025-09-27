import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';
interface DecodedToken {
	userId: string;
	email: string;
	name: string;
	exp: number;
}

export function useAuth() {
	const [token, setToken] = useState<string | null>(null);
	const [user, setUser] = useState<DecodedToken | null>(null);
	const router = useRouter();

	useEffect(() => {
		const savedToken = localStorage.getItem('token');
		if (savedToken) {
			setToken(savedToken);
			const decoded = jwtDecode<DecodedToken>(savedToken);
			setUser(decoded);
		}
	}, []);

	const login = (newToken: string) => {
		localStorage.setItem('token', newToken);
		setToken(newToken);
		const decoded = jwtDecode<DecodedToken>(newToken);
		setUser(decoded);
	};

	const logout = () => {
		localStorage.removeItem('token');
		setToken(null);
		setUser(null);
		router.push('/');
	};

	return { token, user, login, logout, isLoggedIn: !!token };
}
