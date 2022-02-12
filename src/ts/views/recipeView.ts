import { recipeInterface } from "../util/interfaces";
import { getRecipeMarkup } from "../util/markups";
import View from "./view";

class RecipeView extends View {
	parentElement = document.querySelector(".recipe") as HTMLDivElement;
	errorMessage = "We couldn't find that recipe. Please try another one!";
	message = "";

	render(data: recipeInterface, iconPath: string) {
		this.data = data;
		this.parentElement.innerHTML = getRecipeMarkup(this.data, iconPath);
	}

	// TODO: Learn how to give this a type
	addHandlerRender(handler: any) {
		["hashchange", "load"].forEach((event) => {
			window.addEventListener(event, handler);
		});
	}
}

export default new RecipeView();
