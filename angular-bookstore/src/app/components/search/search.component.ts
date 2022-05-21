import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() {
  }

  searchBooks(keyword: string){
    // console.log('keyword', keyword);
    this._router.navigateByUrl('/search/'+keyword);
  }

  // callBookCreateForm(){
  //   this._router.navigateByUrl('book-create-form');
  // }

  callContractForm(){
    this._router.navigateByUrl('contract');
  }

  callFileReviewGridForm(){
    this._router.navigateByUrl('file-review-grid');
  }

  callStatementForm() {
    this._router.navigateByUrl('contract-statement-upload');
  }

  callInvoiceForm() {
    this._router.navigateByUrl('contract-invoice-upload');
  }

}
