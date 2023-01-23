import { IIngredientProperties } from '../ingredient/types';

export type RecipeId = number;

export interface IEnergyProperties {
  calories?: number;
  proteins?: number;
  fat?: number;
  carbs?: number;
}

export interface IRecipeProperties {
  id: number;
  name: string;
  url?: string;
  steps?: ReadonlyArray<string>;
  portions?: number;
  ingredients?: ReadonlyArray<IIngredientProperties>;
  energy?: IEnergyProperties;
}
