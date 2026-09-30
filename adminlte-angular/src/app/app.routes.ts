import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

export const routes: Routes = [
  // Admin Layout Routes
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard/v1', pathMatch: 'full' },
      // Dashboards
      {
        path: 'dashboard/v1',
        loadComponent: () => import('./pages/dashboard/dashboard-v1/dashboard-v1.component').then(m => m.DashboardV1Component)
      },
      {
        path: 'dashboard/v2',
        loadComponent: () => import('./pages/dashboard/dashboard-v2/dashboard-v2.component').then(m => m.DashboardV2Component)
      },
      {
        path: 'dashboard/v3',
        loadComponent: () => import('./pages/dashboard/dashboard-v3/dashboard-v3.component').then(m => m.DashboardV3Component)
      },
      // Starter
      {
        path: 'pages/starter',
        loadComponent: () => import('./pages/starter/starter.component').then(m => m.StarterComponent)
      },
      // Theme Generate
      {
        path: 'generate/theme',
        loadComponent: () => import('./pages/generate/theme/theme.component').then(m => m.ThemeComponent)
      },
      // Widgets
      {
        path: 'widgets/small-box',
        loadComponent: () => import('./pages/widgets/small-box/small-box.component').then(m => m.SmallBoxComponent)
      },
      {
        path: 'widgets/info-box',
        loadComponent: () => import('./pages/widgets/info-box/info-box.component').then(m => m.InfoBoxComponent)
      },
      {
        path: 'widgets/cards',
        loadComponent: () => import('./pages/widgets/cards/cards.component').then(m => m.CardsComponent)
      },
      {
        path: 'widgets/social',
        loadComponent: () => import('./pages/widgets/social/social.component').then(m => m.SocialComponent)
      },
      // Layout Options
      {
        path: 'layout',
        redirectTo: 'layout/fixed-sidebar',
        pathMatch: 'full'
      },
      {
        path: 'layout/:variant',
        loadComponent: () => import('./pages/layout/layout.component').then(m => m.LayoutComponent)
      },
      // UI Elements
      {
        path: 'ui/general',
        loadComponent: () => import('./pages/ui/general/general.component').then(m => m.GeneralUiComponent)
      },
      {
        path: 'ui/icons',
        loadComponent: () => import('./pages/ui/icons/icons.component').then(m => m.IconsComponent)
      },
      {
        path: 'ui/timeline',
        loadComponent: () => import('./pages/ui/timeline/timeline.component').then(m => m.TimelineComponent)
      },
      {
        path: 'ui/ribbons',
        loadComponent: () => import('./pages/ui/ribbons/ribbons.component').then(m => m.RibbonsComponent)
      },
      {
        path: 'ui/colors',
        loadComponent: () => import('./pages/ui/colors/colors.component').then(m => m.ColorsComponent)
      },
      // Forms
      {
        path: 'forms/elements',
        loadComponent: () => import('./pages/forms/elements/elements.component').then(m => m.FormElementsComponent)
      },
      {
        path: 'forms/layout',
        loadComponent: () => import('./pages/forms/layout/layout.component').then(m => m.FormLayoutComponent)
      },
      {
        path: 'forms/validation',
        loadComponent: () => import('./pages/forms/validation/validation.component').then(m => m.FormValidationComponent)
      },
      {
        path: 'forms/wizard',
        loadComponent: () => import('./pages/forms/wizard/wizard.component').then(m => m.FormWizardComponent)
      },
      {
        path: 'forms/advanced',
        loadComponent: () => import('./pages/forms/advanced/advanced.component').then(m => m.FormAdvancedComponent)
      },
      {
        path: 'forms/editors',
        loadComponent: () => import('./pages/forms/editors/editors.component').then(m => m.FormEditorsComponent)
      },
      // Tables
      {
        path: 'tables/simple',
        loadComponent: () => import('./pages/tables/simple/simple.component').then(m => m.SimpleTablesComponent)
      },
      {
        path: 'tables/data',
        loadComponent: () => import('./pages/tables/data/data.component').then(m => m.DataTablesComponent)
      },
      // Charts
      {
        path: 'charts/apexcharts',
        loadComponent: () => import('./pages/charts/apexcharts/apexcharts.component').then(m => m.ApexchartsComponent)
      },
      // Mailbox
      {
        path: 'mailbox/inbox',
        loadComponent: () => import('./pages/mailbox/inbox/inbox.component').then(m => m.InboxComponent)
      },
      {
        path: 'mailbox/compose',
        loadComponent: () => import('./pages/mailbox/compose/compose.component').then(m => m.ComposeComponent)
      },
      {
        path: 'mailbox/read',
        loadComponent: () => import('./pages/mailbox/read/read.component').then(m => m.ReadComponent)
      },
      // Pages
      {
        path: 'pages/profile',
        loadComponent: () => import('./pages/pages/profile/profile.component').then(m => m.ProfileComponent)
      },
      {
        path: 'pages/settings',
        loadComponent: () => import('./pages/pages/settings/settings.component').then(m => m.SettingsComponent)
      },
      {
        path: 'pages/invoice',
        loadComponent: () => import('./pages/pages/invoice/invoice.component').then(m => m.InvoiceComponent)
      },
      {
        path: 'pages/calendar',
        loadComponent: () => import('./pages/pages/calendar/calendar.component').then(m => m.CalendarComponent)
      },
      {
        path: 'pages/kanban',
        loadComponent: () => import('./pages/pages/kanban/kanban.component').then(m => m.KanbanComponent)
      },
      {
        path: 'pages/chat',
        loadComponent: () => import('./pages/pages/chat/chat.component').then(m => m.ChatComponent)
      },
      {
        path: 'pages/file-manager',
        loadComponent: () => import('./pages/pages/file-manager/file-manager.component').then(m => m.FileManagerComponent)
      },
      {
        path: 'pages/projects',
        loadComponent: () => import('./pages/pages/projects/projects.component').then(m => m.ProjectsComponent)
      },
      {
        path: 'pages/gallery',
        loadComponent: () => import('./pages/pages/gallery/gallery.component').then(m => m.GalleryComponent)
      },
      {
        path: 'pages/pricing',
        loadComponent: () => import('./pages/pages/pricing/pricing.component').then(m => m.PricingComponent)
      },
      {
        path: 'pages/faq',
        loadComponent: () => import('./pages/pages/faq/faq.component').then(m => m.FaqComponent)
      },
      {
        path: 'pages/search-results',
        loadComponent: () => import('./pages/pages/search-results/search-results.component').then(m => m.SearchResultsComponent)
      },
      {
        path: 'pages/404',
        loadComponent: () => import('./pages/pages/page-404/page-404.component').then(m => m.Page404Component)
      },
      {
        path: 'pages/500',
        loadComponent: () => import('./pages/pages/page-500/page-500.component').then(m => m.Page500Component)
      },
      {
        path: 'pages/maintenance',
        loadComponent: () => import('./pages/pages/maintenance/maintenance.component').then(m => m.MaintenanceComponent)
      },
      // Users
      {
        path: 'users',
        loadComponent: () => import('./pages/users/users.component').then(m => m.UsersComponent)
      },
      // Docs
      {
        path: 'docs/introduction',
        loadComponent: () => import('./pages/docs/introduction/introduction.component').then(m => m.DocsIntroductionComponent)
      },
      {
        path: 'docs/getting-started',
        loadComponent: () => import('./pages/docs/getting-started/getting-started.component').then(m => m.DocsGettingStartedComponent)
      }
    ]
  },
  // Auth Layout Routes
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        loadComponent: () => import('./pages/auth/login/login.component').then(m => m.LoginComponent)
      },
      {
        path: 'login-v2',
        loadComponent: () => import('./pages/auth/login-v2/login-v2.component').then(m => m.LoginV2Component)
      },
      {
        path: 'register',
        loadComponent: () => import('./pages/auth/register/register.component').then(m => m.RegisterComponent)
      },
      {
        path: 'register-v2',
        loadComponent: () => import('./pages/auth/register-v2/register-v2.component').then(m => m.RegisterV2Component)
      },
      {
        path: 'forgot-password',
        loadComponent: () => import('./pages/auth/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent)
      },
      {
        path: 'lockscreen',
        loadComponent: () => import('./pages/auth/lockscreen/lockscreen.component').then(m => m.LockscreenComponent)
      }
    ]
  },
  // Catch-all
  { path: '**', redirectTo: 'pages/404' }
];
