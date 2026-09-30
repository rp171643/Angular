import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SidebarService } from '../../../core/services/sidebar.service';
import { ThemeService, ThemeMode } from '../../../core/services/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  sidebarService = inject(SidebarService);
  themeService = inject(ThemeService);

  isFullscreen = signal<boolean>(false);
  activeDropdown = signal<string | null>(null);
  currentLanguage = signal<string>('English');

  toggleDropdown(name: string, event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    if (this.activeDropdown() === name) {
      this.activeDropdown.set(null);
    } else {
      this.activeDropdown.set(name);
    }
  }

  closeDropdowns(): void {
    this.activeDropdown.set(null);
  }

  toggleSidebar(event: Event): void {
    event.preventDefault();
    this.sidebarService.toggleSidebar();
  }

  setTheme(mode: ThemeMode, event: Event): void {
    event.preventDefault();
    this.themeService.setTheme(mode);
    this.closeDropdowns();
  }

  setLanguage(lang: string, event: Event): void {
    event.preventDefault();
    this.currentLanguage.set(lang);
    this.closeDropdowns();
  }

  toggleFullscreen(event: Event): void {
    event.preventDefault();
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        this.isFullscreen.set(true);
      }).catch(err => {
        console.error('Error attempting to enable fullscreen:', err);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => {
          this.isFullscreen.set(false);
        });
      }
    }
  }
}
