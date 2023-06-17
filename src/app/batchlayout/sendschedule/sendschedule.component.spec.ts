import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendscheduleComponent } from './sendschedule.component';

describe('SendscheduleComponent', () => {
  let component: SendscheduleComponent;
  let fixture: ComponentFixture<SendscheduleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SendscheduleComponent]
    });
    fixture = TestBed.createComponent(SendscheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
