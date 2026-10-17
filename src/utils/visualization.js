const emptyStats = {
  comparisons: 0,
  writes: 0,
  swaps: 0
};

export const createIdleFrame = (array) => ({
  array: [...array],
  compared: [],
  changed: [],
  sorted: [],
  stats: { ...emptyStats, moves: 0, steps: 0 },
  action: 'Bereit'
});

const actionLabels = {
  compare: 'Werte werden verglichen',
  swap: 'Werte werden vertauscht',
  write: 'Wert wird geschrieben',
  mark: 'Sortierter Bereich aktualisiert',
  complete: 'Sortierung abgeschlossen'
};

export const createVisualizationFrames = ({ input, events }) => [
  createIdleFrame(input),
  ...events.map((event) => ({
    array: [...event.array],
    compared: event.type === 'compare' ? [...event.indices] : [],
    changed: ['swap', 'write'].includes(event.type) ? [...event.indices] : [],
    sorted: [...event.sortedIndices],
    stats: {
      ...event.stats,
      moves: event.stats.writes - event.stats.swaps,
      steps: event.stats.comparisons + event.stats.writes - event.stats.swaps
    },
    action: actionLabels[event.type]
  }))
];
