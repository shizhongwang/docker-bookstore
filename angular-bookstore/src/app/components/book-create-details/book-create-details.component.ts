import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-book-create-details',
  templateUrl: './book-create-details.component.html',
  styleUrls: ['./book-create-details.component.css']
})
export class BookCreateDetailsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  username = 'semlinker';

  onSubmit(value) {
    console.dir(value);
  }

}
