import { getRecipeMarkup, getSpinnerMarkup } from "../util/markups";
import { recipeInterface } from "../util/interfaces";

class RecipeView {
	private parentElement = document.querySelector(".recipe");
	private data: recipeInterface;

	render(data: recipeInterface, iconPath: string) {
		this.data = data;
		this.parentElement.innerHTML = getRecipeMarkup(this.data, iconPath);
	}

	renderSpinner(parentEl: HTMLElement, iconPath: string): void {
		parentEl.innerHTML = getSpinnerMarkup(iconPath);
	}

	// TODO: Learn how to give this a type
	addHandlerRender(handler: any) {
		["hashchange", "load"].forEach((event) => {
			window.addEventListener(event, handler);
		});
	}
}

export default new RecipeView();
