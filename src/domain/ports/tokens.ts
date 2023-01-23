import { InjectionToken } from '@angular/core';
import { IIngredientRepository } from './ingredients/ingredient-repository';
import { IRecipeRepository } from './recipes/recipe-repository';

export const IngredientsRepository = new InjectionToken<IIngredientRepository>('Ingredients repository implementation');
export const RecipeRepository = new InjectionToken<IRecipeRepository>('Recipe repository implementation');
