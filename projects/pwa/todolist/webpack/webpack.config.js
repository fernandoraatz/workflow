/*
|--------------------------------------------------------------------------
| Webpack Config
|--------------------------------------------------------------------------
*/

// Import

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const RmDist = require('./plugin');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// Paths

const PATHS = {
	src: path.join(__dirname, '../src'),
	build: path.resolve(__dirname, '../dist')
}

// Export

module.exports = {
	entry: {
		'app_bundle': [`${PATHS.src}/js/app.js`],
		'service_worker': [`${PATHS.src}/js/services/sv.js`]
	},
	devtool: 'inline-source-map',
	output: {
		filename: '[name].js',
        path: PATHS.build
  },
    module: {
        rules: [
          {
            test: /\.(jpg|png|svg)$/,
            use: { loader: 'url-loader'}
          },
					{
						test: /\.css$/,
						use: ExtractTextPlugin.extract({
							fallback: 'style-loader',
							use: [
								{
									loader: 'css-loader'
								}
							]
						})
					},
					{
					test: /\.js$/,
					exclude: /(node_modules|bower_components)/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env']
						}
					}
				}
        ]
      },
      plugins: [
				new HtmlWebpackPlugin({ title: 'TW Webpack', template: `${PATHS.src}/index.html` }),
				new RmDist({ path: PATHS.build }),
				new webpack.NamedModulesPlugin(),
				// new webpack.HotModuleReplacementPlugin(),
				new ExtractTextPlugin('style-bundle.css')

      ]

}
