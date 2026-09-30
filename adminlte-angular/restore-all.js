const fs = require('fs');
const path = require('path');

function write(relPath, content) {
  const fullPath = path.join(__dirname, relPath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content.trim() + '\n', 'utf8');
  console.log('Restored:', relPath);
}

// 1. Models & Services
write('src/app/core/models/nav-item.model.ts', `
export interface NavBadge {
  text: string;
  class: string;
}

export interface NavItem {
  title: string;
  icon?: string;
  route?: string;
  badge?: NavBadge;
  children?: NavItem[];
  isHeader?: boolean;
  isOpen?: boolean;
}
`);

write('src/app/core/services/theme.service.ts', `
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
`);

write('src/app/core/services/sidebar.service.ts', `
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  isCollapsed = signal<boolean>(false);
  isMobileOpen = signal<boolean>(false);

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
    }
    this.updateBodyClasses();
  }

  closeMobileSidebar(): void {
    if (this.isMobileOpen()) {
      this.isMobileOpen.set(false);
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

    if (this.isMobileOpen()) {
      body.classList.add('sidebar-open');
    } else {
      body.classList.remove('sidebar-open');
    }
  }
}
`);

// 2. Layouts: Header, Sidebar, Footer, AdminLayout, AuthLayout
write('src/app/layouts/admin-layout/header/header.component.ts', `
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
`);

