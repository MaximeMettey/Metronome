import { TimeSignature } from '@/types';

export const TIME_SIGNATURES: TimeSignature[] = [
  { beats: 2, noteValue: 4, name: '2/4' },
  { beats: 3, noteValue: 4, name: '3/4' },
  { beats: 4, noteValue: 4, name: '4/4' },
  { beats: 5, noteValue: 4, name: '5/4' },
  { beats: 6, noteValue: 4, name: '6/4' },
  { beats: 7, noteValue: 4, name: '7/4' },
  { beats: 3, noteValue: 8, name: '3/8' },
  { beats: 5, noteValue: 8, name: '5/8' },
  { beats: 6, noteValue: 8, name: '6/8' },
  { beats: 7, noteValue: 8, name: '7/8' },
  { beats: 9, noteValue: 8, name: '9/8' },
  { beats: 12, noteValue: 8, name: '12/8' },
  { beats: 2, noteValue: 2, name: '2/2' },
  { beats: 3, noteValue: 2, name: '3/2' },
];

export const DEFAULT_TIME_SIGNATURE = TIME_SIGNATURES[2]; // 4/4
