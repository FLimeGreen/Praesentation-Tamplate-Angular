import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SlideOverview } from './slide-overview';

describe('SlideOverview', () => {
  let component: SlideOverview;
  let fixture: ComponentFixture<SlideOverview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlideOverview],
    }).compileComponents();

    fixture = TestBed.createComponent(SlideOverview);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
