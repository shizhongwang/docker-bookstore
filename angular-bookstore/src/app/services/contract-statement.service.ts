import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ContractStatement } from '../common/contract-statement';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})


export class ContractStatementService {
  private urlContractStatements = environment.urlContractStatements;
  bookString: string;

  constructor(private httpClient: HttpClient) {
  }

  createContractStatements(contracts: ContractStatement[]): Observable<ContractStatement[]> {
    this.bookString = JSON.stringify(contracts);

    return this.httpClient.post<ContractStatement[]>(`${this.urlContractStatements}`, this.bookString, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  getContractStatements(): Observable<ContractStatement[]> {
    // const searchUrl = `${this.urlGetContracts}/search/categoryid?id=${theCategoryId}`;
    const searchUrl = `${this.urlContractStatements}`;
    return this.httpClient.get<ContractStatement[]>(searchUrl).pipe(
      map(response => response)
    );
  }
}

