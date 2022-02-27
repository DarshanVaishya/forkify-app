export interface ingredientsInterface {
	description: string;
	quantity: number;
	unit: string;
}
export interface recipeInterface {
	id: string;
	title: string;
	publisher: string;
	source_url: string;
	image_url: string;
	servings: number;
	cooking_time: number;
	ingredients: ingredientsInterface[];
	bookmarked: boolean;
}

export interface recipePreviewInterface {
	id: string;
	image_url: string;
	publisher: string;
	title: string;
}

export interface stateSearchInterface {
	query: string;
	results: recipePreviewInterface[];
	page: number;
	resultsPerPage: number;
}

export interface stateInterface {
	recipe: recipeInterface;
	search: stateSearchInterface;
	bookmarks: recipeInterface[];
}

export interface dataInterface {
	status: string;
	message?: string;
	data?: any;
}

export interface newRecipeInterface {
	cookingTime: string;
	image: string;
	publisher: string;
	servings: string;
	sourceUrl: string;
	title: string;
	"ingredient-1": string;
	"ingredient-2": string;
	"ingredient-3": string;
	"ingredient-4": string;
	"ingredient-5": string;
	"ingredient-6": string;
}
