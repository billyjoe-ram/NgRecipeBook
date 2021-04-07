import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

import { Recipe } from "../components/recipes/recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListsService } from "./shoppinglists.service";

@Injectable()
export class RecipesService {
    public recipesChanged = new Subject<Recipe[]>();
  
    private recipes: Recipe[] = [];

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

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
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
