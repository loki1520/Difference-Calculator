import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, './', '__fixtures__', filename);
const renderResult = (file1, file2) => genDiff(getFixturePath(file1), getFixturePath(file2));

const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
const expectedFlat = readFile('expectResult.txt').trim();
const expectedNested = readFile('nestedExpectDiff.txt').trim();

test('test_1: flat lines difference in .json format', () => {
  expect(renderResult('file1.json', 'file2.json')).toEqual(expectedFlat);
});

test('test_2: flat lines difference in .yml format', () => {
  expect(renderResult('filepath1.yml', 'filepath2.yml')).toEqual(expectedFlat);
});

test('test_3: flat lines difference in .yml && .json formats', () => {
  expect(renderResult('filepath1.yml', 'file2.json')).toEqual(expectedFlat);
});

test('test_4: check throw new Error: Attention! This file format is not supported!', () => {
  expect(() => renderResult('filepath1.yml', 'filepath.wrong')).toThrow('Attention! This file format is not supported!');
});

test('test_5: nested lines difference in .json format', () => {
  expect(renderResult('nestedFile1.json', 'nestedFile2.json')).toEqual(expectedNested);
});
