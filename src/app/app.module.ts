import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import {APP_BASE_HREF} from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import {AgGridModule} from "@ag-grid-community/angular";

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        RouterModule.forRoot([
            {path: '', component: DashboardComponent},
        ]),
        AgGridModule.withComponents([
            DashboardComponent
        ])
    ],
  declarations: [ 
    AppComponent, DashboardComponent,
  ],
  bootstrap:    [ AppComponent ],
  providers: [{provide: APP_BASE_HREF, useValue : '/' }]
})
export class AppModule { }
