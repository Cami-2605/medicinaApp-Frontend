import { Component, Inject, PLATFORM_ID, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Toast } from './components/toast/toast';
import { CommonModule } from '@angular/common';
import { Router } from 'express';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Toast, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  constructor(@Inject(PLATFORM_ID) private platformId: Object, private router: Router) {}
}
