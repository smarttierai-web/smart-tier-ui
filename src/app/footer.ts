import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer id="cta-footer" class="footer bg-slate">
      <!-- CTA Container -->
      <div class="container py-20">
        <div class="cta-card border-thin bg-white rounded-lg p-12 text-center shadow-floating">
          <span class="badge mb-4">Limited Availability</span>
          <h2 class="text-4xl font-extrabold text-charcoal mb-4">
            Ready to eliminate corporate gifting headaches?
          </h2>
          <p class="text-lg text-slate mb-8 max-w-xl mx-auto">
            We are accepting exactly 5 foundational companies for our exclusive launch pilot this month. Platform fees are completely waived for 30 days.
          </p>
          <div class="flex justify-center">
            <button class="btn btn-primary font-display" (click)="openBetaDialog()">Secure Your Pilot Slot Now</button>
          </div>
          
          <!-- Quick stats / micro details -->
          <div class="flex justify-center gap-8 mt-8 text-xs font-semibold text-muted">
            <span>✓ No Credit Card Required</span>
            <span>✓ Cancel Anytime</span>
            <span>✓ Dedicated Onboarding Support</span>
          </div>
        </div>
      </div>

      <!-- Footer Bottom Links -->
      <div class="footer-bottom border-t py-12 bg-white">
        <div class="container flex justify-between items-center flex-wrap gap-6">
          <div class="footer-logo">
            <span class="font-display font-extrabold text-xl text-charcoal">Smart<span class="text-indigo">Tier</span></span>
            <p class="text-xs text-slate mt-1">© 2026 SmartTier Inc. All rights reserved.</p>
          </div>

          <div class="footer-links flex gap-8">
            <div class="link-group flex flex-col gap-2">
              <span class="text-xs font-bold text-charcoal uppercase tracking-wider">Product</span>
              <a href="#how-it-works" class="text-xs text-slate hover:text-indigo">How It Works</a>
              <a href="#features" class="text-xs text-slate hover:text-indigo">Features</a>
              <a href="#pricing" class="text-xs text-slate hover:text-indigo">Pricing</a>
            </div>

            <div class="link-group flex flex-col gap-2">
              <span class="text-xs font-bold text-charcoal uppercase tracking-wider">Legal</span>
              <a href="#" class="text-xs text-slate hover:text-indigo">Privacy Policy</a>
              <a href="#" class="text-xs text-slate hover:text-indigo">Terms of Service</a>
              <a href="#" class="text-xs text-slate hover:text-indigo">Security Audit</a>
            </div>
          </div>
        </div>
      </div>
    </footer>

    <!-- Simple Feedback Dialog for beta sign up -->
    @if (showDialog) {
      <div class="dialog-backdrop" (click)="closeDialog()">
        <div class="dialog-content bg-white p-8 rounded-lg border-thin shadow-floating" (click)="$event.stopPropagation()">
          <h3 class="text-2xl font-bold text-charcoal mb-2">Secure Your Pilot Slot</h3>
          <p class="text-sm text-slate mb-6">Enter your professional email. A launch engineer will contact you within 2 hours.</p>
          
          <form (submit)="submitBetaForm($event)" class="flex flex-col gap-4">
            <input type="email" placeholder="name@company.com" required class="input-email border-thin rounded-md p-3" />
            <button type="submit" class="btn btn-primary w-full">Request Beta Access</button>
          </form>

          @if (isSubmitted) {
            <p class="text-sm text-emerald font-semibold mt-4 text-center">✓ Thank you! We have reserved your spot in line.</p>
          }
        </div>
      </div>
    }
  `,
  styles: [`
    .footer {
      border-top: 1px solid var(--border-color);
    }

    .cta-card {
      max-width: 900px;
      margin: 0 auto;
      border-color: var(--border-color);
      position: relative;
      overflow: hidden;

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background-color: var(--accent-indigo);
      }
    }

    .footer-bottom {
      border-top: 1px solid var(--border-color);
    }

    // Modal styles for beta sign up
    .dialog-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(17, 24, 39, 0.4);
      backdrop-filter: blur(4px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 2000;
    }

    .dialog-content {
      width: 100%;
      max-width: 440px;
      margin: 0 1rem;
      border-color: var(--border-color);
    }

    .input-email {
      font-family: var(--font-sans);
      width: 100%;
      font-size: 1rem;
      outline: none;
      transition: var(--transition-fast);

      &:focus {
        border-color: var(--accent-indigo);
        box-shadow: 0 0 0 2px var(--accent-indigo-light);
      }
    }

    .text-emerald {
      color: #059669;
    }
  `]
})
export class FooterComponent {
  showDialog = false;
  isSubmitted = false;

  openBetaDialog() {
    this.showDialog = true;
    this.isSubmitted = false;
  }

  closeDialog() {
    this.showDialog = false;
  }

  submitBetaForm(event: Event) {
    event.preventDefault();
    this.isSubmitted = true;
    setTimeout(() => {
      this.closeDialog();
    }, 1500);
  }
}
