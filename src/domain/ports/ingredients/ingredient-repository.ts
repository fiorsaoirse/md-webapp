import { Observable } from 'rxjs';
import { Ingredient } from 'src/domain/entities/ingredient/Ingredient';

export interface IIngredientRepository {
  search(text: string): Observable<ReadonlyArray<Ingredient>>;
}
