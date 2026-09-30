import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  fullName = '';
  email = '';
  password = '';
  agreeTerms = false;

  constructor(private router: Router) {}

  register(event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    this.router.navigate(['/auth/login']);
  }
}
