import View from "./view";
import { recipePreviewInterface } from "../util/interfaces";
import previewView from "./previewView";

class BookmarksView extends View {
	parentElement = document.querySelector(
		".bookmarks__list"
	) as HTMLUListElement;
	errorMessage = "No bookmarks yet! Find a nice recipe and bookmark it :)";

	render(results: recipePreviewInterface[]): void {
		if (!results || (Array.isArray(results) && results.length === 0)) {
			this.renderError();
			return;
		}

		this.parentElement.innerHTML = "";

		results.forEach((result) => {
			this.parentElement.insertAdjacentHTML(
				"afterbegin",
				previewView.generateMarkup(result)
			);
		});
	}
}

export default new BookmarksView();
