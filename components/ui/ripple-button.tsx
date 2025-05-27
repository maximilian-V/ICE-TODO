"use client";

import { cn } from "@/lib/utils";
import { ReactNode, useState } from "react";

interface RippleButtonProps {
    children: ReactNode;
    className?: string;
    rippleColor?: string;
    onClick?: () => void;
}

export default function RippleButton({
    children,
    className,
    rippleColor = "rgba(255, 255, 255, 0.6)",
    onClick,
}: RippleButtonProps) {
    const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);

    const createRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
        const button = event.currentTarget;
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        const newRipple = { x, y, id: Date.now() };

        setRipples((prev) => [...prev, newRipple]);

        setTimeout(() => {
            setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id));
        }, 600);

        if (onClick) {
            onClick();
        }
    };

    return (
        <button
            className={cn(
                "relative overflow-hidden rounded-lg bg-gradient-to-r from-cyan-600 to-blue-700 px-6 py-3 font-semibold text-white transition-all duration-200 hover:from-cyan-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2",
                className,
            )}
            onClick={createRipple}
        >
            {children}
            {ripples.map((ripple) => (
                <span
                    key={ripple.id}
                    className="absolute animate-ping rounded-full"
                    style={{
                        left: ripple.x,
                        top: ripple.y,
                        width: "100px",
                        height: "100px",
                        backgroundColor: rippleColor,
                        transform: "scale(0)",
                        animation: "ripple 0.6s linear",
                    }}
                />
            ))}
        </button>
    );
} 