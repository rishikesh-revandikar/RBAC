import { mockDb } from "./mockDB";
import { User } from "@/types";

export class UserService {
    static async getAll(): Promise<User[]> {
        try {
            return await mockDb.getAllUsers();
        } catch (error) {
            console.error("Error fetching users:", error);
            throw error;
        }
    }

    static async create(
        userData: Omit<User, "id" | "createdAt">
    ): Promise<User> {
        try {
            return await mockDb.createUser(userData);
        } catch (error) {
            console.error("Error creating user:", error);
            throw error;
        }
    }

    static async update(id: string, userData: Partial<User>): Promise<User> {
        try {
            return await mockDb.updateUser(id, userData);
        } catch (error) {
            console.error("Error updating user:", error);
            throw error;
        }
    }

    static async delete(id: string): Promise<void> {
        try {
            await mockDb.deleteUser(id);
        } catch (error) {
            console.error("Error deleting user:", error);
            throw error;
        }
    }
}
