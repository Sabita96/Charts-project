import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexTitleSubtitle,
  ApexChart,
  ApexPlotOptions,
  ApexDataLabels,
  ApexStroke,
  ApexXAxis,
  NgApexchartsModule
} from 'ng-apexcharts';
import { ChartService } from 'src/app/service/chart/chart.service';
import { LoaderService } from 'src/app/service/loader/loader.service';
export type ChartOptions = {
  series: ApexAxisChartSeries;
  title: ApexTitleSubtitle;
  chart: ApexChart;
  plotOptions: ApexPlotOptions;
  dataLabels: ApexDataLabels;
  stroke: ApexStroke;
  xaxis: ApexXAxis;
};
interface PdfResponse {
  pdfUrl: string;
  // Add any other properties if needed
}
@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [
    NgApexchartsModule,
    NgIf
  ],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css',
})
export class ChartComponent {
  docDefinition: any;
  showLoader: boolean = false;
  chartOptions: ChartOptions | undefined;

  constructor(
    private chartService: ChartService,
    private loaderService: LoaderService
  ) { }

  ngOnInit(): void {

    this.loaderService.showLoader();
    this.chartService.readExcel().subscribe((res: any) => {
      this.chartOptions = {
        series: res.chartData.series,
        chart: {
          type: 'bar',
          height: 400,
          background: 'azure',
        },
        plotOptions: {
          bar: {
            horizontal: false,
            dataLabels: {
              position: 'top',
            },
          },
        },
        dataLabels: {
          enabled: true,
          offsetX: -6,
          style: {
            fontSize: '12px',
            colors: ['#fff'],
          },
        },
        stroke: {
          show: true,
          width: 1,
          colors: ['#fff'],
        },
        xaxis: {
          categories: res.chartData.categories,
        },
        title: {
          text: 'Test chart',
        },


      };
      this.loaderService.hideLoader();

    });
  }
  downloadExcelFile() {
    this.loaderService.showLoader();

    this.chartService.downloadExcel().subscribe((res: Blob) => {
      const link = document.createElement('a');
      const blobUrl = window.URL.createObjectURL(res);
      link.href = blobUrl;
      link.download = 'chartData.xlsx';
      document.body.appendChild(link);
      link.click();
      this.loaderService.hideLoader();

    });
  }

  downloadPDFFile() {
    this.loaderService.showLoader();

    this.chartService.downloadPDF()
      .subscribe({
        next: ((res: PdfResponse) => {
          this.loaderService.hideLoader();

          console.log(res, 'res');
          const link = document.createElement('a');
          link.href = res.pdfUrl;
          link.target = '_blank';
          link.download = 'chart.png';
          link.click();

        }),
        error: ((error: any) => {
          console.error('Error downloading PDF:', error);
          this.loaderService.hideLoader();
        })
      })
  }
}
