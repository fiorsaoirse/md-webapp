import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ENVIRONMENT, IEnvironment } from './environment';

type Options = {
  headers?: HttpHeaders;
  observe?: 'body';
  params?: HttpParams;
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
};

@Injectable({ providedIn: 'root' })
export class HttpService {
  private readonly baseUrl: string;

  constructor(
    private readonly httpClient: HttpClient,
    @Inject(ENVIRONMENT) private readonly env: IEnvironment
  ) {
    if (!env.BASE_URL) {
      throw new Error('Application base url has not been set!');
    }

    this.baseUrl = env.BASE_URL;
  }

  private static setOptions(params?: HttpParams, config: Options = {}): Options {
    return {
      ...config,
      params,
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      responseType: 'json',
    };
  }

  get<T>(path: string, params?: HttpParams): Observable<T> {
    return this.httpClient.get<T>(`${this.baseUrl}${path}`, HttpService.setOptions(params));
  }

  post<T, W extends any>(path: string, data: W, params?: HttpParams): Observable<T> {
    return this.httpClient.post<T>(`${this.baseUrl}${path}`, data, HttpService.setOptions(params));
  }
}
