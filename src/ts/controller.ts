import "core-js/stable";
import "regenerator-runtime/runtime";
import "../sass/main.scss";

import * as model from "./model";
import recipeView from "./views/recipeView";
import searchView from "./views/searchView";

// Hack to get icon.svg file name with the contenthash
const iconPath: string = document
	.querySelector(".search__icon")
	.children[0].getAttribute("href")
	.split("#")[0];

async function controlRecipes(): Promise<void> {
	try {
		const id: string = window.location.hash.slice(1);
		if (!id) return;
		recipeView.renderSpinner(iconPath);

		await model.loadRecipe(id);
		recipeView.render(model.state.recipe, iconPath);
	} catch (err) {
		console.error(`${err} - #######################`);
		recipeView.renderError(iconPath);
	}
}

async function controlSearchResults() {
	try {
		const query = searchView.getQuery();
		if (!query) return;

		await model.loadSearchResults(query);
	} catch (err) {
		console.error(`${err} - #######################`);
	}
}

controlSearchResults();

function init() {
	recipeView.addHandlerRender(controlRecipes);
	searchView.addHandlerSearch(controlSearchResults);
}

init();
