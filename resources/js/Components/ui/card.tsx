export function Card({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={className} {...props}>{children}</div>;
}
export function CardHeader({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={className} {...props}>{children}</div>;
}
export function CardTitle({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return <h3 className={className} {...props}>{children}</h3>;
}
export function CardContent({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={className} {...props}>{children}</div>;
}
