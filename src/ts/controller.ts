import "core-js/stable";
import "regenerator-runtime/runtime";
import "../sass/main.scss";

import { recipeInterface } from "./interfaces";
import { getRecipeMarkup } from "./markup";

const recipeContainer = document.querySelector(".recipe") as HTMLDivElement;

// Hack to get icon.svg file name with the contenthash
const iconPath: string = document
	.querySelector(".search__icon")
	.children[0].getAttribute("href")
	.split("#")[0];
console.log(iconPath);

function timeout(s: number) {
	return new Promise(function (_, reject) {
		setTimeout(function () {
			reject(new Error(`Request took too long! Timeout after ${s} second`));
		}, s * 1000);
	});
}

// const URL = "https://forkify-api.herokuapp.com/v2";

const URL =
	"https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886";

async function showRecipe() {
	try {
		// Loading recipe from API
		const response = await fetch(URL);
		const data = await response.json();
		if (!response.ok) throw new Error(`${data.message} (${response.status})`);

		const recipe: recipeInterface = data.data.recipe;

		// Rendering the recipe
		recipeContainer.innerHTML = getRecipeMarkup(recipe, iconPath);
	} catch (err) {
		alert(err);
	}
}

showRecipe();
