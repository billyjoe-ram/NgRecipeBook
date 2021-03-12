import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

import { Recipe } from "../components/recipes/recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListsService } from "./shoppinglists.service";

@Injectable()
export class RecipesService {
    public recipesChanged = new Subject<Recipe[]>();
  
    private recipes: Recipe[] = [
    new Recipe(
      'Bolinho Kirk Douglas',
      'Bolinho tão bom quanto o Kirk Douglas é bom ator',
      'https://th.bing.com/th/id/OIP.tZRCv09dPmmCUK86yDzh9AHaIX?pid=Api&rs=1',
      [
        new Ingredient("Kirk", 1),
        new Ingredient("Douglas", 2)
      ]
    ),
    new Recipe(
      'Café Kirk Douglas',
      'Café tão bom quanto o Kirk Douglas é bom ator',
      'https://th.bing.com/th/id/OIP.tZRCv09dPmmCUK86yDzh9AHaIX?pid=Api&rs=1',
      [
        new Ingredient("Michael", 1),
        new Ingredient("Douglas", 2)
      ]
    ),
    new Recipe(
      'Salada Kirk Douglas',
      'Salada tão bom quanto o Kirk Douglas é bom ator',
      'https://th.bing.com/th/id/OIP.tZRCv09dPmmCUK86yDzh9AHaIX?pid=Api&rs=1',
      [
        new Ingredient("Kirk", 1),
        new Ingredient("Michael", 1)
      ]
    ),
  ];

  constructor(private sls: ShoppingListsService) { }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  addToList(ingredients: Ingredient[]) {
    this.sls.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }
  
  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

}
