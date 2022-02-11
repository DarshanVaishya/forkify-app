import {
	getRecipeMarkup,
	getSpinnerMarkup,
	getErrorMarkup,
	getMessageMarkup,
} from "../util/markups";
import { recipeInterface } from "../util/interfaces";

class RecipeView {
	private parentElement = document.querySelector(".recipe");
	private data: recipeInterface;
	private errorMessage =
		"We couldn't find that recipe. Please try another one!";
	private message = "";

	render(data: recipeInterface, iconPath: string) {
		this.data = data;
		this.parentElement.innerHTML = getRecipeMarkup(this.data, iconPath);
	}

	renderSpinner(iconPath: string): void {
		this.parentElement.innerHTML = getSpinnerMarkup(iconPath);
	}

	renderError(iconPath: string, message: string = this.errorMessage) {
		this.parentElement.innerHTML = getErrorMarkup(message, iconPath);
	}

	renderMessage(iconPath: string, message: string = this.message) {
		this.parentElement.innerHTML = getMessageMarkup(message, iconPath);
	}

	// TODO: Learn how to give this a type
	addHandlerRender(handler: any) {
		["hashchange", "load"].forEach((event) => {
			window.addEventListener(event, handler);
		});
	}
}

export default new RecipeView();
