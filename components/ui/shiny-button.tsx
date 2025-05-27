"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ShinyButtonProps {
    children: ReactNode;
    className?: string;
    shimmerColor?: string;
}

export default function ShinyButton({
    children,
    className,
    shimmerColor = "#ffffff",
}: ShinyButtonProps) {
    return (
        <button
            className={cn(
                "group relative inline-flex h-11 animate-shimmer cursor-pointer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50",
                className,
            )}
            style={
                {
                    "--shimmer-color": shimmerColor,
                } as React.CSSProperties
            }
        >
            {children}
        </button>
    );
} 