write('src/app/layouts/admin-layout/header/header.component.html', `
<nav class="app-header navbar navbar-expand bg-body" (click)="closeDropdowns()">
  <div class="container-fluid">
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" (click)="toggleSidebar($event)" href="#" role="button" aria-label="Toggle sidebar">
          <i class="bi bi-list fs-4"></i>
        </a>
      </li>
      <li class="nav-item d-none d-md-block">
        <a routerLink="/dashboard/v1" class="nav-link">
          <i class="bi bi-grid-1x2 me-1"></i> Dashboard
        </a>
      </li>
      <li class="nav-item d-none d-md-block">
        <a routerLink="/pages/profile" class="nav-link">
          <i class="bi bi-person me-1"></i> Profile
        </a>
      </li>
    </ul>

    <div class="navbar-search d-none d-md-block ms-3">
      <div class="navbar-search-field d-flex align-items-center">
        <input type="search" class="form-control form-control-sm" placeholder="Search..." autocomplete="off" />
        <button class="btn btn-sm btn-link text-body-secondary ms-n4" type="button">
          <i class="bi bi-search"></i>
        </button>
      </div>
    </div>

    <ul class="navbar-nav ms-auto align-items-center">
      <li class="nav-item d-md-none">
        <a class="nav-link" routerLink="/pages/search-results" aria-label="Search">
          <i class="bi bi-search"></i>
        </a>
      </li>

      <!-- Messages Dropdown -->
      <li class="nav-item dropdown" [class.show]="activeDropdown() === 'messages'">
        <a class="nav-link position-relative" href="#" (click)="toggleDropdown('messages', $event)">
          <i class="bi bi-chat-text fs-5"></i>
          <span class="position-absolute top-1 start-100 translate-middle badge rounded-pill bg-danger" style="font-size: 0.65rem;">3</span>
        </a>
        <div class="dropdown-menu dropdown-menu-lg dropdown-menu-end shadow" [class.show]="activeDropdown() === 'messages'" (click)="$event.stopPropagation()">
          <a routerLink="/mailbox/inbox" class="dropdown-item">
            <div class="d-flex">
              <img src="/assets/img/user1-128x128.jpg" class="rounded-circle me-3" style="width: 40px; height: 40px; object-fit: cover;" />
              <div class="flex-grow-1">
                <div class="d-flex justify-content-between">
                  <h6 class="mb-0 fw-semibold">Brad Diesel</h6>
                  <span class="text-danger small"><i class="bi bi-star-fill"></i></span>
                </div>
                <p class="mb-0 text-muted small text-truncate" style="max-width: 180px;">Call me whenever you can...</p>
                <small class="text-secondary"><i class="bi bi-clock me-1"></i>4 Hours Ago</small>
              </div>
            </div>
          </a>
          <div class="dropdown-divider"></div>
          <a routerLink="/mailbox/inbox" class="dropdown-item dropdown-footer text-center fw-medium py-2">See All Messages</a>
        </div>
      </li>

      <!-- Notifications Dropdown -->
      <li class="nav-item dropdown ms-2" [class.show]="activeDropdown() === 'notifications'">
        <a class="nav-link position-relative" href="#" (click)="toggleDropdown('notifications', $event)">
          <i class="bi bi-bell fs-5"></i>
          <span class="position-absolute top-1 start-100 translate-middle badge rounded-pill bg-warning text-dark" style="font-size: 0.65rem;">15</span>
        </a>
        <div class="dropdown-menu dropdown-menu-lg dropdown-menu-end shadow" [class.show]="activeDropdown() === 'notifications'" (click)="$event.stopPropagation()">
          <span class="dropdown-item dropdown-header fw-bold">15 Notifications</span>
          <div class="dropdown-divider"></div>
          <a href="#" class="dropdown-item d-flex align-items-center justify-content-between">
            <div><i class="bi bi-envelope text-primary me-2"></i> 4 new messages</div>
            <span class="text-secondary small">3 mins</span>
          </a>
          <div class="dropdown-divider"></div>
          <a routerLink="/mailbox/inbox" class="dropdown-item dropdown-footer text-center fw-medium py-2">See All Notifications</a>
        </div>
      </li>

      <!-- Fullscreen Toggle -->
      <li class="nav-item ms-2">
        <a class="nav-link" href="#" (click)="toggleFullscreen($event)">
          @if (!isFullscreen()) {
            <i class="bi bi-arrows-fullscreen"></i>
          } @else {
            <i class="bi bi-fullscreen-exit"></i>
          }
        </a>
      </li>

      <!-- Theme Toggle -->
      <li class="nav-item dropdown ms-2" [class.show]="activeDropdown() === 'theme'">
        <a class="nav-link" href="#" (click)="toggleDropdown('theme', $event)">
          @if (themeService.currentMode() === 'light') {
            <i class="bi bi-sun-fill text-warning"></i>
          } @else if (themeService.currentMode() === 'dark') {
            <i class="bi bi-moon-stars-fill text-primary"></i>
          } @else {
            <i class="bi bi-circle-half"></i>
          }
        </a>
        <ul class="dropdown-menu dropdown-menu-end shadow" [class.show]="activeDropdown() === 'theme'" (click)="$event.stopPropagation()">
          <li>
            <button type="button" class="dropdown-item d-flex align-items-center" [class.active]="themeService.currentMode() === 'light'" (click)="setTheme('light', $event)">
              <i class="bi bi-sun-fill me-2 text-warning"></i> Light
            </button>
          </li>
          <li>
            <button type="button" class="dropdown-item d-flex align-items-center" [class.active]="themeService.currentMode() === 'dark'" (click)="setTheme('dark', $event)">
              <i class="bi bi-moon-stars-fill me-2 text-primary"></i> Dark
            </button>
          </li>
          <li>
            <button type="button" class="dropdown-item d-flex align-items-center" [class.active]="themeService.currentMode() === 'auto'" (click)="setTheme('auto', $event)">
              <i class="bi bi-circle-half me-2"></i> Auto (System)
            </button>
          </li>
        </ul>
      </li>

      <!-- User Dropdown -->
      <li class="nav-item dropdown user-menu ms-2" [class.show]="activeDropdown() === 'user'">
        <a href="#" class="nav-link dropdown-toggle d-flex align-items-center" (click)="toggleDropdown('user', $event)">
          <img src="/assets/img/user2-160x160.jpg" class="user-image rounded-circle shadow-sm me-2" style="width: 32px; height: 32px; object-fit: cover;" />
          <span class="d-none d-md-inline fw-medium">Alexander Pierce</span>
        </a>
        <ul class="dropdown-menu dropdown-menu-lg dropdown-menu-end shadow" [class.show]="activeDropdown() === 'user'" (click)="$event.stopPropagation()">
          <li class="user-header bg-primary text-white p-4 text-center">
            <img src="/assets/img/user2-160x160.jpg" class="rounded-circle shadow mb-2" style="width: 80px; height: 80px; object-fit: cover;" />
            <p class="mb-0 fw-semibold fs-5">Alexander Pierce</p>
            <small class="opacity-75">Full Stack Web Developer &bull; Member since Nov 2023</small>
          </li>
          <li class="user-footer p-3 d-flex justify-content-between">
            <a routerLink="/pages/profile" (click)="closeDropdowns()" class="btn btn-sm btn-outline-secondary">Profile</a>
            <a routerLink="/auth/login" (click)="closeDropdowns()" class="btn btn-sm btn-outline-danger">Sign out</a>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</nav>
`);

