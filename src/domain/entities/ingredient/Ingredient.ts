import { Unit } from './enums';
import { IIngredientProperties, IngredientId } from './types';

export class Ingredient {
    private constructor(
        readonly name: string,
        readonly id?: IngredientId,
        readonly quantity?: number,
        readonly unit?: Unit
    ) { }

    static fromProperties(from: IIngredientProperties): Ingredient {
        const { id, name, quantity, unit } = from;
        return new Ingredient(name, id, quantity, unit);
    }

    public multiply(multiplier = 1): void {

    }
}
