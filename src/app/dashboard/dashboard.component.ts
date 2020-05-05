import {Component, OnInit} from '@angular/core';

import {GridApi, GridOptions} from "@ag-grid-community/all-modules";
import {Module} from "@ag-grid-community/core";
import {AllModules} from "@ag-grid-enterprise/all-modules";
import {TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    gridOptions: GridOptions;
    gridApi: GridApi;
    columnDefs;
    defaultColDef;
    frameworkComponents;
    multiSortKey;
    context;
    modules: Module[] = AllModules;
    rowData: any[] = [];

    constructor(
        private translateService: TranslateService) {
    }

    ngOnInit() {

        this.multiSortKey = "ctrl";
        this.gridOptions = {
            rowHeight: 40,
            floatingFilter: true,
            localeTextFunc: (key: string, defaultValue: string) => {
                const localeValue = this.translateService.instant(key);
                return localeValue === key ? defaultValue : localeValue;
            }
        };
        this.columnDefs = [
            {field: 'make'},
            {field: 'model'},
            {field: 'price'}
        ];
        this.defaultColDef = {
            editable: false,
            sortable: true,
            minWidth: 100,
            filter: true,
        };
        this.rowData = [
            {make: 'Toyota', model: 'Celica', price: 35000},
            {make: 'Ford', model: 'Mondeo', price: 32000},
            {make: 'Porsche', model: 'Boxter', price: 72000}
        ];
    }

    onGridReady(params) {
        this.gridApi = params.api;
        this.gridOptions.api = this.gridApi;
        this.gridApi.sizeColumnsToFit();
        // this can be changed with a subscribe from a service
        params.api.setRowData(this.rowData);

    }

    public onFirstDataRendered(params) {
        params.api.sizeColumnsToFit();
    }


    public onGridSizeChanged(params) {
        const gridWidth = document.getElementById("grid-wrapper").offsetWidth;
        const columnsToShow = [];
        const columnsToHide = [];
        let totalColsWidth = 0;
        const allColumns = params.columnApi.getAllColumns();
        if (allColumns.length) {
            for (let i = 0; i < allColumns.length; i++) {
                const column = allColumns[i];
                totalColsWidth += column.getMinWidth();
                if (totalColsWidth > gridWidth) {
                    columnsToHide.push(column.colId);
                } else {
                    columnsToShow.push(column.colId);
                }
            }
            params.columnApi.setColumnsVisible(columnsToShow, true);
            params.columnApi.setColumnsVisible(columnsToHide, false);
            params.api.sizeColumnsToFit();
        }
    }

}
