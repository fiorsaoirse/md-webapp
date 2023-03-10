import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IIngredientProperties } from 'src/domain/entities/ingredient/types';
import { Recipe } from 'src/domain/entities/recipe/Recipe';
import { IRecipeProperties } from 'src/domain/entities/recipe/types';
import { IRecipeRepository, IRecipeResponse } from 'src/domain/ports/recipes/recipe-repository';
import { HttpService } from '../common/http.service';
import { IApiRecipe, IApiRecipeIngredient } from './ApiRecipe';
import { IApiRecipesRequest } from './ApiRecipesRequest';
import { IApiRecipesResponse } from './ApiRecipesResponse';

@Injectable({ providedIn: 'root' })
export class RecipeRepositoryService implements IRecipeRepository {
    private static readonly PATH = 'recipes';

    private static buildUrl(url: string = ''): string {
        return `${this.PATH}/${url}`;
    }

    constructor(private readonly httpService: HttpService) { }

    searchByIngredients(ids: readonly number[], page: number): Observable<IRecipeResponse> {
        const url = RecipeRepositoryService.buildUrl();
        const body: IApiRecipesRequest = { ids, page };

        return this.httpService.post<IApiRecipesResponse, IApiRecipesRequest>(url, body)
            .pipe(
                map(response => {
                    return {
                        total: response.total,
                        items: response.items.map(item => this.toDetails(item))
                    };
                })
            );
    }

    load(url: string): Observable<Recipe> {
        return this.httpService.get<IApiRecipe>(url)
            .pipe(
                map(details => this.toDetails(details))
            );
    }

    private toIngredientDetails(from: IApiRecipeIngredient): IIngredientProperties {
        return {
            name: from.name,
            quantity: Number.parseInt(from.quantity)
        };
    }

    private toDetails(from: IApiRecipe): Recipe {
        const props: IRecipeProperties = {
            name: from.title,
            url: from.url,
            image: from.image,
            steps: from.steps,
            portions: from.portions,
            ingredients: from.ingredients?.map(ingredient => this.toIngredientDetails(ingredient)),
            energy: {
                calories: from.energy?.calories,
                carbs: from.energy?.carbs,
                fat: from.energy?.fat,
                proteins: from.energy?.proteins
            }
        };

        return Recipe.fromProperties(props);
    }

}
