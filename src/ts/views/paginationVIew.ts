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

		if (currentPage === 1 && numPages > 1) {
			return this.getNextButton(currentPage);
		}

		if (currentPage === numPages && numPages > 1) {
			return this.getPrevButton(currentPage);
		}

		if (currentPage < numPages) {
			return this.getPrevButton(currentPage) + this.getNextButton(currentPage);
		}
	}

	getPrevButton(currentPage: number): string {
		return `
			<button class="btn--inline pagination__btn--prev">
				<svg class="search__icon">
					<use href="${iconPath}#icon-arrow-left"></use>
				</svg>
				<span>Page ${currentPage - 1}</span>
			</button>
		`;
	}

	getNextButton(currentPage: number): string {
		return `
			<button class="btn--inline pagination__btn--next">
				<svg class="search__icon">
					<use href="${iconPath}#icon-arrow-right"></use>
				</svg>
				<span>Page ${currentPage + 1}</span>
			</button>
		`;
	}
}

export default new PaginationView();
