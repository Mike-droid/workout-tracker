"use client";

import Link from "next/link";
import { ReactNode } from "react";
import clsx from "clsx";

interface ButtonProps {
    children: ReactNode;
    href?: string;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    className?: string;
    variant?: "primary" | "secondary" | "danger";
}

export function Button({
    children,
    href,
    onClick,
    type = "button",
    className,
    variant = "primary",
}: ButtonProps) {
    const baseStyles =
        "px-4 py-2 rounded font-medium transition-colors duration-200";

    const variants = {
        primary: "bg-blue-500 text-white hover:bg-blue-600",
        secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
        danger: "bg-red-500 text-white hover:bg-red-600",
    };

    const combined = clsx(baseStyles, variants[variant], className);

    if (href) {
        return (
            <Link href={href} className={combined}>
                {children}
            </Link>
        );
    }

    return (
        <button onClick={onClick} type={type} className={combined}>
            {children}
        </button>
    );
}
