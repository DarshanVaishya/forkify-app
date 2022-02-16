import {
	stateInterface,
	dataInterface,
	recipePreviewInterface,
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
};

export async function loadRecipe(id: string) {
	try {
		const data: dataInterface = await getJSON(API_URL + id);
		state.recipe = data.data.recipe;
	} catch (err) {
		throw err;
	}
}

export async function loadSearchResults(query: string) {
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

export function updateServings(newServing: number) {
	state.recipe.ingredients.forEach((ingredient) => {
		ingredient.quantity = +(
			(newServing * ingredient.quantity) /
			state.recipe.servings
		).toFixed(2);
	});
	state.recipe.servings = newServing;
}
