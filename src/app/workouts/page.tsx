"use client";

import { useEffect, useState } from "react";
import { WorkoutSessionCard } from "@/app/components/WorkoutSessionCard";

export default function WorkoutsPage() {
    const [workouts, setWorkouts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setLoading(false);
            return;
        }

        fetch("/api/workouts", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                console.info("🚀 ~ WorkoutsPage ~ data:", data)
                setWorkouts(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching workouts:", err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Cargando workouts...</div>;

    if (!workouts.length) return <div>No tienes workouts aún</div>;

    return (
        <div>
            <h1>Mis Workouts</h1>
            <ul>
                {workouts.map((w) => (
                    <WorkoutSessionCard key={w.id} workout={w} />
                ))}
            </ul>
        </div>
    );
}
