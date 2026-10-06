import { Type } from '@angular/core';
import { Slide1 } from './slide1/slide1';
import { Slide2 } from './slide2/slide2';
import { Slide2a } from './slide2a/slide2a';
import { Slide3 } from './slide3/slide3';

// Jede innere Liste = eine Spalte: erste Folie = Thema, die weiteren = Unterfolien
export const SLIDE_GROUPS: Type<unknown>[][] = [
  [Slide1],
  [Slide2, Slide2a],
  [Slide3],
];

// Flache Reihenfolge für Routen und Links/Rechts-Navigation
export const SLIDES = SLIDE_GROUPS.flat();

// Umrechnungs Funktionen um Position oder Index zu ermitteln.
export function toPos(index: number): { col: number; row: number } {
  let rest = index;
  for (let col = 0; col < SLIDE_GROUPS.length; col++) {
    const len = SLIDE_GROUPS[col].length;
    if (rest < len) return { col, row: rest };
    rest -= len;
  }
  return { col: 0, row: 0 };
}

export function toIndex(col: number, row: number): number {
  let index = 0;
  for (let c = 0; c < col; c++) index += SLIDE_GROUPS[c].length;
  return index + row;
}
