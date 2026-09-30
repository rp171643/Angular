import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-read',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './read.component.html'
})
export class ReadComponent {}
