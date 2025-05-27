"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface AuroraTextProps {
    children: ReactNode;
    className?: string;
}

export default function AuroraText({
    children,
    className,
}: AuroraTextProps) {
    return (
        <div
            className={cn(
                "relative inline-block bg-gradient-to-r from-cyan-700 via-blue-700 to-purple-700 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]",
                className,
            )}
        >
            <span className="relative z-10">{children}</span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/10 via-blue-600/10 to-purple-600/10 blur-xl animate-pulse" />
        </div>
    );
} 