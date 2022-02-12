import View from "./view";
import { recipePreviewInterface } from "../util/interfaces";
import { getRecipePreviewMarkup } from "../util/markups";

class ResultView extends View {
	parentElement = document.querySelector(".results") as HTMLUListElement;
	errorMessage = "No recipes found for your query! Please try again!";

	render(results: recipePreviewInterface[], iconPath: string): void {
		this.parentElement.innerHTML = "";
		console.log(this.parentElement);

		if (!results || (Array.isArray(results) && results.length === 0)) {
			console.log("IN THE IF CONDITION");
			this.renderError(iconPath);
		}

		results.forEach((result) => {
			this.parentElement.insertAdjacentHTML(
				"afterbegin",
				getRecipePreviewMarkup(result, iconPath)
			);
		});
	}
}

export default new ResultView();
