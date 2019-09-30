var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyPlugin = require('copy-webpack-plugin');
var es3ifyPlugin = require('es3ify-webpack-plugin');
var CleanCSS = require('clean-css');

module.exports = {
	// 打包入口文件
	entry: {
		app: path.resolve(__dirname, 'src/index.js')
	},
	output: {
		path: path.resolve(__dirname, 'dist', './js'), // 存放打包出的文件路径(绝对路径)
		filename: '[name].bundle.js' // 打包出的文件名
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				options: {
					plugins: [
						'transform-runtime',
						'transform-es3-property-literals',
						'transform-es3-member-expression-literals'
					],
					presets: ['es2015']
				}
			},
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader'
			},
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader', 'sass-loader']
				})
			}
		]
	},
	// 其他解决方案配置
	resolve: {
		//自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
		extensions: [' ', '.js', '.json', '.scss', '.html']
	},
	// 打包时进行压缩
	plugins: [
		// 将css复制到dist下面
		new CopyPlugin([
			{
				from: path.resolve(__dirname, './src/css'),
				to: path.resolve(__dirname, './dist/css'),
				transform: function(content) {
					return new CleanCSS({}).minify(content).styles; //压缩css文件
				}
			}
		]),

		new es3ifyPlugin(),

		new webpack.optimize.UglifyJsPlugin({
			compress: {
				properties: false,
				warnings: false
			},
			mangle: {
				screw_ie8: false
			},
			sourceMap: false
		}),

		// 启用作用域提升（ webpack3提升加载速度）
		new webpack.optimize.ModuleConcatenationPlugin()
	]
};
