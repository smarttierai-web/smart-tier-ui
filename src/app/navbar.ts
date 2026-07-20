import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="navbar-header">
      <div class="container navbar-container flex justify-between items-center py-4 px-8 bg-white">
        <!-- Logo -->
        <a href="#" class="logo flex items-center">
          <span class="logo-text font-display font-bold text-2xl text-charcoal">SmartTier</span>
        </a>

        <!-- Desktop Menu -->
        <nav class="desktop-menu flex items-center gap-8">
          <a href="#how-it-works" class="menu-link font-medium">How It Works</a>
          <a href="#features" class="menu-link font-medium">Features</a>
          <a href="#pricing" class="menu-link font-medium">Pricing</a>
        </nav>

        <!-- CTA Button -->
        <div class="desktop-cta">
          <a href="#cta-footer" class="btn btn-dark btn-sm">Apply for Beta Pilot</a>
        </div>

        <!-- Mobile Toggle Button -->
        <button class="mobile-toggle" (click)="toggleMenu()" aria-label="Toggle Navigation">
          <span class="bar" [class.open]="isOpen"></span>
          <span class="bar" [class.open]="isOpen"></span>
          <span class="bar" [class.open]="isOpen"></span>
        </button>
      </div>

      <!-- Mobile Dropdown Menu -->
      <div class="mobile-dropdown" [class.active]="isOpen">
        <a href="#how-it-works" (click)="closeMenu()" class="mobile-link">How It Works</a>
        <a href="#features" (click)="closeMenu()" class="mobile-link">Features</a>
        <a href="#pricing" (click)="closeMenu()" class="mobile-link">Pricing</a>
        <a href="#cta-footer" (click)="closeMenu()" class="mobile-link btn btn-dark mt-4">Apply for Beta Pilot</a>
      </div>
    </header>
  `,
  styles: [`
    .navbar-header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      padding: 1.25rem 1.5rem 0 1.5rem;
      z-index: 1000;
    }

    .navbar-container {
      box-shadow: 0 12px 34px -10px rgba(17, 24, 39, 0.06), 0 2px 8px -2px rgba(17, 24, 39, 0.02);
      border: 1px solid rgba(17, 24, 39, 0.05);
      max-width: 1200px;
      margin: 0 auto;
      border-radius: 12px;
      padding: 1.3rem;
    }

    .menu-link {
      color: var(--text-slate);
      font-size: 0.95rem;
      transition: var(--transition-fast);

      &:hover {
        color: var(--text-charcoal);
      }
    }

    .btn-dark {
      background-color: #0F172A;
      color: #FFFFFF !important;
      border-radius: 6px;
      padding: 0.65rem 1.3rem;
      font-weight: 600;
      font-size: 0.9rem;
      transition: var(--transition-fast);

      &:hover {
        background-color: #1E293B;
      }
    }

    .mobile-toggle {
      display: none;
      flex-direction: column;
      justify-content: space-between;
      width: 24px;
      height: 18px;
      background: none;
      border: none;
      cursor: pointer;
      z-index: 1001;

      .bar {
        width: 100%;
        height: 2px;
        background-color: var(--text-charcoal);
        transition: var(--transition-normal);
        transform-origin: left center;

        &.open:nth-child(1) {
          transform: rotate(45deg);
          position: relative;
          top: -2px;
          left: 2px;
        }

        &.open:nth-child(2) {
          width: 0%;
          opacity: 0;
        }

        &.open:nth-child(3) {
          transform: rotate(-45deg);
          position: relative;
          top: 2px;
          left: 2px;
        }
      }

      @media (max-width: 768px) {
        display: flex;
      }
    }

    .desktop-menu, .desktop-cta {
      @media (max-width: 768px) {
        display: none;
      }
    }

    .mobile-dropdown {
      display: none;
      flex-direction: column;
      background-color: var(--bg-primary);
      border: 1px solid var(--border-color);
      padding: 1.5rem;
      position: absolute;
      top: calc(100% + 0.5rem);
      left: 1.5rem;
      right: 1.5rem;
      border-radius: 12px;
      box-shadow: var(--shadow-floating);
      opacity: 0;
      transform: translateY(-10px);
      pointer-events: none;
      transition: opacity var(--transition-normal), transform var(--transition-normal);

      &.active {
        opacity: 1;
        transform: translateY(0);
        pointer-events: auto;
      }

      @media (max-width: 768px) {
        display: flex;
      }
    }

    .mobile-link {
      padding: 0.75rem 0;
      font-size: 1.1rem;
      font-weight: 500;
      border-bottom: 1px solid var(--border-light);
      color: var(--text-charcoal);

      &:last-of-type {
        border-bottom: none;
      }

      &:hover {
        color: var(--accent-indigo);
      }
    }
  `]
})
export class NavbarComponent {
  isOpen = false;

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  closeMenu() {
    this.isOpen = false;
  }
}
