import "core-js/stable";
import "regenerator-runtime/runtime";
import "../sass/main.scss";

import * as model from "./model";
import recipeView from "./views/recipeView";

const recipeContainer = document.querySelector(".recipe") as HTMLDivElement;

// Hack to get icon.svg file name with the contenthash
export const iconPath: string = document
	.querySelector(".search__icon")
	.children[0].getAttribute("href")
	.split("#")[0];

async function controlRecipes(): Promise<void> {
	try {
		const id: string = window.location.hash.slice(1);
		if (!id) return;
		recipeView.renderSpinner(recipeContainer);

		await model.loadRecipe(id);
		recipeView.render(model.state.recipe);
	} catch (err) {
		console.error(`${err} - #######################`);
		recipeContainer.innerHTML = "";
	}
}

function init() {
	recipeView.addHandlerRender(controlRecipes);
}

init();
