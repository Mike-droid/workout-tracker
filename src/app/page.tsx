"use client";

import { useAuth } from "@/hooks/useAuth";

export default function HomePage() {
  const { isLoggedIn, logout } = useAuth();

  if (!isLoggedIn) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen gap-4">
        <h1 className="text-2xl font-bold">Bienvenido a Workout Tracker</h1>
        <div className="flex gap-4">
          <a
            href="/login"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Login
          </a>
          <a
            href="/signup"
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Sign Up
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-2xl font-bold">Estás logeado 🎉</h1>
      <button
        onClick={logout}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Logout
      </button>
    </main>
  );
}
