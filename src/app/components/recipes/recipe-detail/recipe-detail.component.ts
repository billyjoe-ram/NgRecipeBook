import { Component, Input, OnInit } from '@angular/core';
import { RecipesService } from 'src/app/services/recipes.service';

import { ShoppingListsService } from 'src/app/services/shoppinglists.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  @Input() recipe!: Recipe;
  
  constructor(private recipeService: RecipesService) { }

  ngOnInit(): void {
  }

  onAddToList() {
    this.recipeService.addToList(this.recipe.ingredients);
  }

}
