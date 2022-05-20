import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookService } from './services/book.service';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { BookCategoryComponent } from './components/book-category/book-category.component';
import { SearchComponent } from './components/search/search.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BookCreateDetailsComponent } from './components/book-create-details/book-create-details.component';
import { BookCreateFormComponent } from './components/book-create-form/book-create-form.component';

import { UploadFileService } from './services/upload-file.service';
import { CreateUploadFileComponent } from './components/create-upload-file/create-upload-file.component';
import { ListUploadFileComponent } from './components/list-upload-file/list-upload-file.component';
import { DetailsUploadFileComponent } from './components/details-upload-file/details-upload-file.component';
//client side paging
//import { JwPaginationComponent } from 'jw-angular-pagination';

import { AgGridModule } from 'ag-grid-angular';
import { FileReviewGridComponent } from './components/file-review-grid/file-review-grid.component';
import { FileReviewContractComponent } from './components/file-review-contract/file-review-contract.component';
import { FileReviewContractStatementComponent } from './components/file-review-contract-statement/file-review-contract-statement.component';
import { FileReviewContractStatementUploadComponent } from './components/file-review-contract-statement-upload/file-review-contract-statement-upload.component';

import { FileReviewContractInvoiceComponent } from './components/file-review-contract-invoice/file-review-contract-invoice.component';
import { FileReviewContractInvoiceUploadComponent } from './components/file-review-contract-invoice-upload/file-review-contract-invoice-upload.component';



const routes: Routes = [
  {path: 'create-upload-files', component: CreateUploadFileComponent},
  { path: 'contract-statement-upload', component: FileReviewContractStatementUploadComponent },
  { path: 'contract-invoice-upload', component: FileReviewContractInvoiceUploadComponent },
  {path: 'file-review-grid', component: FileReviewGridComponent},
  {path: 'file-review-contract', component: FileReviewContractComponent},

  {path: 'checkout', component: CheckoutComponent},
  {path: 'cart-details', component: CartDetailsComponent},
  {path: 'books/:id', component: BookDetailsComponent},
  {path: 'books', component: BookListComponent},
  {path: 'book-create-form', component: BookCreateFormComponent},
  {path: 'search/:keyword', component: BookListComponent},
  {path: 'category/:id', component: BookListComponent},
  // {path: '', redirectTo: '/books', pathMatch: 'full'},
  { path: '', redirectTo: '/create-upload-files', pathMatch: 'full' },
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    PageNotFoundComponent,
    BookCategoryComponent,
    SearchComponent,
    BookDetailsComponent,
    CartStatusComponent,
    CartDetailsComponent,
    CheckoutComponent,
    BookCreateDetailsComponent,
    BookCreateFormComponent,

    CreateUploadFileComponent,
    ListUploadFileComponent,
    DetailsUploadFileComponent,
    FileReviewGridComponent,
    FileReviewContractComponent,
    FileReviewContractStatementComponent,
    FileReviewContractStatementUploadComponent,

    FileReviewContractInvoiceComponent,
    FileReviewContractInvoiceUploadComponent
    //client side paging
    //JwPaginationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    AgGridModule.withComponents([])
  ],
  providers: [
    BookService,
    UploadFileService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
