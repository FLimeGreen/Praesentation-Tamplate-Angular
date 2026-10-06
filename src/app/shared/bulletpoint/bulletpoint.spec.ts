import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Bulletpoint } from './bulletpoint';

describe('Bulletpoint', () => {
  let component: Bulletpoint;
  let fixture: ComponentFixture<Bulletpoint>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Bulletpoint],
    }).compileComponents();

    fixture = TestBed.createComponent(Bulletpoint);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
