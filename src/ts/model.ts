import { stateInterface, dataInterface } from "./util/interfaces";
import { API_URL } from "./util/config";
import { getJSON } from "./util/helpers";

export const state: stateInterface = {
	recipe: undefined,
};

export async function loadRecipe(id: string) {
	try {
		const data: dataInterface = await getJSON(API_URL + id);
		state.recipe = data.data.recipe;
		console.log(state.recipe);
	} catch (err) {
		console.error(`${err} - #######################`);
		alert(err);
	}
}
