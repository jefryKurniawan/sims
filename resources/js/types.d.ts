export interface PagePropsAuthUser {
    id: number;
    name: string;
    email: string;
    role: string;
    foto_profile?: string;
}

export interface PageProps {
    auth: {
        user: PagePropsAuthUser | null;
    };
    flash: {
        error?: string;
        success?: string;
        warning?: string;
        info?: string;
    };
    errors?: Record<string, string>;
}