write('src/app/layouts/admin-layout/header/header.component.scss', `
.dropdown-menu {
  animation: fadeIn 0.15s ease-in-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
}
`);

write('src/app/layouts/admin-layout/sidebar/sidebar.component.ts', `
import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SidebarService } from '../../../core/services/sidebar.service';
import { NavItem } from '../../../core/models/nav-item.model';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  sidebarService = inject(SidebarService);
  router = inject(Router);

  searchTerm = signal<string>('');

  navItems = signal<NavItem[]>([
    {
      title: 'Dashboard',
      icon: 'bi bi-speedometer2',
      isOpen: true,
      children: [
        { title: 'Dashboard v1', icon: 'bi bi-circle', route: '/dashboard/v1' },
        { title: 'Dashboard v2', icon: 'bi bi-circle', route: '/dashboard/v2' },
        { title: 'Dashboard v3', icon: 'bi bi-circle', route: '/dashboard/v3' }
      ]
    },
    {
      title: 'Starter Page',
      icon: 'bi bi-file-earmark',
      route: '/pages/starter'
    },
    {
      title: 'Widgets',
      icon: 'bi bi-box-seam-fill',
      isOpen: false,
      children: [
        { title: 'Small Box', icon: 'bi bi-circle', route: '/widgets/small-box' },
        { title: 'Info Box', icon: 'bi bi-circle', route: '/widgets/info-box' },
        { title: 'Cards', icon: 'bi bi-circle', route: '/widgets/cards' },
        { title: 'Social & Post', icon: 'bi bi-circle', route: '/widgets/social' }
      ]
    },
    {
      title: 'UI Elements',
      icon: 'bi bi-tree-fill',
      isOpen: false,
      children: [
        { title: 'General', icon: 'bi bi-circle', route: '/ui/general' },
        { title: 'Icons', icon: 'bi bi-circle', route: '/ui/icons' },
        { title: 'Timeline', icon: 'bi bi-circle', route: '/ui/timeline' },
        { title: 'Ribbons', icon: 'bi bi-circle', route: '/ui/ribbons' },
        { title: 'Colors', icon: 'bi bi-circle', route: '/ui/colors' }
      ]
    },
    {
      title: 'Mailbox',
      icon: 'bi bi-envelope-fill',
      isOpen: false,
      badge: { text: '12', class: 'badge text-bg-warning' },
      children: [
        { title: 'Inbox', icon: 'bi bi-circle', route: '/mailbox/inbox' },
        { title: 'Compose', icon: 'bi bi-circle', route: '/mailbox/compose' },
        { title: 'Read Message', icon: 'bi bi-circle', route: '/mailbox/read' }
      ]
    },
    {
      title: 'Forms',
      icon: 'bi bi-pencil-square',
      isOpen: false,
      children: [
        { title: 'General Elements', icon: 'bi bi-circle', route: '/forms/elements' },
        { title: 'Layout', icon: 'bi bi-circle', route: '/forms/layout' },
        { title: 'Validation', icon: 'bi bi-circle', route: '/forms/validation' },
        { title: 'Wizard', icon: 'bi bi-circle', route: '/forms/wizard' },
        { title: 'Advanced Elements', icon: 'bi bi-circle', route: '/forms/advanced' },
        { title: 'Editors', icon: 'bi bi-circle', route: '/forms/editors' }
      ]
    },
    {
      title: 'Tables',
      icon: 'bi bi-table',
      isOpen: false,
      children: [
        { title: 'Simple Tables', icon: 'bi bi-circle', route: '/tables/simple' },
        { title: 'Data Tables', icon: 'bi bi-circle', route: '/tables/data' }
      ]
    },
    {
      title: 'Charts',
      icon: 'bi bi-graph-up',
      isOpen: false,
      children: [
        { title: 'ApexCharts', icon: 'bi bi-circle', route: '/charts/apexcharts' }
      ]
    },
    {
      title: 'PAGES',
      isHeader: true
    },
    {
      title: 'Pages',
      icon: 'bi bi-file-earmark-text',
      isOpen: false,
      children: [
        { title: 'Profile', icon: 'bi bi-circle', route: '/pages/profile' },
        { title: 'Settings', icon: 'bi bi-circle', route: '/pages/settings' },
        { title: 'Invoice', icon: 'bi bi-circle', route: '/pages/invoice' },
        { title: 'Calendar', icon: 'bi bi-circle', route: '/pages/calendar' },
        { title: 'Kanban', icon: 'bi bi-circle', route: '/pages/kanban' },
        { title: 'Chat', icon: 'bi bi-circle', route: '/pages/chat' },
        { title: 'File Manager', icon: 'bi bi-circle', route: '/pages/file-manager' },
        { title: 'Projects', icon: 'bi bi-circle', route: '/pages/projects' },
        { title: 'Gallery', icon: 'bi bi-circle', route: '/pages/gallery' },
        { title: 'Pricing', icon: 'bi bi-circle', route: '/pages/pricing' },
        { title: 'FAQ', icon: 'bi bi-circle', route: '/pages/faq' },
        { title: '404 Error', icon: 'bi bi-circle', route: '/pages/404' },
        { title: '500 Error', icon: 'bi bi-circle', route: '/pages/500' },
        { title: 'Maintenance', icon: 'bi bi-circle', route: '/pages/maintenance' }
      ]
    },
    {
      title: 'EXAMPLES & AUTH',
      isHeader: true
    },
    {
      title: 'Authentication',
      icon: 'bi bi-box-arrow-in-right',
      isOpen: false,
      children: [
        { title: 'Login', icon: 'bi bi-circle', route: '/auth/login' },
        { title: 'Register', icon: 'bi bi-circle', route: '/auth/register' },
        { title: 'Forgot Password', icon: 'bi bi-circle', route: '/auth/forgot-password' },
        { title: 'Lockscreen', icon: 'bi bi-circle', route: '/auth/lockscreen' }
      ]
    },
    {
      title: 'DOCUMENTATION',
      isHeader: true
    },
    {
      title: 'Docs',
      icon: 'bi bi-journal-code',
      isOpen: false,
      children: [
        { title: 'Introduction', icon: 'bi bi-circle', route: '/docs/introduction' },
        { title: 'Getting Started', icon: 'bi bi-circle', route: '/docs/getting-started' }
      ]
    }
  ]);

  filteredNavItems = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    if (!term) return this.navItems();

    return this.navItems().filter(item => {
      if (item.isHeader) return false;
      if (item.title.toLowerCase().includes(term)) return true;
      if (item.children?.some(c => c.title.toLowerCase().includes(term))) return true;
      return false;
    }).map(item => {
      if (item.children) {
        return {
          ...item,
          isOpen: true,
          children: item.children.filter(c => c.title.toLowerCase().includes(term))
        };
      }
      return item;
    });
  });

  ngOnInit(): void {
    this.updateOpenMenusForRoute(this.router.url);
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.updateOpenMenusForRoute(event.urlAfterRedirects || event.url);
        this.sidebarService.closeMobileSidebar();
      });
  }

  toggleMenu(item: NavItem, event: Event): void {
    if (item.children && item.children.length > 0) {
      event.preventDefault();
      item.isOpen = !item.isOpen;
    }
  }

  onItemClick(): void {
    this.sidebarService.closeMobileSidebar();
  }

  private updateOpenMenusForRoute(url: string): void {
    this.navItems().forEach(item => {
      if (item.children) {
        const matches = item.children.some(child => child.route && url.startsWith(child.route));
        if (matches) {
          item.isOpen = true;
        }
      }
    });
  }
}
`);

