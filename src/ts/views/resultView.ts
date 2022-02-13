import View from "./view";
import { recipePreviewInterface } from "../util/interfaces";

class ResultView extends View {
	parentElement = document.querySelector(".results") as HTMLUListElement;
	errorMessage = "No recipes found for your query! Please try again!";

	render(results: recipePreviewInterface[], iconPath: string): void {
		this.parentElement.innerHTML = "";
		if (!results || (Array.isArray(results) && results.length === 0))
			this.renderError(iconPath);

		results.forEach((result) => {
			this.parentElement.insertAdjacentHTML(
				"afterbegin",
				this.getRecipePreviewMarkup(result, iconPath)
			);
		});
	}

	getRecipePreviewMarkup(recipe: recipePreviewInterface, iconPath: string) {
		return `
			<li class="preview">
				<a class="preview__link" href="#${recipe.id}">
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
