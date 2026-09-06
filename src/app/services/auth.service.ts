import { Injectable, signal } from '@angular/core';
import { createClient, SupabaseClient, User, Session, AuthResponse } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

export interface SignUpData {
  email: string;
  password: string;
  fullName: string;
  companyName: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private supabase: SupabaseClient | null = null;
  public currentUser = signal<User | null>(null);
  public currentSession = signal<Session | null>(null);

  constructor() {
    this.initSupabase();
  }

  private initSupabase() {
    // Check if custom credentials are saved in localStorage or use environment defaults
    const customUrl = localStorage.getItem('supabase_url') || environment.supabaseUrl;
    const customKey = localStorage.getItem('supabase_anon_key') || environment.supabaseAnonKey;

    try {
      if (customUrl && customKey && !customUrl.includes('xyzcompany.supabase.co')) {
        this.supabase = createClient(customUrl, customKey);

        // Listen to auth state changes
        this.supabase.auth.onAuthStateChange((event, session) => {
          this.currentSession.set(session);
          this.currentUser.set(session?.user ?? null);
          if (session?.user) {
            sessionStorage.setItem('isAdminLoggedIn', 'true');
            sessionStorage.setItem('adminUserEmail', session.user.email || '');
          }
        });
      }
    } catch (e) {
      console.warn('Supabase initialization fallback:', e);
    }
  }

  public getClient() {
    return this.supabase;
  }

  isConfigured(): boolean {
    const url = localStorage.getItem('supabase_url') || environment.supabaseUrl;
    return !!(this.supabase && url && !url.includes('xyzcompany.supabase.co'));
  }

  public updateCredentials(url: string, key: string) {
    localStorage.setItem('supabase_url', url);
    localStorage.setItem('supabase_anon_key', key);
    this.initSupabase();
  }

  async signUp(data: SignUpData): Promise<{ user: User | null; session: Session | null; error: string | null }> {
    if (!this.isConfigured() || !this.supabase) {
      // Mock signup when credentials are not yet configured
      await new Promise(resolve => setTimeout(resolve, 1000));
      sessionStorage.setItem('isAdminLoggedIn', 'true');
      sessionStorage.setItem('adminUserEmail', data.email);
      sessionStorage.setItem('adminUserName', data.fullName);
      sessionStorage.setItem('adminCompanyName', data.companyName);
      return {
        user: { id: 'mock-user-id', email: data.email } as User,
        session: null,
        error: null
      };
    }

    try {
      const response: AuthResponse = await this.supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.fullName,
            company_name: data.companyName,
            role: 'admin'
          }
        }
      });

      if (response.error) {
        return { user: null, session: null, error: response.error.message };
      }

      return {
        user: response.data.user,
        session: response.data.session,
        error: null
      };
    } catch (err: any) {
      return { user: null, session: null, error: err.message || 'An unexpected error occurred during signup.' };
    }
  }

  async signIn(email: string, password: string): Promise<{ user: User | null; session: Session | null; error: string | null }> {
    // Check for standard demo credentials
    // if (
    //   (email.trim().toLowerCase() === 'admin@smarttier.com' && password === 'admin123') ||
    //   (email.trim().toLowerCase() === 'demo@smarttier.com' && password === 'demo123')
    // ) {
    //   await new Promise(resolve => setTimeout(resolve, 800));
    //   sessionStorage.setItem('isAdminLoggedIn', 'true');
    //   sessionStorage.setItem('adminUserEmail', email.trim());
    //   return { user: { id: 'demo-admin-id', email } as User, session: null, error: null };
    // }

    if (!this.isConfigured() || !this.supabase) {
      return { user: null, session: null, error: 'Invalid credentials. Use demo account (admin@smarttier.com / admin123) or configure Supabase keys.' };
    }

    try {
      const response = await this.supabase.auth.signInWithPassword({ email, password });
      if (response.error) {
        return { user: null, session: null, error: response.error.message };
      }

      sessionStorage.setItem('isAdminLoggedIn', 'true');
      sessionStorage.setItem('adminUserEmail', response.data.user.email || '');
      return { user: response.data.user, session: response.data.session, error: null };
    } catch (err: any) {
      return { user: null, session: null, error: err.message || 'Failed to sign in.' };
    }
  }

  async signOut(): Promise<void> {
    sessionStorage.removeItem('isAdminLoggedIn');
    sessionStorage.removeItem('adminUserEmail');
    sessionStorage.removeItem('adminUserName');
    sessionStorage.removeItem('adminCompanyName');
    if (this.supabase) {
      await this.supabase.auth.signOut();
    }
  }
}
