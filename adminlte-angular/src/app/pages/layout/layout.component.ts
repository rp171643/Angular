import { Component, inject, computed, signal, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SidebarService } from '../../core/services/sidebar.service';
import { Subscription } from 'rxjs';

interface LayoutDetail {
  slug: string;
  title: string;
  headline: string;
  description: string;
  classes: string;
  codeSnippet: string;
  features: string[];
}

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './layout.component.html'
})
export class LayoutComponent implements OnInit, OnDestroy {
  sidebarService = inject(SidebarService);
  private route = inject(ActivatedRoute);
  private sub?: Subscription;

  currentSlug = signal<string>('fixed-sidebar');
  isCardCollapsed = false;
  isCardRemoved = false;
  isRtl = false;

  readonly allLayouts: LayoutDetail[] = [
    {
      slug: 'unfixed-sidebar',
      title: 'Default Sidebar',
      headline: 'Unfixed (Scrollable) Sidebar Layout',
      description: 'The standard layout without a locked position for the sidebar, scrolling with the document flow.',
      classes: 'layout-unfixed',
      codeSnippet: '<body class="sidebar-expand-lg bg-body-tertiary">',
      features: ['Natural document flow', 'Sidebar scrolls with page', 'Lightweight memory footprint']
    },
    {
      slug: 'fixed-sidebar',
      title: 'Fixed Sidebar',
      headline: 'Fixed Sidebar Layout',
      description: 'The sidebar remains docked and fixed to the left while only the main content viewport scrolls.',
      classes: 'layout-fixed',
      codeSnippet: '<body class="layout-fixed sidebar-expand-lg bg-body-tertiary">',
      features: ['Sidebar stays in view', 'Independent sidebar scrolling via OverlayScrollbars', 'AdminLTE v4 standard default']
    },
    {
      slug: 'fixed-header',
      title: 'Fixed Header',
      headline: 'Fixed Header (Navbar) Layout',
      description: 'The top navigation header remains pinned to the top of the viewport at all times.',
      classes: 'layout-fixed-header',
      codeSnippet: '<body class="layout-fixed-header sidebar-expand-lg bg-body-tertiary">',
      features: ['Navbar pinned to top', 'Always visible search and user notifications', 'Smooth scroll underneath header']
    },
    {
      slug: 'fixed-footer',
      title: 'Fixed Footer',
      headline: 'Fixed Bottom Footer Layout',
      description: 'The footer remains docked to the bottom of the viewport with content scrolling above it.',
      classes: 'layout-fixed-footer',
      codeSnippet: '<body class="layout-fixed-footer sidebar-expand-lg bg-body-tertiary">',
      features: ['Footer always in view', 'Sticky copyright & version bar', 'Clean app boundary']
    },
    {
      slug: 'fixed-complete',
      title: 'Fixed Complete',
      headline: 'Fixed Complete (Header, Sidebar & Footer)',
      description: 'All outer frame elements (Navbar, Sidebar, and Footer) are pinned, creating an app-like frame.',
      classes: 'layout-fixed layout-fixed-header layout-fixed-footer',
      codeSnippet: '<body class="layout-fixed layout-fixed-header layout-fixed-footer sidebar-expand-lg">',
      features: ['Full desktop app feel', 'Zero outer window bouncing', 'Independent scrolling main region']
    },
    {
      slug: 'layout-custom-area',
      title: 'Layout + Custom Area',
      headline: 'Layout with Custom Injection Area',
      description: 'Provides customizable slots and areas across the layout grid for banners, alerts, or sub-headers.',
      classes: 'layout-custom-area',
      codeSnippet: '<div class="app-wrapper"><div class="app-custom-area">...</div>...</div>',
      features: ['System-wide announcement banners', 'Dynamic breadcrumbs slot', 'Modular header extensions']
    },
    {
      slug: 'sidebar-mini',
      title: 'Sidebar Mini',
      headline: 'Sidebar Mini (Icon-Only Mode)',
      description: 'When collapsed, the sidebar narrows down to an icon-only strip displaying glyphs.',
      classes: 'sidebar-mini',
      codeSnippet: '<body class="sidebar-mini sidebar-expand-lg bg-body-tertiary">',
      features: ['Compact screen space saver', 'Quick access via top-level icons', 'Expands on toggle']
    },
    {
      slug: 'collapsed-sidebar',
      title: 'Sidebar Mini + Collapsed',
      headline: 'Sidebar Mini in Initially Collapsed State',
      description: 'Starts collapsed into icon mode by default on page load.',
      classes: 'sidebar-mini sidebar-collapse',
      codeSnippet: '<body class="sidebar-mini sidebar-collapse sidebar-expand-lg bg-body-tertiary">',
      features: ['Maximum screen estate for dashboards', 'Expandable on click or hover sensor', 'Icon-only navigation']
    },
    {
      slug: 'collapsed-sidebar-without-hover',
      title: 'Sidebar Mini + Collapsed + No Hover',
      headline: 'Sidebar Mini Collapsed without Hover Reveal',
      description: 'Collapsed sidebar that requires an explicit button click to expand, ignoring mouse hover.',
      classes: 'sidebar-mini sidebar-collapse sidebar-no-hover',
      codeSnippet: '<body class="sidebar-mini sidebar-collapse sidebar-no-hover bg-body-tertiary">',
      features: ['Prevent accidental mouse expansions', 'Touch-friendly interface', 'Strict manual toggle']
    },
    {
      slug: 'logo-switch',
      title: 'Sidebar Mini + Logo Switch',
      headline: 'Sidebar Mini with Responsive Brand Logo Switch',
      description: 'Switches between full logo text and small brand emblem depending on sidebar state.',
      classes: 'sidebar-mini logo-switch',
      codeSnippet: '<img class="brand-image-xl" ... /><img class="brand-image-xs" ... />',
      features: ['Compact icon logo when collapsed', 'Full branding logo when expanded', 'Seamless CSS animation']
    },
    {
      slug: 'top-nav',
      title: 'Top Nav + No Sidebar',
      headline: 'Top Navigation Only Layout',
      description: 'Sidebar is completely hidden, and all navigation links reside in the top navbar.',
      classes: 'layout-top-nav',
      codeSnippet: '<body class="layout-top-nav bg-body-tertiary">',
      features: ['Full width screen for content', 'Classic horizontal portal menu', 'No sidebar drawer required']
    },
    {
      slug: 'layout-rtl',
      title: 'Layout RTL',
      headline: 'Right-To-Left (RTL) Layout',
      description: 'Full bidirectional support for Arabic, Hebrew, and Persian languages.',
      classes: 'dir="rtl"',
      codeSnippet: '<html dir="rtl" lang="ar"><body class="sidebar-expand-lg bg-body-tertiary">',
      features: ['Sidebar docked to the right', 'Reversed margin & padding utilities', 'Right-aligned typography']
    }
  ];

  currentLayout = computed(() => {
    const slug = this.currentSlug();
    return this.allLayouts.find(l => l.slug === slug) || this.allLayouts[1];
  });

  ngOnInit(): void {
    this.sub = this.route.url.subscribe(segments => {
      if (segments.length > 0) {
        const path = segments[segments.length - 1].path;
        if (this.allLayouts.some(l => l.slug === path)) {
          this.currentSlug.set(path);
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
    if (this.isRtl) {
      document.documentElement.removeAttribute('dir');
    }
  }

  toggleCollapse(): void {
    this.isCardCollapsed = !this.isCardCollapsed;
  }

  removeCard(): void {
    this.isCardRemoved = true;
  }

  toggleRtl(): void {
    this.isRtl = !this.isRtl;
    if (this.isRtl) {
      document.documentElement.setAttribute('dir', 'rtl');
    } else {
      document.documentElement.removeAttribute('dir');
    }
  }
}

