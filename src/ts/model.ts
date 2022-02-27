import {
	stateInterface,
	dataInterface,
	recipePreviewInterface,
	recipeInterface,
} from "./util/interfaces";
import { API_URL, RESULTS_PER_PAGE } from "./util/config";
import { getJSON } from "./util/helpers";

export const state: stateInterface = {
	recipe: undefined,
	search: {
		query: undefined,
		results: undefined,
		page: 1,
		resultsPerPage: RESULTS_PER_PAGE,
	},
	bookmarks: [],
};

export async function loadRecipe(id: string) {
	try {
		const data: dataInterface = await getJSON(API_URL + id);
		state.recipe = data.data.recipe;

		if (state.bookmarks.some((recipe) => recipe.id === id))
			state.recipe.bookmarked = true;
		else state.recipe.bookmarked = false;
	} catch (err) {
		throw err;
	}
}

export async function loadSearchResults(query: string): Promise<void> {
	try {
		state.search.query = query;

		const data: dataInterface = await getJSON(`${API_URL}?search=${query}`);
		state.search.results = data.data.recipes;
	} catch (err) {
		throw err;
	}
}

export function getSearchResultsPage(page = 1): recipePreviewInterface[] {
	const start = (page - 1) * RESULTS_PER_PAGE;
	let end = page * RESULTS_PER_PAGE;

	if (!state.search.results) return [];
	if (end > state.search.results.length) end = state.search.results.length;
	state.search.page = page;

	return state.search.results.slice(start, end);
}

export function updateServings(newServing: number): void {
	state.recipe.ingredients.forEach((ingredient) => {
		ingredient.quantity = +(
			(newServing * ingredient.quantity) /
			state.recipe.servings
		).toFixed(2);
	});
	state.recipe.servings = newServing;
}

export function persistBookmarks() {
	localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
}

export function addBookmark(recipe: recipeInterface): void {
	state.bookmarks.push(recipe);
	if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
	persistBookmarks();
}

export function deleteBookmark(id: string) {
	const index = state.bookmarks.findIndex((recipe) => recipe.id === id);
	state.bookmarks.splice(index, 1);
	if (id === state.recipe.id) state.recipe.bookmarked = false;
	persistBookmarks();
}

function init() {
	const data = localStorage.getItem("bookmarks");
	if (!data) return;
	state.bookmarks = JSON.parse(data);
}

init();
