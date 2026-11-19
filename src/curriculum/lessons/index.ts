import { AlgorithmLesson } from '../../types';
import { whatIsAlgorithmLesson } from './whatIsAlgorithm';
import { linearSearchLesson } from './linearSearch';
import { binarySearchLesson } from './binarySearch';
import { bubbleSortLesson } from './bubbleSort';
import { selectionSortLesson } from './selectionSort';
import { insertionSortLesson } from './insertionSort';
import { mergeSortLesson } from './mergeSort';
import { quickSortLesson } from './quickSort';
import { bigOLesson } from './bigO';
import { bstLesson } from './bst';
import { bfsLesson } from './bfs';
import { dfsLesson } from './dfs';
import { dijkstraLesson } from './dijkstra';
import { dpFibonacciLesson } from './dpFibonacci';

export const ALL_LESSONS: AlgorithmLesson[] = [
  whatIsAlgorithmLesson,
  linearSearchLesson,
  binarySearchLesson,
  bubbleSortLesson,
  selectionSortLesson,
  insertionSortLesson,
  mergeSortLesson,
  quickSortLesson,
  bigOLesson,
  bstLesson,
  bfsLesson,
  dfsLesson,
  dijkstraLesson,
  dpFibonacciLesson,
];

export const LESSONS_BY_ID: Record<string, AlgorithmLesson> = {};
ALL_LESSONS.forEach((lesson) => {
  LESSONS_BY_ID[lesson.id] = lesson;
});

export function getLessonById(id: string): AlgorithmLesson | undefined {
  return LESSONS_BY_ID[id];
}

export function getAllLessons(): AlgorithmLesson[] {
  return ALL_LESSONS;
}
