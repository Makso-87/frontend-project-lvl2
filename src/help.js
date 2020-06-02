import { program } from 'commander';

const runHelp = () => {
    program
        .version('0.0.1')
        .description('Compares two configuration files and shows a difference.')
        .option('-f, --format [type]', 'output format')
        .arguments('<filepath1> <filepath2>')
        .action(function (filepath1, filepath2) {
            filepath1Value = filepath1;
            filepath2Value = filepath2;
        })
        .parse(process.argv);

    console.log(program.args);
}

export default runHelp;

