#!/usr/bin/env node
// test
import { Command } from 'commander';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1', '-V, --version', 'output the version number')
  .helpOption('-h, --help', 'output usage information')
  .usage('[options] <filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format');

program.parse();
