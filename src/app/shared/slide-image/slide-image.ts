import { Component, computed, input } from '@angular/core';

const num = (v: unknown) => (v == null || v === '' ? undefined : Number(v));

@Component({
  imports: [],
  selector: 'app-slide-image',
  styleUrl: './slide-image.css',
  templateUrl: './slide-image.html',
})
export class SlideImage {
  src = input.required<string>();
  alt = input('');

  x = input<number | undefined, unknown>(undefined, { transform: num });
  y = input<number | undefined, unknown>(undefined, { transform: num });
  width = input<number | undefined, unknown>(undefined, { transform: num });
  height = input<number | undefined, unknown>(undefined, { transform: num });

  // true, sobald mindestens ein Wert angegeben wurde
  custom = computed(() =>
    [this.x(), this.y(), this.width(), this.height()].some(v => v !== undefined),
  );
}
