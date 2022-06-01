import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Article, NewsResponse } from '../interfaces/news.interface';
import { map } from 'rxjs/operators';
// Constantes
const apiKey = environment.apiKey;

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  constructor(private http: HttpClient) {} // Inject the http service

  getNews(): Observable<Article[]> {// The data that I will get its an array of Articles
    return this.http
      .get<NewsResponse>(`https://newsapi.org/v2/top-headlines?`, {
        params: {
          // This is the params of the http request
          apiKey: apiKey, // apiKey that need the http
          country: 'us', // I can filter by country
        },
      })
      .pipe(map((resp) => resp.articles)); // Map to modify the response to filter the Articles
  }
  getCategories():Observable<string[]>{
    return this.http.get<string[]>('../../assets/data/categories.json')
  }
  getNewByCategory(category:string):Observable<Article[]>{
    return this.http
      .get<NewsResponse>(`https://newsapi.org/v2/top-headlines?`, {
        params: {
          // This is the params of the http request
          apiKey: apiKey, // apiKey that need the http
          country: 'us', // I can filter by country
          category:category, // Filter by category
        },
      })
      .pipe(map((resp) => resp.articles)); // Map to modify the response to filter the Articles
  }
}
