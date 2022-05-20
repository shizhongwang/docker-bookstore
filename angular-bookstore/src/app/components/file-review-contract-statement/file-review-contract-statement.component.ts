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
import { ContractStatement } from 'src/app/common/contract-statement';

import { ContractStatementService } from '../../services/contract-statement.service';

@Component({
  selector: 'app-file-review-contract-statement',
  templateUrl: './file-review-contract-statement.component.html',
  styleUrls: ['./file-review-contract-statement.component.css']
})
export class FileReviewContractStatementComponent {

  public columnDefs: ColDef[] = [
    {
      headerName: 'ID', field: 'id',
      // minWidth: 30,
      checkboxSelection: checkboxSelection,
      headerCheckboxSelection: headerCheckboxSelection,
    },
    { headerName: '交易日期', field: 'transactionAt' },
    { headerName: '凭证号码', field: 'voucherNum' },
    { headerName: '借方金额', field: 'debitAmount' },
    { headerName: '贷方金额', field: 'creditAmount' },
    { headerName: '余额', field: 'remainingBalance' },

    { headerName: '柜员流水', field: 'bankSerialId' },
    { headerName: '对方账户', field: 'oppositeAccountNum' },
    { headerName: '对方公司', field: 'oppositeCompanyName' },
    { headerName: '分类', field: 'category' },
    { headerName: '对应发票号码', field: 'invoiceNum' },

    // {
    //   headerName: '应收账款',
    //   field: 'contractAmount',
    //   valueFormatter: "'$' + value.toLocaleString()",
    //   width: 200,
    // },
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
    private contractStatementService: ContractStatementService) { }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.refreshGridData();
  }

  updateDbSelectedRows() {
    var rows = <ContractStatement[]>this.gridApi.getSelectedRows();

    this.contractStatementService.createContractStatements(rows).subscribe(data => {
      console.log(data);
    })
    alert('Update DB successfully.');

    this.refreshGridData();
  }

  refreshGridData() {
    this.contractStatementService.getContractStatements().subscribe(
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
