import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractInvoiceUploadComponent } from './contract-invoice-upload.component';

describe('ContractInvoiceUploadComponent', () => {
  let component: ContractInvoiceUploadComponent;
  let fixture: ComponentFixture<ContractInvoiceUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractInvoiceUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractInvoiceUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
