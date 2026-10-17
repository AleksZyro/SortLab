import { createVisualizationFrames } from './visualization';
export function createComparisonTimeline(leftRun, rightRun) {
  const left = createVisualizationFrames(leftRun);
  const right = createVisualizationFrames(rightRun);
  const length = Math.max(left.length, right.length);
  return Array.from({ length }, (_, index) => ({
    left: left[Math.min(index, left.length - 1)],
    right: right[Math.min(index, right.length - 1)],
    leftProgress: Math.round(Math.min(index / (left.length - 1), 1) * 100),
    rightProgress: Math.round(Math.min(index / (right.length - 1), 1) * 100),
    leftComplete: index >= left.length - 1,
    rightComplete: index >= right.length - 1
  }));
}
