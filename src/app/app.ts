import { Component, HostListener, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SLIDES } from './slides/slides';

@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  private router = inject(Router);
  protected readonly title = signal('praesentation');

  @HostListener('document:keydown', ['$event'])
  onKey(e: KeyboardEvent) {
    // Skip Special Keys
    if (e.ctrlKey || e.metaKey || e.altKey) return;

    if (e.key === 'f' || e.key === 'F') {
      this.toggleFullscreen();
      return;
    }

    const current = Number(this.router.url.slice(1)) || 0;
    let next = current;

    if (e.key === 'ArrowRight' || e.key === ' ') next = current + 1;
    if (e.key === 'ArrowLeft') next = current - 1;

    next = Math.max(0, Math.min(next, SLIDES.length - 1));
    if (next !== current) this.router.navigate(['/', String(next)]);
  }

  private toggleFullscreen() {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  }
}
