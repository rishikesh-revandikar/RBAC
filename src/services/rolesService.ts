import { mockDb } from './mockDB';
import { Role } from '@/types';

export class RoleService {
  static async getAll(): Promise<Role[]> {
    try {
      return await mockDb.getAllRoles();
    } catch (error) {
      console.error('Error fetching roles:', error);
      throw error;
    }
  }

  static async create(roleData: Omit<Role, 'id'>): Promise<Role> {
    try {
      return await mockDb.createRole(roleData);
    } catch (error) {
      console.error('Error creating role:', error);
      throw error;
    }
  }

  static async update(id: string, roleData: Partial<Role>): Promise<Role> {
    try {
      return await mockDb.updateRole(id, roleData);
    } catch (error) {
      console.error('Error updating role:', error);
      throw error;
    }
  }

  static async delete(id: string): Promise<void> {
    try {
      await mockDb.deleteRole(id);
    } catch (error) {
      console.error('Error deleting role:', error);
      throw error;
    }
  }
}
