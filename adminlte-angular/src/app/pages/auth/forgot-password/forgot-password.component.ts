import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './forgot-password.component.html'
})
export class ForgotPasswordComponent {
  email = '';

  constructor(private router: Router) {}

  requestPassword(event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    // Simulate reset request and redirect to login
    this.router.navigate(['/auth/login']);
  }
}
