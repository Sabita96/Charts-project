import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ChartService } from './service/chart/chart.service';
import {  HttpClientModule } from '@angular/common/http';
import { HttpService } from './service/http/http.service';
import { LoaderComponent } from './components/loader/loader.component';
import { LoaderService } from './service/loader/loader.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ChartComponent } from './components/chart/chart.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HttpClientModule,
    LoaderComponent,
    NavbarComponent,
    ChartComponent,
  ],

  providers: [
    HttpService,
    ChartService
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {

  constructor(public loaderService: LoaderService) {}

  ngOnInit(): void {}
}
