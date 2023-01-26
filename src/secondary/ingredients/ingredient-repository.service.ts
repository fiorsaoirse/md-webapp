import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Ingredient } from 'src/domain/entities/ingredient/Ingredient';
import { IIngredientProperties } from 'src/domain/entities/ingredient/types';
import { IIngredientRepository } from 'src/domain/ports/ingredients/ingredient-repository';
import { HttpService } from '../common/http.service';
import { IApiIngredient, IApiIngredients } from './ApiIngredient';

@Injectable({ providedIn: 'root' })
export class IngredientRepositoryService implements IIngredientRepository {
    private static readonly PATH = 'ingredients';

    private static buildUrl(url: string): string {
        return `${this.PATH}/${url}`;
    }

    constructor(private readonly httpService: HttpService) { }

    search(text: string): Observable<ReadonlyArray<Ingredient>> {
        if (!text) {
            return of([]);
        }

        const params = new HttpParams().set('term', text);

        const url = IngredientRepositoryService.buildUrl('search');

        return this.httpService.get<IApiIngredients>(url, params)
            .pipe(
                map(details => details.items),
                map(items => items.map(item => this.toIngredient(item)))
            );
    }

    private toIngredient(from: IApiIngredient): Ingredient {
        const props: IIngredientProperties = {
            id: from.ObjectID,
            name: from.Name
        };

        return Ingredient.fromProperties(props);
    }
}
