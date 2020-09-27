import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { from } from 'rxjs';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import{} from './app/app-routing.module'

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
