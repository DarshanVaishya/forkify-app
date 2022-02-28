import View from "./view";
import previewView from "./previewView";

class ResultView extends View {
	parentElement = document.querySelector(".results") as HTMLUListElement;
	errorMessage = "No recipes found for your query! Please try again!";

	generateMarkup() {
		return this.data
			.map((result) => previewView.render(result, false))
			.join("");
	}
}

export default new ResultView();
