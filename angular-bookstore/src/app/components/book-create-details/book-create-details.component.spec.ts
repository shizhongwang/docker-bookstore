import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookCreateDetailsComponent } from './book-create-details.component';

describe('BookCreateDetailsComponent', () => {
  let component: BookCreateDetailsComponent;
  let fixture: ComponentFixture<BookCreateDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookCreateDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookCreateDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
