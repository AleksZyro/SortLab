export const ARRAY_MIN = 1;
export const ARRAY_MAX = 64;
export const DEFAULT_SIZE = 28;
export const DEFAULT_SPEED = 110;
export const presetOptions = [
  {
    id: 'sorted',
    label: 'Sortiert',
    create: (size) => Array.from({ length: size }, (_, index) => index + 1)
  },
  {
    id: 'reversed',
    label: 'Umgekehrt',
    create: (size) => Array.from({ length: size }, (_, index) => size - index)
  },
  {
    id: 'duplicates',
    label: 'Viele Duplikate',
    create: (size) => Array.from({ length: size }, (_, index) => ((index * 7) % 5) + 1)
  },
  {
    id: 'negative',
    label: 'Negative Werte',
    create: (size) =>
      Array.from({ length: size }, (_, index) => (index % 2 === 0 ? 1 : -1) * ((index * 7) % 41))
  }
];

const randomValue = () => Math.floor(Math.random() * 90) + 10;
export const createRandomArray = (size) => Array.from({ length: size }, randomValue);
