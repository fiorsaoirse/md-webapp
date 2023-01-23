import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from 'src/domain/entities/recipe/Recipe';
import { RecipeId } from 'src/domain/entities/recipe/types';
import { IRecipeRepository } from 'src/domain/ports/recipes/recipe-repository';
import { RecipeRepository } from 'src/domain/ports/tokens';

@Injectable({providedIn: 'root'})
export class LoadRecipeUseCase {
    constructor(@Inject(RecipeRepository) private readonly repository: IRecipeRepository) {
    }

    load(id: RecipeId): Observable<Recipe> {
        return this.repository.loadById(id);
    }
}
