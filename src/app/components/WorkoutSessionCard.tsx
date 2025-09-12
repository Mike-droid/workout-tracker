"use client";

import { useState } from "react";

interface Exercise {
    id: string;
    sets: number;
    reps: number;
    weight?: number;
    exercise: {
        name: string;
    };
}

interface WorkoutSession {
    id: string;
    date: string;
    notes?: string;
    exercises: Exercise[];
}

export function WorkoutSessionCard({ workout }: { workout: WorkoutSession }) {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="border rounded-lg p-4 shadow-sm mb-4">
            {/* Header */}
            <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setExpanded((prev) => !prev)}
            >
                <div>
                    <h2 className="font-semibold">
                        {new Date(workout.date).toDateString()}
                    </h2>
                    <p className="text-sm text-gray-500">
                        {workout.exercises.length} ejercicios
                    </p>
                </div>
                <button className="text-blue-600 hover:underline">
                    {expanded ? "Contraer ▲" : "Expandir ▼"}
                </button>
            </div>

            {/* Expanded details */}
            {expanded && (
                <div className="mt-4 space-y-2">
                    {workout.notes && (
                        <p className="text-white italic">Notas: {workout.notes}</p>
                    )}
                    <ul className="space-y-2">
                        {workout.exercises.map((ex) => (
                            <li
                                key={ex.id}
                                className="text-black border rounded p-2 bg-gray-50 text-sm"
                            >
                                <span className="font-medium">{ex.exercise.name}</span> –{" "}
                                {ex.sets} sets × {ex.reps} reps{" "}
                                {ex.weight ? `@ ${ex.weight}kg` : ""}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
