import { Router } from '@angular/router';
import { EmployeeService, Employee } from '../services/employee.service';
import { RewardService, Reward } from '../services/reward.service';
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

interface NavItem {
  name: string;
  icon: string;
}





@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.html',
  styleUrl: './admin.scss'
})
export class AdminComponent implements OnInit {
  private employeeService = inject(EmployeeService);
  private rewardService = inject(RewardService);
  activeTab = 'Dashboard';
  selectedTier = 5000;
  isDragging = false;
  uploadedFileName = '';
  parsedCount = 0;
  sortAsc = true;

  showToast = false;
  toastMessage = '';

  // Employees Tab variables
  newEmpName = '';
  newEmpEmail = '';

  // History Tab variables
  expandedCampaignId: number | null = null;
  pastCampaigns = [
    {
      id: 1,
      name: 'Q2 Outstanding Performers',
      tier: 5000,
      date: 'July 15, 2026',
      totalCount: 12,
      claimedCount: 10,
      status: 'Active',
      details: [
        { name: 'Jane Doe', email: 'janear.honan@gmail.com', reward: 'Amazon Voucher (₹5,000)', status: 'Claimed' },
        { name: 'John Smith', email: 'johnintsmith@gmail.com', reward: 'Premium Coffee Set', status: 'Claimed' },
        { name: 'Alice Cooper', email: 'alice.c@example.com', reward: 'Local Bistro Dining', status: 'Claimed' },
        { name: 'Bob Dylan', email: 'bob.d@example.com', reward: 'Pending...', status: 'Sent (Emailed)' },
        { name: 'Clara Oswald', email: 'clara.o@example.com', reward: 'Pending...', status: 'Sent (Emailed)' }
      ]
    },
    {
      id: 2,
      name: 'Annual Tech Hackathon Winners',
      tier: 10000,
      date: 'June 20, 2026',
      totalCount: 5,
      claimedCount: 5,
      status: 'Completed',
      details: [
        { name: 'David Miller', email: 'd.miller@example.com', reward: 'Wireless Active Earbuds', status: 'Claimed' },
        { name: 'Elena Rostova', email: 'elena.r@example.com', reward: 'Luxury Wellness Experience', status: 'Claimed' },
        { name: 'Frank N', email: 'frank.n@example.com', reward: 'Smart Home Speaker Hub', status: 'Claimed' }
      ]
    },
    {
      id: 3,
      name: 'Q1 Customer Support Rewards',
      tier: 2500,
      date: 'April 10, 2026',
      totalCount: 8,
      claimedCount: 6,
      status: 'Expired (Refunded)',
      details: [
        { name: 'Grace Hopper', email: 'grace.h@example.com', reward: 'Book Store Gift Card', status: 'Claimed' },
        { name: 'Harry Potter', email: 'harry.p@example.com', reward: 'Movie Ticket Voucher', status: 'Claimed' },
        { name: 'Ian Fleming', email: 'ian.f@example.com', reward: 'None (Refunded)', status: 'Expired' }
      ]
    }
  ];

  // Wallet Tab variables
  walletBalance = 45000;
  topUpAmount = 10000;
  transactions = [
    { date: 'July 21, 2026', desc: 'Refund for unclaimed links (Q1 Support)', type: 'Refund', amount: 5000, isCredit: true },
    { date: 'July 15, 2026', desc: 'Q2 Outstanding Performers Distribution', type: 'Distribution', amount: 60000, isCredit: false },
    { date: 'July 01, 2026', desc: 'Top-up via Visa Card ending 4242', type: 'Top Up', amount: 50000, isCredit: true }
  ];

  constructor(private router: Router, private sanitizer: DomSanitizer) {}

