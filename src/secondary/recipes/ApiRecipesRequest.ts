import { IngredientId } from 'src/domain/entities/ingredient/types';

export interface IApiRecipesRequest {
  includedIngredients: ReadonlyArray<IngredientId>;
  Sorting: 'relevance';
  page: number;
}
