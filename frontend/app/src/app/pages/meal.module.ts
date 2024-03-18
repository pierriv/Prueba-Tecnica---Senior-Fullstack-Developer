import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MealSearchComponent } from './meal-search/meal-search.component';
import { MealDetailComponent } from './meal-detail/meal-detail.component';
import { MealListComponent } from './meal-list/meal-list.component';
import { RouterModule } from '@angular/router';
import { SearchHistoryComponent } from './search-history/search-history.component';

@NgModule({
  declarations: [
    MealSearchComponent, 
    MealDetailComponent, 
    MealListComponent, 
    SearchHistoryComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
})
export class MealSearchModule { }