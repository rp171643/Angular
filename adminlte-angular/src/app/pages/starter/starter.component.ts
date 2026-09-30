import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-starter',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="app-content-header">
      <div class="container-fluid">
        <div class="row align-items-center">
          <div class="col-sm-6"><h1 class="mb-0 fs-3">Starter Page</h1></div>
          <div class="col-sm-6">
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb float-sm-end mb-0">
                <li class="breadcrumb-item"><a routerLink="/dashboard/v1">Home</a></li>
                <li class="breadcrumb-item active" aria-current="page">Starter</li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
    </div>
    <div class="app-content">
      <div class="container-fluid">
        <div class="card shadow-sm mb-4">
          <div class="card-body">
            <h5 class="card-title fw-bold">Starter Template</h5>
            <p class="card-text text-secondary mt-2">Use this starter page to build your custom modules.</p>
          </div>
        </div>
      </div>
    </div>
  `
})
export class StarterComponent {}
