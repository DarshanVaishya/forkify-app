import { getRecipeMarkup, getSpinnerMarkup } from "../util/markups";
import { recipeInterface } from "../util/interfaces";

class RecipeView {
	private parentElement = document.querySelector(".recipe");
	private data: recipeInterface;

	render(data: recipeInterface) {
		this.data = data;
		this.parentElement.innerHTML = getRecipeMarkup(this.data);
	}

	renderSpinner(parentEl: HTMLElement): void {
		parentEl.innerHTML = getSpinnerMarkup();
	}
}

export default new RecipeView();
