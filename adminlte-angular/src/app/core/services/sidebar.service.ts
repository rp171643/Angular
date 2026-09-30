import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  isCollapsed = signal<boolean>(false);
  isMobileOpen = signal<boolean>(false);
  isHovering = signal<boolean>(false);

  constructor() {
    this.updateBodyClasses();
  }

  toggleSidebar(): void {
    if (typeof window === 'undefined') return;

    const isMobile = window.innerWidth < 992;
    if (isMobile) {
      this.isMobileOpen.update(v => !v);
    } else {
      this.isCollapsed.update(v => !v);
      this.isHovering.set(false);
    }
    this.updateBodyClasses();
  }

  closeMobileSidebar(): void {
    if (this.isMobileOpen()) {
      this.isMobileOpen.set(false);
      this.updateBodyClasses();
    }
  }

  setHover(hover: boolean): void {
    if (this.isCollapsed()) {
      this.isHovering.set(hover);
      this.updateBodyClasses();
    }
  }

  private updateBodyClasses(): void {
    if (typeof document === 'undefined') return;

    const body = document.body;
    if (this.isCollapsed()) {
      body.classList.add('sidebar-collapse');
    } else {
      body.classList.remove('sidebar-collapse');
    }

    if (this.isHovering() && this.isCollapsed()) {
      body.classList.add('sidebar-hover-show');
    } else {
      body.classList.remove('sidebar-hover-show');
    }

    if (this.isMobileOpen()) {
      body.classList.add('sidebar-open');
    } else {
      body.classList.remove('sidebar-open');
    }
  }
}
