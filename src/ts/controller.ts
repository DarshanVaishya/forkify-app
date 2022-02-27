import "core-js/stable";
import "regenerator-runtime/runtime";
import "../sass/main.scss";

import * as model from "./model";
import recipeView from "./views/recipeView";
import searchView from "./views/searchView";
import resultView from "./views/resultView";
import paginationView from "./views/paginationVIew";
import bookmarkView from "./views/bookmarksView";
import addRecipeView from "./views/addRecipeView";
import { newRecipeInterface } from "./util/interfaces";

async function controlRecipes(): Promise<void> {
	try {
		const id = window.location.hash.slice(1);
		if (!id) return;
		recipeView.renderSpinner();

		resultView.render(model.getSearchResultsPage(model.state.search.page));
		bookmarkView.render(model.state.bookmarks);
		await model.loadRecipe(id);
		recipeView.render(model.state.recipe);
	} catch (err) {
		console.error(`${err} - #######################`);
		recipeView.renderError();
	}
}

async function controlSearchResults(): Promise<void> {
	try {
		resultView.renderSpinner();
		const query = searchView.getQuery();
		if (!query) return;

		await model.loadSearchResults(query);
		resultView.render(model.getSearchResultsPage());
		paginationView.render(model.state.search);
	} catch (err) {
		console.error(`${err} - #######################`);
	}
}

function controlPagination(page: number): void {
	resultView.render(model.getSearchResultsPage(page));
	paginationView.render(model.state.search);
}

function controlServings(newServings: number): void {
	model.updateServings(newServings);
	recipeView.update(model.state.recipe);
}

function controlAddBookmark() {
	if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
	else model.deleteBookmark(model.state.recipe.id);
	recipeView.update(model.state.recipe);
	bookmarkView.render(model.state.bookmarks);
}

async function controlAddRecipe(newRecipe: newRecipeInterface) {
	try {
		await model.uploadRecipe(newRecipe);
	} catch (err) {
		console.error(`${err} - #####################3`);
		addRecipeView.renderError(err.message);
	}
}

function init(): void {
	recipeView.addHandlerRender(controlRecipes);
	recipeView.addHandlerUpdateServings(controlServings);
	recipeView.addHandlerAddBookmark(controlAddBookmark);
	searchView.addHandlerSearch(controlSearchResults);
	paginationView.addHandlerClick(controlPagination);
	addRecipeView.init();
	addRecipeView.addHandlerUpload(controlAddRecipe);
}

init();
