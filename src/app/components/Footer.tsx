"use client";

import Link from "next/link";

export const Footer = () => {
    return (
        <footer className="flex justify-center items-center p-4 bg-gray-100 shadow">
            <p className="text-sm text-gray-800">Made out of boredom by <Link href="https://github.com/mike-droid" target="_blank" className="text-blue-600 hover:underline">Miguel Reyes</Link></p>
        </footer>
    );
}
