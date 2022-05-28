import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Contract } from '../common/contract';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})


export class ContractService {
  private urlContracts = environment.urlContracts;
  contractNum: string;
  rowData!: any[];

  constructor(private httpClient: HttpClient) {
  }

  createContracts(contracts: Contract[]): Observable<Contract[]> {
    var contractStr = JSON.stringify(contracts);

    return this.httpClient.post<Contract[]>(`${this.urlContracts}`, contractStr, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  getContracts(): Observable<Contract[]> {
    // const searchUrl = `${this.urlGetContracts}/search/categoryid?id=${theCategoryId}`;
    const searchUrl = `${this.urlContracts}`;
    return this.httpClient.get<Contract[]>(searchUrl).pipe(
      map(response => this.rowData = response)
    );
  }
}

