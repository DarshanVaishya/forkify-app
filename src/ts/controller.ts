import "core-js/stable";
import "regenerator-runtime/runtime";
import "../sass/main.scss";

import { recipeInterface } from "./util/interfaces";
import { getRecipeMarkup, getSpinnerMarkup } from "./util/markup";

const recipeContainer = document.querySelector(".recipe") as HTMLDivElement;

// Hack to get icon.svg file name with the contenthash
export const iconPath: string = document
	.querySelector(".search__icon")
	.children[0].getAttribute("href")
	.split("#")[0];

function timeout(s: number): Promise<void> {
	return new Promise(function (_, reject) {
		setTimeout(function () {
			reject(new Error(`Request took too long! Timeout after ${s} second`));
		}, s * 1000);
	});
}

function renderSpinner(parentEl: HTMLElement): void {
	parentEl.innerHTML = getSpinnerMarkup();
}

async function showRecipe(): Promise<void> {
	try {
		const URL: string = "https://forkify-api.herokuapp.com/api/v2/recipes/";
		const id: string = window.location.hash.slice(1);
		if (!id) return;

		renderSpinner(recipeContainer);

		// Loading recipe from API
		const response = await fetch(URL + id);
		const data = await response.json();
		if (!response.ok) throw new Error(`${data.message} (${response.status})`);

		const recipe: recipeInterface = data.data.recipe;

		// Rendering the recipe
		recipeContainer.innerHTML = getRecipeMarkup(recipe);
	} catch (err) {
		alert(err);
	}
}

["hashchange", "load"].forEach((event) =>
	window.addEventListener(event, showRecipe)
);
