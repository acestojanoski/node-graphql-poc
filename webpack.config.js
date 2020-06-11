const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

const envVars = require('dotenv').config({
	path: `./config/environment/.env.${process.env.POC_ENV}`,
});

if (envVars.error) {
	throw envVars.error;
}

module.exports = {
	mode: 'production',
	entry: path.resolve(__dirname, 'src', 'server.js'),
	target: 'node',
	externals: [nodeExternals()],
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'api.bundle.js',
	},
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
						plugins: ['@babel/plugin-transform-runtime'],
					},
				},
			},
		],
	},
	plugins: [new webpack.EnvironmentPlugin(envVars.parsed)],
};
