import { Component } from '@angular/core';
import { isNil } from 'md-ui-kit/utils';
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
    title = 'mdw';

    ingredients$: Observable<ReadonlyArray<Ingredient>>;
    selectedIngredients$: Observable<ReadonlyArray<Ingredient>>;
    recipes$: Observable<ReadonlyArray<Recipe>>;

    constructor(private readonly appService: AppService) {
        this.selectedIngredients$ = this.appService.selectedIngredients$;
        this.recipes$ = this.appService.recipes$;

        this.ingredients$ = this.appService.searchIngredient('');
    }


    log(): void {

    }

    search(term: string | null): void {
        console.log(term);

        if (isNil(term)) {
            return;
        }

        this.ingredients$ = this.appService.searchIngredient(term);
    }

    selected(a: any): void { }
}
