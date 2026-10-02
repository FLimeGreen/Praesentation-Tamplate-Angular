import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Slide2 } from './slide2';

describe('Slide2', () => {
  let component: Slide2;
  let fixture: ComponentFixture<Slide2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Slide2],
    }).compileComponents();

    fixture = TestBed.createComponent(Slide2);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
