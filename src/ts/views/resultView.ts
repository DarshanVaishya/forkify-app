import View from "./view";
import { recipePreviewInterface } from "../util/interfaces";
import previewView from "./previewView";

class ResultView extends View {
	parentElement = document.querySelector(".results") as HTMLUListElement;
	errorMessage = "No recipes found for your query! Please try again!";

	render(results: recipePreviewInterface[]): void {
		this.parentElement.innerHTML = "";
		// if (!results || (Array.isArray(results) && results.length === 0))
		// 	this.renderError();

		results.forEach((result) => {
			this.parentElement.insertAdjacentHTML(
				"afterbegin",
				previewView.generateMarkup(result)
			);
		});
	}
}

export default new ResultView();
