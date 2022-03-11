import View from "./view";
import { iconPath } from "../util/config";

class AddRecipeView extends View {
	parentElement = document.querySelector(".upload") as HTMLFormElement;
	private window = document.querySelector(
		".add-recipe-window"
	) as HTMLDivElement;
	private overlay = document.querySelector(".overlay") as HTMLDivElement;
	private btnOpen = document.querySelector(
		".nav__btn--add-recipe"
	) as HTMLButtonElement;
	private btnClose = document.querySelector(
		".btn--close-modal"
	) as HTMLButtonElement;
	public message = "Recipe was successfully added!";

	init() {
		this.addHandlerShowWindow();
		this.addHandlerHideWindow();
	}

	toggleWindow() {
		this.overlay.classList.toggle("hidden");
		this.window.classList.toggle("hidden");
	}

	addHandlerShowWindow() {
		this.btnOpen.addEventListener("click", () => {
			this.parentElement.innerHTML = this.generateMarkup();
			this.toggleWindow.call(this);
		});
	}

	addHandlerHideWindow() {
		this.btnClose.addEventListener("click", this.toggleWindow.bind(this));
		this.overlay.addEventListener("click", this.toggleWindow.bind(this));
	}

	addHandlerUpload(handler: Function) {
		this.parentElement.addEventListener("submit", (e: SubmitEvent) => {
			e.preventDefault();
			const form = e.target as HTMLFormElement;
			const dataArr = [...new FormData(form)];
			const data = Object.fromEntries(dataArr);
			handler(data);
		});
	}

	generateMarkup() {
		return `
			<form class="upload">
				<div class="upload__column">
					<h3 class="upload__heading">Recipe data</h3>
					<label>Title</label>
					<input value="John Doe's Pizza" required name="title" type="text" />
					<label>Recipe URL</label>
					<input value="https://www.bbcgoodfood.com/recipes/pizza-margherita-4-easy-steps" required name="sourceUrl" type="text" />
					<label>Image URL</label>
					<input value="https://source.unsplash.com/random/?pizza" required name="image" type="text" />
					<label>Publisher</label>
					<input value="BBC" required name="publisher" type="text" />
					<label>Prep time</label>
					<input value="60" required name="cookingTime" type="number" />
					<label>Servings</label>
					<input value="2" required name="servings" type="number" />
				</div>

				<div class="upload__column">
					<h3 class="upload__heading">Ingredients</h3>
					<label>Ingredient 1</label>
					<input
						value="0.5,kg,Flour"
						type="text"
						required
						name="ingredient-1"
						placeholder="Format: 'Quantity,Unit,Description'"
					/>
					<label>Ingredient 2</label>
					<input
						type="text"
						name="ingredient-2"
						placeholder="Format: 'Quantity,Unit,Description'"
					/>
					<label>Ingredient 3</label>
					<input
						type="text"
						name="ingredient-3"
						placeholder="Format: 'Quantity,Unit,Description'"
					/>
					<label>Ingredient 4</label>
					<input
						type="text"
						name="ingredient-4"
						placeholder="Format: 'Quantity,Unit,Description'"
					/>
					<label>Ingredient 5</label>
					<input
						type="text"
						name="ingredient-5"
						placeholder="Format: 'Quantity,Unit,Description'"
					/>
					<label>Ingredient 6</label>
					<input
						type="text"
						name="ingredient-6"
						placeholder="Format: 'Quantity,Unit,Description'"
					/>
				</div>

				<button class="btn upload__btn">
					<svg>
						<use href="${iconPath}#icon-upload-cloud"></use>
					</svg>
					<span>Upload</span>
				</button>
			</form>
		`;
	}
}

export default new AddRecipeView();
