import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  CheckboxSelectionCallbackParams,
  ColDef,
  GridApi,
  GridReadyEvent,
  HeaderCheckboxSelectionCallbackParams,
} from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';

@Component({
  selector: 'app-file-review-grid',
  templateUrl: './file-review-grid.component.html',
  styleUrls: ['./file-review-grid.component.css']
})

export class FileReviewGridComponent {
  public columnDefs: ColDef[] = [
    {
      field: 'athlete',
      minWidth: 170,
      checkboxSelection: checkboxSelection,
      headerCheckboxSelection: headerCheckboxSelection,
    },
    { field: 'age' },
    { field: 'country' },
    { field: 'year' },
    { field: 'date' },
    { field: 'sport' },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
    { field: 'total' },
  ];
  public autoGroupColumnDef: ColDef = {
    headerName: 'Group',
    minWidth: 170,
    field: 'athlete',
    valueGetter: function (params) {
      if (params.node!.group) {
        return params.node!.key;
      } else {
        return params.data[params.colDef.field!];
      }
    },
    headerCheckboxSelection: true,
    cellRenderer: 'agGroupCellRenderer',
    cellRendererParams: {
      checkbox: true,
    },
  };
  public defaultColDef: ColDef = {
    editable: true,
    enableRowGroup: true,
    enablePivot: true,
    enableValue: true,
    sortable: true,
    resizable: true,
    filter: true,
    flex: 1,
    minWidth: 100,
  };
  public rowSelection = 'multiple';
  public rowGroupPanelShow = 'always';
  public pivotPanelShow = 'always';
  public rowData!: any[];

  public gridApi!: GridApi;
  private gridColumnApi;


  constructor(private http: HttpClient) {}

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.http
      .get<any[]>(
        "https://www.ag-grid.com/example-assets/olympic-winners.json"
      )
      .subscribe(data => {
        this.rowData = data;
        // this.gridApi.setRowData(this.rowData);
        params.api!.setRowData(data);
      });


    // this.http
    //   .get<any[]>('https://www.ag-grid.com/example-assets/olympic-winners.json')
    //   .subscribe((data) => {this.rowData = data; params.api.setRowData(this.rowData);});


  }

  onRowDataA() {
    this.gridApi.setRowData(this.rowData);
  }

  //获取选中行数据
  getSelectedRows() {
    var rows = this.gridApi.getSelectedRows();
    alert(JSON.stringify(rows));
  }

}

var checkboxSelection = function (params: CheckboxSelectionCallbackParams) {
  // we put checkbox on the name if we are not doing grouping
  return params.columnApi.getRowGroupColumns().length === 0;
};
var headerCheckboxSelection = function (
  params: HeaderCheckboxSelectionCallbackParams
) {
  // we put checkbox on the name if we are not doing grouping
  return params.columnApi.getRowGroupColumns().length === 0;
};
