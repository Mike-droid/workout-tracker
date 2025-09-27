"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "../components/button";

export default function LoginPage() {
    const { login } = useAuth();
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (!res.ok) {
                const { error } = await res.json();
                throw new Error(error || "Login failed");
            }

            const data = await res.json();
            login(data.token);
            router.push('/workouts');
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "Login failed");
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 max-w-sm mx-auto mt-10"
        >
            <h1 className="text-xl font-bold">Login</h1>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border px-2 py-1 rounded"
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border px-2 py-1 rounded"
                required
            />
            <Button type="submit" variant="primary">
                Login
            </Button>

            {error && <p className="text-red-500">{error}</p>}
        </form>
    );
}
