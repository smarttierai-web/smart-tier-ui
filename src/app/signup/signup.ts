import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './signup.html',
  styleUrls: ['./signup.scss']
})
export class SignupComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  fullName = '';
  companyName = '';
  email = '';
  password = '';
  confirmPassword = '';
  agreeTerms = false;
  showPassword = false;
  showConfirmPassword = false;

  isLoading = false;
  isRegistered = false;
  errorMessage = '';
  successMessage = '';

  showConfigModal = false;
  customSupabaseUrl = '';
  customSupabaseKey = '';

  constructor() {
    this.customSupabaseUrl = localStorage.getItem('st_supabase_url') || '';
    this.customSupabaseKey = localStorage.getItem('st_supabase_anon_key') || '';
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  getPasswordStrength(): { percent: number; color: string; level: string } {
    const pass = this.password || '';
    if (!pass) return { percent: 0, color: '#334155', level: 'None' };

    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;

    switch (score) {
      case 1:
        return { percent: 25, color: '#ef4444', level: 'Weak' };
      case 2:
        return { percent: 50, color: '#f59e0b', level: 'Fair' };
      case 3:
        return { percent: 75, color: '#3b82f6', level: 'Good' };
      case 4:
        return { percent: 100, color: '#10b981', level: 'Strong' };
      default:
        return { percent: 15, color: '#ef4444', level: 'Too short' };
    }
  }

  saveSupabaseConfig() {
    if (this.customSupabaseUrl && this.customSupabaseKey) {
      this.authService.updateCredentials(this.customSupabaseUrl.trim(), this.customSupabaseKey.trim());
      this.showConfigModal = false;
      this.successMessage = 'Supabase credentials updated successfully!';
      setTimeout(() => (this.successMessage = ''), 4000);
    }
  }

  async onSubmit() {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.fullName.trim() || !this.companyName.trim() || !this.email.trim() || !this.password) {
      this.errorMessage = 'Please fill out all required fields.';
      return;
    }

    if (this.password.length < 6) {
      this.errorMessage = 'Password must be at least 6 characters long.';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match. Please re-enter your password.';
      return;
    }

    if (!this.agreeTerms) {
      this.errorMessage = 'You must agree to the Terms of Service and Privacy Policy.';
      return;
    }

    this.isLoading = true;

    try {
      const response = await this.authService.signUp({
        fullName: this.fullName.trim(),
        companyName: this.companyName.trim(),
        email: this.email.trim(),
        password: this.password
      }) as any;

      if (response.error) {
        const rawError = response.error;
        const errorText: string = typeof rawError === 'string'
          ? rawError
          : (rawError?.message || rawError?.error_description || 'Signup failed.');

        const msg = errorText.toLowerCase();

        if (msg.includes('user already registered') || msg.includes('already exists')) {
          this.errorMessage = 'An account with this email already exists. Please sign in instead.';
        } else if (msg.includes('rate limit')) {
          this.errorMessage = 'Too many attempts. Please wait a moment or disable email confirmation in Supabase settings.';
        } else if (msg.includes('database error saving new user')) {
          this.errorMessage = 'Database trigger error: Please run the schema SQL in your Supabase SQL editor.';
        } else {
          this.errorMessage = errorText;
        }
        this.isLoading = false;
        return;
      }

      this.isRegistered = true;

      if (response.user && !response.session) {
        this.successMessage = 'Account created! Please check your email inbox to confirm your registration.';
      } else {
        sessionStorage.setItem('isAdminLoggedIn', 'true');
        sessionStorage.setItem('adminUserEmail', this.email.trim());
        this.successMessage = 'Account successfully created! Redirecting to admin portal...';
        setTimeout(() => {
          this.router.navigate(['/admin']);
        }, 1200);
      }

    } catch (err: any) {
      this.errorMessage = err?.message || 'An unexpected error occurred during signup.';
    } finally {
      this.isLoading = false;
    }
  }
}
