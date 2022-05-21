import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractStatementComponent } from './contract-statement.component';

describe('ContractStatementComponent', () => {
  let component: ContractStatementComponent;
  let fixture: ComponentFixture<ContractStatementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractStatementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
