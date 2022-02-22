import View from "./view";
import { recipePreviewInterface } from "../util/interfaces";

class PreviewView extends View {
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

export default new PreviewView();
