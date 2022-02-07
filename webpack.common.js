/* eslint-disable @typescript-eslint/no-var-requires */
module.exports = {
	entry: "./src/js/controller.ts",

	module: {
		rules: [
			{
				test: /\.html$/i,
				use: ["html-loader"],
			},
			{
				test: /\.tsx?$/,
				use: ["babel-loader", "ts-loader"],
				exclude: /node_modules/,
			},
		],
	},

	resolve: {
		extensions: [".ts", ".js"],
	},
};
