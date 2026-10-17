import { describe, expect, it } from 'vitest';
import { algorithmKeys, runAlgorithm } from './sortAlgorithms';

const cases = [
  { name: 'empty array', input: [], expected: [] },
  { name: 'single item array', input: [7], expected: [7] },
  { name: 'already sorted array', input: [1, 2, 3, 4, 5], expected: [1, 2, 3, 4, 5] },
  { name: 'reverse sorted array', input: [5, 4, 3, 2, 1], expected: [1, 2, 3, 4, 5] },
  { name: 'duplicate values', input: [4, 2, 4, 1, 2], expected: [1, 2, 2, 4, 4] },
  { name: 'negative values', input: [3, -1, 0, -5, 2], expected: [-5, -1, 0, 2, 3] }
];

describe.each(algorithmKeys)('%s sort', (algorithmKey) => {
  it.each(cases)('sorts $name without mutating the input', ({ input, expected }) => {
    const original = [...input];
    const run = runAlgorithm(algorithmKey, input);

    expect(run.result).toEqual(expected);
    expect(input).toEqual(original);
    expect(run.events.at(-1)).toEqual(
      expect.objectContaining({
        type: 'complete',
        array: expected,
        sortedIndices: expected.map((_, index) => index)
      })
    );
    expect(run.stats).toEqual({
      comparisons: expect.any(Number),
      writes: expect.any(Number),
      swaps: expect.any(Number)
    });
  });
});

describe('operation statistics', () => {
  it.each([
    ['bubble', { comparisons: 1, writes: 2, swaps: 1 }],
    ['selection', { comparisons: 1, writes: 2, swaps: 1 }],
    ['merge', { comparisons: 1, writes: 2, swaps: 0 }],
    ['quick', { comparisons: 1, writes: 2, swaps: 1 }],
    ['heap', { comparisons: 1, writes: 2, swaps: 1 }]
  ])('reports deterministic metrics for %s', (algorithmKey, expectedStats) => {
    expect(runAlgorithm(algorithmKey, [2, 1]).stats).toEqual(expectedStats);
  });

  it('counts Insertion Sort shifts and inserts as writes', () => {
    expect(runAlgorithm('insertion', [3, 2, 1]).stats).toEqual({
      comparisons: 3,
      writes: 5,
      swaps: 0
    });
  });

  it('does not count unchanged Insertion Sort positions as writes', () => {
    expect(runAlgorithm('insertion', [1, 2, 3]).stats).toEqual({
      comparisons: 2,
      writes: 0,
      swaps: 0
    });
  });
});

describe('algorithm event contract', () => {
  it('can skip event capture for comparison benchmarks', () => {
    const run = runAlgorithm('merge', [3, 1, 2], { captureEvents: false });

    expect(run.events).toEqual([]);
    expect(run.result).toEqual([1, 2, 3]);
    expect(run.stats.comparisons).toBeGreaterThan(0);
  });

  it('emits immutable snapshots with supported event types', () => {
    const run = runAlgorithm('bubble', [2, 1]);
    const supportedTypes = ['compare', 'swap', 'write', 'mark', 'complete'];

    expect(run.events.every((event) => supportedTypes.includes(event.type))).toBe(true);
    expect(run.events[0].array).toEqual([2, 1]);
    expect(run.events.at(-1).array).toEqual([1, 2]);
  });

  it('rejects unknown algorithm keys', () => {
    expect(() => runAlgorithm('bogus', [2, 1])).toThrow('Unbekannter Sortieralgorithmus');
  });
});
