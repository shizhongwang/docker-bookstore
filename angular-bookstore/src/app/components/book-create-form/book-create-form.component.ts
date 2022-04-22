import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/common/book';
import { ActivatedRoute } from '@angular/router';
import { BookService } from 'src/app/services/book.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BookCategory } from '../../common/book-category';
import {Constants} from"../../common/constants";

@Component({
  selector: 'app-book-create-form',
  templateUrl: './book-create-form.component.html',
  styleUrls: ['./book-create-form.component.css']
})

export class BookCreateFormComponent implements OnInit {
  bookCategories: BookCategory[];

  book: Book = new Book();

  constructor(private _activatedRoute: ActivatedRoute,
              private _bookService: BookService,
              private httpClient: HttpClient) { }

  ngOnInit() {
    this._activatedRoute.paramMap.subscribe(
      () => {
        this.getBookInfo();
      }
    )

    this.listBookCategories();
  }

  getBookInfo(){
    // const id: number = +this._activatedRoute.snapshot.paramMap.get('id');
    const id: number = 1;

    this._bookService.get(id).subscribe(
      data => {
        this.book = data;
      }
    );
  }

  listBookCategories(){
    this._bookService.getBookCategories().subscribe(
      data => this.bookCategories = data
    );
    console.log(this.bookCategories);     //you would get undefined, since the data is loaded unsync
  }

  doSubmit(){ }

  bookCategory?: BookCategory;
  onSelect(id: number, categoryName: string): void {
    this.bookCategory = {
      id : id,
      categoryName: categoryName,
    }
    this.book.categoryId = this.bookCategory.id;
  }


  createBook(){
    console.log('create book');

    this.book.id = 0;
    this._bookService.createBook(this.book).subscribe(data => {
      // console.log(data)
      this.book = data;
    },
    error => console.log(error));
    // this._activatedRoute.navigateByUrl('/search/'+keyword);
  }

}

