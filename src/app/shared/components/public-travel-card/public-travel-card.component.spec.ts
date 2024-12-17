import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicTravelCardComponent } from './public-travel-card.component';

describe('PublicTravelCardComponent', () => {
  let component: PublicTravelCardComponent;
  let fixture: ComponentFixture<PublicTravelCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicTravelCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicTravelCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
