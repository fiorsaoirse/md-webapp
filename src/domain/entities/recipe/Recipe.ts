import { Ingredient } from '../ingredient/Ingredient';
import { Energy } from './Energy';
import { IRecipeProperties, RecipeId } from './types';

export class Recipe {
  private constructor(
    readonly id: RecipeId,
    readonly title: string,
    readonly url?: string,
    readonly steps?: ReadonlyArray<string>,
    readonly portions?: number,
    readonly ingredients?: ReadonlyArray<Ingredient>,
    readonly energy?: Energy
  ) { }

  static fromProperties(from: IRecipeProperties): Recipe {
    const { ingredients } = from;
    const energy = Object.keys(from.energy ?? {}).length ? Energy.fromProperties(from.energy) : undefined;

    return new Recipe(
      from.id,
      from.name,
      from.url,
      from.steps,
      from.portions,
      ingredients?.map((ingredient) => Ingredient.fromProperties(ingredient)),
      energy
    );
  }
}
