import View from "./view";
import previewView from "./previewView";

class BookmarksView extends View {
	parentElement = document.querySelector(
		".bookmarks__list"
	) as HTMLUListElement;
	errorMessage = "No bookmarks yet! Find a nice recipe and bookmark it :)";

	addHandlerRender(handler) {
		window.addEventListener("load", handler);
	}

	generateMarkup() {
		return this.data
			.map((bookmark) => previewView.render(bookmark, false))
			.join("");
	}
}

export default new BookmarksView();
