"use client";

import { useAuth } from "@/hooks/useAuth";
import { getUserFromToken } from "@/lib/auth";
import { Button } from "./components/button";

export default function HomePage() {
  const { isLoggedIn, logout } = useAuth();
  const token = isLoggedIn ? localStorage.getItem("token") : null;
  const user = token ? getUserFromToken(token) : null;

  if (!isLoggedIn) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen gap-4">
        <h1 className="text-2xl font-bold">Welcome to Workout Tracker</h1>
        <div className="flex gap-4">
          <Button href="/login" variant="secondary">
            Login
          </Button>
          <Button href="/signup" variant="primary">
            Sign Up
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="flex flex-col min-h-screen">
      <header className="flex justify-between items-center p-4 bg-gray-100 shadow">
        <h1 className="text-xl font-bold text-black">
          Welcome back {user?.name || "👋"}
        </h1>
        <Button href="/workouts" variant="primary">
          Workouts
        </Button>
        <Button onClick={logout} variant="danger">
          Logout
        </Button>
      </header>

      <section className="flex flex-col items-center justify-center flex-1">
        <p className="text-lg">Your workouts panel is ready 💪</p>
      </section>
    </main>
  );
}
