import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './ui/app.module';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
