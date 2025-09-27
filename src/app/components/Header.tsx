import { Button } from "./button";
import { useAuth } from "@/hooks/useAuth";

export function Header(props: { username: string }) {
    const { logout, isLoggedIn } = useAuth();
    return (
        <header className="flex justify-between items-center p-4 bg-gray-100 shadow">
            <h1 className="text-xl font-bold text-black">
                Welcome back {props.username || "👋"}
            </h1>
            {isLoggedIn && <Button href="/" variant="primary">
                Home
            </Button>}
            {isLoggedIn && <Button href="/workouts" variant="primary">
                Workouts
            </Button>}
            {isLoggedIn && <Button onClick={logout} variant="danger">
                Logout
            </Button>}
        </header>
    );
}