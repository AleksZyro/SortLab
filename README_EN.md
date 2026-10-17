# SortLab

[Deutsch](./README.md) | **English** | [Live demo](https://alekszyro.github.io/SortLab/)

SortLab is an interactive laboratory for sorting algorithms. The React application visualises individual algorithm events, measures comparisons and array writes, and compares two algorithms against the same input dataset.

![SortLab overview](docs/assets/sortlab-demo.png)

A portfolio project by **Aleksandar Nikolić** (**Aleksandar Nikolic**, **AleksZyro**), IMS student from Buchs AG, Switzerland. [Portfolio](https://aleksandar-nikolic.ch/) · [GitHub](https://github.com/AleksZyro) · [Contact](https://aleksandar-nikolic.ch/#contact)

The [demo animation](docs/assets/sortlab-demo.webp) shows the previous interface.

## Features

- controllable visualisation with start, pause, resume, and reset
- distinct states for comparisons, writes, and sorted regions
- adjustable animation speed and array size
- validated custom integer input
- presets for sorted, reversed, duplicate-heavy, and negative datasets
- synchronised animation of two algorithms with identical input, shared speed, start, pause, and reset
- live metrics for comparisons, writes, and swaps
- runtime plus time and space complexity for every algorithm
- responsive, keyboard-accessible interface with reduced-motion support

## Algorithms

| Algorithm      | Best case  | Average case | Worst case | Auxiliary space  | Stable |
| -------------- | ---------- | ------------ | ---------- | ---------------- | ------ |
| Bubble Sort    | O(n)       | O(n²)        | O(n²)      | O(1)             | Yes    |
| Selection Sort | O(n²)      | O(n²)        | O(n²)      | O(1)             | No     |
| Insertion Sort | O(n)       | O(n²)        | O(n²)      | O(1)             | Yes    |
| Merge Sort     | O(n log n) | O(n log n)   | O(n log n) | O(n)             | Yes    |
| Quick Sort     | O(n log n) | O(n log n)   | O(n²)      | O(log n) average | No     |
| Heap Sort      | O(n log n) | O(n log n)   | O(n log n) | O(1)             | No     |

`Writes` counts assignments to the working array. One swap causes two writes. This definition also makes algorithms such as Insertion Sort and Merge Sort comparable when they shift or write values instead of swapping them.

## Architecture

SortLab deliberately separates computation, visualisation, and playback:

```text
Input dataset
    │
    ▼
Sorting algorithm ──► domain events + metrics
                          │
                          ▼
Visualisation adapter ─► immutable UI frames
                          │
                          ▼
Playback reducer ──────► React interface
```

- `src/utils/sortAlgorithms.js` contains UI-independent algorithms and their shared event contract.
- `src/utils/visualization.js` maps domain events to bar-chart highlights.
- `src/hooks/usePlayback.js` owns playback, pause, progress, and timer lifecycle.
- `src/config/algorithms.js` contains explanatory copy and complexity metadata.
- `src/components/` contains `Controls`, `SortVisualizer`, `StatsPanel`, `AlgorithmInfo`, and `ComparisonPanel`. `VisualizerWorkspace` owns single-run state.
- `src/utils/comparison.js` aligns both event sequences on a shared clock and holds shorter sequences at their final frame.
- `src/App.jsx` only manages workspace navigation.

Algorithms never mutate their input. Every run returns a result, metrics, and optional events. Comparison mode uses one timer for both event sequences. A separate run without event capture measures instrumented computation time. Switching workspaces pauses playback.

## Technical Highlights

- **Event-based visualisation:** algorithms know nothing about React or animation speed.
- **Deterministic metrics:** comparisons, writes, and swaps are counted by one instrumentation layer.
- **Controllable animation:** a tested reducer prevents inconsistent start, pause, and completion states.
- **Fair comparison:** both algorithms receive a copy of the same dataset.
- **Robust input:** length, integer format, and value range are validated before execution.
- **Accessibility:** semantic tabs, visible focus states, a skip link, live status, and `prefers-reduced-motion`.
- **Quality gates:** Vitest, ESLint, Prettier, and GitHub Actions validate changes to `main` and pull requests.

The displayed runtime is a browser measurement, not a scientific benchmark. It depends on the device, browser, and current system load.

## Tech Stack

- React 18
- Vite 8
- JavaScript (ES Modules)
- CSS
- Vitest
- ESLint and Prettier
- GitHub Actions and GitHub Pages

## Running Locally

Prerequisite: Node.js 22.13 or newer (or Node.js 24). Use `npm ls --depth=0` to inspect installed versions.

```bash
git clone https://github.com/AleksZyro/SortLab.git
cd SortLab
npm ci
npm run dev
```

Vite then prints the local URL in the terminal.

## Testing

```bash
npm test              # run unit tests once
npm run lint          # static code checks
npm run format:check  # verify formatting
npm run build         # create a production build
npm run check         # run every check in CI order
```

For every algorithm, the test suite covers empty arrays, single values, sorted and reversed data, duplicates, and negative values. It also verifies the event contract, metrics, visualisation adapter, input validation, and playback states.

## Deployment

`.github/workflows/deploy-pages.yml` builds `main` with the `/SortLab/` base path and publishes `dist` to GitHub Pages. A separate CI workflow checks formatting, linting, tests, and the production build.

## What I Learned

The project demonstrates why algorithm logic and animation are separate responsibilities. The event contract makes each run observable without coupling an algorithm to React. Defining metrics precisely was equally important: array writes are more meaningful across different sorting strategies than a vague aggregate movement count.

## Documentation

- [Beginner-friendly German user guide](BENUTZERANLEITUNG.md)
- [MIT License](LICENSE)

## Known Limits

![Synchronised comparison](docs/assets/sortlab-comparison.png)

- Each tick advances one recorded event per lane, not equal CPU work.
- Inputs are limited to 64 integers between −99 and 99; event snapshots require additional memory.
- Bar heights use absolute values; labels and the text description retain signs.
- Insertion Sort highlights a sorted prefix that may still move later.
- Quick Sort uses the last element as pivot: sorted input can require quadratic time and O(n) recursion space.
- Complexity metadata excludes event capture; instrumented timings are not scientific benchmarks.
- Browser interactions are checked manually; automated tests focus on algorithms and state transitions.
