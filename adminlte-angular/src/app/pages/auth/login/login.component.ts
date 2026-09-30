import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  email = 'admin@example.com';
  password = 'password123';
  rememberMe = false;

  constructor(private router: Router) {}

  login(event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    this.router.navigate(['/dashboard/v1']);
  }
}
