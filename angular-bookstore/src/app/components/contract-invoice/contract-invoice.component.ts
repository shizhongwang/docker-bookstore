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
import { ContractInvoice } from 'src/app/common/contract-invoice';

import { ContractService } from 'src/app/services/contract.service';
import { ContractInvoiceService } from '../../services/contract-invoice.service';

@Component({
  selector: 'app-contract-invoice',
  templateUrl: './contract-invoice.component.html',
  styleUrls: ['./contract-invoice.component.css']
})
export class ContractInvoiceComponent {
  // id: number;
  // contractNum: string;

  // invoiceCategory: string;
  // invoiceId: string;
  // invoiceNum: string;
  // clientName: string;

  // productCategory: string;
  // productName: string;
  // productModel: string;
  // productUnit: string;
  // productCount: number;

  // amount: number;
  // tax: number;
  // sum: number;

  // invoiceSum: number;
  // invoiceAt: Date;

  // description: string;
  // createAt: Date;
  // updateAt: Date;

  public columnDefs: ColDef[] = [
    {
      headerName: 'ID', field: 'id',
      // minWidth: 30,
      checkboxSelection: checkboxSelection,
      headerCheckboxSelection: headerCheckboxSelection,
    },
    { headerName: '合同编号', field: 'contractNum' },

    { headerName: '发票代码', field: 'invoiceCategory' },
    { headerName: '发票号码', field: 'invoiceId' },
    { headerName: '发票金额', field: 'invoiceNum' },
    { headerName: '客户', field: 'clientName' },

    { headerName: '商品类别', field: 'productCategory' },
    { headerName: '商品名称', field: 'productName' },
    { headerName: '规格型号', field: 'productModel' },
    { headerName: '单位', field: 'productUnit' },
    { headerName: '数量', field: 'productCount' },

    { headerName: '金额', field: 'amount' },
    { headerName: '税额', field: 'tax' },
    { headerName: '合计金额', field: 'sum' },
    { headerName: '总合计', field: 'invoiceSum' },
    { headerName: '开票日期', field: 'invoiceAt' },

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
    private contractInvoiceService: ContractInvoiceService,
    private contractService: ContractService) { }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.refreshGridData();

    //check the id in contract service
    console.log(this.contractService.contractNum);
  }

  filterContractNum() {
    if (this.contractService.contractNum == null) {
      this.gridApi.setFilterModel(null);
    }
    else {
      this.gridApi.setFilterModel({
        contractNum: {
          type: 'set',
          values: [this.contractService.contractNum],
        },
      });
    }
  }

  updateDbSelectedRows() {
    var rows = <ContractInvoice[]>this.gridApi.getSelectedRows();

    this.contractInvoiceService.createContractInvoices(rows).subscribe(data => {
      console.log(data);
    })
    alert('Update DB successfully.');

    this.refreshGridData();
  }

  refreshGridData() {
    this.contractInvoiceService.getContractInvoices().subscribe(
      data => {
        this.gridApi.setRowData(data);
        this.filterContractNum();
      }
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
