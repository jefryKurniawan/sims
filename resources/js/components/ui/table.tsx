import React from "react";

interface TableProps {
    children?: React.ReactNode;
    className?: string;
}

export const Table: React.FC<TableProps> = ({ className, children }) => {
    return <table className={className}>{children}</table>;
};

interface TableHeaderProps {
    children?: React.ReactNode;
    className?: string;
}

export const Th: React.FC<TableHeaderProps> = ({ className, children }) => {
    return <th className={className}>{children}</th>;
};

interface TableRowProps {
    children?: React.ReactNode;
    className?: string;
}

export const Tr: React.FC<TableRowProps> = ({ className, children }) => {
    return <tr className={className}>{children}</tr>;
};

interface TableBodyProps {
    children?: React.ReactNode;
    className?: string;
}

export const Tbody: React.FC<TableBodyProps> = ({ className, children }) => {
    return <tbody className={className}>{children}</tbody>;
};

interface TableCellProps {
    children?: React.ReactNode;
    className?: string;
}

export const Td: React.FC<TableCellProps> = ({ className, children }) => {
    return <td className={className}>{children}</td>;
};
