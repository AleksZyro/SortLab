export const algorithmContent = {
  bubble: {
    title: 'Bubble Sort',
    summary:
      'Vergleicht benachbarte Werte und lässt grössere Werte schrittweise nach rechts wandern.',
    bestCase: 'O(n)',
    averageCase: 'O(n²)',
    worstCase: 'O(n²)',
    spaceComplexity: 'O(1)',
    stability: 'Stabil'
  },
  selection: {
    title: 'Selection Sort',
    summary: 'Sucht im unsortierten Bereich jeweils das kleinste Element und platziert es vorne.',
    bestCase: 'O(n²)',
    averageCase: 'O(n²)',
    worstCase: 'O(n²)',
    spaceComplexity: 'O(1)',
    stability: 'Nicht stabil'
  },
  insertion: {
    title: 'Insertion Sort',
    summary:
      'Baut einen sortierten Bereich auf und fügt jedes neue Element an der passenden Stelle ein.',
    bestCase: 'O(n)',
    averageCase: 'O(n²)',
    worstCase: 'O(n²)',
    spaceComplexity: 'O(1)',
    stability: 'Stabil'
  },
  merge: {
    title: 'Merge Sort',
    summary:
      'Teilt das Array rekursiv, sortiert die Teilbereiche und führt sie stabil wieder zusammen.',
    bestCase: 'O(n log n)',
    averageCase: 'O(n log n)',
    worstCase: 'O(n log n)',
    spaceComplexity: 'O(n)',
    stability: 'Stabil'
  },
  quick: {
    title: 'Quick Sort',
    summary: 'Partitioniert das Array um ein Pivot-Element und sortiert die Teilbereiche rekursiv.',
    bestCase: 'O(n log n)',
    averageCase: 'O(n log n)',
    worstCase: 'O(n²)',
    spaceComplexity: 'O(log n) im Mittel',
    stability: 'Nicht stabil'
  },
  heap: {
    title: 'Heap Sort',
    summary:
      'Baut einen Max-Heap auf und verschiebt das grösste Element wiederholt ans Array-Ende.',
    bestCase: 'O(n log n)',
    averageCase: 'O(n log n)',
    worstCase: 'O(n log n)',
    spaceComplexity: 'O(1)',
    stability: 'Nicht stabil'
  }
};
