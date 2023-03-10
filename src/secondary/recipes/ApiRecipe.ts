import { Energy } from 'src/domain/entities/recipe/Energy';

export interface IApiRecipeIngredient {
    name: string;
    quantity: string;
}

export interface IApiRecipe {
    title: string;
    url: string;
    image?: string;
    steps?: ReadonlyArray<string>,
    portions?: number,
    ingredients?: ReadonlyArray<IApiRecipeIngredient>,
    energy?: Energy;
}
