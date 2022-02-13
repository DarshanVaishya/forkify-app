import { recipeInterface } from "../util/interfaces";

export default class View {
	protected parentElement: HTMLElement;
	protected data: recipeInterface;
	protected errorMessage: string;
	protected message: string;

	renderSpinner(iconPath: string): void {
		this.parentElement.innerHTML = this.getSpinnerMarkup(iconPath);
	}

	renderError(iconPath: string, message: string = this.errorMessage) {
		this.parentElement.innerHTML = this.getErrorMarkup(message, iconPath);
	}

	renderMessage(iconPath: string, message: string = this.message) {
		this.parentElement.innerHTML = this.getMessageMarkup(message, iconPath);
	}

	getSpinnerMarkup(iconPath: string): string {
		return `
				<div class="spinner">
          <svg>
            <use href="${iconPath}#icon-loader"></use>
          </svg>
        </div>
  `;
	}

	getErrorMarkup(message: string, iconPath: string): string {
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

	getMessageMarkup(message: string, iconPath: string): string {
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
}
