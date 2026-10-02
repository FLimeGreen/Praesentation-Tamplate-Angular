import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SlideImage } from './slide-image';

describe('SlideImage', () => {
  let component: SlideImage;
  let fixture: ComponentFixture<SlideImage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlideImage],
    }).compileComponents();

    fixture = TestBed.createComponent(SlideImage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
