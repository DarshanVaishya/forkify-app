import { iconPath } from "../util/config";
import { stateSearchInterface } from "../util/interfaces";
import View from "./view";

class PaginationView extends View {
	parentElement = document.querySelector(".pagination") as HTMLDivElement;
	data: stateSearchInterface;

	addHandlerClick(handler: Function): void {
		this.parentElement.addEventListener("click", (e: Event) => {
			const target = e.target as HTMLElement;
			const btn = target.closest("button") as HTMLButtonElement;
			if (!btn) return;

			const goto = +btn.dataset.goto;
			handler(goto);
		});
	}

	generateMarkup(): string {
		const currentPage = this.data.page;
		const numPages = Math.ceil(
			this.data.results.length / this.data.resultsPerPage
		);

		if (currentPage === 1 && numPages > 1) return this.getButton("next");
		if (currentPage === numPages && numPages > 1) return this.getButton("prev");
		if (currentPage < numPages)
			return this.getButton("prev") + this.getButton("next");
		else return "";
	}

	getButton(type: string): string {
		let currentPage = this.data.page;
		return `
			<button data-goto="${
				type === "prev" ? --currentPage : ++currentPage
			}" class="btn--inline pagination__btn--${type}">
				<svg class="search__icon">
					<use href="${iconPath}#icon-arrow-${type === "prev" ? "left" : "right"}"></use>
				</svg>
				<span>Page ${currentPage}</span>
			</button>
		`;
	}
}

export default new PaginationView();
