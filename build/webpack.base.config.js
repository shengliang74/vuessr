const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

// CSS 提取应该只用于生产环境
// 这样我们在开发过程中仍然可以热重载
const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
	mode: 'development',
	output: {
		path: path.resolve(__dirname, '../dist'),
		publicPath: 't/dis/',
		filename: '[name].[chunkhase].js'
	},
	module: {
		noParse: /es6-promise\.js$/,
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					compilerOptions: {
						preserveWhitespace: false
					},
					extractCSS: isProduction
				}
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: '[name].[ext]?[hash]'
				}
			},
			{
				test: /\.styl(us)?$/,
				use: ['vue-style-loader','css-loader','stylus-loader']
			}
		]
	},
	plugins: isProduction
    // 确保添加了此插件！
    ? [
    	new ExtractTextPlugin({ filename: 'common.[chunkhash].css' }),
    	new VueLoaderPlugin()
    ]
    : [ 
    	new VueLoaderPlugin()
    ]
}