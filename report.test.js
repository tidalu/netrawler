const { sortPages } = require('./report.js');
const { test, expect } = require('@jest/globals');

test('sortPages 2 pages', () => {
  const input = {
    'https://wagslane.dev': 53,
    'https://wagslane.dev/path': 3,
  };
  const actual = sortPages(input);
  const expected = [
    ['https://wagslane.dev', 53],
    ['https://wagslane.dev/path', 3],
  ];
  expect(actual).toEqual(expected);
});


test('sortPages 13 pages', () => {
  const input = {
    'https://wagslane.dev': 53,
    'https://wagslane.dev/path1': 103,
    'https://wagslane.dev/path2': 30,
    'https://wagslane.dev/path3': 33,
    'https://wagslane.dev/path4': 23,
    'https://wagslane.dev/path5': 13,
    'https://wagslane.dev/path6': 4,
    'https://wagslane.dev/path66': 2,
    'https://wagslane.dev/path3': 1,
    'https://wagslane.dev/path21': 36,
    'https://wagslane.dev/path34': 32,
    'https://wagslane.dev/path23': 33,
    'https://wagslane.dev/path00': 34,
  };
  const actual = sortPages(input);
  const expected = [
    ['https://wagslane.dev/path1', 103],
    ['https://wagslane.dev', 53],
    ['https://wagslane.dev/path21', 36],
    ['https://wagslane.dev/path00', 34],
    ['https://wagslane.dev/path23', 33],
    ['https://wagslane.dev/path34', 32],
    ['https://wagslane.dev/path2', 30],
    ['https://wagslane.dev/path4', 23],
    ['https://wagslane.dev/path5', 13],
    ['https://wagslane.dev/path6', 4],
    ['https://wagslane.dev/path66', 2],
    ['https://wagslane.dev/path3', 1],
  ];
  expect(actual).toEqual(expected);
});
