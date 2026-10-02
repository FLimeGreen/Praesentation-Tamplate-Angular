import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Slide3 } from './slide3';

describe('Slide3', () => {
  let component: Slide3;
  let fixture: ComponentFixture<Slide3>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Slide3],
    }).compileComponents();

    fixture = TestBed.createComponent(Slide3);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
