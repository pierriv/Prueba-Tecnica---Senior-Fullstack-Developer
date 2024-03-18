import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MealService } from '../meal.service';

describe('MealService', () => {
  let service: MealService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MealService]
    });
    service = TestBed.inject(MealService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('busqueda_platillos_por_nombre', () => {
    const dummyMeals : any = {
        meals: null
    };
    const searchName = 'dummmyName';

    service.searchMealsByName(searchName).subscribe(meals => {
      
      console.log(meals)
      expect(meals).toEqual(dummyMeals);
    });

    const request = httpMock.expectOne(`${service.apiUrl}/search.php?s=${searchName}`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyMeals);
  });
});
