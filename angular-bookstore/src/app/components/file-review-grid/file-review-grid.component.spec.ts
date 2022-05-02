import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileReviewGridComponent } from './file-review-grid.component';

describe('FileReviewGridComponent', () => {
  let component: FileReviewGridComponent;
  let fixture: ComponentFixture<FileReviewGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileReviewGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileReviewGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
