import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanwiseComponent } from './planwise.component';

describe('PlanwiseComponent', () => {
  let component: PlanwiseComponent;
  let fixture: ComponentFixture<PlanwiseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlanwiseComponent]
    });
    fixture = TestBed.createComponent(PlanwiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
