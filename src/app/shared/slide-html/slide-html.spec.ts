import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SlideHtml } from './slide-html';

describe('SlideHtml', () => {
  let component: SlideHtml;
  let fixture: ComponentFixture<SlideHtml>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlideHtml],
    }).compileComponents();

    fixture = TestBed.createComponent(SlideHtml);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
