import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register-v2',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './register-v2.component.html'
})
export class RegisterV2Component {
  fullName = '';
  email = '';
  password = '';
  agreeTerms = false;

  constructor(private router: Router) {}

  register(event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    this.router.navigate(['/auth/login-v2']);
  }
}
