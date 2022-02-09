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

export interface stateInterface {
	recipe: recipeInterface;
}

export interface dataInterface {
	status: string;
	message?: string;
	data?: any;
}
