import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileReviewContractStatementUploadComponent } from './file-review-contract-statement-upload.component';

describe('FileReviewContractStatementUploadComponent', () => {
  let component: FileReviewContractStatementUploadComponent;
  let fixture: ComponentFixture<FileReviewContractStatementUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileReviewContractStatementUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileReviewContractStatementUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
