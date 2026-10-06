import { Component, HostListener, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navigation } from './feature/navigation';
import { SlideOverview } from './feature/slide-overview/slide-overview';

@Component({
  imports: [RouterOutlet, SlideOverview],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  private nav = inject(Navigation);
  protected readonly title = signal('Präsentation');

  @HostListener('document:keydown', ['$event'])
  onKey(e: KeyboardEvent) {
    // Skip Special Keys
    if (e.ctrlKey || e.metaKey || e.altKey) return;

    if (e.key === '#') {
      this.nav.toggleOverview();
      return;
    }

    if (e.key === 'f' || e.key === 'F') {
      this.toggleFullscreen();
      return;
    }

    if (this.nav.overviewOpen()) {
      this.onOverviewKey(e);
      return;
    }

    if (e.key === 'ArrowRight' || e.key === ' ') this.nav.go(1);
    if (e.key === 'ArrowLeft') this.nav.go(-1);
  }

  private onOverviewKey(e: KeyboardEvent) {
    switch (e.key) {
      case 'ArrowLeft': this.nav.moveCursor(-1, 0); break;
      case 'ArrowRight': this.nav.moveCursor(1, 0); break;
      case 'ArrowUp': this.nav.moveCursor(0, -1); break;
      case 'ArrowDown': this.nav.moveCursor(0, 1); break;
      case 'Enter':
      case ' ': this.nav.confirm(); break;
      case 'Escape': this.nav.close(); break;
      default: return;
    }
    e.preventDefault(); // verhindert Scrollen der Übersicht durch die Pfeiltasten
  }

  private toggleFullscreen() {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  }
}
