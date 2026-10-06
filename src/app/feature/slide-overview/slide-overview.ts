import { NgComponentOutlet } from '@angular/common';
import { Component, HostListener, computed, effect, inject, signal } from '@angular/core';
import { Navigation } from '../navigation';
import { SLIDE_GROUPS, toIndex } from '../../slides/slides';

@Component({
  imports: [NgComponentOutlet],
  selector: 'app-slide-overview',
  styleUrl: './slide-overview.css',
  templateUrl: './slide-overview.html',
})
export class SlideOverview {
  nav = inject(Navigation);
  groups = SLIDE_GROUPS;

  readonly thumbW = 280; // Breite einer Vorschau in px

  // Die Folie wird in voller Fenstergröße gerendert und dann herunterskaliert
  vw = signal(window.innerWidth);
  vh = signal(window.innerHeight);
  scale = computed(() => this.thumbW / this.vw());
  thumbH = computed(() => this.vh() * this.scale());

  constructor() {
    // Markierte Vorschau in den sichtbaren Bereich scrollen
    effect(() => {
      const { col, row } = this.nav.cursor();
      if (!this.nav.overviewOpen()) return;
      setTimeout(() =>
        document
          .querySelector(`[data-pos="${col}-${row}"]`)
          ?.scrollIntoView({ block: 'nearest', inline: 'nearest' }),
      );
    });
  }

  @HostListener('window:resize')
  onResize() {
    this.vw.set(window.innerWidth);
    this.vh.set(window.innerHeight);
  }

  isSelected(col: number, row: number) {
    const c = this.nav.cursor();
    return c.col === col && c.row === row;
  }

  number(col: number, row: number) {
    return toIndex(col, row) + 1;
  }

  pick(col: number, row: number) {
    this.nav.cursor.set({ col, row });
    this.nav.confirm();
  }
}
