import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventdayComponent } from './eventday.component';

describe('EventdayComponent', () => {
  let component: EventdayComponent;
  let fixture: ComponentFixture<EventdayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventdayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventdayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
