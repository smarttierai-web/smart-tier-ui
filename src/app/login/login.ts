import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class LoginComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);

  email = '';
  password = '';
  rememberMe = true;
  showPassword = false;
  errorMessage = '';
  isLoading = false;

  ngOnInit() {
    // Auto-fill remembered email if saved previously
    const savedEmail = localStorage.getItem('st_remembered_email');
    if (savedEmail) {
      this.email = savedEmail;
      this.rememberMe = true;
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  fillDemoCredentials() {
    this.email = 'admin@smarttier.com';
    this.password = 'admin123';
    this.errorMessage = '';
  }

  // Front-end email validation helper
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  async onSubmit() {
    this.errorMessage = '';

    const cleanEmail = this.email.trim();
    const cleanPassword = this.password;

    // 1. Frontend validation: Empty field checks
    if (!cleanEmail && !cleanPassword) {
      this.errorMessage = 'Please enter your work email and password.';
      return;
    }

    if (!cleanEmail) {
      this.errorMessage = 'Please enter your work email address.';
      return;
    }

    // 2. Frontend validation: Email format check
    if (!this.isValidEmail(cleanEmail)) {
      this.errorMessage = 'Please enter a valid work email address (e.g., name@company.com).';
      return;
    }

    if (!cleanPassword) {
      this.errorMessage = 'Please enter your password.';
      return;
    }

    // 3. Frontend validation: Password minimum length
    if (cleanPassword.length < 6) {
      this.errorMessage = 'Password must be at least 6 characters.';
      return;
    }

    this.isLoading = true;

    try {
      // 4. Supabase Backend validation
      const response = await this.authService.signIn(cleanEmail, cleanPassword) as any;

      if (response.error) {
        const rawError = response.error;
        const errorText: string = typeof rawError === 'string'
          ? rawError
          : (rawError?.message || rawError?.error_description || 'Authentication failed.');

        const msg = errorText.toLowerCase();

        if (msg.includes('invalid login credentials') || msg.includes('invalid_grant') || msg.includes('invalid email or password')) {
          this.errorMessage = 'Invalid email or password. Please verify your credentials and try again.';
        } else if (msg.includes('email not confirmed')) {
          this.errorMessage = 'Please verify your email address before signing in (check your inbox or spam folder).';
        } else if (msg.includes('rate limit')) {
          this.errorMessage = 'Too many failed login attempts. Please wait a moment before trying again.';
        } else {
          this.errorMessage = errorText;
        }
        this.isLoading = false;
        return;
      }

      // 5. Handle 'Remember Me' device preference
      if (this.rememberMe) {
        localStorage.setItem('st_remembered_email', cleanEmail);
      } else {
        localStorage.removeItem('st_remembered_email');
      }

      // 6. Set active admin session and route to dashboard
      sessionStorage.setItem('isAdminLoggedIn', 'true');
      sessionStorage.setItem('adminUserEmail', cleanEmail);

      setTimeout(() => {
        this.router.navigate(['/admin']);
      }, 500);

    } catch (err: any) {
      this.errorMessage = err?.message || 'An unexpected error occurred during sign in.';
    } finally {
      this.isLoading = false;
    }
  }
}
