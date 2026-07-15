import * as React from "react";

export function AlertDialog({ children, ...props }: { children?: React.ReactNode; open?: boolean; onOpenChange?: (v: boolean) => void }) {
    return <>{children}</>;
}
export function AlertDialogTrigger({ children, ...props }: { children?: React.ReactNode; asChild?: boolean }) {
    return <>{children}</>;
}
export function AlertDialogContent({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={""} {...props}>{children}</div>;
}
export function AlertDialogHeader({ children }: { children?: React.ReactNode }) {
    return <>{children}</>;
}
export function AlertDialogTitle({ children }: { children?: React.ReactNode }) {
    return <>{children}</>;
}
export function AlertDialogDescription({ children }: { children?: React.ReactNode }) {
    return <>{children}</>;
}
export function AlertDialogFooter({ children }: { children?: React.ReactNode }) {
    return <>{children}</>;
}
export function AlertDialogCancel({ children }: { children?: React.ReactNode }) {
    return <>{children}</>;
}
export function AlertDialogAction({ children }: { children?: React.ReactNode }) {
    return <>{children}</>;
}
