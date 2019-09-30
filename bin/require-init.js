#!/usr/bin/env node

const program = require('commander');
const inquirer = require('inquirer');
const main = require('../lib/main');
const pkg = require('../package.json');
const hepler = require('../lib/helper');

const version = pkg.version;
const username = hepler.getGitUser();

const questions = [
	{
		name: 'name',
		default: 'require-gitlab',
		message: 'package name:'
	},
	{
		name: 'version',
		default: '1.0.0',
		message: 'version:'
	},
	{
		name: 'description',
		default: 'A project that requirejs of svn to gitlab',
		message: 'description:'
	},
	{
		name: 'license',
		default: 'ISC',
		message: 'license:'
	},
	{
		name: 'author',
		default: username,
		message: 'author:'
	}
];

program
	.version(version)
	.command('init')
	.alias('i')
	.description('Generates new code')
	.action(() => {
		inquirer.prompt(questions).then(answers => {
			main(answers);
		});
	});

program.parse(process.argv);
