import { Component, OnInit } from '@angular/core';
import { MealService } from '../../core/services/meal.service';
import { Meal } from 'src/app/core/models/meal.model';
import { Category } from 'src/app/core/models/category.model';
import { SearchHistoryService } from 'src/app/core/services/search-history.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-meal-search',
  templateUrl: './meal-search.component.html',
  styleUrls: ['./meal-search.component.css']
})
export class MealSearchComponent implements OnInit{
  searchTerm: string = '';
  selectedCategory: string = '';
  categories: Category[] = [];
  searchResults: Meal[] = [];
  isSelectedText:boolean=false;
  query: string = "";
  type: string = "";

  constructor(
    private mealService: MealService, 
    private searchHistoryService: SearchHistoryService,
    private route: ActivatedRoute,
    private router: Router) {}

  ngOnInit(): void {
    this.loadCategories();
    this.query = this.route.snapshot.queryParamMap.get('q') || "";
    this.type = this.route.snapshot.queryParamMap.get('type') || "";
    if (this.query) {
      this.search(this.query, this.type);
    }
  }

  loadCategories() {
    this.mealService.getCategories().subscribe(categories => {
      this.categories = categories.categories;
    },
    error => {
      console.error('Error consulta de categorias:', error);
    });
  }

  search(query: string, type: string) {
    if (type == "1") {
      this.searchTerm = query;
      this.searchByName(false);
    } else {
      this.selectedCategory = query;
      this.searchByCategory(false);
    }
  }

  searchByName(save=true) {
    if (this.searchTerm.length==0) {
      alert("Ingrese un texto para buscar");
      return;
    }
    this.isSelectedText=true;
    this.selectedCategory = "";
    this.mealService.searchMealsByName(this.searchTerm).subscribe(meals => {
      if (meals.meals)
        this.searchResults = meals.meals;
      else 
        this.searchResults = [];
    },
    error => {
      console.error('Error consulta de platillos:', error);
    });
    if (save)
      this.saveSearch(this.searchTerm, 1);
  }

  searchByCategory(save=true) {
    this.removeFilter();
    this.mealService.getMealsByCategory(this.selectedCategory).subscribe(meals => {
      if (meals.meals){
        this.searchResults = meals.meals;
        this.searchResults.forEach(meal => {
          meal.strCategory = this.selectedCategory;
        });
      }
      else 
        this.searchResults = [];
    },
    error => {
      console.error('Error consulta de platillos:', error);
    });
    if (save)
      this.saveSearch(this.selectedCategory, 2);
  }

  removeFilter() {
    this.searchTerm = "";
    this.isSelectedText=false;    
  }

  saveSearch(query: string, type: number) {
    var item = {query:query, type:type};
    this.searchHistoryService.saveSearch(item);
  }

  goHistory() {
    this.router.navigate(['/history']);
  }

}
