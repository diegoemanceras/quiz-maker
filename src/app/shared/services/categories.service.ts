import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Category } from '../models/category';
import { TriviaCategories } from '../models/trivia-categories';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private categoriesUrl = "https://opentdb.com/api_category.php"

  constructor(private httpClient: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.httpClient.get<TriviaCategories>(this.categoriesUrl).pipe(map(x => x.trivia_categories));
  }
}
