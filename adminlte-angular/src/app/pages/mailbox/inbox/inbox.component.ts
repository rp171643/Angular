import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-inbox',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './inbox.component.html'
})
export class InboxComponent {}
