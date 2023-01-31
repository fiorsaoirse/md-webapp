import { Component } from '@angular/core';
import { MdSelectionEvent } from 'md-ui-kit/combo-box';
import { Observable } from 'rxjs';
import { Ingredient } from 'src/domain/entities/ingredient/Ingredient';
import { Recipe } from 'src/domain/entities/recipe/Recipe';
import { AppService } from './app.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'Magic Dinner';

    ingredients$: Observable<ReadonlyArray<Ingredient>>;
    selectedIngredients$: Observable<ReadonlyArray<Ingredient>>;
    recipes$: Observable<ReadonlyArray<Recipe>>;

    selectedIngredient: Ingredient | null;

    constructor(private readonly appService: AppService) {
        this.selectedIngredients$ = this.appService.selectedIngredients$;
        this.recipes$ = this.appService.recipes$;

        this.ingredients$ = this.appService.searchIngredient('');

        this.selectedIngredient = null;
    }

    searchIngredient(term: string | null): void {
        this.ingredients$ = this.appService.searchIngredient(term ?? '');
    }

    addIngredient(event: MdSelectionEvent<Ingredient, any>): void {
        this.selectedIngredient = null;
        this.appService.addIngredient(event.value!);
    }

    deleteIngredient(item: Ingredient): void {
        this.appService.deleteIngredient(item);
    }

    searchRecipes(): void {
        this.appService.searchRecipes();
    }
}
