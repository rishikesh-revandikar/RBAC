// src/types/index.ts
export interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    status: "active" | "inactive";
    createdAt: string;
}

export interface Role {
    id: string;
    name: string;
    description: string;
    permissions: string[];
}
