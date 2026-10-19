import {
  afterNextRender, booleanAttribute, Component, computed,
  DestroyRef, ElementRef, inject, input, signal, viewChild,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

const num = (v: unknown) => (v == null || v === '' ? undefined : Number(v));

@Component({
  imports: [],
  selector: 'app-slide-html',
  styleUrl: './slide-html.css',
  templateUrl: './slide-html.html',
  host: { '[attr.data-layout]': 'custom() ? "custom" : "default"' },
})
export class SlideHtml {
  private sanitizer = inject(DomSanitizer);

  src = input.required<string>();
  alt = input(''); // wird als Titel des iframes verwendet

  headingBelow = input(false, { transform: booleanAttribute });
  interactive = input(false, { transform: booleanAttribute });
  viewWidth = input<number | undefined, unknown>(undefined, { transform: num });

  x = input<number | undefined, unknown>(undefined, { transform: num });
  y = input<number | undefined, unknown>(undefined, { transform: num });
  width = input<number | undefined, unknown>(undefined, { transform: num });
  height = input<number | undefined, unknown>(undefined, { transform: num });

  custom = computed(() =>
    [this.x(), this.y(), this.width(), this.height()].some(v => v !== undefined),
  );

  url = computed(() => this.sanitizer.bypassSecurityTrustResourceUrl(this.src()));

  // Größe der Box in px (per ResizeObserver)
  private box = signal({ w: 0, h: 0 });
  scale = computed(() => (this.viewWidth() ? this.box().w / this.viewWidth()! : 1));
  frameW = computed(() => this.viewWidth() ?? this.box().w);
  frameH = computed(() => this.box().h / this.scale());

  private boxEl = viewChild.required<ElementRef<HTMLElement>>('box');

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const ro = new ResizeObserver(([entry]) => {
        const { width, height } = entry.contentRect;
        this.box.set({ w: width, h: height });
      });
      ro.observe(this.boxEl().nativeElement);
      destroyRef.onDestroy(() => ro.disconnect());
    });
  }

  // Tasten aus dem iframe an die Präsentation weiterreichen (nur interactive)
  forwardKeys(frame: HTMLIFrameElement) {
    if (!this.interactive()) return;
    frame.contentDocument?.addEventListener('keydown', e =>
      document.dispatchEvent(new KeyboardEvent('keydown', e)),
    );
  }
}
