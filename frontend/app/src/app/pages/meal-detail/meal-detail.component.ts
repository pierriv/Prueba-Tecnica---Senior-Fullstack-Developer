import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Meal } from 'src/app/core/models/meal.model';
import { MealService } from 'src/app/core/services/meal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-meal-detail',
  templateUrl: './meal-detail.component.html',
  styleUrls: ['./meal-detail.component.css']
})
export class MealDetailComponent implements OnInit {
  meal: Meal | null = null;
  message:string="Loading...";

  constructor(
    private route: ActivatedRoute,
    private mealService: MealService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadMeal();
  }

  loadMeal(): void {
    const id = this.route.snapshot.paramMap.get('id') || '';
    this.mealService.getMealById(id).subscribe(meals => {
      if (meals) {
        if (meals.meals && meals.meals.length > 0) {
          this.meal = meals.meals[0];
          this.message = "";
        }
        else {
          this.message = "No se encontró el patillo";
        }
      } 
    });
  }

  goBack() {
    this.router.navigate(['/index']);
  }
}
