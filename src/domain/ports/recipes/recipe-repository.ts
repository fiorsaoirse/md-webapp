import { Observable } from 'rxjs';
import { IngredientId } from 'src/domain/entities/ingredient/types';
import { Recipe } from 'src/domain/entities/recipe/Recipe';

export interface IRecipeResponse {
    total: number | null;
    items: ReadonlyArray<Recipe>;
}

export interface IRecipeRepository {
    searchByIngredients(ids: ReadonlyArray<IngredientId>, page?: number): Observable<IRecipeResponse>;
    load(url: string): Observable<Recipe>;
}
