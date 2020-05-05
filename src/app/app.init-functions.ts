import {Injector} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LOCATION_INITIALIZED } from '@angular/common';
import {HttpClient} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";

export function initializeTranslateService(translate: TranslateService, injector: Injector) {
  return () => new Promise<any>((resolve: any) => {
    const locationInitialized = injector.get(LOCATION_INITIALIZED, Promise.resolve(null));
    locationInitialized.then(() => {
      const langToSet = getUsersLocale('en');
      translate.setDefaultLang(langToSet);
      translate.use(langToSet).subscribe(() => {
        console.info(`Successfully initialized '${langToSet}' language.'`);
      }, err => {
        console.error(`Problem with '${langToSet}' language initialization.'`);
      }, () => {
        resolve(null);
      });
    });
  });
}

export function getUsersLocale(defaultValue: string): string {
  if (typeof window === 'undefined' || typeof window.navigator === 'undefined') {
    return defaultValue;
  }
  const windowNavigator = window.navigator as any;
  let usersLocale = windowNavigator.languages ? windowNavigator.languages[0] : defaultValue;
  usersLocale = usersLocale || windowNavigator.language || windowNavigator.browserLanguage || windowNavigator.userLanguage;
  return usersLocale;
}

export function getCurrentLocale(): string {
  return getUsersLocale('en');
}

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, "assets/", ".json");
}
