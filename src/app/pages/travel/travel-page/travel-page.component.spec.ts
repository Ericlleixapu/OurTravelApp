import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelPageComponent } from './travel-page.component';

describe('TravelComponent', () => {
  let component: TravelPageComponent;
  let fixture: ComponentFixture<TravelPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TravelPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TravelPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
