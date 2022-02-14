import { iconPath } from "../util/config";

export default class View {
	protected parentElement: HTMLElement;
	protected errorMessage: string;
	protected message: string;
	protected data: any;

	render(data: any): void {
		this.data = data;
		this.parentElement.innerHTML = this.generateMarkup();
	}

	generateMarkup(): string {
		throw new Error("Method not implemented.");
	}

	renderSpinner(): void {
		this.parentElement.innerHTML = this.getSpinnerMarkup();
	}

	renderError(message: string = this.errorMessage): void {
		this.parentElement.innerHTML = this.getErrorMarkup(message);
	}

	renderMessage(message: string = this.message): void {
		this.parentElement.innerHTML = this.getMessageMarkup(message);
	}

	getSpinnerMarkup(): string {
		return `
				<div class="spinner">
          <svg>
            <use href="${iconPath}#icon-loader"></use>
          </svg>
        </div>
  `;
	}

	getErrorMarkup(message: string): string {
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

	getMessageMarkup(message: string): string {
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
