import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ContractInvoice } from '../common/contract-invoice';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})


export class ContractInvoiceService {
  private urlContractInvoices = environment.urlContractInvoices;
  bookString: string;

  constructor(private httpClient: HttpClient) {
  }

  createContractInvoices(contracts: ContractInvoice[]): Observable<ContractInvoice[]> {
    this.bookString = JSON.stringify(contracts);

    return this.httpClient.post<ContractInvoice[]>(`${this.urlContractInvoices}`, this.bookString, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  getContractInvoices(): Observable<ContractInvoice[]> {
    // const searchUrl = `${this.urlGetContracts}/search/categoryid?id=${theCategoryId}`;
    const searchUrl = `${this.urlContractInvoices}`;
    return this.httpClient.get<ContractInvoice[]>(searchUrl).pipe(
      map(response => response)
    );
  }
}

