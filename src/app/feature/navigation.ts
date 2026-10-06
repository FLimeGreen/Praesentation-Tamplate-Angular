import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { SLIDES, SLIDE_GROUPS, toIndex, toPos } from '../slides/slides';

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(v, max));

@Injectable({ providedIn: 'root' })
export class Navigation {
  private router = inject(Router);

  readonly overviewOpen = signal(false);
  readonly cursor = signal({ col: 0, row: 0 });

  get current(): number {
    return Number(this.router.url.split(/[?#]/)[0].slice(1)) || 0;
  }

  /** Normale Navigation: delta = +1 / -1 durch die flache Liste */
  go(delta: number) {
    this.goTo(clamp(this.current + delta, 0, SLIDES.length - 1));
  }

  goTo(index: number) {
    if (index !== this.current) this.router.navigate(['/', String(index)]);
  }

  toggleOverview() {
    if (!this.overviewOpen()) this.cursor.set(toPos(this.current));
    this.overviewOpen.update(v => !v);
  }

  close() {
    this.overviewOpen.set(false);
  }

  /** Markierung in der Übersicht verschieben */
  moveCursor(dCol: number, dRow: number) {
    const { col, row } = this.cursor();
    const newCol = clamp(col + dCol, 0, SLIDE_GROUPS.length - 1);
    const newRow = clamp(row + dRow, 0, SLIDE_GROUPS[newCol].length - 1);
    this.cursor.set({ col: newCol, row: newRow });
  }

  confirm() {
    const { col, row } = this.cursor();
    this.goTo(toIndex(col, row));
    this.close();
  }
}
