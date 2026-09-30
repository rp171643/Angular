import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-page-404',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './page-404.component.html'
})
export class Page404Component {}
