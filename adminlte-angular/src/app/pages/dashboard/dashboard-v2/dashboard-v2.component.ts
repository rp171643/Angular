import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import ApexCharts from 'apexcharts';

@Component({
  selector: 'app-dashboard-v2',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-v2.component.html'
})
export class DashboardV2Component implements AfterViewInit, OnDestroy {
  private charts: ApexCharts[] = [];

  ngAfterViewInit(): void {
    if (typeof window === 'undefined') return;

    // Monthly Sales Chart
    const salesEl = document.querySelector<HTMLElement>('#sales-chart');
    if (salesEl) {
      const salesChart = new ApexCharts(salesEl, {
        series: [
          { name: 'Digital Goods', data: [28, 48, 40, 19, 86, 27, 90] },
          { name: 'Electronics', data: [65, 59, 80, 81, 56, 55, 40] }
        ],
        chart: {
          id: 'sales-chart',
          height: 180,
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
      salesChart.render();
      this.charts.push(salesChart);
    }

    // Sparklines 1 to 7
    const sparkData = [
      [25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54],
      [12, 56, 21, 39, 73, 45, 64, 52, 36, 59, 44],
      [15, 46, 21, 59, 33, 15, 34, 42, 56, 19, 64],
      [30, 56, 31, 69, 43, 35, 24, 32, 46, 29, 64],
      [20, 76, 51, 79, 53, 35, 54, 22, 36, 49, 64],
      [5, 36, 11, 69, 23, 15, 14, 42, 26, 19, 44],
      [12, 56, 21, 39, 73, 45, 64, 52, 36, 59, 74]
    ];

    sparkData.forEach((data, index) => {
      const el = document.querySelector<HTMLElement>(`#table-sparkline-${index + 1}`);
      if (el) {
        const sc = new ApexCharts(el, {
          series: [{ data }],
          chart: {
            id: `table-sparkline-${index + 1}`,
            type: 'line',
            width: 150,
            height: 30,
            sparkline: { enabled: true }
          },
          colors: ['#0d6efd'],
          stroke: { width: 2 },
          tooltip: { enabled: false }
        });
        sc.render();
        this.charts.push(sc);
      }
    });

    // Pie chart (Browser Usage Donut)
    const pieEl = document.querySelector<HTMLElement>('#pie-chart');
    if (pieEl) {
      const pieChart = new ApexCharts(pieEl, {
        series: [700, 500, 400, 600, 300, 100],
        chart: { id: 'pie-chart', type: 'donut', height: 350 },
        labels: ['Chrome', 'Edge', 'FireFox', 'Safari', 'Opera', 'IE'],
        dataLabels: { enabled: false },
        colors: ['#0d6efd', '#20c997', '#ffc107', '#d63384', '#6f42c1', '#adb5bd']
      });
      pieChart.render();
      this.charts.push(pieChart);
    }
  }

  ngOnDestroy(): void {
    this.charts.forEach(c => c.destroy());
    this.charts = [];
  }
}
