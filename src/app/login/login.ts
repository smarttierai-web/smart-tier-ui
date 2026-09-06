import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
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
  private cdr = inject(ChangeDetectorRef);

  email = '';
  password = '';
  rememberMe = true;
  showPassword = false;
  errorMessage = '';
  isLoading = false;

  // Error Modal State
  showErrorModal = false;
  errorModalTitle = 'Incorrect Credentials';
  errorModalMessage = '';

  ngOnInit() {
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
    this.showErrorModal = false;
  }

  closeErrorModal() {
    this.showErrorModal = false;
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  async onSubmit() {
    this.errorMessage = '';
    this.showErrorModal = false;

    const cleanEmail = this.email.trim();
    const cleanPassword = this.password;

    // 1. Frontend validation: Empty fields
    if (!cleanEmail || !cleanPassword) {
      this.errorModalTitle = 'Missing Credentials';
      this.errorModalMessage = 'Please enter both your work email and password to sign in.';
      this.errorMessage = this.errorModalMessage;
      this.showErrorModal = true;
      this.cdr.detectChanges();
      return;
    }

    // 2. Frontend validation: Email format
    if (!this.isValidEmail(cleanEmail)) {
      this.errorModalTitle = 'Invalid Email Format';
      this.errorModalMessage = 'Please enter a valid work email address (e.g., name@company.com).';
      this.errorMessage = this.errorModalMessage;
      this.showErrorModal = true;
      this.cdr.detectChanges();
      return;
    }

    // 3. Frontend validation: Password minimum length
    if (cleanPassword.length < 6) {
      this.errorModalTitle = 'Password Too Short';
      this.errorModalMessage = 'Password must be at least 6 characters long.';
      this.errorMessage = this.errorModalMessage;
      this.showErrorModal = true;
      this.cdr.detectChanges();
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
          this.errorModalTitle = 'Incorrect Email or Password';
          this.errorModalMessage = 'The email or password you entered does not match our records. Please verify your credentials or create a new account.';
        } else if (msg.includes('email not confirmed')) {
          this.errorModalTitle = 'Email Not Verified';
          this.errorModalMessage = 'Your email address has not been confirmed yet. Please check your inbox or spam folder to complete registration.';
        } else if (msg.includes('rate limit')) {
          this.errorModalTitle = 'Too Many Attempts';
          this.errorModalMessage = 'Too many failed login attempts detected. Please wait a moment before trying again.';
        } else {
          this.errorModalTitle = 'Authentication Failed';
          this.errorModalMessage = errorText;
        }

        this.errorMessage = this.errorModalMessage;
        this.showErrorModal = true;
        this.isLoading = false;
        this.cdr.detectChanges();
        return;
      }

      // 5. Handle 'Remember Me'
      if (this.rememberMe) {
        localStorage.setItem('st_remembered_email', cleanEmail);
      } else {
        localStorage.removeItem('st_remembered_email');
      }

      // 6. Set active admin session and navigate
      sessionStorage.setItem('isAdminLoggedIn', 'true');
      sessionStorage.setItem('adminUserEmail', cleanEmail);

      setTimeout(() => {
        this.router.navigate(['/admin']);
      }, 500);

    } catch (err: any) {
      this.errorModalTitle = 'Unexpected Error';
      this.errorModalMessage = err?.message || 'An unexpected error occurred during sign in.';
      this.errorMessage = this.errorModalMessage;
      this.showErrorModal = true;
      this.cdr.detectChanges();
    } finally {
      this.isLoading = false;
      this.cdr.detectChanges();
    }
  }
}
