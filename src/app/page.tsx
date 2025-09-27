"use client";

import { useAuth } from "@/hooks/useAuth";
import { Button } from "./components/button";
import { Header } from "./components/Header";
export default function HomePage() {
  const { isLoggedIn, user } = useAuth();

  if (!isLoggedIn) {
    return (
      <main className="flex flex-col items-center justify-center gap-4">
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
    <main className="flex flex-col">
      <Header username={user?.name || "👋"} />
      <section className="flex flex-col items-center justify-center flex-1">
        <p className="text-lg">Your workouts panel is ready 💪</p>
      </section>
    </main>
  );
}
