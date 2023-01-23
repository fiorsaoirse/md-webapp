import { Observable } from 'rxjs';
import { IngredientId } from 'src/domain/entities/ingredient/types';
import { Recipe } from 'src/domain/entities/recipe/Recipe';
import { RecipeId } from 'src/domain/entities/recipe/types';

export interface IRecipeRepository {
  searchByIngredients(
    ingredients: ReadonlyArray<IngredientId>,
    page?: number
  ): Observable<ReadonlyArray<Recipe>>;

  loadById(id: RecipeId): Observable<Recipe>;
}
