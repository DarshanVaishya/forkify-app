/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
	mode: "development",

	output: {
		filename: "[name].bundle.js",
		path: path.resolve(__dirname, "dist"),
		publicPath: "/",
	},

	plugins: [
		new HtmlWebpackPlugin({
			template: "./src/template.html",
		}),
	],

	devServer: {
		watchFiles: ["./src/*"],
	},

	module: {
		rules: [
			{
				test: /\.s?css$/i,
				use: ["style-loader", "css-loader", "sass-loader"],
			},
		],
	},
});
