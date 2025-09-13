"use client";

import { useAuth } from "@/hooks/useAuth";
import { getUserFromToken } from "@/lib/auth";

export default function HomePage() {
  const { isLoggedIn, logout } = useAuth();
  const token = isLoggedIn ? localStorage.getItem("token") : null;
  const user = token ? getUserFromToken(token) : null;

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
    <main className="flex flex-col min-h-screen">
      <header className="flex justify-between items-center p-4 bg-gray-100 shadow">
        <h1 className="text-xl font-bold text-black">
          Bienvenido de nuevo {user?.name || "👋"}
        </h1>
        <a href="/workouts" className="text-black">
          Entrenamientos
        </a>
        <button
          onClick={logout}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 hover:cursor-pointer"
        >
          Logout
        </button>
      </header>

      <section className="flex flex-col items-center justify-center flex-1">
        <p className="text-lg">Tu panel de entrenamientos está listo 💪</p>
      </section>
    </main>
  );
}
