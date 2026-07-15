import * as React from "react";

export function Select({ children }: { children?: React.ReactNode }) { return <>{children}</>; }
export function SelectTrigger({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={className} {...props}>{children}</div>;
}
export function SelectValue({ children }: { children?: React.ReactNode }) { return <>{children}</>; }
export function SelectContent({ children }: { children?: React.ReactNode }) { return <>{children}</>; }
export function SelectItem({ children, value }: { children?: React.ReactNode; value: string }) {
    return <option value={value}>{children}</option>;
}
