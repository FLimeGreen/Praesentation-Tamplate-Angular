import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SlideVideo } from './slide-video';

describe('SlideVideo', () => {
  let component: SlideVideo;
  let fixture: ComponentFixture<SlideVideo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlideVideo],
    }).compileComponents();

    fixture = TestBed.createComponent(SlideVideo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
