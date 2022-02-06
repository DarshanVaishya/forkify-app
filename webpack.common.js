/* eslint-disable @typescript-eslint/no-var-requires */
module.exports = {
	entry: "./src/js/controller.js",

	module: {
		rules: [
			{
				test: /\.html$/i,
				use: ["html-loader"],
			},
		],
	},
};
