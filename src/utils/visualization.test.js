import { describe, expect, it } from 'vitest';
import { runAlgorithm } from './sortAlgorithms';
import { createIdleFrame, createVisualizationFrames } from './visualization';

describe('visualization adapter', () => {
  it('retains movement and operation step metrics across algorithms', () => {
    const swaps = createVisualizationFrames(runAlgorithm('bubble', [2, 1])).at(-1);
    const writes = createVisualizationFrames(runAlgorithm('insertion', [3, 2, 1])).at(-1);
    expect(swaps.stats).toMatchObject({ moves: 1, steps: 2, writes: 2 });
    expect(writes.stats).toMatchObject({ moves: 5, steps: 8, writes: 5 });
  });
  it('creates a neutral frame without mutating its input', () => {
    const input = [3, 1];
    const frame = createIdleFrame(input);
    input[0] = 99;

    expect(frame.array).toEqual([3, 1]);
    expect(frame.stats).toEqual({ comparisons: 0, writes: 0, swaps: 0, moves: 0, steps: 0 });
  });

  it('maps domain events to UI highlights', () => {
    const frames = createVisualizationFrames(runAlgorithm('bubble', [2, 1]));
    const comparison = frames.find((frame) => frame.compared.length > 0);
    const mutation = frames.find((frame) => frame.changed.length > 0);

    expect(comparison).toEqual(expect.objectContaining({ compared: [0, 1], changed: [] }));
    expect(mutation).toEqual(expect.objectContaining({ compared: [], changed: [0, 1] }));
    expect(frames.at(-1)).toEqual(
      expect.objectContaining({ array: [1, 2], sorted: [0, 1], action: 'Sortierung abgeschlossen' })
    );
  });
});
