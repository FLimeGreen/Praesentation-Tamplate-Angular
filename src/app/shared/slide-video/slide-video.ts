import {
  afterNextRender, booleanAttribute, Component, computed,
  ElementRef, input, signal, viewChild,
} from '@angular/core';

const num = (v: unknown) => (v == null || v === '' ? undefined : Number(v));

@Component({
  imports: [],
  selector: 'app-slide-video',
  styleUrl: './slide-video.css',
  templateUrl: './slide-video.html',
  host: { '[attr.data-layout]': 'custom() ? "custom" : "default"' },
})
export class SlideVideo {
  src = input.required<string>();
  poster = input('');

  headingBelow = input(false, { transform: booleanAttribute });
  controls = input(true, { transform: booleanAttribute }); // controls="false" blendet sie aus
  autoplay = input(false, { transform: booleanAttribute });
  loop = input(false, { transform: booleanAttribute });
  muted = input(false, { transform: booleanAttribute });

  x = input<number | undefined, unknown>(undefined, { transform: num });
  y = input<number | undefined, unknown>(undefined, { transform: num });
  width = input<number | undefined, unknown>(undefined, { transform: num });
  height = input<number | undefined, unknown>(undefined, { transform: num });

  custom = computed(() =>
    [this.x(), this.y(), this.width(), this.height()].some(v => v !== undefined),
  );

  // true, wenn das Video in einer Vorschau der Übersicht steckt
  preview = signal(false);
  private video = viewChild.required<ElementRef<HTMLVideoElement>>('video');

  constructor() {
    afterNextRender(() => {
      const el = this.video().nativeElement;
      const inPreview = !!el.closest('.slide-frame');
      this.preview.set(inPreview);
      // Autoplay nur in der echten Folie, nie in den Vorschauen
      if (this.autoplay() && !inPreview) el.play().catch(() => { });
    });
  }
}
