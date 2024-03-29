import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../components/recipes/recipe.model';
import { RecipesService } from './recipes.service';

import { exhaustMap, map, take, tap } from "rxjs/operators";
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private api: string = "https://ng-projs-db-default-rtdb.firebaseio.com";

  constructor(
    private http: HttpClient,
    private recipes: RecipesService,
    private auth: AuthService
  ) {}

  storeRecipes() {
    const recipes = this.recipes.getRecipes();

    this.http.put(`${this.api}/recipes.json`, recipes).subscribe(response => {
      // console.log(response);
    });
  }

  fetchRecipes() {
      return this.http.get<Recipe[]>(`${this.api}/recipes.json`,)
        .pipe(
          map((recipes) => {
            return recipes.map(recipe => {
              return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
            })
          }),
          tap((recipes) => {
            this.recipes.setRecipes(recipes);
          })
        )
  }


}
