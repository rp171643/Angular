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
      icon: 'bi bi-speedometer',
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
      title: 'Theme Generate',
      icon: 'bi bi-palette',
      route: '/generate/theme'
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
      title: 'Layout Options',
      icon: 'bi bi-clipboard-fill',
      badge: { text: '12', class: 'text-bg-secondary me-3' },
      isOpen: false,
      children: [
        { title: 'Default Sidebar', icon: 'bi bi-circle', route: '/layout/unfixed-sidebar' },
        { title: 'Fixed Sidebar', icon: 'bi bi-circle', route: '/layout/fixed-sidebar' },
        { title: 'Fixed Header', icon: 'bi bi-circle', route: '/layout/fixed-header' },
        { title: 'Fixed Footer', icon: 'bi bi-circle', route: '/layout/fixed-footer' },
        { title: 'Fixed Complete', icon: 'bi bi-circle', route: '/layout/fixed-complete' },
        { title: 'Layout + Custom Area', icon: 'bi bi-circle', route: '/layout/layout-custom-area' },
        { title: 'Sidebar Mini', icon: 'bi bi-circle', route: '/layout/sidebar-mini' },
        { title: 'Sidebar Mini + Collapsed', icon: 'bi bi-circle', route: '/layout/collapsed-sidebar' },
        { title: 'Sidebar Mini + Collapsed + No Hover', icon: 'bi bi-circle', route: '/layout/collapsed-sidebar-without-hover' },
        { title: 'Sidebar Mini + Logo Switch', icon: 'bi bi-circle', route: '/layout/logo-switch' },
        { title: 'Top Nav + No Sidebar', icon: 'bi bi-circle', route: '/layout/top-nav' },
        { title: 'Layout RTL', icon: 'bi bi-circle', route: '/layout/layout-rtl' }
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
      icon: 'bi bi-envelope',
      isOpen: false,
      children: [
        { title: 'Inbox', icon: 'bi bi-circle', route: '/mailbox/inbox' },
        { title: 'Read Message', icon: 'bi bi-circle', route: '/mailbox/read' },
        { title: 'Compose', icon: 'bi bi-circle', route: '/mailbox/compose' }
      ]
    },
    {
      title: 'Forms',
      icon: 'bi bi-pencil-square',
      isOpen: false,
      children: [
        { title: 'Elements', icon: 'bi bi-circle', route: '/forms/elements' },
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
        { title: 'Search Results', icon: 'bi bi-circle', route: '/pages/search-results' },
        { title: 'Pricing', icon: 'bi bi-circle', route: '/pages/pricing' },
        { title: 'FAQ', icon: 'bi bi-circle', route: '/pages/faq' },
        {
          title: 'Error',
          icon: 'bi bi-circle',
          isOpen: false,
          children: [
            { title: '404', icon: 'bi bi-circle', route: '/pages/404' },
            { title: '500', icon: 'bi bi-circle', route: '/pages/500' },
            { title: 'Maintenance', icon: 'bi bi-circle', route: '/pages/maintenance' }
          ]
        }
      ]
    },
    {
      title: 'Users',
      icon: 'bi bi-people',
      route: '/users'
    },
    {
      title: 'EXAMPLES',
      isHeader: true
    },
    {
      title: 'Auth',
      icon: 'bi bi-box-arrow-in-right',
      isOpen: false,
      children: [
        {
          title: 'Version 1',
          icon: 'bi bi-box-arrow-in-right',
          isOpen: false,
          children: [
            { title: 'Login', icon: 'bi bi-circle', route: '/auth/login' },
            { title: 'Register', icon: 'bi bi-circle', route: '/auth/register' },
            { title: 'Forgot Password', icon: 'bi bi-circle', route: '/auth/forgot-password' }
          ]
        },
        {
          title: 'Version 2',
          icon: 'bi bi-box-arrow-in-right',
          isOpen: false,
          children: [
            { title: 'Login', icon: 'bi bi-circle', route: '/auth/login-v2' },
            { title: 'Register', icon: 'bi bi-circle', route: '/auth/register-v2' }
          ]
        },
        { title: 'Lockscreen', icon: 'bi bi-circle', route: '/auth/lockscreen' }
      ]
    },
    {
      title: 'MULTI LEVEL EXAMPLE',
      isHeader: true
    },
    {
      title: 'Level 1',
      icon: 'bi bi-circle-fill',
      route: '#'
    },
    {
      title: 'Level 1',
      icon: 'bi bi-circle-fill',
      isOpen: false,
      children: [
        { title: 'Level 2', icon: 'bi bi-circle', route: '#' },
        {
          title: 'Level 2',
          icon: 'bi bi-circle',
          isOpen: false,
          children: [
            { title: 'Level 3', icon: 'bi bi-record-circle-fill', route: '#' },
            { title: 'Level 3', icon: 'bi bi-record-circle-fill', route: '#' },
            { title: 'Level 3', icon: 'bi bi-record-circle-fill', route: '#' }
          ]
        },
        { title: 'Level 2', icon: 'bi bi-circle', route: '#' }
      ]
    },
    {
      title: 'Level 1',
      icon: 'bi bi-circle-fill',
      route: '#'
    },
    {
      title: 'LABELS',
      isHeader: true
    },
    {
      title: 'Important',
      icon: 'bi bi-circle text-danger',
      route: '#'
    },
    {
      title: 'Warning',
      icon: 'bi bi-circle text-warning',
      route: '#'
    },
    {
      title: 'Informational',
      icon: 'bi bi-circle text-info',
      route: '#'
    }
  ]);

  filteredNavItems = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    if (!term) return this.navItems();

    const matchesSearch = (item: NavItem): boolean => {
      if (item.isHeader) return false;
      if (item.title.toLowerCase().includes(term)) return true;
      if (item.children?.some(c => matchesSearch(c))) return true;
      return false;
    };

    const filterItem = (item: NavItem): NavItem => {
      if (item.children) {
        return {
          ...item,
          isOpen: true,
          children: item.children.filter(c => matchesSearch(c)).map(c => filterItem(c))
        };
      }
      return item;
    };

    return this.navItems()
      .filter(item => matchesSearch(item))
      .map(item => filterItem(item));
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
      this.navItems.update(items => [...items]);
    }
  }

  onItemClick(): void {
    this.sidebarService.closeMobileSidebar();
  }

  private updateOpenMenusForRoute(url: string): void {
    const checkItem = (item: NavItem): boolean => {
      if (item.children) {
        let hasMatch = false;
        for (const child of item.children) {
          if (child.route && child.route !== '#' && url.startsWith(child.route)) {
            hasMatch = true;
          }
          if (checkItem(child)) {
            child.isOpen = true;
            hasMatch = true;
          }
        }
        if (hasMatch) {
          item.isOpen = true;
        }
        return hasMatch;
      }
      return false;
    };

    this.navItems().forEach(item => checkItem(item));
  }
}

