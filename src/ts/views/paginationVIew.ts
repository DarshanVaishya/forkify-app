import { iconPath } from "../util/config";
import { stateSearchInterface } from "../util/interfaces";
import View from "./view";

class PaginationView extends View {
	parentElement = document.querySelector(".pagination") as HTMLDivElement;
	data: stateSearchInterface;

	generateMarkup() {
		const currentPage = this.data.page;
		const numPages = Math.ceil(
			this.data.results.length / this.data.resultsPerPage
		);

		if (currentPage === 1 && numPages > 1) return this.getButton("next");
		if (currentPage === numPages && numPages > 1) return this.getButton("prev");
		if (currentPage < numPages)
			return this.getButton("prev") + this.getButton("next");
	}

	getButton(type: string): string {
		const currentPage = this.data.page;
		return `
			<button class="btn--inline pagination__btn--${type}">
				<svg class="search__icon">
					<use href="${iconPath}#icon-arrow-${type === "prev" ? "left" : "right"}"></use>
				</svg>
				<span>Page ${type === "prev" ? currentPage - 1 : currentPage + 1}</span>
			</button>
		`;
	}
}

export default new PaginationView();
