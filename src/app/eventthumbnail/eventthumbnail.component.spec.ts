import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventthumbnailComponent } from './eventthumbnail.component';

describe('EventthumbnailComponent', () => {
  let component: EventthumbnailComponent;
  let fixture: ComponentFixture<EventthumbnailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventthumbnailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventthumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
