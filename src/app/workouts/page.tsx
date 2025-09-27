"use client";

import { useEffect, useState } from "react";
import { WorkoutSessionCard } from "@/app/components/WorkoutSessionCard";
import { WorkoutSession as WS, Exercise as Ex } from '../../../prisma/generated/index';
import { Button } from "../components/button";

type WorkoutExerciseCreate = {
    exerciseId: string;
    sets: number;
    reps: number;
    weight?: number;
};

type WorkoutCreate = {
    date?: string;
    notes?: string;
    exercises: WorkoutExerciseCreate[];
};

export default function WorkoutsPage() {
    const [workouts, setWorkouts] = useState<WS[]>([]);
    const [loading, setLoading] = useState(true);
    const [exercises, setExercises] = useState<Ex[]>([]);
    const [loadingExercises, setLoadingExercises] = useState(false);
    const [notes, setNotes] = useState("");
    const [selectedExerciseId, setSelectedExerciseId] = useState<string>("");
    const [sets, setSets] = useState<number>(3);
    const [reps, setReps] = useState<number>(10);
    const [weight, setWeight] = useState<number | "">("");
    const [sessionExercises, setSessionExercises] = useState<WorkoutExerciseCreate[]>([]);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setLoading(false);
            return;
        }

        fetch("/api/workouts", {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => {
                if (!res.ok) throw new Error("Error fetching workouts");
                return res.json();
            })
            .then((data: WS[]) => {
                setWorkouts(data);
            })
            .catch((err) => {
                console.error("Error fetching workouts:", err);
            })
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        getExercises();
    }, []);

    function addExerciseToSession() {
        if (!selectedExerciseId) return;
        const ex: WorkoutExerciseCreate = {
            exerciseId: selectedExerciseId,
            sets,
            reps,
            weight: weight === "" ? undefined : Number(weight),
        };
        setSessionExercises((prev) => [...prev, ex]);
        setSelectedExerciseId("");
        setSets(3);
        setReps(8);
        setWeight("");
    }

    async function getExercises() {
        setLoadingExercises(true);
        try {
            const res = await fetch("/api/exercises");
            if (!res.ok) throw new Error("Error fetching exercises");
            const data = (await res.json()) as Ex[];
            setExercises(data);
        } catch (err) {
            console.error("Error fetching exercises:", err);
        } finally {
            setLoadingExercises(false);
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (sessionExercises.length === 0) {
            alert("Add at least one exercise to the session.");
            return;
        }

        const token = localStorage.getItem("token");
        if (!token) {
            alert("Not authenticated");
            return;
        }

        setSubmitting(true);

        const payload: WorkoutCreate = {
            date: new Date().toISOString(),
            notes: notes || undefined,
            exercises: sessionExercises,
        };

        try {
            const res = await fetch("/api/workouts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err?.error || "Error creating workout");
            }

            const created = (await res.json()) as WS;
            setWorkouts((prev) => [...prev, created]);

            setNotes("");
            setSessionExercises([]);
        } catch (err: unknown) {
            console.error("Error posting workout:", err);
            alert((err as Error).message || "Error creating workout");
        } finally {
            setSubmitting(false);
        }
    }

    if (loading) return <div>Loading workouts...</div>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">My Workouts</h1>

            <form onSubmit={handleSubmit} className="bg-white text-black p-4 rounded-md shadow-md border-2 mb-6">
                <h3 className="font-semibold mb-2">Create workout session</h3>

                <label className="block mb-2">
                    <span className="text-sm">Notes</span>
                    <input
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="block w-full border px-2 py-1 rounded mt-1"
                        placeholder="Ex: Pull day"
                    />
                </label>

                <div className="grid grid-cols-4 gap-2 items-end">
                    <div>
                        <label className="text-sm">Exercise</label>
                        <select
                            value={selectedExerciseId}
                            onChange={(e) => setSelectedExerciseId(e.target.value)}
                            onFocus={() => !exercises.length && getExercises()}
                            className="block w-full border px-2 py-1 rounded mt-1"
                        >
                            <option value="">{loadingExercises ? "Loading..." : "Select exercise"}</option>
                            {exercises.map((ex) => (
                                <option key={ex.id} value={ex.id}>
                                    {ex.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="text-sm">Sets</label>
                        <input
                            type="number"
                            min={1}
                            value={sets}
                            onChange={(e) => setSets(Number(e.target.value))}
                            className="block w-full border px-2 py-1 rounded mt-1"
                        />
                    </div>

                    <div>
                        <label className="text-sm">Reps</label>
                        <input
                            type="number"
                            min={1}
                            value={reps}
                            onChange={(e) => setReps(Number(e.target.value))}
                            className="block w-full border px-2 py-1 rounded mt-1"
                        />
                    </div>

                    <div>
                        <label className="text-sm">Weight (kg)</label>
                        <input
                            type="number"
                            min={0}
                            value={weight === "" ? "" : String(weight)}
                            onChange={(e) => setWeight(e.target.value === "" ? "" : Number(e.target.value))}
                            className="block w-full border px-2 py-1 rounded mt-1"
                        />
                    </div>
                </div>

                <div className="mt-3 flex gap-2">
                    <Button type="button" onClick={addExerciseToSession} variant="secondary">
                        Add exercise
                    </Button>
                    <Button type="submit" variant="primary" disabled={submitting}>
                        {submitting ? "Creating..." : "Create session"}
                    </Button>
                </div>

                {sessionExercises.length > 0 && (
                    <div className="mt-4">
                        <h4 className="font-medium">Session exercises</h4>
                        <ul className="mt-2 space-y-2">
                            {sessionExercises.map((ex, idx) => {
                                const exMeta = exercises.find((e) => e.id === ex.exerciseId);
                                return (
                                    <li key={idx} className="border rounded p-2 bg-gray-50">
                                        <strong>{exMeta?.name || ex.exerciseId}</strong> — {ex.sets}x{ex.reps} {ex.weight ? `@ ${ex.weight}kg` : ""}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                )}
            </form>

            <div>
                {workouts.length === 0 ? (
                    <h2 className="text-4xl font-bold">You do not have any workouts yet</h2>
                ) : (
                    <ul className="mt-4 space-y-2 grid grid-cols-3 gap-4">
                        {workouts.map((w) => (
                            <li key={w.id}>
                                <WorkoutSessionCard workout={w as never} />
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
