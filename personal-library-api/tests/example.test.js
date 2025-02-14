import { describe, expect, test } from 'vitest';
import filter from './example.js';

describe.skip('Example Test', () => {
  // General Setup

  test('Greater than 10', () => {
    // arrange
    const fn = function greaterThan10(n) {
      return n > 10;
    };
    const arr = [0, 10, 20, 30];
    const expectedOutput = [20, 30];

    // act
    const result = filter(arr, fn);

    // assert
    expect(result).toStrictEqual(expectedOutput);
  });

  test('First Index', () => {
    // arrange
    const fn = function firstIndex(n, i) {
      return i === 0;
    };

    const arr = [1, 2, 3];
    const expectedOutput = [1];

    // act
    const result = filter(arr, fn);

    // assert
    expect(result).toStrictEqual(expectedOutput);
  });
});
