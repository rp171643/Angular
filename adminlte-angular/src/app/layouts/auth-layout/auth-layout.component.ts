import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
    <div class="login-page bg-body-secondary min-vh-100 w-100 d-flex flex-column justify-content-center align-items-center py-4">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      min-height: 100vh;
      overflow-y: auto;
    }
  `]
})
export class AuthLayoutComponent {}
