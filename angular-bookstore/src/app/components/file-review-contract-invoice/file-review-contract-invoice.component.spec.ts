import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileReviewContractInvoiceComponent } from './file-review-contract-invoice.component';

describe('FileReviewContractInvoiceComponent', () => {
  let component: FileReviewContractInvoiceComponent;
  let fixture: ComponentFixture<FileReviewContractInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileReviewContractInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileReviewContractInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
