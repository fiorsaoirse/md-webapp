import { IApiRecipe } from './ApiRecipe';

export interface IApiRecipesResponse {
  total: number;
  items: ReadonlyArray<IApiRecipe>;
}
