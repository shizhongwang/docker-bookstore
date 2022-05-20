import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileReviewContractInvoiceUploadComponent } from './file-review-contract-invoice-upload.component';

describe('FileReviewContractInvoiceUploadComponent', () => {
  let component: FileReviewContractInvoiceUploadComponent;
  let fixture: ComponentFixture<FileReviewContractInvoiceUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileReviewContractInvoiceUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileReviewContractInvoiceUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
