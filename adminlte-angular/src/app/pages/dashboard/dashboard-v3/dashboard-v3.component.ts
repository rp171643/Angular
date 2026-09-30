import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import ApexCharts from 'apexcharts';

@Component({
  selector: 'app-dashboard-v3',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-v3.component.html'
})
export class DashboardV3Component implements AfterViewInit, OnDestroy {
  private charts: ApexCharts[] = [];

  ngAfterViewInit(): void {
    if (typeof window === 'undefined') return;

    // Visitors Chart
    const visitorsEl = document.querySelector<HTMLElement>('#visitors-chart');
    if (visitorsEl) {
      const visitorsChart = new ApexCharts(visitorsEl, {
        series: [
          { name: 'High - 2023', data: [100, 120, 170, 167, 180, 177, 160] },
          { name: 'Low - 2023', data: [60, 80, 70, 67, 80, 77, 100] }
        ],
        chart: {
          id: 'visitors-chart',
          height: 200,
          type: 'line',
          toolbar: { show: false }
        },
        colors: ['#0d6efd', '#adb5bd'],
        stroke: { curve: 'smooth' },
        grid: {
          borderColor: '#e7e7e7',
          row: { colors: ['#f3f3f3', 'transparent'], opacity: 0.5 }
        },
        legend: { show: false },
        markers: { size: 1 },
        xaxis: { categories: ['22th', '23th', '24th', '25th', '26th', '27th', '28th'] }
      });
      visitorsChart.render();
      this.charts.push(visitorsChart);
    }

    // Sales Bar Chart
    const salesEl = document.querySelector<HTMLElement>('#sales-chart');
    if (salesEl) {
      const salesChart = new ApexCharts(salesEl, {
        series: [
          { name: 'Net Profit', data: [44, 55, 57, 56, 61, 58, 63, 60, 66] },
          { name: 'Revenue', data: [76, 85, 101, 98, 87, 105, 91, 114, 94] },
          { name: 'Free Cash Flow', data: [35, 41, 36, 26, 45, 48, 52, 53, 41] }
        ],
        chart: {
          id: 'sales-chart',
          type: 'bar',
          height: 200,
          toolbar: { show: false }
        },
        plotOptions: {
          bar: { horizontal: false, columnWidth: '55%', borderRadius: 2 }
        },
        legend: { show: false },
        colors: ['#0d6efd', '#20c997', '#ffc107'],
        dataLabels: { enabled: false },
        stroke: { show: true, width: 2, colors: ['transparent'] },
        xaxis: { categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'] },
        fill: { opacity: 1 },
        tooltip: {
          y: {
            formatter: (val: number) => '$ ' + val + ' thousands'
          }
        }
      });
      salesChart.render();
      this.charts.push(salesChart);
    }
  }

  ngOnDestroy(): void {
    this.charts.forEach(c => c.destroy());
    this.charts = [];
  }
}
