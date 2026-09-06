import { Injectable, inject, signal } from '@angular/core';
import { AuthService } from './auth.service';

export interface Employee {
  id?: string;
  name: string;
  email: string;
  campaignName: string;
  avatar: string;
  department?: string;
  status?: string;
  created_at?: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private authService = inject(AuthService);

  employees = signal<Employee[]>([]);
  isLoading = signal<boolean>(false);
  error = signal<string | null>(null);

  private defaultSeed: Employee[] = [];

  async loadEmployees(): Promise<Employee[]> {
    this.isLoading.set(true);
    this.error.set(null);

    const client = this.authService.getClient();

    if (!client) {
      this.employees.set(this.defaultSeed);
      this.isLoading.set(false);
      return this.defaultSeed;
    }

    try {
      // Query Supabase employees table
      const { data, error } = await client
        .from('employees')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.warn('Supabase employees query error (fallback to local):', error.message);
        // If table empty or needs seeding, try to seed initial records
        if (error.code === '42P01') {
          // Table doesn't exist yet, return local seed
          this.employees.set(this.defaultSeed);
          return this.defaultSeed;
        }
        this.employees.set(this.defaultSeed);
        return this.defaultSeed;
      }

      if (data && data.length > 0) {
        const mapped: Employee[] = data.map((item: any) => ({
          id: item.id,
          name: item.name,
          email: item.email,
          campaignName: item.campaign_name || '',
          avatar: item.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120&h=120',
          department: item.department || 'General',
          status: item.status || 'Active',
          created_at: item.created_at
        }));
        this.employees.set(mapped);
        return mapped;
      } else {
        // Seed default real records into Supabase for this user
        await this.seedInitialEmployees(client);
        return this.employees();
      }
    } catch (err: any) {
      console.error('Error fetching employees from Supabase:', err);
      this.employees.set(this.defaultSeed);
      return this.defaultSeed;
    } finally {
      this.isLoading.set(false);
    }
  }

  private async seedInitialEmployees(client: any) {
    try {
      const user = this.authService.currentUser();
      const rows = this.defaultSeed.map(emp => ({
        user_id: user?.id || null,
        name: emp.name,
        email: emp.email,
        campaign_name: emp.campaignName,
        avatar: emp.avatar,
        department: emp.department,
        status: emp.status
      }));

      const { data, error } = await client
        .from('employees')
        .insert(rows)
        .select();

      if (!error && data) {
        const mapped: Employee[] = data.map((item: any) => ({
          id: item.id,
          name: item.name,
          email: item.email,
          campaignName: item.campaign_name || '',
          avatar: item.avatar,
          department: item.department,
          status: item.status,
          created_at: item.created_at
        }));
        this.employees.set(mapped);
      } else {
        this.employees.set(this.defaultSeed);
      }
    } catch (e) {
      this.employees.set(this.defaultSeed);
    }
  }

  async addEmployee(employee: Omit<Employee, 'id'>): Promise<Employee | null> {
    const client = this.authService.getClient();
    const user = this.authService.currentUser();

    const newEmp: Employee = {
      name: employee.name,
      email: employee.email,
      campaignName: employee.campaignName || '',
      avatar: employee.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120&h=120',
      department: employee.department || 'General',
      status: employee.status || 'Active'
    };

    if (!client) {
      this.employees.update(list => [newEmp, ...list]);
      return newEmp;
    }

    try {
      const { data, error } = await client
        .from('employees')
        .insert([{
          user_id: user?.id || null,
          name: newEmp.name,
          email: newEmp.email,
          campaign_name: newEmp.campaignName,
          avatar: newEmp.avatar,
          department: newEmp.department,
          status: newEmp.status
        }])
        .select()
        .single();

      if (error) {
        console.error('Supabase error inserting employee:', error);
        this.employees.update(list => [newEmp, ...list]);
        return newEmp;
      }

      const inserted: Employee = {
        id: data.id,
        name: data.name,
        email: data.email,
        campaignName: data.campaign_name || '',
        avatar: data.avatar,
        department: data.department,
        status: data.status,
        created_at: data.created_at
      };

      this.employees.update(list => [inserted, ...list]);
      return inserted;
    } catch (err) {
      this.employees.update(list => [newEmp, ...list]);
      return newEmp;
    }
  }

  async bulkAddEmployees(employeesToAdd: Omit<Employee, 'id'>[]): Promise<number> {
    const client = this.authService.getClient();
    const user = this.authService.currentUser();

    if (!client) {
      this.employees.update(list => [...employeesToAdd.map(e => ({ ...e })), ...list]);
      return employeesToAdd.length;
    }

    try {
      const rows = employeesToAdd.map(e => ({
        user_id: user?.id || null,
        name: e.name,
        email: e.email,
        campaign_name: e.campaignName || '',
        avatar: e.avatar,
        department: e.department || 'General',
        status: e.status || 'Active'
      }));

      const { data, error } = await client
        .from('employees')
        .insert(rows)
        .select();

      if (error) {
        console.error('Error in bulk insert:', error);
        this.employees.update(list => [...employeesToAdd.map(e => ({ ...e })), ...list]);
        return employeesToAdd.length;
      }

      if (data) {
        const mapped: Employee[] = data.map((item: any) => ({
          id: item.id,
          name: item.name,
          email: item.email,
          campaignName: item.campaign_name || '',
          avatar: item.avatar,
          department: item.department,
          status: item.status,
          created_at: item.created_at
        }));
        this.employees.update(list => [...mapped, ...list]);
        return mapped.length;
      }
      return employeesToAdd.length;
    } catch (err) {
      this.employees.update(list => [...employeesToAdd.map(e => ({ ...e })), ...list]);
      return employeesToAdd.length;
    }
  }

  async deleteEmployee(employee: Employee): Promise<boolean> {
    const client = this.authService.getClient();

    this.employees.update(list => list.filter(e => (e.id ? e.id !== employee.id : e.email !== employee.email)));

    if (client && employee.id) {
      try {
        const { error } = await client
          .from('employees')
          .delete()
          .eq('id', employee.id);

        if (error) {
          console.error('Error deleting employee from Supabase:', error);
          return false;
        }
      } catch (err) {
        console.error('Error in delete query:', err);
        return false;
      }
    }
    return true;
  }
}
