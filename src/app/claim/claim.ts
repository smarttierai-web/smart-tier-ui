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
  templateUrl: './claim.html',
  styleUrl: './claim.scss'
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
