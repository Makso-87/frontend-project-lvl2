#!/usr/bin/env node

import { program } from 'commander';

program
    .version('0.0.1')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format [type]', 'output format')
    .arguments('<filepathhh1> <filepathhh2>')
    .action(function (filepathhh1, filepathhh2) {
        filepath1Value = filepathhh1;
        filepath2Value = filepathhh2;
    })
    .parse(process.argv);

console.log(program.args);