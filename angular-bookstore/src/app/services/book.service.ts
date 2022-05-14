import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Book } from '../common/book';
import { BookCategory } from '../common/book-category';
import { environment } from '../../environments/environment';
import axios from 'axios';
import { AxiosInstance } from 'axios';


@Injectable({
  providedIn: 'root'
})
export class BookService {
  private urlBooks = environment.urlBooks;
  private urlCategory = environment.urlCategory;

  // private urlBooks = "http://49.7.182.249:8080/books";
  // private urlCategory = "http://49.7.182.249:8080/book-category";
  // private urlBooks = "http://localhost:8080/books";
  // private urlCategory = "http://localhost:8080/book-category";

  bookString: string;
  private axiosClient: AxiosInstance;

  getBookCategories1(): Observable<BookCategory[]> {
    return this.httpClient.get<GetResponseBookCategory>(this.urlCategory).pipe(
      map(response => response._embedded.bookCategory)
    );
  }

  public async getBookCategories2(): Promise<any> {
    try {
      let response = await this.axiosClient.request({
        // url: `${this.clpEndpoint}/${serviceName}/message`,
        url: this.urlCategory,
        headers: {
          'Content-type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        method: 'get',
      });
    } catch (err) {
      throw err;
    }
  }

  constructor(private httpClient: HttpClient) {
    this.axiosClient = axios.create();
  }

  createBook(book: Book): Observable<Book> {
    this.bookString = JSON.stringify(book);
    return this.httpClient.post<Book>(`${this.urlBooks}`, this.bookString, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  getBooks(theCategoryId: number): Observable<Book[]> {
    const searchUrl = `${this.urlBooks}/search/categoryid?id=${theCategoryId}`;
    return this.getBooksList(searchUrl);
  }

  getBooksPaginate(theCategoryId: number, currentPage: number, pageSize: number): Observable<GetResponseBooks> {
    const searchUrl = `${this.urlBooks}/search/categoryid?id=${theCategoryId}&page=${currentPage}&size=${pageSize}`;
    return this.httpClient.get<GetResponseBooks>(searchUrl);
  }

  getBookCategories(): Observable<BookCategory[]> {
    return this.httpClient.get<GetResponseBookCategory>(this.urlCategory).pipe(
      map(response => response._embedded.bookCategory)
    );
  }

  searchBooks(keyword: string, currentPage: number, pageSize: number): Observable<GetResponseBooks> {
    const searchUrl = `${this.urlBooks}/search/searchbykeyword?name=${keyword}&page=${currentPage}&size=${pageSize}`;
    //return this.getBooksList(searchUrl);
    return this.httpClient.get<GetResponseBooks>(searchUrl);
  }

  private getBooksList(searchUrl: string): Observable<Book[]> {
    return this.httpClient.get<GetResponseBooks>(searchUrl).pipe(
      map(response => response._embedded.books)
    );
  }

  get(bookId: number): Observable<Book> {
    const bookDetailsUrl = `${this.urlBooks}/${bookId}`;
    return this.httpClient.get<Book>(bookDetailsUrl);
  }
}

interface GetResponseBooks {
  _embedded: {
    books: Book[];
  },
  page: {
    //cureent page
    size: number,
    //total number of records in database
    totalElements: number,
    //total number of pages, starts from 0 index
    totalPages: number,
    //current page
    number: number
  }
}

interface GetResponseBookCategory {
  _embedded: {
    bookCategory: BookCategory[];
  }
}
