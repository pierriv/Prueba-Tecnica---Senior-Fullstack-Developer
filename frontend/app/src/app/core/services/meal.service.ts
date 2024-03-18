import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Meal } from '../models/meal.model';
import { Category } from '../models/category.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MealService {
  public apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  searchMealsByName(name: string): Observable<Meal> {
    return this.http.get<Meal>(`${this.apiUrl}/search.php?s=${name}`);
  }

  getCategories(): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrl}/categories.php`);
  }

  getMealsByCategory(category: string): Observable<Meal> {
    return this.http.get<Meal>(`${this.apiUrl}/filter.php?c=${category}`);
  }

  getMealById(id: string): Observable<Meal> {
    return this.http.get<Meal>(`${this.apiUrl}/lookup.php?i=${id}`);
  }
}