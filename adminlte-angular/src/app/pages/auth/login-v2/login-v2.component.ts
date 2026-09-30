import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-v2',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './login-v2.component.html'
})
export class LoginV2Component {
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
