import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MdBadgeComponent } from 'md-ui-kit/badge';
import { MdButtonComponent } from 'md-ui-kit/button';
import { MdCardComponent } from 'md-ui-kit/card';
import { MdComboBoxModule } from 'md-ui-kit/combo-box';
import { MdCommonModule } from 'md-ui-kit/common';
import { MdLazyObservedDirective } from 'md-ui-kit/lazy-observed';
import { IngredientsRepository, RecipeRepository } from 'src/domain/ports/tokens';
import { ENVIRONMENT } from 'src/secondary/common/environment';
import { IngredientRepositoryService } from 'src/secondary/ingredients/ingredient-repository.service';
import { RecipeRepositoryService } from 'src/secondary/recipes/recipe-repository.service';

import { AppComponent } from './app.component';
import { MD_UI_PROVIDERS } from './app.md-ui.providers';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        MdButtonComponent,
        MdBadgeComponent,
        MdCardComponent,
        MdCommonModule,
        MdComboBoxModule,
        MdLazyObservedDirective
    ],
    providers: [
        { provide: IngredientsRepository, useClass: IngredientRepositoryService },
        { provide: RecipeRepository, useClass: RecipeRepositoryService },
        { provide: ENVIRONMENT, useValue: { BASE_URL: 'http://localhost:3000' } },
        ...MD_UI_PROVIDERS
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
