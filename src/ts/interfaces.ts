export interface recipeInterface {
	id: number;
	title: string;
	publisher: string;
	source_url: string;
	image_url: string;
	servings: number;
	cooking_time: number;
	ingredients: object[];
}
