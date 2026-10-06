import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Slide2a } from './slide2a';

describe('Slide2a', () => {
  let component: Slide2a;
  let fixture: ComponentFixture<Slide2a>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Slide2a],
    }).compileComponents();

    fixture = TestBed.createComponent(Slide2a);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
