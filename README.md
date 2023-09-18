### Hexlet tests and linter status:
[![Actions Status](https://github.com/loki1520/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/loki1520/frontend-project-46/actions)
[![Node CI](https://github.com/loki1520/frontend-project-46/actions/workflows/nodejs.yml/badge.svg?branch=main)](https://github.com/loki1520/frontend-project-46/actions/workflows/nodejs.yml)
[![Maintainability](https://api.codeclimate.com/v1/badges/68738663e1d4805a9776/maintainability)](https://codeclimate.com/github/loki1520/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/68738663e1d4805a9776/test_coverage)](https://codeclimate.com/github/loki1520/frontend-project-46/test_coverage)


# Difference Calculator
### Description:
This CLI tool allows you to compare two files and figure out what the difference.
JSON and YAML(YML) formats are supported.

---
#### Required NodeJS version:

v18.0.0

---
#### Installation:

```
$ git clone https://github.com/loki1520/frontend-project-46.git
$ cd frontend-project-46
$ make install
```
---
### How to use:
Enter ```gendiff -h``` to view a small help for usage

```Usage: gendiff [options] <filepath1> <filepath2>
Compares two configuration files and shows a difference.

Options:
  -V, --version        output the version number
  -f, --format <type>  Output format
  -h, --help           output usage information
```

The program can display differences in three formats:
* stylish (default)
* plain
* json


To specify data output type, you must add this type name with the flag -f: (-f plain, -f json, -f stylish(default))

For example, below is the output in flat **plain** format of calculating the differences between two files:

```
gendiff -f plain file1.json file2.json

Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]
```
#### Presents
You can use ```gendiff``` to find the difference both for flat and nested YAML/JSON files.
