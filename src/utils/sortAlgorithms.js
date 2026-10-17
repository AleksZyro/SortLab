const createStats = () => ({
  comparisons: 0,
  writes: 0,
  swaps: 0
});

const sortedRange = (length) => Array.from({ length }, (_, index) => index);
const sortedTail = (length, count) =>
  Array.from({ length: count }, (_, offset) => length - count + offset);

const createInstrumentation = (source, { captureEvents = true } = {}) => {
  const array = [...source];
  const stats = createStats();
  const events = [];

  const emit = (type, indices = [], sortedIndices = []) => {
    if (!captureEvents) {
      return;
    }

    events.push({
      type,
      indices: [...indices],
      sortedIndices: [...sortedIndices].sort((left, right) => left - right),
      array: [...array],
      stats: { ...stats }
    });
  };

  return {
    array,
    stats,
    events,
    compare(indices, sortedIndices = []) {
      stats.comparisons += 1;
      emit('compare', indices, sortedIndices);
    },
    swap(leftIndex, rightIndex, sortedIndices = []) {
      if (leftIndex === rightIndex) {
        return;
      }

      [array[leftIndex], array[rightIndex]] = [array[rightIndex], array[leftIndex]];
      stats.swaps += 1;
      stats.writes += 2;
      emit('swap', [leftIndex, rightIndex], sortedIndices);
    },
    write(index, value, sortedIndices = []) {
      array[index] = value;
      stats.writes += 1;
      emit('write', [index], sortedIndices);
    },
    mark(sortedIndices) {
      emit('mark', [], sortedIndices);
    },
    finish() {
      emit('complete', [], sortedRange(array.length));

      return {
        result: [...array],
        stats: { ...stats },
        events
      };
    }
  };
};

const bubbleSort = (source, options) => {
  const recorder = createInstrumentation(source, options);
  const { array } = recorder;

  for (let end = array.length - 1; end > 0; end -= 1) {
    let changed = false;
    const finalizedCount = array.length - 1 - end;

    for (let index = 0; index < end; index += 1) {
      const sortedIndices = sortedTail(array.length, finalizedCount);
      recorder.compare([index, index + 1], sortedIndices);

      if (array[index] > array[index + 1]) {
        recorder.swap(index, index + 1, sortedIndices);
        changed = true;
      }
    }

    recorder.mark(sortedTail(array.length, array.length - end));
    if (!changed) {
      break;
    }
  }

  return recorder.finish();
};

const selectionSort = (source, options) => {
  const recorder = createInstrumentation(source, options);
  const { array } = recorder;

  for (let start = 0; start < array.length; start += 1) {
    let minimumIndex = start;

    for (let index = start + 1; index < array.length; index += 1) {
      recorder.compare([minimumIndex, index], sortedRange(start));
      if (array[index] < array[minimumIndex]) {
        minimumIndex = index;
      }
    }

    recorder.swap(start, minimumIndex, sortedRange(start));
    recorder.mark(sortedRange(start + 1));
  }

  return recorder.finish();
};

const insertionSort = (source, options) => {
  const recorder = createInstrumentation(source, options);
  const { array } = recorder;

  for (let index = 1; index < array.length; index += 1) {
    const value = array[index];
    let position = index - 1;

    while (position >= 0) {
      recorder.compare([position, position + 1], sortedRange(index));
      if (array[position] <= value) {
        break;
      }

      recorder.write(position + 1, array[position], sortedRange(index));
      position -= 1;
    }

    const targetIndex = position + 1;
    if (targetIndex !== index) {
      recorder.write(targetIndex, value, sortedRange(index + 1));
    } else {
      recorder.mark(sortedRange(index + 1));
    }
  }

  return recorder.finish();
};

