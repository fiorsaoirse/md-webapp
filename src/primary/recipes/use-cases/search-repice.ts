import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ingredient } from 'src/domain/entities/ingredient/Ingredient';
import { Recipe } from 'src/domain/entities/recipe/Recipe';
import { IRecipeRepository } from 'src/domain/ports/recipes/recipe-repository';
import { RecipeRepository } from 'src/domain/ports/tokens';

@Injectable({ providedIn: 'root' })
export class SearchRecipesUseCase {
    constructor(@Inject(RecipeRepository) private readonly repository: IRecipeRepository) {
    }

    searchRecipes(ingredients: ReadonlyArray<Ingredient>, page: number = 0): Observable<ReadonlyArray<Recipe>> {
        const ids = ingredients.map(ingredient => ingredient.id).filter(Boolean) as number[];
        return this.repository.searchByIngredients(ids, page);
    }
}
