import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-compose',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './compose.component.html'
})
export class ComposeComponent {}
