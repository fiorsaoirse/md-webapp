import { IngredientId } from 'src/domain/entities/ingredient/types';

export interface IApiRecipesRequest {
    ids: ReadonlyArray<IngredientId>;
    page: number;
}
