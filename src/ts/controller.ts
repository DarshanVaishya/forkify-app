import "core-js/stable";
import "regenerator-runtime/runtime";
import "../sass/main.scss";

import * as model from "./model";
import recipeView from "./views/recipeView";
import searchView from "./views/searchView";
import resultView from "./views/resultView";

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

async function controlSearchResults(): Promise<void> {
	try {
		resultView.renderSpinner(iconPath);
		const query = searchView.getQuery();
		if (!query) return;

		await model.loadSearchResults(query);
		resultView.render(model.state.search.results, iconPath);
	} catch (err) {
		console.error(`${err} - #######################`);
	}
}

function init() {
	recipeView.addHandlerRender(controlRecipes);
	searchView.addHandlerSearch(controlSearchResults);
}

init();
