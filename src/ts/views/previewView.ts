import View from "./view";
import { recipePreviewInterface } from "../util/interfaces";
import { iconPath } from "../util/config";

class PreviewView extends View {
	generateMarkup(recipe: recipePreviewInterface): string {
		const id = window.location.hash.slice(1);

		return `
			<li class="preview">
				<a class="preview__link ${
					this.data.id === id ? "preview__link--active" : ""
				}" href="#${this.data.id}">
					<figure class="preview__fig">
						<img src="${this.data.image_url}" alt="${this.data.title}" />
					</figure>
					<div class="preview__data">
						<h4 class="preview__title">${this.data.title}</h4>
						<p class="preview__publisher">${this.data.publisher}</p>
						<div class="preview__user-generated ${this.data.key ? "" : "hidden"}">
							<svg>
								<use href="${iconPath}#icon-user"></use>
							</svg>
						</div>
					</div>
				</a>
		</li>
		`;
	}
}

export default new PreviewView();
