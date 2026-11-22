# SortLab

[Deutsch](./README.md) | **English** | [Live demo](https://alekszyro.github.io/SortLab/)

SortLab is an interactive laboratory for sorting algorithms. The React application visualises individual algorithm events, measures comparisons and array writes, and compares two algorithms against the same input dataset.

![SortLab overview](docs/assets/sortlab-demo.png)

Use a preset or enter up to 64 integers from −99 to 99. Pause, resume or compare two algorithms on the same input. Each tick advances one recorded event per side.

## Algorithms

| Algorithm      | Best case  | Average case | Worst case | Auxiliary space  | Stable |
| -------------- | ---------- | ------------ | ---------- | ---------------- | ------ |
| Bubble Sort    | O(n)       | O(n²)        | O(n²)      | O(1)             | Yes    |
| Selection Sort | O(n²)      | O(n²)        | O(n²)      | O(1)             | No     |
| Insertion Sort | O(n)       | O(n²)        | O(n²)      | O(1)             | Yes    |
| Merge Sort     | O(n log n) | O(n log n)   | O(n log n) | O(n)             | Yes    |
| Quick Sort     | O(n log n) | O(n log n)   | O(n²)      | O(log n) average | No     |
| Heap Sort      | O(n)       | O(n log n)   | O(n log n) | O(1)             | No     |

A swap counts as two writes to the working array. The table describes the sorting procedure alone. Animation snapshots use additional memory. With all values equal, each heap repair stops at the root. Quick Sort uses the last value as pivot and can need O(n) stack space on sorted input. Timings include instrumentation and depend on the browser and device.

## Run locally

Node.js 22.13+ or 24.

```sh
npm ci
npm run dev
```

`npm run check` runs Prettier, ESLint, Vitest and the Vite build.

[User guide (German)](BENUTZERANLEITUNG.md) · [Portfolio](https://aleksandar-nikolic.ch/) · [MIT](LICENSE)
