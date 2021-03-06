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
import { ListUploadFileComponent } from './components/list-upload-file/list-upload-file.component';
import { DetailsUploadFileComponent } from './components/details-upload-file/details-upload-file.component';
//client side paging
//import { JwPaginationComponent } from 'jw-angular-pagination';

import { AgGridModule } from 'ag-grid-angular';
import { FileReviewGridComponent } from './components/file-review-grid/file-review-grid.component';


import { ContractComponent } from './components/contract/contract.component';
import { ContractInvoiceComponent } from './components/contract-invoice/contract-invoice.component';

import { ContractStatementComponent } from './components/contract-statement/contract-statement.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { AuthGaurdService } from './services/auth-gaurd.service';


const routes: Routes = [
  { path: '', component: ContractComponent, canActivate: [AuthGaurdService] },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent, canActivate: [AuthGaurdService] },

  { path: 'contract', component: ContractComponent, canActivate: [AuthGaurdService]},
  { path: 'contract-statement', component: ContractStatementComponent, canActivate: [AuthGaurdService] },
  { path: 'contract-invoice', component: ContractInvoiceComponent, canActivate: [AuthGaurdService] },

  {path: 'file-review-grid', component: FileReviewGridComponent},

  {path: 'checkout', component: CheckoutComponent},
  {path: 'cart-details', component: CartDetailsComponent},
  {path: 'books/:id', component: BookDetailsComponent},
  {path: 'books', component: BookListComponent},
  {path: 'book-create-form', component: BookCreateFormComponent},
  {path: 'search/:keyword', component: BookListComponent},
  {path: 'category/:id', component: BookListComponent},

  // { path: '', redirectTo: '/contract', pathMatch: 'full' },
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

    ListUploadFileComponent,
    DetailsUploadFileComponent,
    FileReviewGridComponent,


    ContractComponent,
    ContractInvoiceComponent,
    ContractStatementComponent,
    LoginComponent,
    LogoutComponent,

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
