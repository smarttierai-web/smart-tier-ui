import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

interface RewardChoice {
  title: string;
  iconBg: string;
  iconSvg: string;
}

@Component({
  selector: 'app-claim',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="claim-layout flex flex-col min-h-screen bg-slate animate-fade-in">
      <!-- Header -->
      <header class="navbar-header py-4 px-8 bg-white border-b shadow-sm">
        <div class="container flex justify-between items-center max-w-5xl mx-auto">
          <!-- Logo -->
          <div class="logo flex items-center gap-3">
            <div class="logo-icon flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M70 25C70 16.7157 63.2843 10 55 10H30C21.7157 10 15 16.7157 15 25V40C15 48.2843 21.7157 55 30 55H70V25Z" fill="url(#logoGrad1)" />
                <path d="M30 75C30 83.2843 36.7157 90 45 90H70C78.2843 90 85 83.2843 85 75V60C85 51.7157 78.2843 45 70 45H30V75Z" fill="url(#logoGrad2)" />
                <defs>
                  <linearGradient id="logoGrad1" x1="15" y1="10" x2="70" y2="55" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#8B5CF6" />
                    <stop offset="1" stop-color="#6366F1" />
                  </linearGradient>
                  <linearGradient id="logoGrad2" x1="30" y1="45" x2="85" y2="90" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#6366F1" />
                    <stop offset="1" stop-color="#3B82F6" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <span class="logo-text font-display font-extrabold text-xl">SmartTier</span>
          </div>

          <!-- Badge -->
          <span class="badge badge-emerald flex items-center gap-1.5">
            <span class="pulse-dot"></span>
            <span>Secure Gifting Link</span>
          </span>
        </div>
      </header>

      <!-- Main Body Container -->
      <main class="flex-1 flex items-center justify-center p-6 md:p-12">
        <!-- Selection State -->
        <div *ngIf="!isConfirmed" class="claim-card max-w-4xl w-full bg-white p-8 md:p-12 rounded-xl shadow-floating text-center border-thin">
          <div class="greeting mb-8">
            <h1 class="text-4xl font-extrabold text-charcoal font-display leading-tight">
              A Special Gift for You, {{ employeeName }}!
            </h1>
            <p class="text-sm md:text-base text-slate mt-2 max-w-xl mx-auto">
              {{ companyName }} celebrates your hard work and contribution.
            </p>
          </div>

          <div class="tier-indicator mb-6 flex justify-between items-center pb-3 border-b max-w-2xl mx-auto">
            <span class="text-xs font-bold text-slate uppercase tracking-wider">Choice Grid \${{ selectedTier }} Tier</span>
            <span class="badge">Select 1 Option</span>
          </div>

          <!-- Cards Grid -->
          <div class="grid grid-3 gap-6 max-w-3xl mx-auto my-8">
            <div 
              *ngFor="let choice of getChoicesForTier()" 
              class="claim-choice-card border-thin p-6 rounded-lg transition-all flex flex-col items-center gap-4 cursor-pointer text-center relative"
              [class.active]="selectedChoice === choice"
              (click)="selectChoice(choice)"
            >
              <!-- Selection indicator checkmark badge -->
              <div *ngIf="selectedChoice === choice" class="active-check-badge flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>

              <!-- Choice SVG Icon -->
              <div class="choice-icon-circle flex items-center justify-center" [style.backgroundColor]="choice.iconBg">
                <span [innerHTML]="getSafeHtml(choice.iconSvg)" class="svg-container"></span>
              </div>

              <div class="flex flex-col gap-1">
                <span class="choice-title font-bold text-sm text-charcoal">{{ choice.title }}</span>
                <span class="choice-subtext text-xxs font-semibold uppercase tracking-wider opacity-75">Claimable</span>
              </div>
            </div>
          </div>

          <!-- Footer Confirmation -->
          <div class="flex flex-col items-center gap-3 mt-8">
            <button 
              type="button" 
              class="btn btn-primary btn-confirm py-4 px-12"
              [disabled]="!selectedChoice"
              (click)="confirmSelection()"
            >
              Confirm My Selection
            </button>
            <span class="text-xxs text-slate-400">Claims expire in 30 days. No credit card required.</span>
          </div>
        </div>

        <!-- Success Confirmed State -->
        <div *ngIf="isConfirmed" class="success-card max-w-xl w-full bg-white p-12 rounded-xl shadow-floating text-center border-thin animate-fade-in">
          <div class="success-icon-wrapper flex items-center justify-center mx-auto mb-6 bg-emerald-50 text-emerald-500 rounded-full animate-float">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          
          <h2 class="text-3xl font-extrabold text-charcoal font-display">Selection Confirmed!</h2>
          <p class="text-sm text-slate mt-4 leading-relaxed max-w-sm mx-auto">
            Awesome choice, {{ employeeName }}! We have successfully reserved your <strong>{{ selectedChoice?.title }}</strong>.
          </p>
          <p class="text-xs text-slate-400 mt-2 leading-relaxed max-w-sm mx-auto">
            Your redemption code and access instructions have been sent to your professional mailbox.
          </p>

          <div class="divider border-b my-8"></div>

          <div class="flex justify-center gap-4">
            <button type="button" class="btn btn-secondary shadow-sm" (click)="resetClaim()">
              Change Selection
            </button>
          </div>
        </div>
      </main>
    </div>
  `,
  styles: [`
    .claim-layout {
      min-height: 100vh;
      background-color: var(--bg-secondary);
      font-family: var(--font-sans);
    }

    .navbar-header {
      background-color: #FFFFFF;
      border-bottom: 1px solid var(--border-color);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
    }

    .logo-icon {
      width: 32px;
      height: 32px;
      background-color: rgba(99, 102, 241, 0.1);
      border-radius: var(--radius-sm);
    }

    .logo-text {
      color: var(--text-charcoal);
      letter-spacing: -0.02em;
    }

    .badge-emerald {
      background-color: #ECFDF5;
      color: #047857;
      border: 1px solid #D1FAE5;
      padding: 0.35rem 0.85rem;
      border-radius: 9999px;
      font-weight: 600;
      font-size: 0.75rem;
    }

    .pulse-dot {
      width: 8px;
      height: 8px;
      background-color: #10B981;
      border-radius: 50%;
      box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
      animation: pulseGreen 1.5s infinite;
    }

    @keyframes pulseGreen {
      0% {
        transform: scale(0.95);
        box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.5);
      }
      70% {
        transform: scale(1);
        box-shadow: 0 0 0 6px rgba(16, 185, 129, 0);
      }
      100% {
        transform: scale(0.95);
        box-shadow: 0 0 0 0 rgba(16, 185, 129, 0);
      }
    }

    .claim-card, .success-card {
      background-color: #FFFFFF;
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-card);
      border: 1px solid var(--border-color);
    }

    .claim-choice-card {
      background-color: #FFFFFF;
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      position: relative;
      user-select: none;
      
      &:hover {
        transform: translateY(-4px);
        border-color: var(--accent-indigo);
        box-shadow: var(--shadow-md);
      }

      &.active {
        border-color: var(--accent-indigo);
        background-color: var(--accent-indigo-light);
        box-shadow: 0 10px 25px -5px rgba(99, 102, 241, 0.2);
        transform: translateY(-2px);
        
        .choice-title {
          color: var(--accent-indigo-hover);
        }
      }
    }

    .active-check-badge {
      position: absolute;
      top: -8px;
      right: -8px;
      width: 22px;
      height: 22px;
      background: var(--gradient-primary);
      border-radius: 50%;
      box-shadow: 0 2px 6px rgba(99, 102, 241, 0.4);
      z-index: 10;
      animation: bounceIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    @keyframes bounceIn {
      from {
        transform: scale(0);
      }
      to {
        transform: scale(1);
      }
    }

    .choice-icon-circle {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      box-shadow: var(--shadow-sm);
    }

    .svg-container {
      display: flex;
      align-items: center;
      justify-content: center;
      
      svg {
        width: 24px;
        height: 24px;
      }
    }

    .choice-title {
      transition: color var(--transition-fast);
    }

    .choice-subtext {
      color: var(--text-muted);
      letter-spacing: 0.05em;
    }

    .btn-confirm {
      background: var(--gradient-primary);
      color: white !important;
      font-weight: 700;
      border-radius: var(--radius-md);
      box-shadow: 0 10px 20px -5px rgba(99, 102, 241, 0.3);
      transition: all var(--transition-fast);
      border: none;
      
      &:hover:not(:disabled) {
        background: var(--gradient-hover);
        box-shadow: 0 14px 24px -5px rgba(99, 102, 241, 0.45);
        transform: translateY(-1px);
      }
      
      &:disabled {
        background: var(--text-muted);
        opacity: 0.6;
        cursor: not-allowed;
        box-shadow: none;
      }
    }

    .success-icon-wrapper {
      width: 80px;
      height: 80px;
      box-shadow: var(--shadow-md);
    }

    .divider {
      border-color: var(--border-light);
    }

    /* Grid layout settings and media queries */
    .grid-3 {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 1.5rem;
      width: 100%;

      @media (max-width: 768px) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      @media (max-width: 480px) {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ClaimComponent implements OnInit {
  token = '';
  employeeName = 'Alex';
  companyName = 'SmartTier Corp';
  selectedTier = 50;
  selectedChoice: RewardChoice | null = null;
  isConfirmed = false;

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.token = params['token'] || '';
      this.loadRosterDetails(this.token);
    });
  }

  loadRosterDetails(token: string) {
    // Dynamic mock profiles based on token:
    const profiles: Record<string, { name: string; company: string; tier: number }> = {
      'alex': { name: 'Alex', company: 'TechNova Solutions', tier: 50 },
      'sarah': { name: 'Sarah', company: 'Apex Global Web', tier: 100 },
      'john': { name: 'John', company: 'Zenith Logistics', tier: 25 },
    };

    const userProfile = profiles[token.toLowerCase()];
    if (userProfile) {
      this.employeeName = userProfile.name;
      this.companyName = userProfile.company;
      this.selectedTier = userProfile.tier;
    } else {
      // Default fallback
      this.employeeName = token.charAt(0).toUpperCase() + token.slice(1) || 'Valued Employee';
      this.companyName = 'Your Company';
      this.selectedTier = 50; // default to $50
    }
  }

  selectChoice(choice: RewardChoice) {
    this.selectedChoice = choice;
  }

  confirmSelection() {
    if (this.selectedChoice) {
      this.isConfirmed = true;
    }
  }

  resetClaim() {
    this.isConfirmed = false;
    this.selectedChoice = null;
  }

  getSafeHtml(htmlString: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(htmlString);
  }

  getChoicesForTier(): RewardChoice[] {
    return this.rewardCatalog[this.selectedTier] || [];
  }

  rewardCatalog: Record<number, RewardChoice[]> = {
    25: [
      {
        title: 'Gourmet Chocolate Box',
        iconBg: '#FEF3C7',
        iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="#D97706" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <path d="M9 3v18" />
          <path d="M15 3v18" />
          <path d="M3 9h18" />
          <path d="M3 15h18" />
        </svg>`
      },
      {
        title: 'Book Store Gift Card',
        iconBg: '#E0F2FE',
        iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="#0284C7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5v-15z" />
        </svg>`
      },
      {
        title: 'Movie Ticket Voucher',
        iconBg: '#FCE7F3',
        iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="#DB2777" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="2" y="6" width="20" height="12" rx="2" />
          <line x1="6" y1="12" x2="18" y2="12" />
        </svg>`
      }
    ],
    50: [
      {
        title: 'Amazon Voucher ($50)',
        iconBg: '#EEF2FF',
        iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="#6366F1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="2" y="6" width="20" height="12" rx="2" />
          <line x1="6" y1="12" x2="18" y2="12" />
        </svg>`
      },
      {
        title: 'Local Bistro Dining',
        iconBg: '#FEF3C7',
        iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="#D97706" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 2v10M18 8V2M6 2v6a2 2 0 0 0 2 2h2V2" />
          <path d="M12 18v4M12 18H8M12 18h4" />
        </svg>`
      },
      {
        title: 'Premium Coffee Box (Physical)',
        iconBg: '#F5F3FF',
        iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
          <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8z" />
          <line x1="6" y1="2" x2="6" y2="4" />
          <line x1="10" y1="2" x2="10" y2="4" />
          <line x1="14" y1="2" x2="14" y2="4" />
        </svg>`
      },
      {
        title: 'Streaming Service Subscription',
        iconBg: '#E0F2FE',
        iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="#0284C7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
          <polygon points="10 8 16 11 10 14 10 8" />
        </svg>`
      },
      {
        title: 'Wellness Experience',
        iconBg: '#ECFDF5',
        iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 22C12 22 20 18 20 12C20 6 12 2 12 2C12 2 4 6 4 12C4 18 12 22 12 22Z" />
          <path d="M12 2V22" />
          <path d="M12 12C12 12 16 10 18 12" />
          <path d="M12 12C12 12 8 10 6 12" />
        </svg>`
      },
      {
        title: 'Curated Book Collection',
        iconBg: '#FCE7F3',
        iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="#DB2777" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5v-15z" />
        </svg>`
      }
    ],
    100: [
      {
        title: 'Wireless Active Earbuds',
        iconBg: '#EEF2FF',
        iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="#6366F1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
          <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
        </svg>`
      },
      {
        title: 'Luxury Wellness Experience',
        iconBg: '#F5F3FF',
        iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>`
      },
      {
        title: 'Smart Home Speaker Hub',
        iconBg: '#ECFDF5',
        iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
          <circle cx="12" cy="14" r="4" />
          <line x1="12" y1="6" x2="12.01" y2="6" />
        </svg>`
      }
    ]
  };
}
