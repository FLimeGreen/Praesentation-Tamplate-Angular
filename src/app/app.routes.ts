import { Routes } from '@angular/router';
import { SLIDES } from './slides/slides';

export const routes: Routes = [
  { path: '', redirectTo: '0', pathMatch: 'full' },
  ...SLIDES.map((component, i) => ({ path: String(i), component })),
  { path: '**', redirectTo: '0' },
];
