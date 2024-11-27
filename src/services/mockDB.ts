import { v4 as uuidv4 } from "uuid";
import { User, Role } from "@/types";

class MockDatabase {
    private users: User[] = [
        {
            id: "1",
            name: "John Doe",
            email: "john@vrvsecurity.com",
            role: "Admin",
            status: "active",
            createdAt: new Date().toISOString(),
        },
        {
            id: "2",
            name: "Jane Smith",
            email: "jane@vrvsecurity.com",
            role: "Manager",
            status: "active",
            createdAt: new Date().toISOString(),
        },
    ];

    private roles: Role[] = [
        {
            id: "1",
            name: "Admin",
            description: "Full system access",
            permissions: [
                "user_view",
                "user_create",
                "user_edit",
                "user_delete",
                "role_view",
                "role_create",
                "role_edit",
                "role_delete",
            ],
        },
        {
            id: "2",
            name: "Manager",
            description: "Limited access",
            permissions: ["user_view", "user_create", "role_view"],
        },
    ];

    // User Methods
    getAllUsers(): Promise<User[]> {
        return Promise.resolve([...this.users]);
    }

    createUser(userData: Omit<User, "id" | "createdAt">): Promise<User> {
        const newUser: User = {
            id: uuidv4(),
            ...userData,
            createdAt: new Date().toISOString(),
        };
        this.users.push(newUser);
        return Promise.resolve(newUser);
    }

    updateUser(id: string, userData: Partial<User>): Promise<User> {
        const index = this.users.findIndex((user) => user.id === id);
        if (index === -1) {
            return Promise.reject(new Error("User not found"));
        }
        this.users[index] = { ...this.users[index], ...userData };
        return Promise.resolve(this.users[index]);
    }

    deleteUser(id: string): Promise<void> {
        const index = this.users.findIndex((user) => user.id === id);
        if (index === -1) {
            return Promise.reject(new Error("User not found"));
        }
        this.users.splice(index, 1);
        return Promise.resolve();
    }

    // Role Methods
    getAllRoles(): Promise<Role[]> {
        return Promise.resolve([...this.roles]);
    }

    createRole(roleData: Omit<Role, "id">): Promise<Role> {
        const newRole: Role = {
            id: uuidv4(),
            ...roleData,
        };
        this.roles.push(newRole);
        return Promise.resolve(newRole);
    }

    updateRole(id: string, roleData: Partial<Role>): Promise<Role> {
        const index = this.roles.findIndex((role) => role.id === id);
        if (index === -1) {
            return Promise.reject(new Error("Role not found"));
        }
        this.roles[index] = { ...this.roles[index], ...roleData };
        return Promise.resolve(this.roles[index]);
    }

    deleteRole(id: string): Promise<void> {
        const index = this.roles.findIndex((role) => role.id === id);
        if (index === -1) {
            return Promise.reject(new Error("Role not found"));
        }
        this.roles.splice(index, 1);
        return Promise.resolve();
    }
}

export const mockDb = new MockDatabase();
