import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ingredient } from 'src/domain/entities/ingredient/Ingredient';
import { IIngredientRepository } from 'src/domain/ports/ingredients/ingredient-repository';
import { IngredientsRepository } from 'src/domain/ports/tokens';

@Injectable({providedIn: 'root'})
export class SearchIngredientUseCase {
    constructor(@Inject(IngredientsRepository) private readonly repository: IIngredientRepository) {
    }

    search(text: string): Observable<ReadonlyArray<Ingredient>> {
        return this.repository.search(text);
    }
}
