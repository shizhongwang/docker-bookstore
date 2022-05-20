import { UploadFileService } from '../../services/upload-file.service';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { HttpClient, HttpResponse, HttpEventType } from '@angular/common/http';

import { Observable } from 'rxjs';
import * as XLSX from 'xlsx';
import { FileReviewContractStatementComponent } from '../file-review-contract-statement/file-review-contract-statement.component';

@Component({
  selector: 'app-file-review-contract-statement-upload',
  templateUrl: './file-review-contract-statement-upload.component.html',
  styleUrls: ['./file-review-contract-statement-upload.component.css']
})
export class FileReviewContractStatementUploadComponent implements OnInit {
  @ViewChild(FileReviewContractStatementComponent, { static: true }) fileReviewComponent!: FileReviewContractStatementComponent

  selectedFiles: FileList;
  currentFile: File;
  willDownload = false;
  progress: { percentage: number } = { percentage: 0 };

  constructor(
    private uploadFileService: UploadFileService,
    private http: HttpClient) {


    // this.rowData = this.http.get<any[]>('https://www.ag-grid.com/example-assets/small-row-data.json');
  }

  ngOnInit() {
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


      var wsn = workBook.SheetNames[0];
      var ws = workBook.Sheets[wsn];
      const range = XLSX.utils.decode_range(ws['!ref']);

      // var aoa = XLSX.utils.sheet_to_json(ws, {
      //   raw: false,
      //   header: 1,
      //   range: range
      // });

      var aoa = XLSX.utils.sheet_to_json(ws);

      const dataString = JSON.stringify(aoa);
      document.getElementById('output').innerHTML = dataString.slice(0, 300).concat("...");
      this.setDownload(dataString);


      this.fileReviewComponent.gridApi.setRowData(aoa);
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
