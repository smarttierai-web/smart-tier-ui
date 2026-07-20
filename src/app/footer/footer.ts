import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.html',
  styleUrl: './footer.scss'
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
