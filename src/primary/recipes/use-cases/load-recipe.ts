import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from 'src/domain/entities/recipe/Recipe';
import { IRecipeRepository } from 'src/domain/ports/recipes/recipe-repository';
import { RecipeRepository } from 'src/domain/ports/tokens';

@Injectable({ providedIn: 'root' })
export class LoadRecipeUseCase {
    constructor(@Inject(RecipeRepository) private readonly repository: IRecipeRepository) {
    }

    load(url: string): Observable<Recipe> {
        return this.repository.load(url);
    }
}
