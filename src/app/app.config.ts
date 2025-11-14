import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
  importProvidersFrom,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpToastInterceptor } from './core/interceptors/toastService';
import { ToastService } from './components/toast/service/toast.service';
import { provideClientHydration } from '@angular/platform-browser';
import { JwtInterceptor } from './core/interceptors/jwt.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([JwtInterceptor])),
    importProvidersFrom(FormsModule, ReactiveFormsModule),
    provideHttpClient(withInterceptors([HttpToastInterceptor])),
    ToastService,
  ],
};

export const API_URL = { baseUrl: 'http://localhost:8080' };
