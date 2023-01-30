import { Injectable } from '@angular/core';
import { BehaviorSubject, map, merge, Observable, scan, Subject, switchMap, withLatestFrom } from 'rxjs';
import { Ingredient } from 'src/domain/entities/ingredient/Ingredient';
import { Recipe } from 'src/domain/entities/recipe/Recipe';
import { RecipeId } from 'src/domain/entities/recipe/types';
import { SearchIngredientUseCase } from 'src/primary/ingredients/use-cases/search-ingredient';
import { LoadRecipeUseCase } from 'src/primary/recipes/use-cases/load-recipe';
import { SearchRecipesUseCase } from 'src/primary/recipes/use-cases/search-repice';

interface IPages {
    current: number;
    total: number | null;
}

@Injectable({ providedIn: 'root' })
export class AppService {

    private readonly pages: IPages;

    private readonly selectedIngredients$$: BehaviorSubject<ReadonlyArray<Ingredient>>;
    private readonly search$$: Subject<void>;
    private readonly reset$$: Subject<void>;

    public readonly selectedIngredients$: Observable<ReadonlyArray<Ingredient>>;
    public readonly recipes$: Observable<ReadonlyArray<Recipe>>;

    constructor(private readonly searchIngredientUseCase: SearchIngredientUseCase,
        private readonly loadRecipeUseCase: LoadRecipeUseCase,
        private readonly searchRecipesUseCase: SearchRecipesUseCase) {

        this.pages = {
            current: 0,
            total: null
        };

        this.selectedIngredients$$ = new BehaviorSubject([] as ReadonlyArray<Ingredient>);
        this.selectedIngredients$ = this.selectedIngredients$$.asObservable();

        this.search$$ = new Subject();
        this.reset$$ = new Subject();

        const add = (recipes: ReadonlyArray<Recipe>) => (state: ReadonlyArray<Recipe>) => state.concat(recipes);
        const clear = () => (_state: ReadonlyArray<Recipe>) => [] as ReadonlyArray<Recipe>;

        this.recipes$ = merge(
            this.search$$.pipe(
                withLatestFrom(this.selectedIngredients$),
                switchMap(([, items]) => {
                    this.pages.current += 1;
                    return this.searchRecipesUseCase.searchRecipes(items, this.pages.current);
                }),
                map(add)
            ),
            this.reset$$.pipe(map(clear))
        ).pipe(
            scan((state, fn) => fn(state), [] as ReadonlyArray<Recipe>)
        );
    }

    addIngredient(item: Ingredient): void {
        const current = this.selectedIngredients$$.getValue();
        const alreadyInSelected = current.find((i) => i.id === item.id);

        if (alreadyInSelected) {
            return;
        }

        this.resetPages();

        this.selectedIngredients$$.next(current.concat(item));
    }

    deleteIngredient(item: Ingredient): void {
        const current = this.selectedIngredients$$.getValue();
        const filtered = current.filter((i) => i.id !== item.id);

        if (filtered.length === current.length) {
            return;
        }

        this.resetPages();

        this.selectedIngredients$$.next(filtered);
    }

    searchIngredient(text: string): Observable<ReadonlyArray<Ingredient>> {
        return this.searchIngredientUseCase.search(text);
    }

    searchRecipes(): void {
        if (this.pages.current === this.pages.total) {
            return;
        }


    }

    loadRecipe(id: RecipeId): Observable<Recipe> {
        return this.loadRecipeUseCase.load(id);
    }

    private resetPages(): void {
        this.pages.current = 0;
        this.pages.total = null;

        this.reset$$.next();
    }
}
