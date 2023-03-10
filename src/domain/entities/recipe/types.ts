import { IIngredientProperties } from '../ingredient/types';

export interface IEnergyProperties {
    calories?: number;
    proteins?: number;
    fat?: number;
    carbs?: number;
}

export interface IRecipeProperties {
    name: string;
    url?: string;
    image?: string;
    steps?: ReadonlyArray<string>;
    portions?: number;
    ingredients?: ReadonlyArray<IIngredientProperties>;
    energy?: IEnergyProperties;
}
