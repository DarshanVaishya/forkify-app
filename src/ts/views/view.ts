import { iconPath } from "../util/config";

export default class View {
	protected parentElement: HTMLElement;
	protected errorMessage: string;
	protected message: string;
	protected data: any;

	render(data: any, render = true): any {
		if (!data || (Array.isArray(data) && data.length === 0))
			return this.renderError();

		this.data = data;
		const markup = this.generateMarkup();

		if (!render) return markup;

		this.clear();
		this.parentElement.insertAdjacentHTML("afterbegin", markup);
	}

	update(data: any) {
		this.data = data;
		const newMarkup = this.generateMarkup();

		const newDOM = document.createRange().createContextualFragment(newMarkup);
		const newEls = Array.from(newDOM.querySelectorAll("*"));
		const curEls = Array.from(this.parentElement.querySelectorAll("*"));

		for (let i = 0; i < curEls.length; i++) {
			if (!newEls[i].isEqualNode(curEls[i])) continue;

			if (newEls[i].firstChild?.nodeValue.trim() !== "")
				curEls[i].textContent = newEls[i].textContent;

			Array.from(newEls[i].attributes).forEach((attr) => {
				curEls[i].setAttribute(attr.name, attr.value);
			});
		}
	}

	clear() {
		this.parentElement.innerHTML = "";
	}

	// TODO: Find how to remove this hack
	generateMarkup(test: any = ""): string {
		throw new Error("generateMarkup not implemented.");
	}

	renderSpinner(): void {
		this.parentElement.innerHTML = this.getSpinnerMarkup();
	}

	renderError(message = this.errorMessage): void {
		this.parentElement.innerHTML = this.getMessageMarkup(message, "error");
	}

	renderMessage(message = this.message): void {
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

	getMessageMarkup(message: string, type = "message"): string {
		return `
				<div class="${type}">
          <div>
            <svg>
              <use href="${iconPath}#icon-${
			type === "message" ? "smile" : "alert-triangle"
		}"></use>
            </svg>
          </div>
          <p>${message}</p>
        </div>
  `;
	}
}
