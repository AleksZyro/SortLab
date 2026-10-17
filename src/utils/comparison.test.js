import { describe, it, expect } from 'vitest';
import { runAlgorithm } from './sortAlgorithms';
import { createComparisonTimeline } from './comparison';
describe('synchronised comparison', () => {
  it('uses identical input and holds a completed algorithm while the other continues', () => {
    const input = [1, 2, 3, 4, 5, 6];
    const left = runAlgorithm('bubble', input);
    const right = runAlgorithm('selection', input);
    const timeline = createComparisonTimeline(left, right);
    const firstCompleted = timeline.findIndex((frame) => frame.leftComplete);
    expect(firstCompleted).toBeGreaterThan(0);
    expect(firstCompleted).toBeLessThan(timeline.length - 1);
    expect(timeline[firstCompleted].rightComplete).toBe(false);
    expect(
      timeline.slice(firstCompleted).every((frame) => frame.left === timeline.at(-1).left)
    ).toBe(true);
    expect(timeline.at(-1)).toMatchObject({
      leftProgress: 100,
      rightProgress: 100,
      leftComplete: true,
      rightComplete: true
    });
    expect(timeline[0].left.array).toEqual(input);
    expect(timeline[0].right.array).toEqual(input);
    expect(input).toEqual([1, 2, 3, 4, 5, 6]);
  });
  it.each([{ input: [] }, { input: [7] }, { input: [2, 2, 1] }])(
    'finishes both lanes for $input',
    ({ input }) => {
      const timeline = createComparisonTimeline(
        runAlgorithm('quick', input),
        runAlgorithm('merge', input)
      );
      expect(timeline.at(-1).left.array).toEqual([...input].sort((a, b) => a - b));
      expect(timeline.at(-1).right.array).toEqual([...input].sort((a, b) => a - b));
      expect(timeline.at(-1).leftProgress).toBe(100);
    }
  );
});
