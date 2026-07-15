export function Badge({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={className} {...props}>{children}</div>;
}
