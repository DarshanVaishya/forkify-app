import { iconPath } from "../util/config";
import { ingredientsInterface, recipeInterface } from "../util/interfaces";
import View from "./view";

class RecipeView extends View {
	data: recipeInterface;
	parentElement = document.querySelector(".recipe") as HTMLDivElement;
	errorMessage = "We couldn't find that recipe. Please try another one!";
	message = "";

	// TODO: Learn how to give this a type
	addHandlerRender(handler: any): void {
		["hashchange", "load"].forEach((event) => {
			window.addEventListener(event, handler);
		});
	}

	addHandlerUpdateServings(handler: Function) {
		this.parentElement.addEventListener("click", (e: Event) => {
			const target = e.target as HTMLElement;
			const btn = target.closest(".btn--update-servings") as HTMLButtonElement;
			if (!btn) return;

			const updateTo: number = +btn.dataset.updateTo;
			if (updateTo > 0) handler(updateTo);
		});
	}

	addHandlerAddBookmark(handler: Function) {
		this.parentElement.addEventListener("click", (e: Event) => {
			const target = e.target as HTMLElement;
			const btn = target.closest(".btn--bookmark");
			if (!btn) return;
			handler();
		});
	}

	getIngredientsMarkup(ingredients: ingredientsInterface[]): string {
		return ingredients
			.map((ingredient: ingredientsInterface) => {
				return `
					<li class="recipe__ingredient">
						<svg class="recipe__icon">
							<use href="${iconPath}#icon-check"></use>
						</svg>
						<div class="recipe__quantity">${ingredient.quantity || ""}</div>
						<div class="recipe__description">
							<span class="recipe__unit">${ingredient.unit}</span>
							${ingredient.description}
						</div>
					</li>`;
			})
			.join("");
	}

	generateMarkup(): string {
		return `
        <figure class="recipe__fig">
          <img src="${this.data.image_url}" alt="${
			this.data.title
		}" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${this.data.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${iconPath}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${
							this.data.cooking_time
						}</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${iconPath}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${
							this.data.servings
						}</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--update-servings" data-update-to="${
								this.data.servings - 1
							}">
                <svg>
                  <use href="${iconPath}#icon-minus-circle"></use>
                </svg>
              </button>
              <button class="btn--tiny btn--update-servings" data-update-to=${
								this.data.servings + 1
							}>
                <svg>
                  <use href="${iconPath}#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>

          <div class="recipe__user-generated ${this.data.key ? "" : "hidden"}">
						<svg>
							<use href="${iconPath}#icon-user"></use>
						</svg>
          </div>
          <button class="btn--round btn--bookmark">
            <svg class="">
              <use href="${iconPath}#icon-bookmark${
			this.data.bookmarked ? "-fill" : ""
		}"></use>
            </svg>
          </button>
        </div>

        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
						${this.getIngredientsMarkup(this.data.ingredients)}
          </ul>
        </div>

        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${
							this.data.publisher
						}</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="${this.data.source_url}"
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="${iconPath}#icon-arrow-right"></use>
            </svg>
          </a>
        </div>
  `;
	}
}

export default new RecipeView();
