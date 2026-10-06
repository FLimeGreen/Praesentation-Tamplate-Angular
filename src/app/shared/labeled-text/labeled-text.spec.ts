import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LabeledText } from './labeled-text';

describe('LabeledText', () => {
  let component: LabeledText;
  let fixture: ComponentFixture<LabeledText>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LabeledText],
    }).compileComponents();

    fixture = TestBed.createComponent(LabeledText);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
