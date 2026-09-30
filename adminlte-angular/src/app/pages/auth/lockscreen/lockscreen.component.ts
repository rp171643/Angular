import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lockscreen',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './lockscreen.component.html'
})
export class LockscreenComponent {
  password = '';

  constructor(private router: Router) {}

  unlock(event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    this.router.navigate(['/dashboard/v1']);
  }
}
