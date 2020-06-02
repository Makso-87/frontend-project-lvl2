#!/usr/bin/env node

import { program } from 'commander';

program
    .version('0.0.1')
    .description('Compares two configuration files and shows a difference.')
    .arguments('<filepath1> <filepath2>')
    .action(function (filepath1, filepath2) {
        filepath1Value = filepath1;
        filepath2Value = filepath2;
    })
    .option('-f, --format [type]', 'output format')
    .parse(process.argv);

console.log(program.args);