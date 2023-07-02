import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletebatchComponent } from './deletebatch.component';

describe('DeletebatchComponent', () => {
  let component: DeletebatchComponent;
  let fixture: ComponentFixture<DeletebatchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeletebatchComponent]
    });
    fixture = TestBed.createComponent(DeletebatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
