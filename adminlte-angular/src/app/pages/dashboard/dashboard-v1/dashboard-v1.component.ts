import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import ApexCharts from 'apexcharts';
import jsVectorMap from 'jsvectormap';
import 'jsvectormap/dist/maps/world.js';

@Component({
  selector: 'app-dashboard-v1',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-v1.component.html'
})
export class DashboardV1Component implements AfterViewInit, OnDestroy {
  private charts: ApexCharts[] = [];
  private mapInstance: any = null;

  ngAfterViewInit(): void {
    if (typeof window === 'undefined') return;

    // Revenue chart
    const revenueEl = document.querySelector<HTMLElement>('#revenue-chart');
    if (revenueEl) {
      const revenueChart = new ApexCharts(revenueEl, {
        series: [
          { name: 'Digital Goods', data: [28, 48, 40, 19, 86, 27, 90] },
          { name: 'Electronics', data: [65, 59, 80, 81, 56, 55, 40] }
        ],
        chart: {
          id: 'revenue-chart',
          height: 300,
          type: 'area',
          toolbar: { show: false }
        },
        legend: { show: false },
        colors: ['#0d6efd', '#20c997'],
        dataLabels: { enabled: false },
        stroke: { curve: 'smooth' },
        xaxis: {
          type: 'datetime',
          categories: [
            '2023-01-01',
            '2023-02-01',
            '2023-03-01',
            '2023-04-01',
            '2023-05-01',
            '2023-06-01',
            '2023-07-01'
          ]
        },
        tooltip: { x: { format: 'MMMM yyyy' } }
      });
      revenueChart.render();
      this.charts.push(revenueChart);
    }

    // World Map (Sales Value)
    const mapEl = document.querySelector<HTMLElement>('#world-map');
    if (mapEl) {
      try {
        this.mapInstance = new jsVectorMap({
          selector: '#world-map',
          map: 'world',
        });
      } catch (e) {
        console.warn('Could not initialize jsVectorMap:', e);
      }
    }

    // Sparklines
    const spark1El = document.querySelector<HTMLElement>('#sparkline-1');
    if (spark1El) {
      const s1 = new ApexCharts(spark1El, {
        series: [{ data: [1000, 1200, 920, 927, 931, 1027, 819, 930, 1021] }],
        chart: { id: 'sparkline-1', type: 'area', height: 50, sparkline: { enabled: true } },
        stroke: { curve: 'straight' },
        fill: { opacity: 0.3 },
        yaxis: { min: 0 },
        colors: ['#DCE6EC']
      });
      s1.render();
      this.charts.push(s1);
    }

    const spark2El = document.querySelector<HTMLElement>('#sparkline-2');
    if (spark2El) {
      const s2 = new ApexCharts(spark2El, {
        series: [{ data: [515, 519, 520, 522, 652, 810, 370, 627, 319, 630, 921] }],
        chart: { id: 'sparkline-2', type: 'area', height: 50, sparkline: { enabled: true } },
        stroke: { curve: 'straight' },
        fill: { opacity: 0.3 },
        yaxis: { min: 0 },
        colors: ['#DCE6EC']
      });
      s2.render();
      this.charts.push(s2);
    }

    const spark3El = document.querySelector<HTMLElement>('#sparkline-3');
    if (spark3El) {
      const s3 = new ApexCharts(spark3El, {
        series: [{ data: [15, 19, 20, 22, 33, 27, 31, 27, 19, 30, 21] }],
        chart: { id: 'sparkline-3', type: 'area', height: 50, sparkline: { enabled: true } },
        stroke: { curve: 'straight' },
        fill: { opacity: 0.3 },
        yaxis: { min: 0 },
        colors: ['#DCE6EC']
      });
      s3.render();
      this.charts.push(s3);
    }
  }

  ngOnDestroy(): void {
    this.charts.forEach(c => c.destroy());
    this.charts = [];
    if (this.mapInstance && typeof this.mapInstance.destroy === 'function') {
      this.mapInstance.destroy();
    }
  }
}
