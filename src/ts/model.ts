import { recipeInterface, stateInterface } from "./util/interfaces";

export const state: stateInterface = {
	recipe: undefined,
};

export async function loadRecipe(id: string) {
	try {
		const url: string = "https://forkify-api.herokuapp.com/api/v2/recipes/";
		const response = await fetch(url + id);
		const data = await response.json();
		if (!response.ok) throw new Error(`${data.message} (${response.status})`);

		state.recipe = data.data.recipe;
		console.log(state.recipe);
	} catch (err) {
		alert(err);
	}
}
