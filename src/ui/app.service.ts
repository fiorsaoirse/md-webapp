import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, scan, startWith, Subject } from 'rxjs';
import { Ingredient } from 'src/domain/entities/ingredient/Ingredient';
import { Recipe } from 'src/domain/entities/recipe/Recipe';
import { RecipeId } from 'src/domain/entities/recipe/types';
import { SearchIngredientUseCase } from 'src/primary/ingredients/use-cases/search-ingredient';
import { LoadRecipeUseCase } from 'src/primary/recipes/use-cases/load-recipe';
import { SearchRecipesUseCase } from 'src/primary/recipes/use-cases/search-repice';

@Injectable({ providedIn: 'root' })
export class AppService {

    private readonly selectedIngredients$$: BehaviorSubject<ReadonlyArray<Ingredient>>;
    private readonly recipes$$: Subject<ReadonlyArray<Recipe>>;

    public readonly selectedIngredients$: Observable<ReadonlyArray<Ingredient>>;
    public readonly recipes$: Observable<ReadonlyArray<Recipe>>;

    constructor(private readonly searchIngredientUseCase: SearchIngredientUseCase,
        private readonly loadRecipeUseCase: LoadRecipeUseCase,
        private readonly searchRecipesUseCase: SearchRecipesUseCase) {

        this.selectedIngredients$$ = new BehaviorSubject([] as ReadonlyArray<Ingredient>);
        this.recipes$$ = new Subject();

        this.selectedIngredients$ = this.selectedIngredients$$.asObservable();

        this.recipes$ = this.recipes$$.asObservable()
            .pipe(
                scan((acc, values) => {
                    return acc.concat(values);
                }),
                startWith([])
            );
    }

    addIngredient(item: Ingredient): void {
        const current = this.selectedIngredients$$.getValue();
        const alreadyInSelected = current.find((i) => i.id === item.id);

        if (alreadyInSelected) {
            return;
        }

        this.selectedIngredients$$.next(current.concat(item));
    }

    deleteIngredient(item: Ingredient): void {
        const current = this.selectedIngredients$$.getValue();
        const filtered = current.filter((i) => i.id !== item.id);

        if (filtered.length === current.length) {
            return;
        }

        this.selectedIngredients$$.next(filtered);
    }

    searchIngredient(text: string): Observable<ReadonlyArray<Ingredient>> {
        return this.searchIngredientUseCase.search(text);
    }

    searchRecipes() {

    }

    loadRecipe(id: RecipeId): Observable<Recipe> {
        return this.loadRecipeUseCase.load(id);
    }
}
