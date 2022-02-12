class SearchView {
	private parentElement = document.querySelector(".search") as HTMLDivElement;
	private searchBox = this.parentElement.querySelector(
		".search__field"
	) as HTMLInputElement;

	getQuery(): string {
		const query = this.searchBox.value;
		this.clearInput();
		return query;
	}

	private clearInput() {
		this.searchBox.value = "";
		this.searchBox.blur();
	}

	addHandlerSearch(handler: any): void {
		this.parentElement.addEventListener("submit", (e: Event) => {
			e.preventDefault();
			handler();
		});
	}
}

export default new SearchView();
