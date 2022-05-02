import { UploadFileService } from '../../services/upload-file.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse, HttpEventType } from '@angular/common/http';

import { Observable } from 'rxjs';
import * as XLSX from 'xlsx';

import { ColDef, GridApi, ColGroupDef, GridReadyEvent } from 'ag-grid-community';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

@Component({
  selector: 'app-create-upload-file',
  templateUrl: './create-upload-file.component.html',
  styleUrls: ['./create-upload-file.component.css']
})

export class CreateUploadFileComponent implements OnInit {
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
  // public defaultColDef: ColDef = {
  //   flex: 1,
  //   resizable: true,
  // };

  public rowData!: any[];
  private gridApi!: GridApi;


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
    this.http
    .get<any[]>('https://www.ag-grid.com/example-assets/small-row-data.json')
    .subscribe((data) => (this.rowData = data));
  }



  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }

  onRowSelected(event) {
    console.log("row " + event.node.data + " selected = " + event.node.selected);
  }

  //获取选中行数据
  getSelectedRows() {
    var rows = this.gridApi.getSelectedRows();
    alert(JSON.stringify(rows));
  }








  //*************     upload      ***************/
  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  uploadFile() {
    this.progress.percentage = 0;
    this.currentFile = this.selectedFiles.item(0);
    this.uploadFileService.uploadFiles(this.currentFile).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress.percentage = Math.round(
          (100 * event.loaded) / event.total
        );
      } else if (event instanceof HttpResponse) {
        console.log('File uploaded successfully' + event.body);
      }
    });
    this.selectedFiles = undefined;
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
      const dataString = JSON.stringify(jsonData);
      document.getElementById('output').innerHTML = dataString.slice(0, 300).concat("...");
      this.setDownload(dataString);
    }
    reader.readAsBinaryString(file);
  }


  setDownload(data) {
    this.willDownload = true;
    setTimeout(() => {
      const el = document.querySelector("#download");
      el.setAttribute("href", `data:text/json;charset=utf-8,${encodeURIComponent(data)}`);
      el.setAttribute("download", 'xlsxtojson.json');
    }, 1000)
  }

}
