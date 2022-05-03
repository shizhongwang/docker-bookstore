import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileReviewContractComponent } from './file-review-contract.component';

describe('FileReviewContractComponent', () => {
  let component: FileReviewContractComponent;
  let fixture: ComponentFixture<FileReviewContractComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileReviewContractComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileReviewContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
