import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractInvoiceComponent } from './contract-invoice.component';

describe('ContractInvoiceComponent', () => {
  let component: ContractInvoiceComponent;
  let fixture: ComponentFixture<ContractInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