write('src/app/layouts/admin-layout/sidebar/sidebar.component.html', `
<aside class="app-sidebar bg-body-secondary shadow" data-bs-theme="dark">
  <div class="sidebar-brand">
    <a routerLink="/dashboard/v1" class="brand-link text-decoration-none">
      <img src="/assets/img/AdminLTELogo.png" alt="AdminLTE Logo" class="brand-image opacity-75 shadow" />
      <span class="brand-text fw-light">AdminLTE 4</span>
    </a>
  </div>

  <div class="sidebar-search px-3 py-2">
    <div class="input-group input-group-sm">
      <input
        type="search"
        class="form-control bg-dark text-white border-secondary"
        placeholder="Filter menu..."
        [ngModel]="searchTerm()"
        (ngModelChange)="searchTerm.set($event)"
      />
      <span class="input-group-text bg-dark border-secondary text-secondary">
        <i class="bi bi-search"></i>
      </span>
    </div>
  </div>

  <div class="sidebar-wrapper">
    <nav class="mt-2" aria-label="Main navigation">
      <ul class="nav sidebar-menu flex-column">
        @for (item of filteredNavItems(); track item.title) {
          @if (item.isHeader) {
            <li class="nav-header px-3 pt-3 pb-1 text-uppercase text-secondary fw-semibold" style="font-size: 0.75rem;">
              {{ item.title }}
            </li>
          } @else if (item.children && item.children.length > 0) {
            <li class="nav-item" [class.menu-open]="item.isOpen">
              <a
                href="#"
                class="nav-link d-flex align-items-center justify-content-between"
                [class.active]="item.isOpen"
                (click)="toggleMenu(item, $event)"
              >
                <div class="d-flex align-items-center">
                  @if (item.icon) {
                    <i class="nav-icon {{ item.icon }} me-2"></i>
                  }
                  <span>{{ item.title }}</span>
                </div>
                <div class="d-flex align-items-center">
                  @if (item.badge) {
                    <span [class]="'me-2 ' + item.badge.class">{{ item.badge.text }}</span>
                  }
                  <i class="bi bi-chevron-right nav-arrow transition-icon" [class.rotate-90]="item.isOpen"></i>
                </div>
              </a>
              @if (item.isOpen) {
                <ul class="nav nav-treeview ps-3">
                  @for (child of item.children; track child.title) {
                    <li class="nav-item">
                      <a
                        [routerLink]="child.route"
                        routerLinkActive="active"
                        [routerLinkActiveOptions]="{exact: false}"
                        class="nav-link d-flex align-items-center"
                        (click)="onItemClick()"
                      >
                        <i class="nav-icon {{ child.icon || 'bi bi-circle' }} me-2" style="font-size: 0.65rem;"></i>
                        <span>{{ child.title }}</span>
                      </a>
                    </li>
                  }
                </ul>
              }
            </li>
          } @else {
            <li class="nav-item">
              <a
                [routerLink]="item.route"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{exact: true}"
                class="nav-link d-flex align-items-center"
                (click)="onItemClick()"
              >
                @if (item.icon) {
                  <i class="nav-icon {{ item.icon }} me-2"></i>
                }
                <span>{{ item.title }}</span>
                @if (item.badge) {
                  <span [class]="'ms-auto ' + item.badge.class">{{ item.badge.text }}</span>
                }
              </a>
            </li>
          }
        }
      </ul>
    </nav>
  </div>
</aside>
`);

