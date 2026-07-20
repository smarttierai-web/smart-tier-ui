import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="section hero-section">
      <!-- Ambient background decoration -->
      <div class="ambient-glow"></div>
      
      <div class="container hero-container grid grid-2 items-center">
        <!-- Hero Left Info -->
        <div class="hero-left flex flex-col gap-6">
          <h1 class="text-6xl font-extrabold text-charcoal leading-tight font-display tracking-tight">
            Automated <br/>
            Employee Rewards. <br/>
            Zero Budget Waste.
          </h1>
          
          <p class="text-base text-slate max-w-md leading-relaxed font-normal">
            Set your spending tiers, let outstanding employees choose a gift they actually love, and pay only for the rewards that get claimed.
          </p>
          
          <div class="hero-actions flex items-center gap-6 mt-2">
            <a href="#cta-footer" class="btn btn-primary font-display">Join the Free 30-Day Pilot</a>
            <a href="#how-it-works" class="link-works font-semibold text-charcoal flex items-center gap-1 font-display">
              See How It Works
            </a>
          </div>
        </div>

        <!-- Hero Right: High Fidelity Dashboard & Mobile Mockups -->
        <div class="hero-right flex justify-center items-center">
          <!-- Soft glowing blur behind mockup -->
          <div class="bg-blur-circle"></div>
          
          <div class="mockup-wrapper">
            <!-- Mockup 1: Admin Dashboard -->
            <div class="mockup-dashboard shadow-floating bg-white">
              <div class="dashboard-layout">
                <!-- Sidebar -->
                <div class="sidebar flex flex-col items-center justify-between py-4">
                  <div class="flex flex-col items-center gap-4 w-full">
                    <!-- Logo icon -->
                    <div class="sidebar-logo flex items-center justify-center font-display font-black text-white text-xs">S</div>
                    <!-- Menu icons -->
                    <div class="menu-icon active"></div>
                    <div class="menu-icon"></div>
                    <div class="menu-icon"></div>
                    <div class="menu-icon"></div>
                  </div>
                  <!-- Avatar -->
                  <div class="avatar"></div>
                </div>
                
                <!-- Main Area -->
                <div class="main-content p-4 flex flex-col gap-3">
                  <!-- Header -->
                  <div class="flex justify-between items-center">
                    <span class="text-xs font-bold text-charcoal font-display">Dashboard</span>
                    <button class="btn-add font-display font-semibold">Add new gifting</button>
                  </div>
                  
                  <!-- Tabs -->
                  <div class="tabs flex gap-4 text-xxs font-semibold text-muted border-b pb-1">
                    <span class="tab-item active text-indigo">Dashboard</span>
                    <span class="tab-item">Old Works</span>
                    <span class="tab-item">Manual gifting</span>
                  </div>

                  <!-- Search bar -->
                  <div class="search-box border-thin rounded px-2 py-1 flex items-center gap-2">
                    <span class="search-icon text-xxs">🔍</span>
                    <span class="text-xxs text-muted">Search campaign...</span>
                  </div>

                  <!-- Metrics Row -->
                  <div class="metrics-row flex gap-2">
                    <div class="metric-box border-thin rounded p-2 flex-1 min-w-0">
                      <span class="metric-label block text-muted truncate">Sessions</span>
                      <span class="metric-value font-bold text-charcoal block truncate">1,130</span>
                      <span class="metric-subtext text-muted block truncate">Total session count</span>
                    </div>
                    <div class="metric-box border-thin rounded p-2 flex-1 min-w-0">
                      <span class="metric-label block text-muted truncate">Conversions</span>
                      <span class="metric-value font-bold text-charcoal block truncate">$200</span>
                      <span class="metric-subtext text-muted block truncate">Conversions gifting</span>
                    </div>
                    <div class="metric-box border-thin rounded p-2 flex-1 min-w-0">
                      <span class="metric-label block text-muted truncate">Total spent today</span>
                      <span class="metric-value font-bold text-charcoal block truncate">$12.00</span>
                      <span class="metric-subtext text-muted block truncate">Main balance parameters</span>
                    </div>
                  </div>

                  <!-- Table -->
                  <div class="table-container border-thin rounded overflow-hidden">
                    <table class="w-full text-left" style="table-layout: fixed;">
                      <thead>
                        <tr class="bg-slate border-b">
                          <th class="p-1 text-xxs font-bold text-slate truncate" style="width: 30%;">Name</th>
                          <th class="p-1 text-xxs font-bold text-slate truncate" style="width: 25%;">Name</th>
                          <th class="p-1 text-xxs font-bold text-slate truncate" style="width: 25%;">Created</th>
                          <th class="p-1 text-xxs font-bold text-slate truncate" style="width: 20%;">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr class="border-b">
                          <td class="p-1 text-xxs font-semibold text-charcoal truncate">
                            <span class="user-dot"></span> Janelle Roth
                          </td>
                          <td class="p-1 text-xxs text-slate truncate">Anna Hanson</td>
                          <td class="p-1 text-xxs text-slate truncate">Sep 13, 2023</td>
                          <td class="p-1 text-xxs"><span class="badge-status">Employee</span></td>
                        </tr>
                        <tr class="border-b">
                          <td class="p-1 text-xxs font-semibold text-charcoal truncate">
                            <span class="user-dot"></span> Aaron Homan
                          </td>
                          <td class="p-1 text-xxs text-slate truncate">Admin-sheen</td>
                          <td class="p-1 text-xxs text-slate truncate">Sep 13, 2023</td>
                          <td class="p-1 text-xxs"><span class="badge-status">Employee</span></td>
                        </tr>
                        <tr class="border-b">
                          <td class="p-1 text-xxs font-semibold text-charcoal truncate">
                            <span class="user-dot"></span> Shaun Steuber
                          </td>
                          <td class="p-1 text-xxs text-slate truncate">Roob-Carson</td>
                          <td class="p-1 text-xxs text-slate truncate">Sep 13, 2023</td>
                          <td class="p-1 text-xxs"><span class="badge-status">Employee</span></td>
                        </tr>
                        <tr>
                          <td class="p-1 text-xxs font-semibold text-charcoal truncate">
                            <span class="user-dot"></span> Merla Rowon
                          </td>
                          <td class="p-1 text-xxs text-slate truncate">Acme Same</td>
                          <td class="p-1 text-xxs text-slate truncate">Apr 19, 2025</td>
                          <td class="p-1 text-xxs"><span class="badge-status">Employee</span></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                </div>
              </div>
            </div>

            <!-- Mockup 2: Phone Overlay -->
            <div class="mockup-phone shadow-floating bg-white">
              <div class="phone-screen p-2 flex flex-col justify-between">
                <!-- Status bar -->
                <div class="flex justify-between items-center mb-1">
                  <span class="text-xxs font-bold text-charcoal">9:41</span>
                  <!-- Notch -->
                  <div class="phone-notch"></div>
                  <div class="flex gap-1 text-xxs">📶 🔋</div>
                </div>

                <!-- Back button & notification -->
                <div class="flex justify-between items-center mb-2">
                  <span class="back-btn flex items-center justify-center">‹</span>
                  <span class="bell-btn text-xxs">🔔</span>
                </div>

                <!-- Header inside phone -->
                <div class="mb-2">
                  <h4 class="text-xs font-bold text-charcoal font-display">Choose a curated gift box</h4>
                </div>

                <!-- Carousel Gift Card -->
                <div class="gift-box-card rounded-lg p-2 mb-2">
                  <div class="gift-box-image flex items-center justify-center">
                    <!-- SVG graphic representing curated gift box (teal wrapping with gold ribbon) -->
                    <svg width="55" height="55" viewBox="0 0 100 100" fill="none">
                      <rect x="20" y="35" width="60" height="45" rx="6" fill="#0D9488" />
                      <rect x="25" y="30" width="50" height="10" rx="3" fill="#0F766E" />
                      <rect x="45" y="30" width="10" height="50" fill="#F59E0B" />
                      <rect x="20" y="50" width="60" height="8" fill="#F59E0B" />
                      <path d="M50 30 C45 20, 35 25, 45 30 Z" fill="#D97706" />
                      <path d="M50 30 C55 20, 65 25, 55 30 Z" fill="#D97706" />
                    </svg>
                  </div>
                  <!-- Carousel Dots -->
                  <div class="carousel-dots flex justify-center gap-1 mt-2">
                    <span class="c-dot active"></span>
                    <span class="c-dot"></span>
                    <span class="c-dot"></span>
                  </div>
                </div>

                <!-- Catalog Header -->
                <div class="catalog-header flex justify-between items-center mb-1">
                  <span class="text-xxs font-bold text-charcoal font-display">Curated gift box</span>
                  <span class="text-xxs text-indigo font-semibold">See all</span>
                </div>

                <!-- Mini Cards Row -->
                <div class="grid grid-2 gap-2 mb-2">
                  <div class="mini-card border-thin rounded p-1 text-center bg-white flex flex-col items-center">
                    <div class="mini-img flex items-center justify-center">
                      <span class="text-xs">🧴</span>
                    </div>
                    <span class="text-xxs font-bold text-charcoal mt-1 block">Wellness Kit</span>
                  </div>
                  <div class="mini-card border-thin rounded p-1 text-center bg-white flex flex-col items-center">
                    <div class="mini-img flex items-center justify-center">
                      <span class="text-xs">💼</span>
                    </div>
                    <span class="text-xxs font-bold text-charcoal mt-1 block">Tech Pack</span>
                  </div>
                </div>

                <!-- Phone Bottom Tab Bar -->
                <div class="tab-bar border-t pt-2 flex justify-between px-2 text-slate text-xs mt-auto">
                  <span class="tab-icon active">🏠</span>
                  <span class="tab-icon">🔍</span>
                  <span class="tab-icon">🛒</span>
                  <span class="tab-icon">👤</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero-section {
      padding-top: 10rem;
      padding-bottom: 7rem;
      position: relative;
      overflow: hidden;
      background-color: var(--bg-primary);
    }

    .ambient-glow {
      position: absolute;
      top: -300px;
      left: -200px;
      width: 800px;
      height: 800px;
      background: radial-gradient(circle, rgba(79, 70, 229, 0.03) 0%, rgba(255, 255, 255, 0) 70%);
      pointer-events: none;
      z-index: 1;
    }

    .hero-container {
      position: relative;
      z-index: 2;
    }

    .text-6xl {
      font-size: 3.75rem;
      letter-spacing: -0.03em;
      
      @media (max-width: 768px) {
        font-size: 2.75rem;
      }
    }

    .link-works {
      color: var(--text-charcoal);
      transition: var(--transition-fast);
      padding: 0.5rem 0;
      text-decoration: none;
      border: none;
      
      &:hover {
        color: var(--accent-indigo);
      }
    }

    .hero-right {
      position: relative;
      height: 440px;
      
      @media (max-width: 1024px) {
        margin-top: 5rem;
        height: 420px;
      }
    }

    // Blurred circle overlay behind mockup
    .bg-blur-circle {
      position: absolute;
      width: 320px;
      height: 320px;
      border-radius: 50%;
      background-color: rgba(99, 102, 241, 0.08);
      filter: blur(60px);
      z-index: 1;
      right: 15%;
      top: 15%;
    }

    .mockup-wrapper {
      position: relative;
      width: 100%;
      max-width: 580px;
      height: 100%;
      z-index: 2;
    }

    // Admin Dashboard CSS Representation
    .mockup-dashboard {
      position: absolute;
      top: 20px;
      left: 0;
      width: 520px;
      height: 380px;
      z-index: 2;
      border: 1px solid rgba(17, 24, 39, 0.05);
      border-radius: 12px;
      overflow: hidden;
      
      .dashboard-layout {
        display: flex;
        height: 100%;
      }

      .sidebar {
        width: 50px;
        background-color: #0F172A;
        height: 100%;
        flex-shrink: 0;
        
        .sidebar-logo {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background-color: var(--accent-indigo);
        }

        .menu-icon {
          width: 14px;
          height: 14px;
          border-radius: 4px;
          background-color: #334155;
          opacity: 0.6;
          
          &.active {
            background-color: var(--accent-indigo);
            opacity: 1;
          }
        }

        .avatar {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background-color: #475569;
        }
      }

      .main-content {
        flex-grow: 1;
        background-color: var(--bg-primary);
        overflow: hidden;
        min-width: 0; // Ensures child metrics can shrink correctly without overflowing
      }

      .btn-add {
        background-color: var(--accent-indigo);
        color: white;
        padding: 0.35rem 0.75rem;
        border-radius: 6px;
        font-size: 10px;
        
        &:hover {
          background-color: var(--accent-indigo-hover);
        }
      }

      .tab-item {
        cursor: pointer;
        padding-bottom: 4px;
        
        &.active {
          border-bottom: 2px solid var(--accent-indigo);
        }
      }

      .metrics-row {
        width: 100%;
      }

      .metric-box {
        border-color: rgba(17, 24, 39, 0.05);
        background-color: var(--bg-secondary);
        
        .metric-label {
          font-size: 8px;
          font-weight: 500;
        }
        .metric-value {
          font-size: 12px;
          line-height: 1.2;
        }
        .metric-subtext {
          font-size: 7px;
        }
      }

      .table-container {
        border-color: rgba(17, 24, 39, 0.05);
        background-color: var(--bg-primary);
      }

      table th, table td {
        padding: 0.35rem 0.5rem !important;
      }

      .user-dot {
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background-color: #10B981;
        display: inline-block;
        margin-right: 3px;
        vertical-align: middle;
      }

      .badge-status {
        display: inline-block;
        padding: 0.1rem 0.3rem;
        font-size: 8px;
        font-weight: 600;
        border-radius: 4px;
        background-color: var(--bg-secondary);
        color: var(--text-slate);
        border: 1px solid var(--border-color);
      }

      @media (max-width: 640px) {
        width: 100%;
        height: 350px;
      }
    }

    // High Fidelity Phone Overlay
    .mockup-phone {
      position: absolute;
      top: 60px;
      right: 0;
      width: 200px;
      height: 350px;
      z-index: 3;
      border: 6px solid var(--text-charcoal);
      border-radius: 28px;
      overflow: hidden;
      box-shadow: 0 25px 50px -12px rgba(17, 24, 39, 0.15);
      
      .phone-screen {
        height: 100%;
        background-color: #F9FAFB;
      }

      .phone-notch {
        width: 50px;
        height: 12px;
        background-color: var(--text-charcoal);
        border-radius: 6px;
      }

      .back-btn, .bell-btn {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: white;
        border: 1px solid rgba(17, 24, 39, 0.05);
        color: var(--text-slate);
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }

      .gift-box-card {
        background-color: #FCE7F3; /* Pink background matching target mockup */
        border: 1px solid rgba(244, 63, 94, 0.1);
      }

      .gift-box-image {
        height: 80px;
      }

      .c-dot {
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background-color: #D1D5DB;
        
        &.active {
          background-color: var(--accent-indigo);
          width: 8px;
          border-radius: 2px;
        }
      }

      .mini-img {
        width: 26px;
        height: 26px;
        border-radius: 6px;
        background-color: #EEF2FF;
      }

      .mini-card {
        border-color: rgba(17, 24, 39, 0.05);
      }

      .tab-icon {
        cursor: pointer;
        opacity: 0.6;
        font-size: 0.85rem;
        
        &.active {
          opacity: 1;
          color: var(--accent-indigo);
        }
      }

      @media (max-width: 640px) {
        display: none; // Hide mobile phone view on small mobile viewports to prevent layout overlap
      }
    }

    .text-xxs {
      font-size: 0.65rem;
    }
  `]
})
export class HeroComponent { }