  async ngOnInit() {
    await Promise.all([this.employeeService.loadEmployees(), this.rewardService.loadRewards()]);
  }

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
    { id: 1, label: 'Tier 1: ₹2,500', val: 2500 },
    { id: 2, label: 'Tier 2: ₹5,000', val: 5000 },
    { id: 3, label: 'Tier 3: ₹10,000', val: 10000 }
  ];

  get employees(): Employee[] {
    const list = [...this.employeeService.employees()];
    return list.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      if (nameA < nameB) return this.sortAsc ? -1 : 1;
      if (nameA > nameB) return this.sortAsc ? 1 : -1;
      return 0;
    });
  }

  get isEmployeesLoading(): boolean {
    return this.employeeService.isLoading();
  }

  
  setActiveTab(name: string) {
    this.activeTab = name;
  }

  selectTier(val: number) {
    this.selectedTier = val;
  }

  getChoicesForTier(): Reward[] {
    return this.rewardService.getRewardsForTier(this.selectedTier);
  }

  get isRewardsLoading(): boolean {
    return this.rewardService.isLoading();
  }

  getTierCurrency(): string {
    return '₹' + this.selectedTier.toLocaleString('en-IN');
  }

  formatCurrency(val: number): string {
    return '₹' + val.toLocaleString('en-IN');
  }

  toggleSort() {
    this.sortAsc = !this.sortAsc;
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

  async parseCSV(text: string) {
    const lines = text.split(/\r?\n/);
    const newEmployees: Omit<Employee, 'id'>[] = [];
    let parsedCount = 0;

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
            avatar: randAvatar,
            department: 'General',
            status: 'Active'
          });
          parsedCount++;
        }
      }
    }

    if (newEmployees.length > 0) {
      await this.employeeService.bulkAddEmployees(newEmployees);
      this.parsedCount = parsedCount;
      this.triggerToast();
    } else {
      alert('Could not find any valid employees (Name, Email format) in the CSV.');
    }
  }

  clearUploadedFile(event: Event) {
    event.stopPropagation();
    this.uploadedFileName = '';
    this.parsedCount = 0;
  }

  triggerToast(msg: string = 'Operation completed successfully!') {
    this.toastMessage = msg;
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 4000);
  }

  distributeRewards() {
    const activeTierName = this.getTierCurrency();
    const count = this.employees.length;
    
    // Deduct from wallet balance if funds are available
    const totalCost = this.selectedTier * count;
    if (this.walletBalance >= totalCost) {
      this.walletBalance -= totalCost;
      
      // Add to transaction history
      const dateString = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
      this.transactions.unshift({
        date: dateString,
        desc: `Distributed campaign: ${this.employees[0]?.campaignName || 'New Rewards Campaign'}`,
        type: 'Distribution',
        amount: totalCost,
        isCredit: false
      });
      
      this.triggerToast(`Reward links distributed to ${count} employees for budget ${activeTierName}! Wallet debited by ₹${totalCost.toLocaleString('en-IN')}`);
    } else {
      this.triggerToast(`Reward links distributed to ${count} employees. Note: Wallet balance is low!`);
    }
  }

  // Employees Tab methods
  getActiveCampaignCount(): number {
    return this.employees.filter(emp => emp.campaignName.trim().length > 0).length;
  }

  async addEmployee() {
    const name = this.newEmpName.trim();
    const email = this.newEmpEmail.trim();
    
    if (!name || !email) {
      alert('Please provide both Name and Email');
      return;
    }
    
    const avatars = [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120&h=120',
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=120&h=120',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=120&h=120',
      'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&q=80&w=120&h=120',
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=120&h=120'
    ];
    const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)];
    
    await this.employeeService.addEmployee({
      name,
      email,
      campaignName: '',
      avatar: randomAvatar,
      department: 'General',
      status: 'Active'
    });
    
    this.triggerToast();
    this.newEmpName = '';
    this.newEmpEmail = '';
  }

  async removeEmployee(emp: Employee) {
    await this.employeeService.deleteEmployee(emp);
    this.triggerToast();
  }

  sendQuickReward(emp: Employee) {
    if (this.walletBalance >= 5000) {
      this.walletBalance -= 5000;
      const dateString = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
      this.transactions.unshift({
        date: dateString,
        desc: `Quick reward link sent to ${emp.name}`,
        type: 'Distribution',
        amount: 5000,
        isCredit: false
      });
      this.triggerToast(`Instant ₹5,000 reward link emailed to ${emp.name}!`);
    } else {
      this.triggerToast(`Cannot send reward. Wallet balance is low!`);
    }
  }

  // History Tab methods
  expandCampaign(id: number) {
    this.expandedCampaignId = this.expandedCampaignId === id ? null : id;
  }

  // Wallet Tab methods
  topUpWallet() {
    const amount = Number(this.topUpAmount);
    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid positive amount.');
      return;
    }
    
    this.walletBalance += amount;
    
    const dateString = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
    this.transactions.unshift({
      date: dateString,
      desc: 'Top-up via Payment Portal',
      type: 'Top Up',
      amount: amount,
      isCredit: true
    });
    
    this.triggerToast(`Wallet balance topped up by ₹${amount.toLocaleString('en-IN')}!`);
  }

  
  // Dynamic Reward Catalog Modal
  showAddRewardModal = false;
  newRewardTitle = '';
  newRewardDesc = '';
  newRewardCategory = 'Electronics';
  newRewardTier = 5000;

  openAddRewardModal() {
    this.newRewardTier = this.selectedTier;
    this.showAddRewardModal = true;
  }

  closeAddRewardModal() {
    this.showAddRewardModal = false;
  }

  async saveNewReward() {
    if (!this.newRewardTitle.trim()) {
      alert('Please enter a reward title.');
      return;
    }

    await this.rewardService.addReward({
      tier: Number(this.newRewardTier),
      title: this.newRewardTitle.trim(),
      description: this.newRewardDesc.trim(),
      type: 'icon',
      category: this.newRewardCategory,
      iconBg: '#E0E7FF'
    });

    this.triggerToast(`New reward "${this.newRewardTitle}" added to Tier ₹${Number(this.newRewardTier).toLocaleString('en-IN')}!`);
    this.showAddRewardModal = false;
    this.newRewardTitle = '';
    this.newRewardDesc = '';
  }

  logout() {
    sessionStorage.removeItem('isAdminLoggedIn');
    sessionStorage.removeItem('adminUserEmail');
    this.router.navigate(['/login']);
  }

}

