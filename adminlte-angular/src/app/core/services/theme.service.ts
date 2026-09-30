import { Injectable, signal } from '@angular/core';

export type ThemeMode = 'light' | 'dark' | 'auto';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly STORAGE_KEY = 'lte-theme';
  
  currentMode = signal<ThemeMode>(this.getInitialMode());
  resolvedTheme = signal<'light' | 'dark'>('light');

  constructor() {
    this.applyTheme(this.currentMode());

    if (typeof window !== 'undefined' && window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        if (this.currentMode() === 'auto') {
          this.applyTheme('auto');
        }
      });
    }
  }

  private getInitialMode(): ThemeMode {
    if (typeof localStorage === 'undefined') return 'auto';
    const stored = localStorage.getItem(this.STORAGE_KEY) as ThemeMode;
    return stored || 'auto';
  }

  setTheme(mode: ThemeMode): void {
    this.currentMode.set(mode);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.STORAGE_KEY, mode);
    }
    this.applyTheme(mode);
  }

  private applyTheme(mode: ThemeMode): void {
    if (typeof document === 'undefined') return;

    let target: 'light' | 'dark' = 'light';
    if (mode === 'dark') {
      target = 'dark';
    } else if (mode === 'light') {
      target = 'light';
    } else {
      target = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    }

    this.resolvedTheme.set(target);
    document.documentElement.setAttribute('data-bs-theme', target);
    document.documentElement.style.colorScheme = target;
  }
}
