import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatebatchComponent } from './createbatch.component';

describe('CreatebatchComponent', () => {
  let component: CreatebatchComponent;
  let fixture: ComponentFixture<CreatebatchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatebatchComponent]
    });
    fixture = TestBed.createComponent(CreatebatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
