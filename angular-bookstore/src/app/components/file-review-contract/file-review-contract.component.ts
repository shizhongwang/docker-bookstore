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
  selector: 'app-file-review-contract',
  templateUrl: './file-review-contract.component.html',
  styleUrls: ['./file-review-contract.component.css']
})

// `id`             BIGINT(20) NOT NULL AUTO_INCREMENT PRIMARY KEY,
// `client_name`           VARCHAR(255)   DEFAULT NULL,
// `contract_num`    VARCHAR(255)   DEFAULT NULL,
// `contract_at`      DATETIME       DEFAULT NULL,
// `contract_amount`         DECIMAL(13, 2) DEFAULT NULL,
// `project_name`    VARCHAR(255)   DEFAULT NULL,

// `desc`    VARCHAR(10240)   DEFAULT NULL,
//客户	扫描件	应收账款	合同编号	合同日期	项目名称	合同金额

export class FileReviewContractComponent {
  public columnDefs: ColDef[] = [
    {
      headerName: 'ID',       field: 'id',
      minWidth: 30,
      checkboxSelection: checkboxSelection,
      headerCheckboxSelection: headerCheckboxSelection,
    },
    { headerName: '客户',      field: 'client_name' },
    { headerName: '合同编号',   field: 'contract_num' },
    { headerName: '合同日期',   field: 'contract_at' },
    { headerName: '应收账款',   field: 'contract_amount' },
    { headerName: '项目名称',   field: 'project_name' },
    { headerName: '备注',       field: 'desc' },
  ];
  public autoGroupColumnDef: ColDef = {
    headerName: 'Group',
    minWidth: 170,
    field: 'id',
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

    // this.http
    //   .get<any[]>(
    //     "https://www.ag-grid.com/example-assets/olympic-winners.json"
    //   )
    //   .subscribe(data => {
    //     this.rowData = data;
    //     // this.gridApi.setRowData(this.rowData);
    //     params.api!.setRowData(data);
    //   });
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
