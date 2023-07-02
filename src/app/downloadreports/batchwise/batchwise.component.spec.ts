import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchwiseComponent } from './batchwise.component';

describe('BatchwiseComponent', () => {
  let component: BatchwiseComponent;
  let fixture: ComponentFixture<BatchwiseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BatchwiseComponent]
    });
    fixture = TestBed.createComponent(BatchwiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
