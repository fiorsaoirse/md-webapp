import { Energy } from 'src/domain/entities/recipe/Energy';

export interface IApiRecipeIngredient {
  name: string;
  quantity: string;
}

export interface IApiRecipe {
  id: number;
  name: string;
  url: string;
  steps?: ReadonlyArray<string>,
  portions?: number,
  ingredients?: ReadonlyArray<IApiRecipeIngredient>,
  energy?: Energy;
}
