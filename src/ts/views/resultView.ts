import View from "./view";
import { recipePreviewInterface } from "../util/interfaces";

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
				this.generateMarkup(result)
			);
		});
	}

	generateMarkup(recipe: recipePreviewInterface): string {
		const id = window.location.hash.slice(1);

		return `
			<li class="preview">
				<a class="preview__link ${
					id === recipe.id ? "preview__link--active" : ""
				}" href="#${recipe.id}">
					<figure class="preview__fig">
						<img src="${recipe.image_url}" alt="${recipe.title}" />
					</figure>
					<div class="preview__data">
						<h4 class="preview__title">${recipe.title}</h4>
						<p class="preview__publisher">${recipe.publisher}</p>
					</div>
				</a>
			</li>
		`;
	}
}

export default new ResultView();
