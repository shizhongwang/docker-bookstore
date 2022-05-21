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
import * as angular from "angular"
import { Contract } from 'src/app/common/contract';

import { ContractService } from '../../services/contract.service';


@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.css']
})

// `id`             BIGINT(20) NOT NULL AUTO_INCREMENT PRIMARY KEY,
// `client_name`           VARCHAR(255)   DEFAULT NULL,
// `contract_num`    VARCHAR(255)   DEFAULT NULL,
// `contract_at`      DATETIME       DEFAULT NULL,
// `contract_amount`         DECIMAL(13, 2) DEFAULT NULL,
// `project_name`    VARCHAR(255)   DEFAULT NULL,

// `desc`    VARCHAR(10240)   DEFAULT NULL,
//客户	扫描件	应收账款	合同编号	合同日期	项目名称	合同金额

export class ContractComponent {
  public columnDefs: ColDef[] = [
    {
      headerName: 'ID', field: 'id',
      minWidth: 30,
      checkboxSelection: checkboxSelection,
      headerCheckboxSelection: headerCheckboxSelection,
    },
    { headerName: '客户', field: 'clientName' },
    { headerName: '合同编号', field: 'contractNum' },
    { headerName: '合同日期', field: 'contractAt' },
    {
      headerName: '应收账款',
      field: 'contractAmount',
      valueFormatter: "'$' + value.toLocaleString()",
      width: 200,
    },
    { headerName: '项目名称', field: 'projectName' },
    { headerName: '备注', field: 'description' },
    { headerName: '创建时间', field: 'createAt' },
    { headerName: '更新时间', field: 'updateAt' },
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
    suppressSizeToFit: true,

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


  constructor(private http: HttpClient,
    private contractService: ContractService) { }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.refreshGridData();
  }

  updateDbSelectedRows() {
    var rows = <Contract[]>this.gridApi.getSelectedRows();

    this.contractService.createContracts(rows).subscribe(data => {
      console.log(data);
    })
    alert('Update DB successfully.');

    this.refreshGridData();
  }

  refreshGridData() {
    this.contractService.getContracts().subscribe(
      data => this.gridApi.setRowData(data)
    );
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
