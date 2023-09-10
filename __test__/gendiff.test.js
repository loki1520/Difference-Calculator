import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, './', '__fixtures__', filename);
// const renderResult = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
const renderResult = (file1, file2) => genDiff(getFixturePath(file1), getFixturePath(file2));

const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
const expected = readFile('expectResult.txt');

test('test_1: lines difference in .json format', () => {
  expect(renderResult('file1.json', 'file2.json')).toEqual(expected);
});

test('test_2: lines difference in .yml format', () => {
  expect(renderResult('filepath1.yml', 'filepath2.yml')).toEqual(expected);
});

test('test_3: lines difference in .yml && .json formats', () => {
  expect(renderResult('filepath1.yml', 'file2.json')).toEqual(expected);
});