const mergeSort = (source, options) => {
  const recorder = createInstrumentation(source, options);
  const { array } = recorder;
  const auxiliary = [...array];

  const merge = (start, middle, end) => {
    for (let index = start; index <= end; index += 1) {
      auxiliary[index] = array[index];
    }

    let leftIndex = start;
    let rightIndex = middle + 1;

    for (let writeIndex = start; writeIndex <= end; writeIndex += 1) {
      if (leftIndex > middle) {
        recorder.write(writeIndex, auxiliary[rightIndex]);
        rightIndex += 1;
      } else if (rightIndex > end) {
        recorder.write(writeIndex, auxiliary[leftIndex]);
        leftIndex += 1;
      } else {
        recorder.compare([leftIndex, rightIndex]);
        if (auxiliary[leftIndex] <= auxiliary[rightIndex]) {
          recorder.write(writeIndex, auxiliary[leftIndex]);
          leftIndex += 1;
        } else {
          recorder.write(writeIndex, auxiliary[rightIndex]);
          rightIndex += 1;
        }
      }
    }
  };

  const sort = (start, end) => {
    if (start >= end) {
      return;
    }

    const middle = Math.floor((start + end) / 2);
    sort(start, middle);
    sort(middle + 1, end);
    merge(start, middle, end);
  };

  sort(0, array.length - 1);
  return recorder.finish();
};

const quickSort = (source, options) => {
  const recorder = createInstrumentation(source, options);
  const { array } = recorder;
  const finalized = new Set();
  const finalizedIndices = () => Array.from(finalized);

  const partition = (low, high) => {
    const pivotValue = array[high];
    let storeIndex = low;

    for (let index = low; index < high; index += 1) {
      recorder.compare([index, high], finalizedIndices());
      if (array[index] < pivotValue) {
        recorder.swap(index, storeIndex, finalizedIndices());
        storeIndex += 1;
      }
    }

    recorder.swap(storeIndex, high, finalizedIndices());
    finalized.add(storeIndex);
    recorder.mark(finalizedIndices());
    return storeIndex;
  };

  const sort = (low, high) => {
    if (low > high) {
      return;
    }

    if (low === high) {
      finalized.add(low);
      recorder.mark(finalizedIndices());
      return;
    }

    const pivotIndex = partition(low, high);
    sort(low, pivotIndex - 1);
    sort(pivotIndex + 1, high);
  };

  sort(0, array.length - 1);
  return recorder.finish();
};

const heapSort = (source, options) => {
  const recorder = createInstrumentation(source, options);
  const { array } = recorder;
  const finalized = new Set();
  const finalizedIndices = () => Array.from(finalized);

  const heapify = (heapSize, rootIndex) => {
    let currentRoot = rootIndex;

    while (true) {
      const leftChild = currentRoot * 2 + 1;
      const rightChild = leftChild + 1;
      let largest = currentRoot;

      if (leftChild < heapSize) {
        recorder.compare([largest, leftChild], finalizedIndices());
        if (array[leftChild] > array[largest]) {
          largest = leftChild;
        }
      }

      if (rightChild < heapSize) {
        recorder.compare([largest, rightChild], finalizedIndices());
        if (array[rightChild] > array[largest]) {
          largest = rightChild;
        }
      }

      if (largest === currentRoot) {
        return;
      }

      recorder.swap(currentRoot, largest, finalizedIndices());
      currentRoot = largest;
    }
  };

  for (let start = Math.floor(array.length / 2) - 1; start >= 0; start -= 1) {
    heapify(array.length, start);
  }

  for (let end = array.length - 1; end > 0; end -= 1) {
    recorder.swap(0, end, finalizedIndices());
    finalized.add(end);
    recorder.mark(finalizedIndices());
    heapify(end, 0);
  }

  if (array.length > 0) {
    finalized.add(0);
    recorder.mark(finalizedIndices());
  }

  return recorder.finish();
};

export const algorithmMap = {
  bubble: bubbleSort,
  selection: selectionSort,
  insertion: insertionSort,
  merge: mergeSort,
  quick: quickSort,
  heap: heapSort
};

export const algorithmKeys = Object.keys(algorithmMap);

export const runAlgorithm = (algorithmKey, source, options = {}) => {
  const algorithm = algorithmMap[algorithmKey];
  if (!algorithm) {
    throw new Error(`Unbekannter Sortieralgorithmus: ${algorithmKey}`);
  }

  const run = algorithm(source, options);
  return {
    algorithmKey,
    input: [...source],
    ...run
  };
};

export const summarizeAlgorithmRun = (algorithmKey, source) => {
  const start = performance.now();
  const run = runAlgorithm(algorithmKey, source, { captureEvents: false });
  const end = performance.now();

  return {
    key: algorithmKey,
    ...run.stats,
    runtimeMs: Number((end - start).toFixed(2)),
    resultArray: run.result
  };
};
