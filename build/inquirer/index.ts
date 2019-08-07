const shell = require('shelljs');
const inquirer = require('inquirer');
const chalk = require('chalk');

const question = [
    {
        type: 'list',
        name: 'compile',
        message: 'What do you want to compile?',
        choices: ['docs - 文档', 'components - 组件', 'all - 全部']
    }
];
/**
 * 编译源码
 * answers 用户所选答案
 */
async function compile(answers) {

    // 编译什么项目
    let command = '';

    switch (answers.compile) {

        case 'docs - 文档':
            command = 'npm run build:docs'
            break;

        case 'components - 组件':
            command = 'npm run build:components'
            break;

        case 'all - 全部':
            command = 'npm run build:docs'
            break;

        default:
            break;
    }

    console.log(`${chalk.blue('Start compiling...')}`);

    shell.exec(command, {
        silent: true, // true 不会回显控制台
    }, (code, stdout, stderr) => {
        console.log(stdout);
    })
}

inquirer.prompt(question)
    .then((answers) => {
        for (let item of question)
            console.log(`${chalk.green(item.message)}：${chalk.red(answers[item.name])}`);
        compile(answers);
    });
