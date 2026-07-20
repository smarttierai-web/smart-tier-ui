import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

interface Employee {
  name: string;
  email: string;
  campaignName: string;
  avatar: string;
}

interface RewardChoice {
  title: string;
  type: string; // 'image' | 'icon'
  image?: string;
  iconBg: string;
  iconSvg: string;
}

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="admin-layout flex animate-fade-in">
      <!-- Sidebar Navigation -->
      <aside class="sidebar flex flex-col">
        <!-- Logo Header -->
        <div class="logo-wrapper flex items-center gap-3">
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

        <!-- Menu Links -->
        <nav class="sidebar-nav mt-8 flex-1">
          <ul class="nav-list flex flex-col gap-2">
            <li *ngFor="let item of navItems">
              <a 
                href="javascript:void(0)" 
                class="nav-item flex items-center gap-4"
                [class.active]="item.name === activeTab"
                (click)="setActiveTab(item.name)"
              >
                <span class="nav-icon flex items-center justify-center" [innerHTML]="getSafeHtml(item.icon)"></span>
                <span class="nav-text font-medium">{{ item.name }}</span>
              </a>
            </li>
          </ul>
        </nav>

        <!-- Sidebar User Footer -->
        <div class="sidebar-footer border-t pt-4 mt-auto">
          <div class="flex items-center gap-3">
            <div class="avatar-initials flex items-center justify-center">A</div>
            <div class="flex flex-col">
              <span class="profile-name text-xs font-semibold text-white">Admin Portal</span>
              <span class="text-xxs text-slate-400">admin@smarttier.com</span>
            </div>
          </div>
        </div>
      </aside>

      <!-- Main Dashboard Panel -->
      <div class="main-panel flex-1 flex flex-col">
        <!-- Header -->
        <header class="panel-header py-5 px-8 flex items-center justify-between bg-white border-b">
          <h1 class="panel-title font-display font-bold text-xl text-charcoal">Campaign Creator</h1>
          <div class="user-profile flex items-center gap-3">
            <div class="user-avatar-wrapper flex items-center justify-center">
              <div class="user-online-dot"></div>
              <div class="avatar-initials flex items-center justify-center header-avatar">A</div>
            </div>
            <span class="profile-name text-sm font-semibold text-charcoal">Admin Portal</span>
          </div>
        </header>

        <!-- Main Body -->
        <main class="panel-content p-8 flex-1">
          <div class="creator-grid">
            
            <!-- Left Column: Creator Form -->
            <div class="creator-form-col flex flex-col gap-6">
              <div class="heading-block">
                <h2 class="form-title text-3xl font-extrabold text-charcoal leading-tight">Create Reward Campaign</h2>
                <p class="form-subtitle text-sm text-slate mt-1">Configure budget limits and upload team rosters to distribute links.</p>
              </div>
              
              <!-- Tier Selector -->
              <div class="form-section card-premium p-6">
                <label class="section-label text-xs font-bold text-slate mb-4 block uppercase tracking-wider">Choose a budget tier</label>
                <div class="tier-buttons-container flex gap-4">
                  <button 
                    *ngFor="let tier of tiers" 
                    type="button"
                    class="tier-btn flex-1 py-4 px-4 rounded-lg font-bold text-center border-thin transition-all flex flex-col items-center justify-center gap-1"
                    [class.active]="tier.val === selectedTier"
                    (click)="selectTier(tier.val)"
                  >
                    <span class="tier-val font-display text-xl">\${{ tier.val }}</span>
                    <span class="tier-lvl text-xxs font-normal uppercase opacity-75">Budget Limit</span>
                  </button>
                </div>
              </div>

              <!-- CSV Uploader -->
              <div class="form-section card-premium p-6">
                <label class="section-label text-xs font-bold text-slate mb-4 block uppercase tracking-wider">Upload Employee List (CSV)</label>
                
                <div 
                  class="upload-dropzone flex flex-col items-center justify-center p-8 rounded-lg text-center transition-all"
                  [class.dragover]="isDragging"
                  (dragover)="onDragOver($event)"
                  (dragleave)="onDragLeave($event)"
                  (drop)="onDrop($event)"
                  (click)="fileInput.click()"
                >
                  <input 
                    #fileInput 
                    type="file" 
                    accept=".csv" 
                    class="hidden" 
                    (change)="onFileSelected($event)" 
                  />
                  
                  <div class="upload-icon-wrapper mb-3 text-indigo">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="upload-svg">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="17 8 12 3 7 8" class="arrow" />
                      <line x1="12" y1="3" x2="12" y2="15" class="arrow" />
                    </svg>
                  </div>
                  
                  <span class="upload-text text-sm font-bold text-charcoal mb-1">
                    Drag & drop or click to upload
                  </span>
                  <span class="upload-subtext text-xs text-slate">
                    Required columns: <code class="code-tag">Name</code>, <code class="code-tag">Email</code>
                  </span>
                  
                  <button type="button" class="btn btn-secondary btn-sm mt-4 shadow-sm">
                    Select File
                  </button>
                </div>

                <!-- File Success Message -->
                <div *ngIf="uploadedFileName" class="upload-success mt-4 flex items-center justify-between p-4 bg-emerald-50 border border-emerald-100 rounded-lg animate-fade-in">
                  <div class="flex items-center gap-3 text-emerald-800 text-xs font-semibold">
                    <div class="emerald-dot-pulse"></div>
                    <span>Loaded: <strong>{{ uploadedFileName }}</strong> ({{ parsedCount }} employees)</span>
                  </div>
                  <button (click)="clearUploadedFile($event)" class="clear-btn text-xs text-emerald-700 hover:text-emerald-950 font-bold">Clear</button>
                </div>
              </div>
            </div>

            <!-- Right Column: Curated Choices Panel -->
            <div class="curated-choices-col">
              <div class="curated-card p-6 bg-white rounded-lg shadow-card flex flex-col justify-between">
                <div class="card-header flex items-center justify-between mb-4 pb-2 border-b">
                  <div class="flex flex-col">
                    <h3 class="card-title text-xs font-bold text-slate uppercase tracking-wider">Available Rewards</h3>
                    <span class="card-subtitle text-xs text-slate-400 mt-0.5">Matching current tier ({{ getTierCurrency() }})</span>
                  </div>
                  <a href="javascript:void(0)" class="see-all-link text-xs font-bold text-indigo flex items-center gap-1">
                    <span>Catalog</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                  </a>
                </div>

                <!-- Choices Container -->
                <div class="choices-list flex flex-col gap-4">
                  <div *ngFor="let choice of getChoicesForTier()" class="choice-item flex items-center gap-4 p-3 rounded-lg border-thin">
                    <!-- Choice Image/Icon -->
                    <div class="choice-visual flex-shrink-0">
                      <img *ngIf="choice.type === 'image'" [src]="choice.image" class="choice-image rounded-md" alt="{{ choice.title }}" />
                      <div *ngIf="choice.type === 'icon'" class="choice-icon flex items-center justify-center rounded-md" [style.backgroundColor]="choice.iconBg">
                        <span [innerHTML]="getSafeHtml(choice.iconSvg)" class="svg-container"></span>
                      </div>
                    </div>
                    <!-- Choice Info -->
                    <div class="choice-info flex-1">
                      <h4 class="choice-name text-sm font-bold text-charcoal">{{ choice.title }}</h4>
                      <span class="choice-badge text-xxs font-medium uppercase opacity-75">Curated</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <!-- Table Section: Employee List -->
          <div class="employee-table-section mt-8 bg-white rounded-lg border-thin shadow-card overflow-hidden">
            <div class="table-header-bar flex items-center justify-between p-5 border-b bg-gray-50">
              <div class="flex flex-col">
                <span class="table-title font-display font-bold text-lg text-charcoal">Recipients List</span>
                <span class="table-subtitle text-xs text-slate mt-0.5">All employees to receive reward access links.</span>
              </div>
              <span class="badge badge-indigo" *ngIf="employees.length > 0">{{ employees.length }} Employees</span>
            </div>
            
            <div class="table-container">
              <table class="employee-table">
                <thead>
                  <tr>
                    <th class="sortable-header" (click)="toggleSort()">
                      <div class="flex items-center gap-2">
                        <span>Name</span>
                        <svg class="sort-icon" [class.asc]="sortAsc" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </div>
                    </th>
                    <th>Work Email</th>
                    <th>Campaign Name</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let emp of employees" class="table-row">
                    <td>
                      <div class="flex items-center gap-3">
                        <img [src]="emp.avatar" class="emp-avatar" alt="{{ emp.name }}" />
                        <span class="emp-name font-semibold text-charcoal">{{ emp.name }}</span>
                      </div>
                    </td>
                    <td class="emp-email text-slate font-medium">{{ emp.email }}</td>
                    <td>
                      <input 
                        type="text" 
                        [(ngModel)]="emp.campaignName" 
                        class="campaign-input text-sm rounded-md border-thin px-3 py-2 w-full"
                        placeholder="e.g. Q2 Outstanding Performance" 
                      />
                    </td>
                  </tr>
                  <tr *ngIf="employees.length === 0">
                    <td colspan="3" class="empty-table-state py-12 text-center text-slate">
                      <div class="flex flex-col items-center gap-2">
                        <span class="text-3xl">👥</span>
                        <span class="font-bold text-charcoal">No employees loaded</span>
                        <span class="text-xs max-w-xs text-slate-400">Drag & drop a CSV file or click the upload box above to load recipients.</span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Distribute Action -->
            <div class="table-actions flex justify-end p-4 border-t bg-gray-50">
              <button 
                type="button" 
                class="btn btn-primary btn-distribute shadow-floating"
                [disabled]="employees.length === 0"
                (click)="distributeRewards()"
              >
                <span>Distribute Reward Links</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
              </button>
            </div>
          </div>

        </main>
      </div>

      <!-- Floating success toast notification -->
      <div class="toast" [class.show]="showToast">
        <div class="toast-content flex items-center gap-4 py-4 px-6 bg-charcoal text-white rounded-lg shadow-floating border-left-glow">
          <div class="toast-icon-wrapper flex items-center justify-center bg-emerald-500 rounded-full">
            <svg class="toast-success-icon text-white" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <div class="flex flex-col">
            <span class="toast-title text-sm font-bold">Success</span>
            <span class="toast-message text-xs text-slate-300">{{ toastMessage }}</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .admin-layout {
      min-height: 100vh;
      background-color: var(--bg-secondary);
      font-family: var(--font-sans);
    }

    /* Sidebar Styles */
    .sidebar {
      width: 270px;
      background-color: #0F172A; /* Slate 900 for dark enterprise look */
      border-right: 1px solid rgba(255, 255, 255, 0.05);
      padding: 2rem 1.5rem;
      color: #94A3B8;
      display: flex;
      flex-direction: column;
      flex-shrink: 0;

      @media (max-width: 768px) {
        display: none;
      }
    }

    .logo-wrapper {
      padding: 0.5rem;
    }

    .logo-icon {
      width: 38px;
      height: 38px;
      background-color: rgba(99, 102, 241, 0.1);
      border-radius: var(--radius-md);
      border: 1px solid rgba(99, 102, 241, 0.2);
    }

    .logo-text {
      color: #FFFFFF !important;
      letter-spacing: -0.02em;
    }

    .sidebar-nav {
      margin-top: 2rem;
    }

    .nav-item {
      color: #94A3B8;
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 0.75rem 1rem;
      border-radius: var(--radius-md);
      font-weight: 500;
      transition: all var(--transition-fast);
      text-decoration: none;
      cursor: pointer;

      &:hover {
        color: #F8FAFC;
        background-color: rgba(255, 255, 255, 0.04);
      }

      &.active {
        color: #FFFFFF;
        background: linear-gradient(90deg, rgba(99, 102, 241, 0.15) 0%, rgba(139, 92, 246, 0.05) 100%);
        box-shadow: inset 3px 0 0 0 var(--accent-indigo);

        .nav-icon {
          color: #FFFFFF;
          filter: drop-shadow(0 0 8px rgba(99, 102, 241, 0.5));
        }
      }
    }

    .nav-icon {
      color: #64748B;
      width: 20px;
      height: 20px;
      transition: color var(--transition-fast);
    }

    .sidebar-footer {
      border-color: rgba(255, 255, 255, 0.05);
    }

    /* Main Dashboard styles */
    .main-panel {
      overflow-y: auto;
    }

    .panel-header {
      background-color: #FFFFFF;
      border-bottom: 1px solid var(--border-color);
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.02);
    }

    .panel-title {
      letter-spacing: -0.01em;
    }

    .user-profile {
      padding: 0.25rem 0.5rem;
      border-radius: 9999px;
      transition: background-color var(--transition-fast);
      
      &:hover {
        background-color: var(--border-light);
      }
    }

    .user-avatar-wrapper {
      position: relative;
    }

    .user-online-dot {
      position: absolute;
      bottom: -1px;
      right: -1px;
      width: 10px;
      height: 10px;
      background-color: #10B981;
      border: 2px solid white;
      border-radius: 50%;
      z-index: 10;
    }

    .avatar-initials {
      width: 32px;
      height: 32px;
      background: var(--gradient-primary);
      color: white;
      font-weight: 700;
      border-radius: 50%;
      font-size: 0.85rem;
      box-shadow: 0 4px 10px rgba(99, 102, 241, 0.2);
    }

    .creator-grid {
      display: grid;
      grid-template-columns: 1.25fr 0.75fr;
      gap: 2rem;

      @media (max-width: 1024px) {
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }
    }

    .card-premium {
      background-color: #FFFFFF;
      border: 1px solid var(--border-color);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-card);
    }

    /* Buttons active state overrides */
    .tier-btn {
      background-color: #FFFFFF;
      border: 1px solid var(--border-color);
      color: var(--text-slate);
      cursor: pointer;
      position: relative;
      overflow: hidden;

      &:hover:not(.active) {
        border-color: var(--accent-indigo);
        background-color: var(--accent-indigo-light);
        color: var(--accent-indigo);
        transform: translateY(-1px);
      }

      &.active {
        background: var(--gradient-primary);
        border-color: transparent;
        color: #FFFFFF;
        box-shadow: 0 10px 20px -5px rgba(99, 102, 241, 0.4);
        transform: translateY(-2px);
      }
    }

    /* Dropzone Upload Styling */
    .upload-dropzone {
      border: 2px dashed var(--border-color);
      background-color: var(--bg-primary);
      cursor: pointer;
      border-radius: var(--radius-md);
      position: relative;

      &:hover, &.dragover {
        border-color: var(--accent-indigo);
        background-color: var(--accent-indigo-light);
        
        .upload-svg {
          color: var(--accent-indigo);
          animation: floatBounce 1.5s ease-in-out infinite;
        }
      }
    }

    .upload-icon-wrapper {
      width: 64px;
      height: 64px;
      background-color: var(--accent-indigo-light);
      color: var(--accent-indigo);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all var(--transition-fast);
    }

    .code-tag {
      background-color: var(--border-light);
      color: var(--accent-indigo);
      padding: 0.15rem 0.35rem;
      border-radius: var(--radius-sm);
      font-family: monospace;
      font-size: 0.75rem;
      font-weight: 600;
    }

    .upload-success {
      box-shadow: var(--shadow-sm);
    }

    .emerald-dot-pulse {
      width: 8px;
      height: 8px;
      background-color: #10B981;
      border-radius: 50%;
      box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
      animation: pulseGlow 1.5s infinite;
    }

    @keyframes pulseGlow {
      0% {
        transform: scale(0.95);
        box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
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

    /* Curated Reward Choices Card */
    .curated-card {
      border: 1px solid var(--border-color);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-card);
      height: 100%;
    }

    .choice-item {
      background-color: var(--bg-primary);
      transition: all var(--transition-normal);

      &:hover {
        transform: translateX(6px) scale(1.01);
        border-color: var(--accent-indigo);
        box-shadow: var(--shadow-md);
      }
    }

    .choice-visual {
      width: 52px;
      height: 52px;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      border-radius: var(--radius-md);
      background-color: var(--bg-secondary);
      border: 1px solid var(--border-color);
      box-shadow: var(--shadow-sm);
    }

    .choice-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .choice-icon {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
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

    .choice-badge {
      color: var(--text-muted);
      letter-spacing: 0.05em;
    }

    /* Employee Table Styling */
    .employee-table-section {
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-card);
      overflow: hidden;
    }

    .table-header-bar {
      border-bottom: 1px solid var(--border-color);
    }

    .employee-table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;

      th, td {
        padding: 1.15rem 1.5rem;
        border-bottom: 1px solid var(--border-color);
      }

      th {
        background-color: var(--bg-secondary);
        color: var(--text-slate);
        font-weight: 700;
        font-size: 0.75rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
    }

    .table-row {
      transition: background-color var(--transition-fast);
      
      &:hover {
        background-color: #F8FAFC;
      }
      
      &:last-child td {
        border-bottom: none;
      }
    }

    .sortable-header {
      cursor: pointer;
      user-select: none;

      &:hover {
        color: var(--accent-indigo);
      }
    }

    .sort-icon {
      transition: transform var(--transition-fast);
      color: var(--text-muted);
      
      &.asc {
        transform: rotate(180deg);
      }
    }

    .emp-avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      object-fit: cover;
      border: 2px solid white;
      box-shadow: var(--shadow-sm);
    }

    .campaign-input {
      outline: none;
      background-color: var(--bg-primary);
      border-radius: var(--radius-sm);
      border: 1px solid var(--border-color);
      transition: all var(--transition-fast);

      &:focus {
        border-color: var(--accent-indigo);
        box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
      }
    }

    .btn-distribute {
      background: var(--gradient-primary);
      color: white !important;
      border: none;
      box-shadow: 0 8px 16px -4px rgba(99, 102, 241, 0.3);
      padding: 0.85rem 1.75rem;
      border-radius: var(--radius-md);
      transition: all var(--transition-fast);
      
      &:hover:not(:disabled) {
        background: var(--gradient-hover);
        box-shadow: 0 12px 20px -4px rgba(99, 102, 241, 0.4);
        transform: translateY(-1px);
      }
      
      &:disabled {
        background: var(--text-muted);
        opacity: 0.6;
        cursor: not-allowed;
        box-shadow: none;
      }
    }

    /* Toast Notification styles */
    .toast {
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      z-index: 2000;
      opacity: 0;
      transform: translateY(20px);
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      pointer-events: none;

      &.show {
        opacity: 1;
        transform: translateY(0);
        pointer-events: auto;
      }
    }

    .bg-charcoal {
      background-color: #0F172A;
      backdrop-filter: blur(8px);
      border: 1px solid rgba(255, 255, 255, 0.05);
    }

    .border-left-glow {
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
      position: relative;
      
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        width: 4px;
        background-color: #10B981;
        border-radius: var(--radius-sm) 0 0 var(--radius-sm);
      }
    }

    .toast-icon-wrapper {
      width: 24px;
      height: 24px;
      flex-shrink: 0;
    }
  `]
})
export class AdminComponent {
  constructor(private sanitizer: DomSanitizer) {}

  getSafeHtml(htmlString: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(htmlString);
  }

  selectedTier = 100;
  isDragging = false;
  sortAsc = true;

  // File Upload State
  uploadedFileName = '';
  parsedCount = 0;

  // Toast Notification State
  showToast = false;
  toastMessage = '';

  activeTab = 'Dashboard';

  navItems = [
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
      // Append or replace? Let's replace for a cleaner flow or append.
      // Append feels better as you are adding to list. Let's do append!
      this.employees = [...this.employees, ...newEmployees];
      this.parsedCount = parsedCount;
      
      // Auto toast message
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
