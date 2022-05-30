import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  CheckboxSelectionCallbackParams,
  ColDef,
  GridApi,
  GridReadyEvent,
  HeaderCheckboxSelectionCallbackParams,

  IFiltersToolPanel,
  ISetFilter,
  KeyCreatorParams,
  SideBarDef,
  ValueFormatterParams,

} from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import * as angular from "angular"
import * as XLSX from 'xlsx';
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
      // minWidth: 30,
      checkboxSelection: checkboxSelection,
      headerCheckboxSelection: headerCheckboxSelection,
    },
    { headerName: '客户', field: 'clientName', filter: 'agSetColumnFilter', },
    { headerName: '合同编号', field: 'contractNum' },
    { headerName: '合同日期', field: 'contractAt' },
    {
      headerName: '应收账款',
      field: 'contractAmount',
      valueFormatter: "'$' + value.toLocaleString()",
      width: 200,
      aggFunc: 'sum'
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

  refreshGridData() {
    if (this.contractService.contractNum == null) {
      this.contractService.getContracts().subscribe(
        data => {
          this.setDataAndFormat(data);
        }
      );
    }
    else {
      this.setDataAndFormat(this.contractService.rowData);
    }
  }

  setDataAndFormat(rowData: any[]){
    this.gridApi.setRowData(rowData);
    this.rowData = rowData;

    this.setStaticsCount();
    this.selectRowByContractNum();
    this.setColAutoSize();
  }

  setColAutoSize(){
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

  onFilterReset() {
    this.gridApi.setFilterModel(null);
  }

  onSelectionChanged(event) {
    if (event.api.getSelectedNodes().length == 0){
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
    var rows = <Contract[]>this.gridApi.getSelectedRows();

    this.contractService.createContracts(rows).subscribe(data => {
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
