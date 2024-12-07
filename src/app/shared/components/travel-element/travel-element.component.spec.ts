import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelElementComponent } from './travel-element.component';

describe('TravelElementComponent', () => {
  let component: TravelElementComponent;
  let fixture: ComponentFixture<TravelElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TravelElementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TravelElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
