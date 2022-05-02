import { Component, OnInit } from '@angular/core';
import { UploadFileService } from '../../services/upload-file.service';
import { HttpClient, HttpResponse, HttpEventType } from '@angular/common/http';

import { Observable } from 'rxjs';
import * as XLSX from 'xlsx';

import { ColDef, GridApi, ColGroupDef, GridReadyEvent } from 'ag-grid-community';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';


@Component({
  selector: 'app-file-review-grid',
  templateUrl: './file-review-grid.component.html',
  styleUrls: ['./file-review-grid.component.css']
})
export class FileReviewGridComponent implements OnInit {
  selectedFiles: FileList;
  currentFile: File;
  willDownload = false;



  // public columnDefs: (ColDef | ColGroupDef)[] = [
  //   {
  //     headerName: 'Participant',
  //     children: [{ field: 'athlete' }, { field: 'age' }],
  //   },
  //   {
  //     headerName: 'Details',
  //     children: [
  //       { field: 'country' },
  //       { field: 'year' },
  //       { field: 'date' },
  //       { field: 'sport' },
  //     ],
  //   },
  // ];
  public defaultColDef: ColDef = {
    flex: 1,
    resizable: true,
  };

  public rowData!: any[];

  private gridApi!: GridApi;
  private gridColumnApi;


  onRowDataA() {
    this.gridApi.setRowData(this.rowData);
  }

  progress: { percentage: number } = { percentage: 0 };


  columnDefs: ColDef[] = [
      { headerName: 'Employee Name', field: 'make', sortable: true, filter: true, checkboxSelection: true},
      {field: 'model', sortable: true, filter: true},
      {field: 'price', sortable: true, filter: true}
  ];

  // rowData: Observable<any[]>;

  constructor(
    private uploadFileService: UploadFileService,
    private http: HttpClient) {


      // this.rowData = this.http.get<any[]>('https://www.ag-grid.com/example-assets/small-row-data.json');
    }

  ngOnInit() {
    // this.http
    // .get<any[]>('https://www.ag-grid.com/example-assets/small-row-data.json')
    // .subscribe((data) => (this.rowData = data));
  }


  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.http
      .get<any[]>(
        "https://www.ag-grid.com/example-assets/small-row-data.json"
      )
      .subscribe(data => {
        this.rowData = data;
        this.gridApi.setRowData(this.rowData);
      })

    };


  onRowSelected(event) {
    console.log("row " + event.node.data + " selected = " + event.node.selected);
  }

  //获取选中行数据
  getSelectedRows() {
    var rows = this.gridApi.getSelectedRows();
    alert(JSON.stringify(rows));
  }

}
