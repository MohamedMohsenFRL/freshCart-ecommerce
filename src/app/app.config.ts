import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { IMAGE_CONFIG } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { NgxSpinnerModule } from "ngx-spinner";
import { loaderInterceptor } from './core/interceptors/loader.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes,withInMemoryScrolling({ scrollPositionRestoration: 'enabled' }),),
    provideClientHydration(withEventReplay()),
    provideAnimations(),
    provideHttpClient(withFetch(),withInterceptors([authInterceptor,loaderInterceptor])),
    importProvidersFrom(BrowserAnimationsModule, ToastrModule.forRoot(),NgxSpinnerModule),
    {
      provide: IMAGE_CONFIG,
      useValue: {
        disableImageSizeWarning: true,
        disableImageLazyLoadWarning: true
      }
    },
  ],
};
