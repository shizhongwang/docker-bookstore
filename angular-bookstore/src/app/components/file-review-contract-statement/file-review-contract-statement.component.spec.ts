import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileReviewContractStatementComponent } from './file-review-contract-statement.component';

describe('FileReviewContractStatementComponent', () => {
  let component: FileReviewContractStatementComponent;
  let fixture: ComponentFixture<FileReviewContractStatementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileReviewContractStatementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileReviewContractStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
