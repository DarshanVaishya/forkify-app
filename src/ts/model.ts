import {
	stateInterface,
	dataInterface,
	recipePreviewInterface,
	recipeInterface,
	newRecipeInterface,
	ingredientsInterface,
} from "./util/interfaces";
import { API_KEY, API_URL, RESULTS_PER_PAGE } from "./util/config";
import { getJSON, sendJSON } from "./util/helpers";

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
		const data: dataInterface = await getJSON(`${API_URL}${id}?${API_KEY}`);
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

		const data: dataInterface = await getJSON(
			`${API_URL}?search=${query}&key=${API_KEY}`
		);

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

export async function uploadRecipe(newRecipe: newRecipeInterface) {
	try {
		const ingredients = Object.entries(newRecipe)
			.filter((entry) => entry[0].startsWith("ingredient") && entry[1] !== "")
			.map((ing) => {
				const ingArr: [number, string, string] = ing[1]
					.replaceAll(" ", "")
					.split(",");

				if (ingArr.length !== 3 || ingArr[2] === "")
					throw new Error("Invalid format given for ingredients");

				let [quantity, unit, description] = ingArr;

				quantity = quantity ? +quantity : null;
				const data: ingredientsInterface = {
					description,
					quantity,
					unit,
				};

				return data;
			});

		const uploadData: recipeInterface = {
			cooking_time: +newRecipe.cookingTime,
			servings: +newRecipe.servings,
			image_url: newRecipe.image,
			source_url: newRecipe.sourceUrl,
			publisher: newRecipe.publisher,
			title: newRecipe.title,
			ingredients: ingredients,
			bookmarked: false,
			id: "placeholder",
		};
		const data = await sendJSON(`${API_URL}?key=${API_KEY}`, uploadData);
		state.recipe = data;
		addBookmark(state.recipe);
		state.recipe.key = API_KEY;
	} catch (err) {
		console.error(err);
		throw err;
	}
}

function init() {
	const data = localStorage.getItem("bookmarks");
	if (!data) return;
	state.bookmarks = JSON.parse(data);
}

init();
