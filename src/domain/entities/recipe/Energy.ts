import { IEnergyProperties } from './types';

export class Energy {
  private constructor(
    readonly calories?: number,
    readonly proteins?: number,
    readonly fat?: number,
    readonly carbs?: number
  ) { }

  static fromProperties(from?: IEnergyProperties): Energy | undefined {
    if (!from) {
      return;
    }

    const { calories, proteins, fat, carbs } = from;
    return new Energy(calories, proteins, fat, carbs);
  }
}
