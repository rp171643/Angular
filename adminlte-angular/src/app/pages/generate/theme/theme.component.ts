import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ThemeService, ThemeMode } from '../../../core/services/theme.service';

interface ThemePreset {
  name: string;
  description: string;
  headerColor: string;
  sidebarColor: string;
  accentColor: string;
  mode: ThemeMode;
}

@Component({
  selector: 'app-theme',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './theme.component.html'
})
export class ThemeComponent {
  themeService = inject(ThemeService);

  selectedPreset = 'Default Light';
  sidebarTheme: 'light' | 'dark' = 'dark';

  presets: ThemePreset[] = [
    {
      name: 'Default Light',
      description: 'Clean light dashboard with dark sidebar',
      headerColor: '#ffffff',
      sidebarColor: '#212529',
      accentColor: '#0d6efd',
      mode: 'light'
    },
    {
      name: 'Midnight Dark',
      description: 'Deep high-contrast dark theme',
      headerColor: '#1a1d20',
      sidebarColor: '#121416',
      accentColor: '#0dcaf0',
      mode: 'dark'
    },
    {
      name: 'Emerald Green',
      description: 'Modern teal and emerald accents',
      headerColor: '#ffffff',
      sidebarColor: '#1b3b36',
      accentColor: '#198754',
      mode: 'light'
    },
    {
      name: 'Royal Purple',
      description: 'Vibrant indigo and violet tones',
      headerColor: '#ffffff',
      sidebarColor: '#241b3b',
      accentColor: '#6f42c1',
      mode: 'light'
    }
  ];

  applyPreset(preset: ThemePreset): void {
    this.selectedPreset = preset.name;
    this.themeService.setTheme(preset.mode);
  }
}

