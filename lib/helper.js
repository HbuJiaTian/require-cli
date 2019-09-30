const path = require('path');
const fs = require('fs-extra');
const chalk = require('chalk');
const handlebars = require('handlebars');
const exec = require('child_process').execSync;

module.exports = {
	/**
	 * copy folder
	 * @param {String} input 
	 * @param {String} output 
	 * @param {String} suffix 
	 */
	copy(input, output, suffix) {
		if (suffix) {
			input = path.resolve(input, suffix);
			output = path.resolve(output, suffix);
		}
		try {
			fs.copySync(input, output)
			console.info(chalk.blue(' init: ') + output);
		} catch (error) {
			console.error(error);
		}
	},
	/**
	 * echo str > path.
	 *
	 * @param {String} path
	 * @param {String} str
	 */
	write(path, str, mode) {
		try {
			fs.writeFileSync(path, str, {
				mode: mode || 0666
			});
			console.info(chalk.blue(' create: ') + path);
		} catch (error) {
			console.error(err)
		}

	},
	/**
	 * echo file > str.
	 * 
	 * @param {String} path 
	 */
	read(path) {
		return fs.readFileSync(path).toString();
	},
	/**
	 * compile template file
	 * 
	 * @param {String} input 
	 * @param {String} output 
	 * @param {Object} data 
	 */
	compile(input, output, data) {
		try {
			const iptFile = this.read(input);
			const optFile = handlebars.compile(iptFile)(data);
			this.write(output, optFile);
		} catch (error) {
			console.error(error);
		}
	},
	/**
	 * get username
	 */
	getGitUser() {
		let name;
		let email;

		try {
			name = exec('git config --get user.name');
			email = exec('git config --get user.email');
		} catch (e) {}

		name = name && JSON.stringify(name.toString().trim()).slice(1, -1);
		email = email && (' <' + email.toString().trim() + '>');

		return (name || '') + (email || '')
	}
}