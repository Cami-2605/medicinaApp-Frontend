import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
  importProvidersFrom,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpToastInterceptor } from './core/interceptors/toastService';
import { JwtInterceptor } from './core/interceptors/jwt.interceptor';
import { ToastService } from './components/toast/service/toast.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([JwtInterceptor, HttpToastInterceptor])),

    importProvidersFrom(FormsModule, ReactiveFormsModule),
    ToastService,
  ],
};

export const API_URL = { baseUrl: 'https://medicinaapp.onrender.com' };
