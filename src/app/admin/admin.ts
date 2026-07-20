import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

interface NavItem {
  name: string;
  icon: string;
}

interface Employee {
  name: string;
  email: string;
  campaignName: string;
  avatar: string;
}

interface RewardChoice {
  title: string;
  type: 'image' | 'icon';
  image?: string;
  iconBg?: string;
  iconSvg?: string;
}

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.html',
  styleUrl: './admin.scss'
})
export class AdminComponent {
  activeTab = 'Dashboard';
  selectedTier = 50;
  isDragging = false;
  uploadedFileName = '';
  parsedCount = 0;
  sortAsc = true;

  showToast = false;
  toastMessage = '';

  constructor(private sanitizer: DomSanitizer) {}

  getSafeHtml(htmlString: string | undefined): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(htmlString || '');
  }

  navItems: NavItem[] = [
    {
      name: 'Dashboard',
      icon: `<svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="3" y="3" width="7" height="9" />
        <rect x="14" y="3" width="7" height="5" />
        <rect x="14" y="12" width="7" height="9" />
        <rect x="3" y="16" width="7" height="5" />
      </svg>`
    },
    {
      name: 'Employees',
      icon: `<svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>`
    },
    {
      name: 'History',
      icon: `<svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>`
    },
    {
      name: 'Wallet',
      icon: `<svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" ry="2" />
        <line x1="2" y1="10" x2="22" y2="10" />
      </svg>`
    }
  ];

  tiers = [
    { id: 1, label: 'Tier 1: $25', val: 25 },
    { id: 2, label: 'Tier 2: $50', val: 50 },
    { id: 3, label: 'Tier 3: $100', val: 100 }
  ];

  employees: Employee[] = [
    {
      name: 'Jane Doe',
      email: 'janear.honan@gmail.com',
      campaignName: '',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120&h=120'
    },
    {
      name: 'John Smith',
      email: 'johnintsmith@gmail.com',
      campaignName: '',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120&h=120'
    }
  ];

  curatedChoices: Record<number, RewardChoice[]> = {
    25: [
      {
        title: 'Gourmet Chocolate Box',
        type: 'icon',
        iconBg: '#FEF3C7',
        iconSvg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D97706" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <path d="M9 3v18" />
          <path d="M15 3v18" />
          <path d="M3 9h18" />
          <path d="M3 15h18" />
        </svg>`
      },
      {
        title: 'Book Store Gift Card',
        type: 'icon',
        iconBg: '#E0F2FE',
        iconSvg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0284C7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5v-15z" />
        </svg>`
      },
      {
        title: 'Movie Ticket Voucher',
        type: 'icon',
        iconBg: '#FCE7F3',
        iconSvg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#DB2777" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="2" y="6" width="20" height="12" rx="2" />
          <line x1="6" y1="12" x2="18" y2="12" />
        </svg>`
      }
    ],
    50: [
      {
        title: 'Premium Coffee Set',
        type: 'image',
        image: '/premium_coffee_set.png',
        iconBg: '',
        iconSvg: ''
      },
      {
        title: 'Electronics Voucher',
        type: 'icon',
        iconBg: '#F3E8FF',
        iconSvg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9333EA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
          <line x1="7" y1="2" x2="7" y2="22" />
          <line x1="17" y1="2" x2="17" y2="22" />
          <line x1="2" y1="12" x2="22" y2="12" />
        </svg>`
      },
      {
        title: 'Local Experience Card',
        type: 'icon',
        iconBg: '#E2FDF2',
        iconSvg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>`
      }
    ],
    100: [
      {
        title: 'Wireless Active Earbuds',
        type: 'icon',
        iconBg: '#EEF2FF',
        iconSvg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
          <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
        </svg>`
      },
      {
        title: 'Luxury Wellness Experience',
        type: 'icon',
        iconBg: '#F5F3FF',
        iconSvg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>`
      },
      {
        title: 'Smart Home Speaker Hub',
        type: 'icon',
        iconBg: '#ECFDF5',
        iconSvg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
          <circle cx="12" cy="14" r="4" />
          <line x1="12" y1="6" x2="12.01" y2="6" />
        </svg>`
      }
    ]
  };

  setActiveTab(name: string) {
    this.activeTab = name;
  }

  selectTier(val: number) {
    this.selectedTier = val;
  }

  getChoicesForTier(): RewardChoice[] {
    return this.curatedChoices[this.selectedTier] || [];
  }

  getTierCurrency(): string {
    return this.selectedTier === 25 ? '$25' : this.selectedTier === 50 ? '$50' : '$100';
  }

  toggleSort() {
    this.sortAsc = !this.sortAsc;
    this.employees.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      if (nameA < nameB) return this.sortAsc ? -1 : 1;
      if (nameA > nameB) return this.sortAsc ? 1 : -1;
      return 0;
    });
  }

  // Drag and Drop files
  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.handleCSVFile(files[0]);
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const files = input.files;
    if (files && files.length > 0) {
      this.handleCSVFile(files[0]);
    }
  }

  handleCSVFile(file: File) {
    if (!file.name.endsWith('.csv')) {
      alert('Please upload a valid .csv file');
      return;
    }

    this.uploadedFileName = file.name;
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      this.parseCSV(text);
    };
    reader.readAsText(file);
  }

  parseCSV(text: string) {
    const lines = text.split('\n');
    const newEmployees: Employee[] = [];
    let parsedCount = 0;

    // A list of visual avatars to pick randomly for newly parsed employees
    const avatars = [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120&h=120',
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=120&h=120',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=120&h=120',
      'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&q=80&w=120&h=120',
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=120&h=120'
    ];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      // Skip header row if it starts with 'name' or 'email'
      if (i === 0 && (line.toLowerCase().includes('name') || line.toLowerCase().includes('email'))) {
        continue;
      }

      const parts = line.split(',');
      if (parts.length >= 2) {
        const name = parts[0].trim().replace(/^["']|["']$/g, '');
        const email = parts[1].trim().replace(/^["']|["']$/g, '');
        if (name && email) {
          const randAvatar = avatars[parsedCount % avatars.length];
          newEmployees.push({
            name,
            email,
            campaignName: '',
            avatar: randAvatar
          });
          parsedCount++;
        }
      }
    }

    if (newEmployees.length > 0) {
      this.employees = [...this.employees, ...newEmployees];
      this.parsedCount = parsedCount;
      this.triggerToast(`Successfully loaded ${parsedCount} new employees from CSV.`);
    } else {
      alert('Could not find any valid employees (Name, Email format) in the CSV.');
    }
  }

  clearUploadedFile(event: Event) {
    event.stopPropagation();
    this.uploadedFileName = '';
    this.parsedCount = 0;
  }

  triggerToast(msg: string) {
    this.toastMessage = msg;
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 4000);
  }

  distributeRewards() {
    const activeTierName = this.getTierCurrency();
    const count = this.employees.length;
    this.triggerToast(`Reward links distributed to ${count} employees for budget ${activeTierName}!`);
  }
}
