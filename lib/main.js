const path = require('path');
const ora = require('ora');
const chalk = require('chalk');
const figlet = require('figlet');
const helper = require('./helper');

/**
 *
 * @param {Ooject} options {name, version, description, author, license, isCloud}
 *
 */
function main(options) {
	const { name } = options;
	const spinner = ora();

	const output = `${process.cwd()}/${name}`;

	spinner.start('Init project:\n');

	try {
		//copy app
		helper.copy(path.resolve(__dirname, './../template'), output, 'src');
		//copy description file
		helper.copy(path.resolve(__dirname, './../template', 'desc'), output);
		//copy config
		helper.copy(
			path.resolve(__dirname, './../template'),
			output,
			'webpack.config.js'
		);

		//create gitignore
		//fix: npm will automatically ignore .gitignore files
		helper.compile(
			path.resolve(__dirname, './../template/gitignore.hbs'),
			path.resolve(output, '.gitignore'),
			options
		);
		//create README.md
		helper.compile(
			path.resolve(__dirname, './../template/README.hbs'),
			path.resolve(output, 'README.md'),
			options
		);
		//create package.json
		helper.compile(
			path.resolve(__dirname, './../template/package.hbs'),
			path.resolve(output, 'package.json'),
			options
		);

		spinner.succeed('Project initialization finished!\n');

		//print start message
		console.log('To get started:\n');
		console.log(chalk.yellow(`cd ${name} && npm i\n`));
		console.log(chalk.yellow('npm run build\n'));
	} catch (error) {
		spinner.fail();
		console.error(error);
	}
}

module.exports = main;
