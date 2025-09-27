"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useForm, SubmitHandler } from "react-hook-form";

export default function SignUpPage() {
    const router = useRouter();
    const { login } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm<{ name: string; email: string; password: string }>();
    const validatePassword = (value: string) => {
        if (value.length < 8) {
            return "Password must be at least 8 characters long";
        }
        if (!value.match(/\d/)) {
            return "Password must contain at least one number";
        }
        if (!value.match(/[a-z]/)) {
            return "Password must contain at least one lowercase letter";
        }
        if (!value.match(/[A-Z]/)) {
            return "Password must contain at least one uppercase letter";
        }
        return true;
    };

    const validateEmail = (value: string) => {
        if (!value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            return "Email is invalid";
        }
        return true;
    };

    const validateName = (value: string) => {
        if (value.length < 3) {
            return "Name must be at least 3 characters long";
        }
        return true;
    };

    const onSubmit: SubmitHandler<{ name: string; email: string; password: string }> = async (data) => {
        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const result = await res.json();

            if (!res.ok) {
                throw new Error(result.error || "Signup failed");
            }

            login(result.token);
            router.push("/workouts");
        } catch (err: unknown) {
            console.error("Error signing up:", err);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-white mb-6 text-center">Sign Up</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Your Name"
                            {...register("name", { required: true, validate: validateName })}
                            autoComplete="name"
                        />
                        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="you@example.com"
                            {...register("email", { required: true, validate: validateEmail })}
                            autoComplete="email"
                        />
                        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Your Password"
                            {...register("password", { required: true, validate: validatePassword })}
                            autoComplete="current-password"
                        />
                        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                    </div>
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
}