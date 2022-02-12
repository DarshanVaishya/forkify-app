import {
	getRecipeMarkup,
	getSpinnerMarkup,
	getErrorMarkup,
	getMessageMarkup,
} from "../util/markups";
import { recipeInterface } from "../util/interfaces";

export default class View {
	protected parentElement: HTMLElement;
	protected data: recipeInterface;
	protected errorMessage: string;
	protected message: string;

	renderSpinner(iconPath: string): void {
		this.parentElement.innerHTML = getSpinnerMarkup(iconPath);
	}

	renderError(iconPath: string, message: string = this.errorMessage) {
		console.log("RENDER ERROR");
		this.parentElement.innerHTML = getErrorMarkup(message, iconPath);
	}

	renderMessage(iconPath: string, message: string = this.message) {
		this.parentElement.innerHTML = getMessageMarkup(message, iconPath);
	}
}
