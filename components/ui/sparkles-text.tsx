"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface SparklesTextProps {
    text: string;
    className?: string;
    sparklesCount?: number;
    colors?: {
        first: string;
        second: string;
    };
}

interface Sparkle {
    id: number;
    x: string;
    y: string;
    color: string;
    delay: number;
    scale: number;
    lifespan: number;
}

export default function SparklesText({
    text,
    className,
    sparklesCount = 10,
    colors = {
        first: "#9E7AFF",
        second: "#FE8BBB",
    },
}: SparklesTextProps) {
    const [sparkles, setSparkles] = useState<Sparkle[]>([]);

    useEffect(() => {
        const generateSpark = (): Sparkle => ({
            id: Math.random(),
            x: `${Math.random() * 100}%`,
            y: `${Math.random() * 100}%`,
            color: Math.random() > 0.5 ? colors.first : colors.second,
            delay: Math.random() * 2,
            scale: Math.random() * 1 + 0.3,
            lifespan: Math.random() * 10 + 5,
        });

        const initializeSparks = () => {
            const newSparks = Array.from({ length: sparklesCount }, generateSpark);
            setSparkles(newSparks);
        };

        initializeSparks();
    }, [sparklesCount, colors.first, colors.second]);

    return (
        <div className={cn("relative inline-block", className)}>
            <span className="relative z-10">{text}</span>
            <span className="absolute inset-0">
                {sparkles.map((sparkle) => (
                    <span
                        key={sparkle.id}
                        className="absolute animate-pulse"
                        style={{
                            left: sparkle.x,
                            top: sparkle.y,
                            color: sparkle.color,
                            animationDelay: `${sparkle.delay}s`,
                            animationDuration: `${sparkle.lifespan}s`,
                            transform: `scale(${sparkle.scale})`,
                        }}
                    >
                        ✨
                    </span>
                ))}
            </span>
        </div>
    );
} 