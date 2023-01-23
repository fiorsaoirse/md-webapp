export interface IApiIngredient {
  Name: string;
  ObjectID: number;
}

export interface IApiIngredients {
  items: ReadonlyArray<IApiIngredient>;
}
