/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
	mode: "production",

	output: {
		filename: "[name].[contenthash].bundle.js",
		path: path.resolve(__dirname, "dist"),
		assetModuleFilename: "./img/[name].[contenthash].[ext]",
		clean: true,
	},

	plugins: [new MiniCssExtractPlugin({ filename: "[name].[contenthash].css" })],

	module: {
		rules: [
			{
				test: /\.s?css$/i,
				use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
			},
			{
				test: /\.m?js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env"],
					},
				},
			},
		],
	},

	optimization: {
		minimizer: [
			new CssMinimizerPlugin(),
			new TerserPlugin(),
			new HtmlWebpackPlugin({
				template: "./src/template.html",
				minify: true,
				inject: "body",
			}),
		],
	},
});
