import { Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-labeled-text',
  styleUrl: './labeled-text.css',
  templateUrl: './labeled-text.html',
})
export class LabeledText {
  label = input.required<string>();
}
