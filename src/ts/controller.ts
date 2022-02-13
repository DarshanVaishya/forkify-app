import "core-js/stable";
import "regenerator-runtime/runtime";
import "../sass/main.scss";

import * as model from "./model";
import recipeView from "./views/recipeView";
import searchView from "./views/searchView";
import resultView from "./views/resultView";

const iconPath = new URL("../img/icons.svg", import.meta.url).pathname;

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
		resultView.render(model.getSearchResultsPage(), iconPath);
	} catch (err) {
		console.error(`${err} - #######################`);
	}
}

function init() {
	recipeView.addHandlerRender(controlRecipes);
	searchView.addHandlerSearch(controlSearchResults);
}

init();
