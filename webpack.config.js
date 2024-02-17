const path = require('path');

const HtmlWebpackPlugin    = require('html-webpack-plugin');
const CopyPlugin           = require('copy-webpack-plugin');
const CssMinimizerPlugin   = require('css-minimizer-webpack-plugin');
const TerserPlugin         = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


const fs = require('fs');

const envPath = path.resolve(__dirname, '.env');

if (fs.existsSync(envPath)) {

	const envFileContent = fs.readFileSync(envPath, 'utf8');

	envFileContent.split('\n').forEach(line => {

		if (line.trim() !== '' && !line.startsWith('#')) {

			const [key, value] = line.split('=');

			process.env[key.trim()] = value.trim();
		}
	});
}


module.exports = () => {

	console.log('node env: ', process.env.ENVIRONMENT);
	console.log('node env base : ', process.env.BASE);
	return {
		entry: './src/main.js',

		mode: process.env.ENVIRONMENT == 'staging' ? 'production' : process.env.ENVIRONMENT,
		devtool: 'source-map',

		output: {
			path: path.resolve(__dirname, 'build'),
			filename: 'bundle.js',
			publicPath: process.env.BASE
		},
		watchOptions: {
			poll: true,
			ignored: '/node_modules/'
		},

		resolve: {

			extensions: ['.js']
		},
		optimization: {
			minimize:true,

			minimizer: [
				new CssMinimizerPlugin(),
				new TerserPlugin()
			]
		},

		module: {
			rules: [
				{

					test: /\.js$/,

					use: {
						loader: 'babel-loader'
					},

					exclude: /node_modules/
				},

				{
					test: /\.(sa|sc|c)ss$/,

					use: [
						MiniCssExtractPlugin.loader,
						'css-loader',
						'sass-loader', 

					]
				},

			]
		},
		plugins: 

	[

		new HtmlWebpackPlugin({
			template: './src/index.html',
			filename: 'index.html',
			'base': process.env.BASE
		}),

		new MiniCssExtractPlugin({

			filename: '[name].css',
			chunkFilename: '[id].css',


		}),
		new CopyPlugin({
			patterns: [

				{
					from: path.resolve(__dirname, 'src/assets/img'),
					to: 'assets/img'
				},

			]
		}),
	],
	};

};

