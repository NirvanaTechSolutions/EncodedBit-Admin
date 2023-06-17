import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendlinkComponent } from './sendlink.component';

describe('SendlinkComponent', () => {
  let component: SendlinkComponent;
  let fixture: ComponentFixture<SendlinkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SendlinkComponent]
    });
    fixture = TestBed.createComponent(SendlinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
