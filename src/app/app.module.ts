import {APP_INITIALIZER, Injector, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import {APP_BASE_HREF} from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import {AgGridModule} from "@ag-grid-community/angular";
import {HttpLoaderFactory, initializeTranslateService} from "./app.init-functions";
import {TranslateLoader, TranslateModule, TranslateService} from "@ngx-translate/core";
import {HttpClient, HttpClientModule} from "@angular/common/http";

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule.forRoot([
            {path: '', component: DashboardComponent},
        ]),
        AgGridModule.withComponents([
            DashboardComponent
        ]),
        TranslateModule.forRoot({
            loader: {
                deps: [HttpClient],
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
            },
        }),
    ],
  declarations: [ 
    AppComponent, DashboardComponent,
  ],
  bootstrap:    [ AppComponent ],
  providers: [{provide: APP_BASE_HREF, useValue : '/' },
      { provide: APP_INITIALIZER, useFactory: initializeTranslateService, deps: [TranslateService, Injector], multi: true }
  ]
})
export class AppModule { }
