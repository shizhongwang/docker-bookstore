import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractStatementUploadComponent } from './contract-statement-upload.component';

describe('ContractStatementUploadComponent', () => {
  let component: ContractStatementUploadComponent;
  let fixture: ComponentFixture<ContractStatementUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractStatementUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractStatementUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
