import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class LoginComponent {
  email = '';
  password = '';
  rememberMe = true;
  showPassword = false;
  errorMessage = '';
  isLoading = false;

  constructor(private router: Router) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  fillDemoCredentials() {
    this.email = 'admin@smarttier.com';
    this.password = 'admin123';
    this.errorMessage = '';
  }

  onSubmit() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Please enter both email and password.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    // Mock Authentication Delay
    setTimeout(() => {
      if (
        (this.email.trim().toLowerCase() === 'admin@smarttier.com' && this.password === 'admin123') ||
        (this.email.trim().toLowerCase() === 'demo@smarttier.com' && this.password === 'demo123')
      ) {
        sessionStorage.setItem('isAdminLoggedIn', 'true');
        sessionStorage.setItem('adminUserEmail', this.email.trim());
        this.router.navigate(['/admin']);
      } else {
        this.errorMessage = 'Invalid email or password. Use demo credentials (admin@smarttier.com / admin123).';
        this.isLoading = false;
      }
    }, 1000);
  }
}
