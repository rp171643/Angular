import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-colors',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './colors.component.html'
})
export class ColorsComponent {}
