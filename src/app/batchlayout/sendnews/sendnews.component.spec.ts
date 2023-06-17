import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendnewsComponent } from './sendnews.component';

describe('SendnewsComponent', () => {
  let component: SendnewsComponent;
  let fixture: ComponentFixture<SendnewsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SendnewsComponent]
    });
    fixture = TestBed.createComponent(SendnewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
