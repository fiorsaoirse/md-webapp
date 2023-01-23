import { Unit } from './enums';

export type IngredientId = number;

export interface IIngredientProperties {
  id?: number;
  name: string;
  quantity?: number;
  unit?: Unit;
}
