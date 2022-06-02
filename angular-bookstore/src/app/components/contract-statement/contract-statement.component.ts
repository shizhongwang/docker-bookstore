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
import * as XLSX from 'xlsx';
import { ContractStatement } from 'src/app/common/contract-statement';
import { ContractService } from 'src/app/services/contract.service';

import { ContractStatementService } from '../../services/contract-statement.service';

@Component({
  selector: 'app-contract-statement',
  templateUrl: './contract-statement.component.html',
  styleUrls: ['./contract-statement.component.css']
})
export class ContractStatementComponent {

  public columnDefs: ColDef[] = [
    {
      headerName: 'ID', field: 'id',
      // minWidth: 30,
      checkboxSelection: checkboxSelection,
      headerCheckboxSelection: headerCheckboxSelection,
    },
    { headerName: '客户', field: 'clientName' },
    { headerName: '合同编号', field: 'contractNum' },

    { headerName: '交易日期', field: 'transactionAt' },
    { headerName: '凭证号码', field: 'voucherNum' },
    {
      headerName: '借方金额', field: 'debitAmount',
      valueFormatter: "'$' + value.toLocaleString()",
      width: 200,
      aggFunc: 'sum'
    },
    {
      headerName: '贷方金额', field: 'creditAmount',
      valueFormatter: "'$' + value.toLocaleString()",
      width: 200,
      aggFunc: 'sum'
    },
    {
      headerName: '余额', field: 'remainingBalance',
      valueFormatter: "'$' + value.toLocaleString()",
      width: 200,
      aggFunc: 'sum'
    },

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
    private contractStatementService: ContractStatementService,
    private contractService: ContractService) { }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.refreshGridData();
  }
  refreshGridData() {
    this.contractStatementService.getContractStatements().subscribe(
      data => {
        this.gridApi.setRowData(data);
        this.setGridDataFormat();
      }
    );
  }


  setGridDataFormat() {
    this.filterByContractNum();
    // this.setStaticsCount();
    // this.selectRowByContractNum();
    this.setColAutoSize();
  }
  setColAutoSize() {
    // 调整列宽自适应
    let allColumnIds = [];
    this.gridColumnApi.getAllColumns().forEach(function (column) {
      allColumnIds.push(column.colId);
    });
    this.gridColumnApi.autoSizeColumns(allColumnIds, false);
  }
  setStaticsCount() {
    var total = 0;
    for (var i = 0; i < this.rowData.length; i++) {
      total = total + parseInt(this.rowData[i].contractAmount);
    }

    var topRows = [
      { id: '合计', clientName: '合计', contractAmount: total }
    ];

    // this.gridColumnApi.setPinnedTopRowData(topRows);  //在顶部显示合计行
    this.gridApi.setPinnedBottomRowData(topRows);  //在底部显示合计行
  }
  selectRowByContractNum() {
    // console.log(this.contractService.contractNum);
    var api = this.gridApi;
    var contactNum = this.contractService.contractNum;
    if (this.contractService.contractNum == null) {
      return;
    }
    else {
      setTimeout(function () {
        api.forEachNode(node => {
          if (node.data.contractNum === contactNum)
            node.setSelected(true);
        });
      }, 2000);
    }
  }
  filterByContractNum() {
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







  onFilterReset() {
    this.gridApi.setFilterModel(null);
  }

  onSelectionChanged(event) {
    if (event.api.getSelectedNodes().length == 0) {
      this.contractService.contractNum = null;
      return;
    }

    var selRow = event.api.getSelectedNodes()[0]; //获取选中的行
    var data = selRow.data;
    // data.clientName = '小明';
    // selRow.setData(data);

    this.contractService.contractNum = data.contractNum;
    console.log(this.contractService.contractNum);
  }
  onUpdateDbSelectedRows() {
    var rows = <ContractStatement[]>this.gridApi.getSelectedRows();

    this.contractStatementService.createContractStatements(rows).subscribe(data => {
      console.log(data);
    })
    alert('Update DB successfully.');

    this.refreshGridData();
  }

  onFileChange(ev) {
    let workBook = null;
    let jsonData = null;
    const reader = new FileReader();
    const file = ev.target.files[0];
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      jsonData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});


      var wsn = workBook.SheetNames[0];
      var ws = workBook.Sheets[wsn];
      const range = XLSX.utils.decode_range(ws['!ref']);

      // var aoa = XLSX.utils.sheet_to_json(ws, {
      //   raw: false,
      //   header: 1,
      //   range: range
      // });

      var aoa = XLSX.utils.sheet_to_json(ws);
      this.gridApi.setRowData(aoa);

      // const dataString = JSON.stringify(aoa);
      // document.getElementById('output').innerHTML = dataString.slice(0, 300).concat("...");
    }
    reader.readAsBinaryString(file);
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
