import './polyfills';

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import {environment} from "./environment/environment";
import {LicenseManager} from "@ag-grid-enterprise/core";
import { ModuleRegistry, AllEnterpriseModules } from '@ag-grid-enterprise/all-modules';

if(environment.production === true){
  enableProdMode();
}

// TODO AND FIXME uncomment this and replace your license key
// LicenseManager.setLicenseKey("your license key");
ModuleRegistry.registerModules(AllEnterpriseModules);
platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err));