write('src/app/layouts/admin-layout/sidebar/sidebar.component.scss', `
.transition-icon {
  transition: transform 0.25s ease-in-out;
}
.rotate-90 {
  transform: rotate(90deg);
}
.nav-treeview {
  list-style: none;
  padding-left: 0.75rem;
}
.sidebar-wrapper {
  overflow-y: auto;
  max-height: calc(100vh - 120px);
}
`);

write('src/app/layouts/admin-layout/footer/footer.component.ts', `
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}
`);

write('src/app/layouts/admin-layout/footer/footer.component.html', `
<footer class="app-footer">
  <div class="float-end d-none d-sm-inline">
    AdminLTE 4.9.1 on Angular 19+
  </div>
  <strong>
    Copyright &copy; 2014-{{ currentYear }}&nbsp;
    <a href="https://adminlte.io" target="_blank" rel="noopener" class="text-decoration-none">AdminLTE.io</a>.
  </strong>
  All rights reserved.
</footer>
`);

write('src/app/layouts/admin-layout/admin-layout.component.ts', `
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarService } from '../../core/services/sidebar.service';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, SidebarComponent, FooterComponent],
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent {
  sidebarService = inject(SidebarService);
}
`);

write('src/app/layouts/admin-layout/admin-layout.component.html', `
<div class="app-wrapper">
  <app-header></app-header>
  <app-sidebar></app-sidebar>
  <main class="app-main">
    <router-outlet></router-outlet>
  </main>
  <app-footer></app-footer>
  @if (sidebarService.isMobileOpen()) {
    <div class="sidebar-overlay" (click)="sidebarService.closeMobileSidebar()"></div>
  }
</div>
`);

write('src/app/layouts/admin-layout/admin-layout.component.scss', `
.sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1035;
  transition: opacity 0.3s ease-in-out;
}
`);

write('src/app/layouts/auth-layout/auth-layout.component.ts', `
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: \`
    <div class="login-page bg-body-secondary d-flex flex-column justify-content-center align-items-center min-vh-100 py-4">
      <router-outlet></router-outlet>
    </div>
  \`,
  styles: [\`
    :host {
      display: block;
      width: 100%;
      min-height: 100vh;
    }
  \`]
})
export class AuthLayoutComponent {}
`);

console.log('Part 1 completed.');

