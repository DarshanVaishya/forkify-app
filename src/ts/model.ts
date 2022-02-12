import {
	stateInterface,
	dataInterface,
	recipeInterface,
} from "./util/interfaces";
import { API_URL } from "./util/config";
import { getJSON } from "./util/helpers";

export const state: stateInterface = {
	recipe: undefined,
	search: {
		query: "",
		results: [{}],
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
		console.log(state.search.results);
	} catch (err) {
		throw err;
	}
}
