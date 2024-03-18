import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MealSearchComponent } from './pages/meal-search/meal-search.component';
import { MealDetailComponent } from './pages/meal-detail/meal-detail.component';
import { SearchHistoryComponent } from './pages/search-history/search-history.component';

const routes: Routes = [
  { path: 'index', component: MealSearchComponent },
  { path: 'details/:id', component: MealDetailComponent },
  { path: 'history', component: SearchHistoryComponent },
  { path: '', redirectTo: '/index', pathMatch: 'full' },
  { path: '**', redirectTo: '/index' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
