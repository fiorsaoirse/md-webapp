import { InjectionToken } from '@angular/core';

export interface IEnvironment {
    BASE_URL: string;
}

export const ENVIRONMENT = new InjectionToken<IEnvironment>('Currently set env');
