import {
	recipeInterface,
	ingredientsInterface,
	recipePreviewInterface,
} from "./interfaces";

function getIngredientsMarkup(
	ingredients: [object: ingredientsInterface],
	iconPath: string
) {
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

export function getRecipeMarkup(
	recipe: recipeInterface,
	iconPath: string
): string {
	return `
        <figure class="recipe__fig">
          <img src="${recipe.image_url}" alt="${
		recipe.title
	}" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${recipe.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${iconPath}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${
							recipe.cooking_time
						}</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${iconPath}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${
							recipe.servings
						}</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${iconPath}#icon-minus-circle"></use>
                </svg>
              </button>
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${iconPath}#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>

          <div class="recipe__user-generated">
          </div>
          <button class="btn--round">
            <svg class="">
              <use href="${iconPath}#icon-bookmark-fill"></use>
            </svg>
          </button>
        </div>

        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">


						${getIngredientsMarkup(recipe.ingredients, iconPath)}

          </ul>
        </div>

        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${
							recipe.publisher
						}</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="${recipe.source_url}"
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

export function getSpinnerMarkup(iconPath: string): string {
	return `
				<div class="spinner">
          <svg>
            <use href="${iconPath}#icon-loader"></use>
          </svg>
        </div>
  `;
}

export function getErrorMarkup(message: string, iconPath: string): string {
	return `
				<div class="error">
            <div>
              <svg>
                <use href="${iconPath}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
  `;
}

export function getMessageMarkup(message: string, iconPath: string): string {
	return `
				<div class="message">
            <div>
              <svg>
                <use href="${iconPath}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
  `;
}

export function getRecipePreviewMarkup(
	recipe: recipePreviewInterface,
	iconPath: string
) {
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
