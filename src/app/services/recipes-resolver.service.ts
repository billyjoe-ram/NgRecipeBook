import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Recipe } from "../components/recipes/recipe.model";
import { DataService } from "./data.service";
import { RecipesService } from "./recipes.service";

@Injectable({
    providedIn: 'root'
})
export class RecipesResolver implements Resolve<Recipe[]> {

    constructor(private data: DataService, private recipes: RecipesService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const recipes = this.recipes.getRecipes();
        if (!recipes.length) {
            return this.data.fetchRecipes();    
        } else {
            return recipes;
        }
        
    }
}