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

  callFileReviewGridForm(){
    this._router.navigateByUrl('file-review-grid');
  }



  callContractForm() {
    this._router.navigateByUrl('contract');
  }

  callStatementForm() {
    this._router.navigateByUrl('contract-statement');
  }

  callInvoiceForm() {
    this._router.navigateByUrl('contract-invoice');
  }

}
