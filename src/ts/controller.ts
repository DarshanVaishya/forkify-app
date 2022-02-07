import "core-js/stable";
import "regenerator-runtime/runtime";
import "../sass/main.scss";
import { recipeInterface } from "./interfaces";

const recipeContainer = document.querySelector(".recipe") as HTMLDivElement;

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
		const response = await fetch(URL);
		const data = await response.json();
		if (!response.ok) throw new Error(`${data.message} (${response.status})`);

		const recipe: recipeInterface = data.data.recipe;
		console.log(recipe);
	} catch (err) {
		alert(err);
	}
}

showRecipe();
