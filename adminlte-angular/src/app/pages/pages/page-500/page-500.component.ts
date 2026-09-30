import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-page-500',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './page-500.component.html'
})
export class Page500Component {}
