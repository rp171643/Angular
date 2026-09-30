import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-docs-getting-started',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './getting-started.component.html'
})
export class DocsGettingStartedComponent {}
