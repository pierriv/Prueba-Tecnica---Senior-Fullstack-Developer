import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MealSearchModule } from './pages/meal.module';
import { MealService } from './core/services/meal.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MealSearchModule
  ],
  providers: [MealService],
  bootstrap: [AppComponent]
})
export class AppModule { }
