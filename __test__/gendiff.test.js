import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
const renderResult = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
const expected = readFile('expectResult.js');

test('renderResult must be equal "expectResult.js"', () => {
  expect(renderResult).toEqual(expected);
});
