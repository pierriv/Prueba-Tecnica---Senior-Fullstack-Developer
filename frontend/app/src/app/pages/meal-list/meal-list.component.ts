import { Component, Input } from '@angular/core';
import { Meal } from 'src/app/core/models/meal.model';

@Component({
  selector: 'app-meal-list',
  templateUrl: './meal-list.component.html',
  styleUrls: ['./meal-list.component.css']
})
export class MealListComponent {
  @Input() meals: Meal[] | null = null;
}