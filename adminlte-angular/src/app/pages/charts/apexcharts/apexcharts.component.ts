import { Component, AfterViewInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import ApexCharts from 'apexcharts';

@Component({
  selector: 'app-apexcharts',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="app-content-header"><div class="container-fluid"><h1 class="mb-0 fs-3">ApexCharts</h1></div></div>
    <div class="app-content"><div class="container-fluid"><div class="card p-4 shadow-sm"><div #areaChart></div></div></div></div>
  `
})
export class ApexchartsComponent implements AfterViewInit, OnDestroy {
  @ViewChild('areaChart') areaChartRef!: ElementRef;
  private charts: ApexCharts[] = [];
  ngAfterViewInit(): void {
    if (this.areaChartRef?.nativeElement) {
      const c = new ApexCharts(this.areaChartRef.nativeElement, {
        series: [{ name: 'Data', data: [10, 41, 35, 51, 49, 62, 69] }],
        chart: { height: 260, type: 'area' }
      } as any);
      c.render();
      this.charts.push(c);
    }
  }
  ngOnDestroy(): void {
    this.charts.forEach(c => c.destroy());
  }
}
