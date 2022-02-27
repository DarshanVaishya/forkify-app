import View from "./view";

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

	init() {
		this.addHandlerShowWindow();
		this.addHandlerCloseWindow();
	}

	toggleWindow() {
		this.overlay.classList.toggle("hidden");
		this.window.classList.toggle("hidden");
	}

	addHandlerShowWindow() {
		this.btnOpen.addEventListener("click", this.toggleWindow.bind(this));
	}

	addHandlerCloseWindow() {
		this.btnClose.addEventListener("click", this.toggleWindow.bind(this));
		this.overlay.addEventListener("click", this.toggleWindow.bind(this));
	}
}

export default new AddRecipeView();
