import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MdButtonComponent } from 'md-ui-kit/button';
import { MdComboBoxModule } from 'md-ui-kit/combo-box';
import { MdCommonModule } from 'md-ui-kit/common';
import { IngredientsRepository, RecipeRepository } from 'src/domain/ports/tokens';
import { IngredientRepositoryService } from 'src/secondary/ingredients/ingredient-repository.service';
import { RecipeRepositoryService } from 'src/secondary/recipes/recipe-repository.service';

import { AppComponent } from './app.component';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        MdButtonComponent,
        MdCommonModule,
        MdComboBoxModule
    ],
    providers: [
        { provide: IngredientsRepository, useClass: IngredientRepositoryService },
        { provide: RecipeRepository, useClass: RecipeRepositoryService }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
