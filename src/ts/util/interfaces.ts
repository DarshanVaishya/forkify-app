export interface ingredientsInterface {
	description: string;
	quantity: number;
	unit: string;
}
export interface recipeInterface {
	id: number;
	title: string;
	publisher: string;
	source_url: string;
	image_url: string;
	servings: number;
	cooking_time: number;
	ingredients: [object: ingredientsInterface];
}

export interface recipePreviewInterface {
	id: string;
	image_url: string;
	publisher: string;
	title: string;
}

export interface stateInterface {
	recipe: recipeInterface;
	search: { query: string; results: [recipePreviewInterface] };
}

export interface dataInterface {
	status: string;
	message?: string;
	data?: any;
}
